"use client";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export function SymptomBarChart({
  data,
}: {
  data: Array<{ day: string; reports: number }>;
}) {
  return (
    <div className="h-64 w-full overflow-x-auto">
      <BarChart width={720} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="reports" fill="#f97316" />
        </BarChart>
    </div>
  );
}
