import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { TechnologyExplorer } from "@/features/technology";

interface TechnologySearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

/**
 * Canonicalizes to the bare `/technology/search` path — search results
 * vary by `?q=`, and treating every query as a distinct indexable page
 * would be duplicate content with no independent value, the same
 * reasoning as `/work/search`.
 */
export const metadata: Metadata = {
  title: "Search technologies",
  description: "Search Byld IQ's technology library by name, category, or use case.",
  alternates: { canonical: "/technology/search" },
};

/**
 * CLAUDE.md Part 22's `/technology/search` required route: a deep-linkable
 * search results view — `?q=` prefills `TechnologyExplorer`'s existing
 * search box rather than duplicating its filtering logic in a second
 * search UI, the same pattern as `/work/search`.
 */
export default async function TechnologySearchPage({ searchParams }: TechnologySearchPageProps) {
  const { q } = await searchParams;

  return (
    <Container size="wide" className="py-16">
      <TechnologyExplorer initialQuery={q ?? ""} />
    </Container>
  );
}
