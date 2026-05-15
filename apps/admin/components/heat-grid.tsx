export function HeatGrid({
  rows,
}: {
  rows: Array<{ barangay: string; heat: number }>;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {rows.map((row) => (
        <div
          key={row.barangay}
          className="rounded p-3 text-xs font-semibold text-slate-900"
          style={{ backgroundColor: `rgba(239, 68, 68, ${Math.max(0.15, row.heat / 100)})` }}
        >
          <p>{row.barangay}</p>
          <p>Heat {row.heat}</p>
        </div>
      ))}
    </div>
  );
}
