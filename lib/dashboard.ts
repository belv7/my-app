export type TaskViewModel = {
  id: number;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
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
  priorityLabel: string;
  statusLabel: string;
};

export type DashboardStats = {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  streakDays: number;
  userLevel: number;
  cityLevel: number;
  cityPopulation: number;
  buildings: number;
  xp: number;
  coins: number;
  materials: number;
  nextTaskTitle: string;
  morningNote: string;
  nightNote: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  study: "勉強",
  work: "仕事",
  exercise: "運動",
  hobby: "趣味",
  chores: "家事",
  general: "その他",
};

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function calculatePriorityLabel(priority: number): string {
  if (priority <= 1) return "最優先";
  if (priority === 2) return "優先";
  if (priority === 3) return "通常";
  return "後回し可";
}

export function calculateStatusLabel(task: { completed: boolean; dueDate: Date | null; priority: number }): string {
  if (task.completed) {
    return "完了済み";
  }

  if (!task.dueDate) {
    return task.priority <= 2 ? "締切未設定 / 早めに着手" : "締切未設定";
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
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const xp = tasks.reduce((sum, task) => sum + (task.completed ? task.xpReward : 0), 0);
  const coins = tasks.reduce((sum, task) => sum + (task.completed ? task.coinReward : 0), 0);
  const materials = tasks.reduce((sum, task) => sum + (task.completed ? task.materialReward : 0), 0);
  const cityLevel = Math.max(1, Math.floor(completedTasks / 3) + 1);
  const userLevel = Math.max(1, Math.floor(xp / 30) + 1);

  return {
    totalTasks,
    completedTasks,
    completionRate,
    streakDays: completedTasks === 0 ? 0 : Math.max(1, Math.min(30, completedTasks + 2)),
    userLevel,
    cityLevel,
    cityPopulation: 10 + completedTasks * 4,
    buildings: Math.max(1, Math.floor(completedTasks / 2) + 1),
    xp,
    coins,
    materials,
    nextTaskTitle: tasks.find((task) => !task.completed)?.title ?? "今は休憩して次の行動を待つ",
    morningNote: tasks.length === 0 ? "まずは1件追加して、街の一日を始めよう。" : "最優先の1件を先に終わらせると、街の成長が一気に進む。",
    nightNote: completedTasks === 0 ? "今日はまだ動き出し前。明日は1件だけでも進めると流れが作りやすい。" : `今日は ${completedTasks} 件進んだ。明日は ${Math.max(0, totalTasks - completedTasks)} 件に集中しよう。`,
  };
}
