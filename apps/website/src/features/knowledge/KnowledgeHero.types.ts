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
  /** Overrides the default "Engineering Knowledge That Lasts." headline. */
  headline?: string;
  /** Overrides the default supporting copy below the headline. */
  supportingCopy?: string;
  className?: string;
}
