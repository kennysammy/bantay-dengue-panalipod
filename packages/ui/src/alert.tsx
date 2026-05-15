import { type PropsWithChildren } from "react";
import clsx from "clsx";

const intentClass = {
  info: "border-sky-200 bg-sky-50 text-sky-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  danger: "border-red-200 bg-red-50 text-red-900",
} as const;

export function Alert({
  intent = "info",
  children,
}: PropsWithChildren<{ intent?: keyof typeof intentClass }>) {
  return <div className={clsx("rounded-lg border p-4 text-sm", intentClass[intent])}>{children}</div>;
}
