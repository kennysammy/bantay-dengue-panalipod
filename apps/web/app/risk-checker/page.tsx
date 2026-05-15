import { calculateLifestyleRisk } from "@repo/ai-engine";
import { Badge } from "@repo/ui/badge";
import { Card } from "@repo/ui/card";

const sampleResult = calculateLifestyleRisk({
  environment: { stagnantWater: 65, floodProne: 58, nearRiverOrForest: 60 },
  behavior: { cleaningHabits: 42, protectionUsage: 50, garbageDisposal: 46 },
  symptoms: { fever: 35, rash: 18, bodyPain: 28, fatigue: 26 },
});

const toneMap = {
  GREEN: "green",
  YELLOW: "yellow",
  ORANGE: "orange",
  RED: "red",
} as const;

export default function RiskCheckerPage() {
  return (
    <Card title="Risk Checker" subtitle="Weighted lifestyle risk engine">
      <div className="space-y-3">
        <p className="text-sm text-slate-600">Sample score using environment/behavior/symptom factors.</p>
        <div className="flex items-center gap-3">
          <p className="text-2xl font-bold">{sampleResult.score}</p>
          <Badge tone={toneMap[sampleResult.riskLevel]}>{sampleResult.riskLevel}</Badge>
        </div>
      </div>
    </Card>
  );
}
