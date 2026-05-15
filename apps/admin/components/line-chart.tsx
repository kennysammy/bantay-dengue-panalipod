"use client";

import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export function LineTrendChart({
  data,
}: {
  data: Array<{ day: string; value: number }>;
}) {
  return (
    <div className="h-64 w-full overflow-x-auto">
      <LineChart width={720} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
    </div>
  );
}
