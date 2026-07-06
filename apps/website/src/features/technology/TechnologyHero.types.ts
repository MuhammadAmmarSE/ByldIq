export interface TechnologyHeroCategory {
  slug: string;
  label: string;
}

export interface TechnologyHeroProps {
  query: string;
  onQueryChange: (query: string) => void;
  categories: TechnologyHeroCategory[];
  categoryFilter: string | null;
  onCategoryQuickFilter: (category: string | null) => void;
  /** Overrides the default "Technology Decisions, Explained." headline. */
  headline?: string;
  /** Overrides the default supporting copy below the headline. */
  supportingCopy?: string;
  className?: string;
}
