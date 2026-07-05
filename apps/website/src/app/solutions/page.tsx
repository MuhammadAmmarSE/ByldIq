import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { SolutionSelector, SolutionsHero } from "@/features/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore how Byld IQ approaches product engineering across nine solution areas — from startup MVPs to enterprise modernization.",
};

/**
 * The Solutions landing page (CLAUDE.md Part 20): an adaptive,
 * journey-aware hero followed by the interactive Solution Selector grid.
 */
export default function SolutionsPage() {
  return (
    <Container size="wide" className="space-y-12 py-16">
      <SolutionsHero />
      <div id="solution-selector">
        <SolutionSelector />
      </div>
    </Container>
  );
}
