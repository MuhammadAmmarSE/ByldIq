import type { Metadata } from "next";

import "./globals.css";
import { siteConfig } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import { AppProviders } from "@/providers/AppProviders";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  // Placeholder — real SEO copy/structured data lands with the homepage (Milestone 4+).
  description: "Engineering foundation in progress.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontVariables} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
