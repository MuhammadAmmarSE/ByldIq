import type { Metadata } from "next";

import "./globals.css";
import { PageShell } from "@/components/PageShell";
import { primaryNav, siteConfig } from "@/config/site";
import { CASE_STUDIES, FICTIONAL_COMPANIES } from "@/features/case-studies";
import { SOLUTIONS } from "@/features/solutions";
import { TECHNOLOGIES } from "@/features/technology";
import { fontVariables } from "@/lib/fonts";
import { jsonLdScriptProps, organizationJsonLd } from "@/lib/json-ld";
import { AppProviders } from "@/providers/AppProviders";
import type { NavItem } from "@/types/navigation";

const COMPANIES_BY_ID = new Map(FICTIONAL_COMPANIES.map((company) => [company.id, company]));

/**
 * The Solutions and Work dropdowns are built here (the Pages layer, which
 * is allowed to depend on Features) rather than in `config/site.ts`
 * (Shared-layer config that `PageShell` reads) — see `config/site.ts`'s
 * comment.
 */
const navItems: NavItem[] = [
  {
    label: "Solutions",
    href: "/solutions",
    children: SOLUTIONS.map((solution) => ({
      label: solution.navLabel,
      href: `/solutions/${solution.slug}`,
    })),
  },
  {
    label: "Work",
    href: "/work",
    children: CASE_STUDIES.map((caseStudy) => ({
      label: COMPANIES_BY_ID.get(caseStudy.companyId)?.name ?? caseStudy.headline,
      href: `/work/${caseStudy.slug}`,
    })),
  },
  {
    label: "Technology",
    href: "/technology",
    children: TECHNOLOGIES.map((technology) => ({
      label: technology.name,
      href: `/technology/${technology.slug}`,
    })),
  },
  ...primaryNav,
];

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
          <PageShell navItems={navItems}>{children}</PageShell>
        </AppProviders>
      </body>
    </html>
  );
}
