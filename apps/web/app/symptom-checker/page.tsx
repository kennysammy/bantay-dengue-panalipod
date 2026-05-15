import { Card } from "@repo/ui/card";

export default function SymptomCheckerPage() {
  return (
    <Card title="Symptom Checker" subtitle="Quick self-assessment">
      <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
        <li>Fever</li>
        <li>Rash</li>
        <li>Body pain</li>
        <li>Fatigue</li>
      </ul>
    </Card>
  );
}
