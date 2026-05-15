import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const links = [
  ["/", "Overview"],
  ["/barangays", "Barangay Monitoring"],
  ["/alerts", "Outbreak Alerts"],
  ["/analytics", "Risk Analytics"],
  ["/cleanup", "Cleanup Tracking"],
  ["/manual-override", "Manual Override"],
] as const;

export const metadata: Metadata = {
  title: "Bantay-Dengue Admin",
  description: "Barangay analytics and alert administration",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PH">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-4 px-4 py-4">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="text-sm font-medium text-slate-700 hover:text-blue-700">
                {label}
              </Link>
            ))}
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
