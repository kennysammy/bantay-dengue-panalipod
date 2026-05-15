import { Alert } from "@repo/ui/alert";
import { Card } from "@repo/ui/card";

export default function AlertsPage() {
  return (
    <Card title="Outbreak Alerts" subtitle="Rule-based outbreak monitoring">
      <div className="space-y-2">
        <Alert intent="danger">Poblacion: ALERT — 3 RED symptom cases reported in 7 days.</Alert>
        <Alert intent="warning">Basak: WATCH — cleanup below 40% with rising symptoms.</Alert>
      </div>
    </Card>
  );
}
