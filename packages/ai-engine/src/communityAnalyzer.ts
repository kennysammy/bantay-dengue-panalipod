import { mapScoreToRiskLevel } from "./riskScoring";

export interface CommunityAnalyzerInput {
  barangay: string;
  population: number;
  activeSymptoms: number;
  clusteredHouseholds: number;
  totalHouseholds: number;
  cleanupParticipants: number;
  eligibleParticipants: number;
  averageRiskScore: number;
}

export interface CommunityRiskResult {
  barangay: string;
  barangayRiskScore: number;
  infectionClustering: number;
  cleanupParticipationRate: number;
  symptomDensity: number;
  heatScore: number;
  barangayRiskLabel: ReturnType<typeof mapScoreToRiskLevel>;
}

const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function analyzeCommunityRisk(input: CommunityAnalyzerInput): CommunityRiskResult {
  const infectionClustering =
    input.totalHouseholds > 0 ? (input.clusteredHouseholds / input.totalHouseholds) * 100 : 0;

  const cleanupParticipationRate =
    input.eligibleParticipants > 0
      ? (input.cleanupParticipants / input.eligibleParticipants) * 100
      : 0;

  const symptomDensity = input.population > 0 ? (input.activeSymptoms / input.population) * 1000 : 0;

  const barangayRiskScore = clamp(
    input.averageRiskScore * 0.45 + infectionClustering * 0.25 + symptomDensity * 3 - cleanupParticipationRate * 0.2,
  );

  const heatScore = clamp(barangayRiskScore * 0.7 + symptomDensity * 2 + infectionClustering * 0.1);

  return {
    barangay: input.barangay,
    barangayRiskScore: Number(barangayRiskScore.toFixed(2)),
    infectionClustering: Number(infectionClustering.toFixed(2)),
    cleanupParticipationRate: Number(cleanupParticipationRate.toFixed(2)),
    symptomDensity: Number(symptomDensity.toFixed(2)),
    heatScore: Number(heatScore.toFixed(2)),
    barangayRiskLabel: mapScoreToRiskLevel(heatScore),
  };
}
