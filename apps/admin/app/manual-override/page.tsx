import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

export default function ManualOverridePage() {
  return (
    <Card title="Manual Alert Override" subtitle="Admin-only action for emergency communications">
      <p className="mb-4 text-sm text-slate-700">Use this panel to activate or clear barangay alert banners.</p>
      <div className="flex gap-3">
        <Button type="button">Set WATCH Alert</Button>
        <Button type="button" className="bg-slate-700 hover:bg-slate-600">
          Clear Alert
        </Button>
      </div>
    </Card>
  );
}
