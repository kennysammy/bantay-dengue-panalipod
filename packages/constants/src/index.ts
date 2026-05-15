export const ROLES = ["user", "admin", "barangay_officer"] as const;

export const RISK_LEVELS = ["GREEN", "YELLOW", "ORANGE", "RED"] as const;

export const COLLECTIONS = {
  users: "users",
  assessments: "assessments",
  symptoms: "symptoms",
  cleanupTasks: "cleanup_tasks",
  leaderboard: "leaderboard",
  trivia: "trivia",
  badges: "badges",
  notifications: "notifications",
  barangays: "barangays",
  aiScores: "ai_scores",
  riskTrends: "risk_trends",
  alerts: "alerts",
} as const;
