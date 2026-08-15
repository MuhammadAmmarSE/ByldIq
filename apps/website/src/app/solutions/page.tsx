import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import {
  EngagementModelsSection,
  IndustriesSection,
  SolutionComparisonEngine,
  SolutionSelector,
  SolutionsHero,
} from "@/features/solutions";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

const description =
  "Explore how Byld IQ approaches product engineering across twelve solution areas and the industries we build for — from startup MVPs to enterprise modernization.";

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
 * journey-aware hero, the interactive Solution Selector grid, and three
 * Milestone 10 additions — Industries, Engagement Models, and the
 * solution Comparison Engine.
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
      <IndustriesSection />
      <EngagementModelsSection />
      <SolutionComparisonEngine />
    </Container>
  );
}
