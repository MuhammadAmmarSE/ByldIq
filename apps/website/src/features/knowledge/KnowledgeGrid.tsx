import { Text } from "@/components/Text";
import { ArticleCard } from "@/features/homepage/knowledge-center-preview";
import { cn } from "@/utils/cn";

import type { KnowledgeGridProps } from "./KnowledgeGrid.types";

/**
 * Renders the filtered article grid, or an educational empty state
 * (CLAUDE.md Part 7: "Every empty state teaches") rather than a bare
 * "No results." Reuses the homepage preview's `ArticleCard` — the same
 * "one card, not two" reuse the Solutions/Technology/Case Studies
 * `RelatedKnowledge` modules already rely on.
 */
export function KnowledgeGrid({
  articles,
  categoriesBySlug,
  onSelect,
  onExpandAiSummary,
  className,
}: KnowledgeGridProps) {
  if (articles.length === 0) {
    return (
      <div className="border-border rounded-lg border border-dashed p-12 text-center">
        <Text variant="body">No articles match that search or category yet.</Text>
        <Text variant="caption" className="mt-1">
          Try a different category, or clear the search to see every article.
        </Text>
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
          onSelect={onSelect}
          onExpandAiSummary={onExpandAiSummary}
        />
      ))}
    </div>
  );
}
