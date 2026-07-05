import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { WorkExplorer } from "@/features/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Engineering stories, not portfolios — how five real business problems became working products, with the architecture, trade-offs, and results behind each one.",
};

/**
 * The Case Studies Platform landing page (CLAUDE.md Part 21): an adaptive
 * hero with search and quick filters, featured work, multi-facet
 * filtering, and the full project grid — all composed in `WorkExplorer`.
 */
export default function WorkPage() {
  return (
    <Container size="wide" className="py-16">
      <WorkExplorer />
    </Container>
  );
}
