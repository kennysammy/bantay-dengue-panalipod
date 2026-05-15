import { ChartCard } from "@repo/ui/chart-card";
import { Card } from "@repo/ui/card";
import { LineTrendChart } from "../components/line-chart";
import { SymptomBarChart } from "../components/bar-chart";
import { HeatGrid } from "../components/heat-grid";

const trendData = [
  { day: "Mon", value: 44 },
  { day: "Tue", value: 47 },
  { day: "Wed", value: 51 },
  { day: "Thu", value: 56 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 63 },
  { day: "Sun", value: 66 },
];

const symptomData = [
  { day: "Mon", reports: 5 },
  { day: "Tue", reports: 8 },
  { day: "Wed", reports: 6 },
  { day: "Thu", reports: 9 },
  { day: "Fri", reports: 11 },
  { day: "Sat", reports: 10 },
  { day: "Sun", reports: 12 },
];

const heatRows = [
  { barangay: "Poblacion", heat: 76 },
  { barangay: "Basak", heat: 64 },
  { barangay: "San Isidro", heat: 54 },
  { barangay: "Mabolo", heat: 42 },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Active Alerts">
          <p className="text-3xl font-semibold text-red-600">3</p>
        </Card>
        <Card title="High-Risk Barangays">
          <p className="text-3xl font-semibold text-orange-600">5</p>
        </Card>
        <Card title="Cleanup Participation">
          <p className="text-3xl font-semibold text-emerald-700">58%</p>
        </Card>
      </div>
      <ChartCard title="Risk Trend Line">
        <LineTrendChart data={trendData} />
      </ChartCard>
      <ChartCard title="Symptom Reports Over Time">
        <SymptomBarChart data={symptomData} />
      </ChartCard>
      <ChartCard title="Barangay Heat Map (Grid Placeholder)">
        <HeatGrid rows={heatRows} />
      </ChartCard>
    </div>
  );
}
