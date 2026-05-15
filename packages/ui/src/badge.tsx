import clsx from "clsx";

const toneStyles = {
  green: "bg-emerald-100 text-emerald-800",
  yellow: "bg-yellow-100 text-yellow-800",
  orange: "bg-orange-100 text-orange-800",
  red: "bg-red-100 text-red-800",
  slate: "bg-slate-100 text-slate-700",
} as const;

export function Badge({
  children,
  tone = "slate",
}: {
  children: string;
  tone?: keyof typeof toneStyles;
}) {
  return (
    <span className={clsx("inline-flex rounded-full px-3 py-1 text-xs font-semibold", toneStyles[tone])}>
      {children}
    </span>
  );
}
