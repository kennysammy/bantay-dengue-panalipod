import { Card } from "@repo/ui/card";

export default function AwarenessHubPage() {
  return (
    <Card title="Awareness Hub" subtitle="Evidence-based prevention guidance">
      <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
        <li>Remove standing water every 2–3 days.</li>
        <li>Use mosquito protection at dawn and dusk.</li>
        <li>Coordinate barangay cleanup drives weekly.</li>
      </ul>
    </Card>
  );
}
