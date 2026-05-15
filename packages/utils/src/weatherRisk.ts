export interface WeatherSnapshot {
  rainfallMm: number;
  relativeHumidity: number;
  temperatureC: number;
}

export interface WeatherRiskBoostResult {
  boost: number;
  explanation: {
    rainfallMm: number;
    humidity: number;
    temperatureC: number;
    reason: string;
  };
}

interface OpenMeteoDaily {
  precipitation_sum?: number[];
  temperature_2m_max?: number[];
}

interface OpenMeteoHourly {
  relative_humidity_2m?: number[];
}

interface OpenMeteoResponse {
  daily?: OpenMeteoDaily;
  hourly?: OpenMeteoHourly;
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export async function fetchOpenMeteoWeather(latitude: number, longitude: number): Promise<WeatherSnapshot> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    daily: "precipitation_sum,temperature_2m_max",
    hourly: "relative_humidity_2m",
    forecast_days: "1",
    timezone: "Asia/Manila",
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Open-Meteo request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as OpenMeteoResponse;

  const rainfallMm = payload.daily?.precipitation_sum?.[0] ?? 0;
  const temperatureC = payload.daily?.temperature_2m_max?.[0] ?? 0;
  const humidity = average(payload.hourly?.relative_humidity_2m ?? []);

  return {
    rainfallMm,
    relativeHumidity: Number(humidity.toFixed(2)),
    temperatureC,
  };
}

export function calculateWeatherRiskBoost(snapshot: WeatherSnapshot): WeatherRiskBoostResult {
  let boost = 0;
  const reasons: string[] = [];

  if (snapshot.rainfallMm >= 20) {
    boost += 8;
    reasons.push("high rainfall");
  } else if (snapshot.rainfallMm >= 10) {
    boost += 4;
    reasons.push("moderate rainfall");
  }

  if (snapshot.relativeHumidity >= 80) {
    boost += 8;
    reasons.push("very high humidity");
  } else if (snapshot.relativeHumidity >= 70) {
    boost += 4;
    reasons.push("high humidity");
  }

  if (snapshot.temperatureC >= 28 && snapshot.temperatureC <= 34) {
    boost += 4;
    reasons.push("favorable mosquito breeding temperature");
  }

  const boundedBoost = Math.min(20, Math.max(0, boost));

  return {
    boost: boundedBoost,
    explanation: {
      rainfallMm: snapshot.rainfallMm,
      humidity: snapshot.relativeHumidity,
      temperatureC: snapshot.temperatureC,
      reason: reasons.length ? reasons.join(", ") : "weather conditions currently low risk",
    },
  };
}

export async function getWeatherRiskBoost(latitude: number, longitude: number): Promise<WeatherRiskBoostResult> {
  const weather = await fetchOpenMeteoWeather(latitude, longitude);
  return calculateWeatherRiskBoost(weather);
}
