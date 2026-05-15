"use client";

import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export function TrendChart({
  data,
}: {
  data: Array<{
    day: string;
    score: number;
  }>;
}) {
  return (
    <div className="h-56 w-full overflow-x-auto">
      <LineChart width={720} height={220} data={data}>
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#0f766e" strokeWidth={2} dot={false} />
        </LineChart>
    </div>
  );
}
