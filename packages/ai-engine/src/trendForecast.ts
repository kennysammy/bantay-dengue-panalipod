export type TrendDirection = "UP" | "DOWN" | "STABLE";

export interface TrendPrediction {
  trend3Day: number;
  trend7Day: number;
  direction: TrendDirection;
  movingAverage7Day: number;
  smoothedValue: number;
  slope: number;
}

const average = (values: number[]) =>
  values.length === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / values.length;

export function movingAverage(values: number[], period = 7) {
  const source = values.slice(-period);
  return Number(average(source).toFixed(2));
}

export function exponentialSmoothing(values: number[], alpha = 0.4) {
  if (values.length === 0) return 0;

  let smoothed = values[0] ?? 0;
  for (let index = 1; index < values.length; index += 1) {
    smoothed = alpha * values[index]! + (1 - alpha) * smoothed;
  }

  return Number(smoothed.toFixed(2));
}

export function calculateSlope(values: number[]) {
  if (values.length < 2) return 0;

  const first = values[0] ?? 0;
  const last = values.at(-1) ?? 0;
  return Number(((last - first) / (values.length - 1)).toFixed(4));
}

export function detectDirection(slope: number): TrendDirection {
  if (slope > 1) return "UP";
  if (slope < -1) return "DOWN";
  return "STABLE";
}

export function predictUserRiskTrend(history: number[]): TrendPrediction {
  const safeHistory = history.map((value) => Math.max(0, Math.min(100, value)));
  const movingAverage7Day = movingAverage(safeHistory, 7);
  const smoothedValue = exponentialSmoothing(safeHistory, 0.45);
  const slope = calculateSlope(safeHistory.slice(-7));
  const direction = detectDirection(slope);

  return {
    trend3Day: Number(movingAverage(safeHistory, 3).toFixed(2)),
    trend7Day: movingAverage7Day,
    direction,
    movingAverage7Day,
    smoothedValue,
    slope,
  };
}

export function predictBarangayRiskTrend(data: number[]): TrendPrediction {
  const prediction = predictUserRiskTrend(data);
  return {
    ...prediction,
    trend3Day: Number((prediction.trend3Day * 1.02).toFixed(2)),
  };
}

export function detectRisingRiskSignal(history: number[]) {
  const recent = history.slice(-3);
  const previous = history.slice(-6, -3);

  const recentAverage = average(recent);
  const previousAverage = average(previous);

  if (previousAverage === 0) {
    return recentAverage > 0;
  }

  return (recentAverage - previousAverage) / previousAverage > 0.15;
}
