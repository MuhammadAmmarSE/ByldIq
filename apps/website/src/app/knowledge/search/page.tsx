import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { KnowledgeExplorer } from "@/features/knowledge";

interface KnowledgeSearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

/**
 * Canonicalizes to the bare `/knowledge/search` path — search results
 * vary by `?q=`, and treating every query as a distinct indexable page
 * would be duplicate content with no independent value, the same
 * reasoning as `/technology/search`.
 */
export const metadata: Metadata = {
  title: "Search the Knowledge Center",
  description: "Search Byld IQ's Knowledge Center by topic, technology, or question.",
  alternates: { canonical: "/knowledge/search" },
};

/**
 * CLAUDE.md Part 18's `/knowledge/search` required route: a deep-linkable
 * search results view — `?q=` prefills `KnowledgeExplorer`'s existing
 * search box rather than duplicating its filtering logic in a second
 * search UI, the same pattern as `/technology/search`.
 */
export default async function KnowledgeSearchPage({ searchParams }: KnowledgeSearchPageProps) {
  const { q } = await searchParams;

  return (
    <Container size="wide" className="py-16">
      <KnowledgeExplorer initialQuery={q ?? ""} />
    </Container>
  );
}
