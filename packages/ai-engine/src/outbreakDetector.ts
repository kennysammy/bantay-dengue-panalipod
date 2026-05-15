export type OutbreakLevel = "LOW" | "WATCH" | "ALERT" | "OUTBREAK WARNING";

export interface OutbreakInput {
  redCasesLast7Days: number;
  weeklyRiskAverageCurrent: number;
  weeklyRiskAveragePrevious: number;
  cleanupParticipationRate: number;
  symptomReportsCurrentWeek: number;
  symptomReportsPreviousWeek: number;
}

export interface OutbreakDetectionResult {
  level: OutbreakLevel;
  triggeredRules: string[];
}

export function detectOutbreak(input: OutbreakInput): OutbreakDetectionResult {
  const triggeredRules: string[] = [];

  if (input.redCasesLast7Days >= 3) {
    triggeredRules.push("3_or_more_red_cases_in_7_days");
  }

  const weeklyGrowth =
    input.weeklyRiskAveragePrevious > 0
      ? ((input.weeklyRiskAverageCurrent - input.weeklyRiskAveragePrevious) /
          input.weeklyRiskAveragePrevious) *
        100
      : 0;

  if (weeklyGrowth > 20) {
    triggeredRules.push("risk_average_increased_more_than_20_percent");
  }

  if (
    input.cleanupParticipationRate < 40 &&
    input.symptomReportsCurrentWeek > input.symptomReportsPreviousWeek
  ) {
    triggeredRules.push("cleanup_below_40_and_symptoms_increasing");
  }

  if (triggeredRules.length === 0) {
    return { level: "LOW", triggeredRules };
  }

  if (triggeredRules.length >= 2 || input.redCasesLast7Days >= 5) {
    return { level: "OUTBREAK WARNING", triggeredRules };
  }

  if (triggeredRules.includes("3_or_more_red_cases_in_7_days")) {
    return { level: "ALERT", triggeredRules };
  }

  return { level: "WATCH", triggeredRules };
}
