import type { RiskLevel } from "@repo/shared";

export interface LifestyleRiskInput {
  environment: {
    stagnantWater: number;
    floodProne: number;
    nearRiverOrForest: number;
  };
  behavior: {
    cleaningHabits: number;
    protectionUsage: number;
    garbageDisposal: number;
  };
  symptoms: {
    fever: number;
    rash: number;
    bodyPain: number;
    fatigue: number;
  };
}

export interface LifestyleRiskResult {
  score: number;
  riskLevel: RiskLevel;
  breakdown: {
    environment: number;
    behavior: number;
    symptoms: number;
  };
}

const clampScore = (value: number) => Math.max(0, Math.min(100, value));

const average = (values: number[]) => values.reduce((sum, value) => sum + clampScore(value), 0) / values.length;

export function mapScoreToRiskLevel(score: number): RiskLevel {
  if (score <= 30) return "GREEN";
  if (score <= 60) return "YELLOW";
  if (score <= 80) return "ORANGE";
  return "RED";
}

export function calculateLifestyleRisk(input: LifestyleRiskInput): LifestyleRiskResult {
  const environment = average([
    input.environment.stagnantWater,
    input.environment.floodProne,
    input.environment.nearRiverOrForest,
  ]);

  const behavior = average([
    input.behavior.cleaningHabits,
    input.behavior.protectionUsage,
    input.behavior.garbageDisposal,
  ]);

  const symptoms = average([
    input.symptoms.fever,
    input.symptoms.rash,
    input.symptoms.bodyPain,
    input.symptoms.fatigue,
  ]);

  const score = clampScore(environment * 0.4 + behavior * 0.3 + symptoms * 0.3);

  return {
    score: Number(score.toFixed(2)),
    riskLevel: mapScoreToRiskLevel(score),
    breakdown: {
      environment: Number(environment.toFixed(2)),
      behavior: Number(behavior.toFixed(2)),
      symptoms: Number(symptoms.toFixed(2)),
    },
  };
}
