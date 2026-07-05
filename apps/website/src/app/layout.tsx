import type { Metadata } from "next";

import "./globals.css";
import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import { jsonLdScriptProps, organizationJsonLd } from "@/lib/json-ld";
import { AppProviders } from "@/providers/AppProviders";

const description =
  "Byld IQ is an Intelligent Product Engineering Company. We partner with founders and " +
  "enterprises to engineer digital products that create measurable business value — " +
  "combining product strategy, design, engineering, and AI into one process.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontVariables} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col antialiased">
        <script {...jsonLdScriptProps(organizationJsonLd())} />
        <AppProviders>
          <PageShell>{children}</PageShell>
        </AppProviders>
      </body>
    </html>
  );
}
