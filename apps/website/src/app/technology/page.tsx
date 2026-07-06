import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { TechnologyExplorer } from "@/features/technology";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

const description =
  "Technology decisions explained, not a stack list — strengths, weaknesses, trade-offs, and the reasoning behind choosing one technology over another.";

export const metadata: Metadata = {
  title: "Technology",
  description,
  alternates: { canonical: "/technology" },
  openGraph: {
    title: "Technology",
    description,
    url: "/technology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology",
    description,
  },
};

/**
 * The Technology Explorer landing page (CLAUDE.md Part 22): search,
 * category filtering, and the full technology grid.
 */
export default function TechnologyPage() {
  return (
    <Container size="wide" className="space-y-12 py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Technology", url: `${siteConfig.url}/technology` },
          ]),
        )}
      />
      <TechnologyExplorer />
    </Container>
  );
}
