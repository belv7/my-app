import "dotenv/config";
import express from "express";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

// DB接続の準備
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ["query"] });

const app = express();
const PORT = process.env.PORT || 8888;

// EJSを使うための設定
app.set("view engine", "ejs");
app.set("views", "./views");
// フォームから送られたデータを受け取れるようにする
app.use(express.urlencoded({ extended: true }));

// 一覧表示の画面
app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.render("index", { users });
});

// ユーザーを追加する処理
app.post("/users", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age ? Number(req.body.age) : null; // 数値に変換するのじゃ
  if (name) {
    await prisma.user.create({ data: { name, age } });
  }
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
