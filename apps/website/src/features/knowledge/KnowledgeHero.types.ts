export interface KnowledgeHeroCategory {
  slug: string;
  label: string;
}

export interface KnowledgeHeroProps {
  query: string;
  onQueryChange: (query: string) => void;
  categories: KnowledgeHeroCategory[];
  categoryFilter: string | null;
  onCategoryQuickFilter: (category: string | null) => void;
  /** The full taxonomy size (CLAUDE.md Part 18) — when larger than `categories.length`, an honest "more are on the way" note renders instead of pretending the taxonomy is complete. */
  totalCategoryCount?: number;
  /** Overrides the default "Engineering Knowledge That Lasts." headline. */
  headline?: string;
  /** Overrides the default supporting copy below the headline. */
  supportingCopy?: string;
  className?: string;
}
