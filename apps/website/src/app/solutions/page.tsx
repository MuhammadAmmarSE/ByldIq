import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { SolutionSelector, SolutionsHero } from "@/features/solutions";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

const description =
  "Explore how Byld IQ approaches product engineering across nine solution areas — from startup MVPs to enterprise modernization.";

export const metadata: Metadata = {
  title: "Solutions",
  description,
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions",
    description,
    url: "/solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions",
    description,
  },
};

/**
 * The Solutions landing page (CLAUDE.md Part 20): an adaptive,
 * journey-aware hero followed by the interactive Solution Selector grid.
 */
export default function SolutionsPage() {
  return (
    <Container size="wide" className="space-y-12 py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Solutions", url: `${siteConfig.url}/solutions` },
          ]),
        )}
      />
      <SolutionsHero />
      <div id="solution-selector">
        <SolutionSelector />
      </div>
    </Container>
  );
}
