import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildDashboardStats,
  buildMinoStockSummary,
  calculateStatusLabel,
  getMinoTypeForTask,
  type TaskViewModel,
} from "./dashboard.ts";

function makeTask(overrides: Partial<TaskViewModel> = {}): TaskViewModel {
  return {
    id: 1,
    title: "テストタスク",
    description: "",
    completed: false,
    dueDate: null,
    createdAt: new Date("2026-07-13T00:00:00Z"),
    progressRate: 0,
    plannedMinutes: 30,
    actualMinutes: 0,
    xpReward: 10,
    coinReward: 5,
    materialReward: 1,
    statusLabel: "締切未設定",
    ...overrides,
  };
}

describe("calculateStatusLabel", () => {
  it("returns completed label for finished tasks", () => {
    assert.equal(calculateStatusLabel({ completed: true, dueDate: null }), "完了済み");
  });

  it("returns overdue label when due date passed", () => {
    const past = new Date(Date.now() - 60 * 60 * 1000);
    assert.equal(calculateStatusLabel({ completed: false, dueDate: past }), "締切超過");
  });

  it("returns urgent label when due within 6 hours", () => {
    const soon = new Date(Date.now() + 3 * 60 * 60 * 1000);
    assert.equal(calculateStatusLabel({ completed: false, dueDate: soon }), "6時間以内");
  });
});

describe("buildDashboardStats", () => {
  it("returns zero stats for empty task list", () => {
    const stats = buildDashboardStats([]);
    assert.equal(stats.totalTasks, 0);
    assert.equal(stats.completionRate, 0);
    assert.equal(stats.totalAcquiredMinos, 0);
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
    assert.equal(stats.totalAcquiredMinos, 3);
    assert.equal(stats.tetrisHint.includes("獲得ミノ"), true);
  });
});

describe("buildMinoStockSummary", () => {
  it("maps completed tasks to deterministic random mino tokens", () => {
    const result = buildMinoStockSummary([
      makeTask({ id: 1, completed: true }),
      makeTask({ id: 2, completed: true }),
      makeTask({ id: 3, completed: false }),
    ]);

    assert.equal(result.total, 2);
    assert.equal(result.counts.J, 2);
    assert.equal(result.tokens[0].token, "task-1");
  });
});

describe("getMinoTypeForTask", () => {
  it("returns deterministic random tetromino types from task id", () => {
    assert.equal(getMinoTypeForTask(1), "J");
    assert.equal(getMinoTypeForTask(4), "O");
    assert.equal(getMinoTypeForTask(6), "S");
    assert.equal(getMinoTypeForTask(7), "T");
    assert.equal(getMinoTypeForTask(8), "L");
    assert.equal(getMinoTypeForTask(9), "Z");
    assert.equal(getMinoTypeForTask(10), "I");
  });
});
