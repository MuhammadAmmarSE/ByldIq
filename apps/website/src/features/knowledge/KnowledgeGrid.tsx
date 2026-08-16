import Link from "next/link";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { ArticleCard } from "@/features/homepage/knowledge-center-preview";
import { cn } from "@/utils/cn";

import type { KnowledgeGridProps } from "./KnowledgeGrid.types";

/**
 * Renders the filtered article grid, or an educational empty state
 * (CLAUDE.md Part 7: "Every empty state teaches") rather than a bare
 * "No results." Reuses the homepage preview's `ArticleCard` — the same
 * "one card, not two" reuse the Solutions/Technology/Case Studies
 * `RelatedKnowledge` modules already rely on. When `search.ts` found a
 * real (not fabricated) category or Technology Explorer match for the
 * query, those appear as concrete next steps instead of just "try
 * again."
 */
export function KnowledgeGrid({
  articles,
  categoriesBySlug,
  hrefBase,
  onSelect,
  onExpandAiSummary,
  suggestions = [],
  className,
}: KnowledgeGridProps) {
  if (articles.length === 0) {
    return (
      <div className="border-border rounded-lg border border-dashed p-12 text-center">
        <Text variant="body">No articles match that search or category yet.</Text>
        <Text variant="caption" className="mt-1">
          Try a different category, or clear the search to see every article.
        </Text>
        {suggestions.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {suggestions.map((suggestion) => (
              <Button key={suggestion.href} asChild variant="outline" size="sm">
                <Link href={suggestion.href}>{suggestion.label}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {articles.map((article) => (
        <ArticleCard
          key={article.slug}
          article={article}
          categoryLabel={categoriesBySlug.get(article.category)?.label}
          hrefBase={hrefBase}
          onSelect={onSelect}
          onExpandAiSummary={onExpandAiSummary}
        />
      ))}
    </div>
  );
}
