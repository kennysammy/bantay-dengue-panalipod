import test from "node:test";
import assert from "node:assert/strict";
import { calculateLifestyleRisk, detectOutbreak, predictUserRiskTrend } from "../src/index";

test("calculateLifestyleRisk returns red level for high weighted inputs", () => {
  const result = calculateLifestyleRisk({
    environment: { stagnantWater: 100, floodProne: 90, nearRiverOrForest: 85 },
    behavior: { cleaningHabits: 90, protectionUsage: 70, garbageDisposal: 80 },
    symptoms: { fever: 95, rash: 70, bodyPain: 85, fatigue: 80 },
  });

  assert.equal(result.riskLevel, "RED");
  assert.ok(result.score > 80);
});

test("predictUserRiskTrend detects upward trend", () => {
  const trend = predictUserRiskTrend([35, 38, 41, 47, 52, 58, 63]);

  assert.equal(trend.direction, "UP");
  assert.ok(trend.trend7Day >= 47);
});

test("detectOutbreak triggers alert based on red cases", () => {
  const result = detectOutbreak({
    redCasesLast7Days: 3,
    weeklyRiskAverageCurrent: 60,
    weeklyRiskAveragePrevious: 55,
    cleanupParticipationRate: 55,
    symptomReportsCurrentWeek: 9,
    symptomReportsPreviousWeek: 8,
  });

  assert.equal(result.level, "ALERT");
  assert.ok(result.triggeredRules.includes("3_or_more_red_cases_in_7_days"));
});
