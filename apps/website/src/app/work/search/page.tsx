import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { WorkExplorer } from "@/features/case-studies";
import { ScrollDepthTracker } from "@/features/homepage/shared";

interface WorkSearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

/**
 * Canonicalizes to the bare `/work/search` path — search results vary by
 * `?q=`, and treating every query as a distinct indexable page would be
 * duplicate content with no independent value. No OpenGraph/Twitter card:
 * a search results page isn't meant to be shared socially.
 */
export const metadata: Metadata = {
  title: "Search case studies",
  description:
    "Search Byld IQ's engineering case study library by industry, technology, or business challenge.",
  alternates: { canonical: "/work/search" },
};

/**
 * CLAUDE.md Part 21's `/work/search` required route: a deep-linkable
 * search results view — `?q=` prefills `WorkExplorer`'s existing search
 * box rather than duplicating its filtering logic in a second search UI.
 * Command Palette and external links can point here with a query already
 * attached; visitors typing directly into `/work`'s search box never
 * leave that page, since filtering there is already instant and
 * client-side.
 */
export default async function WorkSearchPage({ searchParams }: WorkSearchPageProps) {
  const { q } = await searchParams;

  return (
    <Container size="wide" className="py-16">
      <ScrollDepthTracker page="work/search" />
      <WorkExplorer initialQuery={q ?? ""} />
    </Container>
  );
}
