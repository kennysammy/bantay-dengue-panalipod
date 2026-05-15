import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const navItems = [
  { href: "/", label: "Landing" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/risk-checker", label: "Risk Checker" },
  { href: "/symptom-checker", label: "Symptom Checker" },
  { href: "/cleanup-tracker", label: "Cleanup Tracker" },
  { href: "/awareness-hub", label: "Awareness Hub" },
  { href: "/ai-risk-dashboard", label: "AI Risk Dashboard" },
];

export const metadata: Metadata = {
  title: "Bantay-Dengue Ecosystem",
  description: "Learn. Prevent. Protect.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PH">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-4 px-4 py-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 hover:text-emerald-700">
                {item.label}
              </Link>
            ))}
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
