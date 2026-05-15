import Link from "next/link";
import { Alert } from "@repo/ui/alert";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

export default function LandingPage() {
  return (
    <div className="space-y-6">
      <Alert intent="info">BANTAY-DENGUE ECOSYSTEM (FEASIBLE AI EDITION) — Learn. Prevent. Protect.</Alert>
      <h1 className="text-3xl font-bold text-slate-900">Community Dengue Early Warning for the Philippines</h1>
      <p className="max-w-3xl text-slate-700">
        Free-tier-friendly dengue awareness, risk monitoring, and early warning for barangays and municipalities.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Risk Checker" subtitle="Lifestyle-based risk scoring">
          <p className="text-sm text-slate-600">Evaluate environmental, behavioral, and symptom factors in minutes.</p>
        </Card>
        <Card title="Cleanup Tracker" subtitle="Community participation monitoring">
          <p className="text-sm text-slate-600">Track cleanup activity to reduce mosquito breeding hotspots.</p>
        </Card>
        <Card title="Alerting" subtitle="Rule-based outbreak detection">
          <p className="text-sm text-slate-600">Flag rising risk signals and barangay warning levels.</p>
        </Card>
      </div>
      <Link href="/ai-risk-dashboard">
        <Button>Open AI Risk Dashboard</Button>
      </Link>
    </div>
  );
}
