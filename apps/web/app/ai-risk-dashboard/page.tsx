import { Alert } from "@repo/ui/alert";
import { Badge } from "@repo/ui/badge";
import { ChartCard } from "@repo/ui/chart-card";
import { Card } from "@repo/ui/card";
import { predictUserRiskTrend } from "@repo/ai-engine";
import { calculateWeatherRiskBoost } from "@repo/utils/weatherRisk";
import { TrendChart } from "../../components/trend-chart";

const trendData = [
  { day: "Mon", score: 48 },
  { day: "Tue", score: 52 },
  { day: "Wed", score: 55 },
  { day: "Thu", score: 58 },
  { day: "Fri", score: 62 },
  { day: "Sat", score: 66 },
  { day: "Sun", score: 69 },
];

const trendPrediction = predictUserRiskTrend(trendData.map((item) => item.score));
const weatherBoost = calculateWeatherRiskBoost({ rainfallMm: 24, relativeHumidity: 82, temperatureC: 31 });

export default function AIRiskDashboardPage() {
  return (
    <div className="space-y-4">
      <Alert intent="warning">Alert banner: WATCH - rising dengue risk signal detected for your barangay.</Alert>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card title="User Risk Score">
          <p className="text-3xl font-semibold">69</p>
        </Card>
        <Card title="7-Day Trend Direction">
          <Badge tone="orange">{trendPrediction.direction}</Badge>
        </Card>
        <Card title="Barangay Risk Level">
          <Badge tone="orange">ORANGE</Badge>
        </Card>
        <Card title="Weather Risk Factor">
          <p className="text-2xl font-semibold">+{weatherBoost.boost}</p>
          <p className="mt-1 text-xs text-slate-500">{weatherBoost.explanation.reason}</p>
        </Card>
      </div>
      <ChartCard title="7-Day Risk Trend Graph">
        <TrendChart data={trendData} />
      </ChartCard>
    </div>
  );
}
