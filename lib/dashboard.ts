export type TaskViewModel = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date | null;
  createdAt: Date;
  progressRate: number;
  plannedMinutes: number;
  actualMinutes: number;
  xpReward: number;
  coinReward: number;
  materialReward: number;
  statusLabel: string;
};

export type DashboardStats = {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  userLevel: number;
  xp: number;
  coins: number;
  materials: number;
  totalAcquiredMinos: number;
  nextTaskTitle: string;
  morningNote: string;
  nightNote: string;
  tetrisHint: string;
};

export type MinoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

export type CompletedMinoToken = {
  token: string;
  taskId: number;
  type: MinoType;
  title: string;
};

export type MinoStockSummary = {
  total: number;
  counts: Record<MinoType, number>;
  tokens: CompletedMinoToken[];
};

const MINO_TYPES: MinoType[] = ["I", "O", "T", "S", "Z", "J", "L"];

const EMPTY_MINO_COUNTS: Record<MinoType, number> = {
  I: 0,
  O: 0,
  T: 0,
  S: 0,
  Z: 0,
  J: 0,
  L: 0,
};

export function getMinoTypeForTask(taskId: number): MinoType {
  const normalized = Math.abs(Math.trunc(taskId));
  let mixed = (normalized + 0x9e3779b9) >>> 0;
  mixed = (mixed ^ (mixed >>> 16)) >>> 0;
  mixed = Math.imul(mixed, 0x85ebca6b) >>> 0;
  mixed = (mixed ^ (mixed >>> 13)) >>> 0;
  mixed = Math.imul(mixed, 0xc2b2ae35) >>> 0;
  mixed = (mixed ^ (mixed >>> 16)) >>> 0;
  return MINO_TYPES[mixed % MINO_TYPES.length];
}

export function buildMinoStockSummary(tasks: TaskViewModel[]): MinoStockSummary {
  const counts: Record<MinoType, number> = { ...EMPTY_MINO_COUNTS };
  const tokens: CompletedMinoToken[] = [];

  for (const task of tasks) {
    if (!task.completed) continue;
    const type = getMinoTypeForTask(task.id);
    counts[type] += 1;
    tokens.push({
      token: `task-${task.id}`,
      taskId: task.id,
      type,
      title: task.title,
    });
  }

  return {
    total: tokens.length,
    counts,
    tokens,
  };
}

export function calculateStatusLabel(task: { completed: boolean; dueDate: Date | null }): string {
  if (task.completed) {
    return "完了済み";
  }

  if (!task.dueDate) {
    return "締切未設定";
  }

  const now = Date.now();
  const dueAt = task.dueDate.getTime();
  const hoursUntilDue = (dueAt - now) / (1000 * 60 * 60);

  if (hoursUntilDue <= 0) return "締切超過";
  if (hoursUntilDue <= 6) return "6時間以内";
  if (hoursUntilDue <= 24) return "今日中";
  if (hoursUntilDue <= 72) return "3日以内";
  return "余裕あり";
}

export function buildDashboardStats(tasks: TaskViewModel[]): DashboardStats {
  const minoStock = buildMinoStockSummary(tasks);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const xp = tasks.reduce((sum, task) => sum + (task.completed ? task.xpReward : 0), 0);
  const coins = tasks.reduce((sum, task) => sum + (task.completed ? task.coinReward : 0), 0);
  const materials = tasks.reduce((sum, task) => sum + (task.completed ? task.materialReward : 0), 0);
  const userLevel = Math.max(1, Math.floor(xp / 30) + 1);
  const remainingTasks = Math.max(0, totalTasks - completedTasks);
  const tetrisHint = completedTasks === 0
    ? "最初の1件を完了したら「ゲームスタート」を押して、獲得ミノを配置しましょう。"
    : remainingTasks === 0
      ? `獲得ミノ ${minoStock.total} 個。ストック上限は2個なので、盤面で使って回転させましょう。`
      : `タスク完了後は「ゲームスタート」で即配置。ストック上限2個を超えないうちに消化するのがおすすめです。`;

  return {
    totalTasks,
    completedTasks,
    completionRate,
    userLevel,
    xp,
    coins,
    materials,
    totalAcquiredMinos: minoStock.total,
    nextTaskTitle: tasks.find((task) => !task.completed)?.title ?? "今は休憩して次の行動を待つ",
    morningNote: tasks.length === 0 ? "まずは1件追加して、最初のミノを取りに行こう。" : "1件片付けたら、すぐゲームスタートでミノを配置しよう。",
    nightNote: completedTasks === 0 ? "今日はまだ準備段階。1件終えれば盤面が動き始める。" : `今日は ${completedTasks} 件進んだ。未完了は ${remainingTasks} 件。ミノ在庫を使ってライン消去を狙おう。`,
    tetrisHint,
  };
}
