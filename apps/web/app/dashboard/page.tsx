import { Card } from "@repo/ui/card";

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card title="Current Risk" subtitle="Barangay level">
        <p className="text-3xl font-semibold text-orange-600">ORANGE</p>
      </Card>
      <Card title="Symptom Reports" subtitle="Last 7 days">
        <p className="text-3xl font-semibold">47</p>
      </Card>
      <Card title="Cleanup Participation" subtitle="Current week">
        <p className="text-3xl font-semibold text-emerald-700">58%</p>
      </Card>
    </div>
  );
}
