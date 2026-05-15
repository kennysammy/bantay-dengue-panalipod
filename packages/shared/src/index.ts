import type { RISK_LEVELS, ROLES } from "@repo/constants";

export type UserRole = (typeof ROLES)[number];
export type RiskLevel = (typeof RISK_LEVELS)[number];

export interface UserProfile {
  id: string;
  role: UserRole;
  fullName: string;
  age: number;
  gender: "female" | "male" | "other";
  barangay: string;
  municipality: string;
  points: number;
  riskLevel: RiskLevel;
  createdAt: string;
}

export interface Assessment {
  id: string;
  userId: string;
  score: number;
  riskLevel: RiskLevel;
  environment: number;
  behavior: number;
  symptoms: number;
  createdAt: string;
}

export interface SymptomReport {
  id: string;
  userId: string;
  barangay: string;
  municipality: string;
  hasFever: boolean;
  hasRash: boolean;
  hasBodyPain: boolean;
  hasFatigue: boolean;
  severity: "mild" | "moderate" | "severe";
  riskLevel: RiskLevel;
  createdAt: string;
}

export interface CleanupTask {
  id: string;
  barangay: string;
  municipality: string;
  title: string;
  participants: number;
  completed: boolean;
  scheduledAt: string;
}

export interface Alert {
  id: string;
  barangay: string;
  municipality: string;
  level: "LOW" | "WATCH" | "ALERT" | "OUTBREAK WARNING";
  message: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

export interface Barangay {
  id: string;
  name: string;
  municipality: string;
  population: number;
  activeCases: number;
  cleanupParticipationRate: number;
  riskLevel: RiskLevel;
}

export interface RiskTrend {
  id: string;
  barangay: string;
  municipality: string;
  values: number[];
  direction: "UP" | "DOWN" | "STABLE";
  generatedAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: "rising_risk" | "barangay_alert" | "weather_risk" | "cleanup_reminder";
  read: boolean;
  createdAt: string;
}

export const firestoreSchemaExamples = {
  users: {
    id: "uid_123",
    role: "user",
    fullName: "Juan Dela Cruz",
    age: 27,
    gender: "male",
    barangay: "Poblacion",
    municipality: "Cebu City",
    points: 130,
    riskLevel: "YELLOW",
    createdAt: "2026-05-15T00:00:00.000Z",
  },
  assessments: {
    id: "assess_001",
    userId: "uid_123",
    score: 62,
    riskLevel: "ORANGE",
    environment: 70,
    behavior: 45,
    symptoms: 68,
    createdAt: "2026-05-15T00:00:00.000Z",
  },
  symptoms: {
    id: "sym_001",
    userId: "uid_123",
    barangay: "Poblacion",
    municipality: "Cebu City",
    hasFever: true,
    hasRash: false,
    hasBodyPain: true,
    hasFatigue: true,
    severity: "moderate",
    riskLevel: "RED",
    createdAt: "2026-05-15T00:00:00.000Z",
  },
  cleanup_tasks: {
    id: "cleanup_001",
    barangay: "Poblacion",
    municipality: "Cebu City",
    title: "Drain stagnant water drive",
    participants: 52,
    completed: true,
    scheduledAt: "2026-05-15T00:00:00.000Z",
  },
  leaderboard: { id: "leader_001", userId: "uid_123", points: 130, rank: 2 },
  trivia: { id: "trivia_001", question: "What mosquito spreads dengue?", answer: "Aedes" },
  badges: { id: "badge_001", name: "Cleanup Champion", pointsRequired: 100 },
  notifications: {
    id: "notif_001",
    userId: "uid_123",
    title: "Rising dengue risk",
    body: "Risk in your barangay increased this week.",
    type: "rising_risk",
    read: false,
    createdAt: "2026-05-15T00:00:00.000Z",
  },
  barangays: {
    id: "brgy_001",
    name: "Poblacion",
    municipality: "Cebu City",
    population: 5400,
    activeCases: 12,
    cleanupParticipationRate: 57,
    riskLevel: "YELLOW",
  },
  ai_scores: { id: "ai_001", barangay: "Poblacion", riskScore: 64, weatherBoost: 12, generatedAt: "2026-05-15T00:00:00.000Z" },
  risk_trends: {
    id: "trend_001",
    barangay: "Poblacion",
    municipality: "Cebu City",
    values: [48, 50, 54, 59, 61, 63, 64],
    direction: "UP",
    generatedAt: "2026-05-15T00:00:00.000Z",
  },
  alerts: {
    id: "alert_001",
    barangay: "Poblacion",
    municipality: "Cebu City",
    level: "WATCH",
    message: "Increase barangay cleanup and monitor symptoms.",
    isActive: true,
    createdBy: "admin_uid",
    createdAt: "2026-05-15T00:00:00.000Z",
  },
} as const;
