import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildDashboardStats,
  calculatePriorityLabel,
  calculateStatusLabel,
  getCategoryLabel,
  type TaskViewModel,
} from "./dashboard.ts";

function makeTask(overrides: Partial<TaskViewModel> = {}): TaskViewModel {
  return {
    id: 1,
    title: "テストタスク",
    description: "",
    category: "general",
    categoryLabel: "その他",
    priority: 2,
    completed: false,
    dueDate: null,
    createdAt: new Date("2026-07-13T00:00:00Z"),
    progressRate: 0,
    plannedMinutes: 30,
    actualMinutes: 0,
    xpReward: 10,
    coinReward: 5,
    materialReward: 1,
    priorityLabel: "優先",
    statusLabel: "締切未設定",
    ...overrides,
  };
}

describe("calculatePriorityLabel", () => {
  it("maps priority levels to Japanese labels", () => {
    assert.equal(calculatePriorityLabel(1), "最優先");
    assert.equal(calculatePriorityLabel(2), "優先");
    assert.equal(calculatePriorityLabel(3), "通常");
    assert.equal(calculatePriorityLabel(4), "後回し可");
  });
});

describe("calculateStatusLabel", () => {
  it("returns completed label for finished tasks", () => {
    assert.equal(calculateStatusLabel({ completed: true, dueDate: null, priority: 2 }), "完了済み");
  });

  it("returns overdue label when due date passed", () => {
    const past = new Date(Date.now() - 60 * 60 * 1000);
    assert.equal(calculateStatusLabel({ completed: false, dueDate: past, priority: 2 }), "締切超過");
  });

  it("returns urgent label when due within 6 hours", () => {
    const soon = new Date(Date.now() + 3 * 60 * 60 * 1000);
    assert.equal(calculateStatusLabel({ completed: false, dueDate: soon, priority: 2 }), "6時間以内");
  });
});

describe("buildDashboardStats", () => {
  it("returns zero stats for empty task list", () => {
    const stats = buildDashboardStats([]);
    assert.equal(stats.totalTasks, 0);
    assert.equal(stats.completionRate, 0);
    assert.equal(stats.cityLevel, 1);
    assert.equal(stats.streakDays, 0);
  });

  it("calculates rewards from completed tasks only", () => {
    const stats = buildDashboardStats([
      makeTask({ completed: true, xpReward: 10, coinReward: 5, materialReward: 2 }),
      makeTask({ id: 2, completed: false, xpReward: 20, coinReward: 10, materialReward: 4 }),
    ]);
    assert.equal(stats.completedTasks, 1);
    assert.equal(stats.xp, 10);
    assert.equal(stats.coins, 5);
    assert.equal(stats.materials, 2);
    assert.equal(stats.completionRate, 50);
  });

  it("grows city metrics with completed tasks", () => {
    const stats = buildDashboardStats([
      makeTask({ completed: true }),
      makeTask({ id: 2, completed: true }),
      makeTask({ id: 3, completed: true }),
    ]);
    assert.equal(stats.cityLevel, 2);
    assert.equal(stats.cityPopulation, 22);
    assert.equal(stats.buildings, 2);
  });
});

describe("getCategoryLabel", () => {
  it("returns Japanese labels for known categories", () => {
    assert.equal(getCategoryLabel("study"), "勉強");
    assert.equal(getCategoryLabel("work"), "仕事");
  });

  it("falls back to raw value for unknown categories", () => {
    assert.equal(getCategoryLabel("custom"), "custom");
  });
});
