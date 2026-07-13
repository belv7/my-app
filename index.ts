import "dotenv/config";
import express from "express";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import {
  buildDashboardStats,
  calculatePriorityLabel,
  calculateStatusLabel,
  getCategoryLabel,
  type TaskViewModel,
} from "./lib/dashboard.ts";

// DB接続の準備
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ["query"] });

const app = express();
const PORT = process.env.PORT || 8888;

// EJSを使うための設定
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

function toTaskViewModel(task: {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: number;
  completed: boolean;
  dueDate: Date | null;
  createdAt: Date;
  progressRate: number;
  plannedMinutes: number;
  actualMinutes: number;
  xpReward: number;
  coinReward: number;
  materialReward: number;
}): TaskViewModel {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    category: task.category,
    categoryLabel: getCategoryLabel(task.category),
    priority: task.priority,
    completed: task.completed,
    dueDate: task.dueDate,
    createdAt: task.createdAt,
    progressRate: task.progressRate,
    plannedMinutes: task.plannedMinutes,
    actualMinutes: task.actualMinutes,
    xpReward: task.xpReward,
    coinReward: task.coinReward,
    materialReward: task.materialReward,
    priorityLabel: calculatePriorityLabel(task.priority),
    statusLabel: calculateStatusLabel(task),
  };
}

function parsePriority(value: unknown): number {
  const priorityValue = Number(value ?? 2);
  return Number.isInteger(priorityValue) && priorityValue >= 1 && priorityValue <= 4 ? priorityValue : 2;
}

function parseDueDate(value: unknown): { dueDate: Date | null; valid: boolean } {
  const dueDateValue = String(value ?? "").trim();
  if (!dueDateValue) {
    return { dueDate: null, valid: true };
  }

  const dueDate = new Date(dueDateValue);
  return { dueDate, valid: !Number.isNaN(dueDate.getTime()) };
}

function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function formatDueDateForInput(dueDate: Date | null): string {
  if (!dueDate) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${dueDate.getFullYear()}-${pad(dueDate.getMonth() + 1)}-${pad(dueDate.getDate())}T${pad(dueDate.getHours())}:${pad(dueDate.getMinutes())}`;
}

// 一覧表示の画面
app.get("/", async (req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: [{ completed: "asc" }, { priority: "asc" }, { dueDate: "asc" }, { createdAt: "desc" }],
  });

  const taskViews = tasks.map((task) => ({
    ...toTaskViewModel(task),
    dueDateInput: formatDueDateForInput(task.dueDate),
  }));

  res.render("index", { tasks: taskViews, stats: buildDashboardStats(taskViews) });
});

// タスクを追加する処理
app.post("/tasks", async (req, res) => {
  const title = String(req.body.title ?? "").trim();
  const description = String(req.body.description ?? "").trim();
  const category = String(req.body.category ?? "general").trim() || "general";
  const priority = parsePriority(req.body.priority);
  const { dueDate, valid: hasValidDueDate } = parseDueDate(req.body.dueDate);

  if (title && hasValidDueDate) {
    await prisma.task.create({
      data: {
        title,
        description,
        category,
        priority,
        dueDate: dueDate ?? undefined,
      },
    });
  }
  res.redirect("/");
});

// タスクを編集する処理
app.post("/tasks/:id/edit", async (req, res) => {
  const taskId = Number(req.params.id);
  if (!Number.isInteger(taskId)) {
    res.redirect("/");
    return;
  }

  const title = String(req.body.title ?? "").trim();
  const description = String(req.body.description ?? "").trim();
  const category = String(req.body.category ?? "general").trim() || "general";
  const priority = parsePriority(req.body.priority);
  const { dueDate, valid: hasValidDueDate } = parseDueDate(req.body.dueDate);
  const progressRate = clampInt(req.body.progressRate, 0, 100, 0);
  const plannedMinutes = clampInt(req.body.plannedMinutes, 1, 480, 30);
  const actualMinutes = clampInt(req.body.actualMinutes, 0, 480, 0);

  if (title && hasValidDueDate) {
    await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        category,
        priority,
        dueDate,
        progressRate,
        plannedMinutes,
        actualMinutes,
      },
    });
  }

  res.redirect("/");
});

// タスクの完了状態を切り替える処理
app.post("/tasks/:id/toggle", async (req, res) => {
  const taskId = Number(req.params.id);

  if (Number.isInteger(taskId)) {
    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (task) {
      await prisma.task.update({
        where: { id: taskId },
        data: { completed: !task.completed },
      });
    }
  }

  res.redirect("/");
});

app.post("/tasks/:id/duplicate", async (req, res) => {
  const taskId = Number(req.params.id);

  if (Number.isInteger(taskId)) {
    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (task) {
      await prisma.task.create({
        data: {
          title: `${task.title} の複製`,
          description: task.description,
          category: task.category,
          priority: task.priority,
          dueDate: task.dueDate,
          progressRate: task.progressRate,
          plannedMinutes: task.plannedMinutes,
          actualMinutes: task.actualMinutes,
          xpReward: task.xpReward,
          coinReward: task.coinReward,
          materialReward: task.materialReward,
        },
      });
    }
  }

  res.redirect("/");
});

// タスクを削除する処理
app.post("/tasks/:id/delete", async (req, res) => {
  const taskId = Number(req.params.id);

  if (Number.isInteger(taskId)) {
    await prisma.task.deleteMany({ where: { id: taskId } });
  }

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
