export interface TechnologyExplorerProps {
  className?: string;
  /** Prefills the search box — used by a future `/technology/search`. */
  initialQuery?: string;
  /** Preselects a category filter — used by a future `/technology/category/[category]`. */
  initialCategoryFilter?: string;
  /** Overrides the hero's default headline for category-specific landing pages. */
  headline?: string;
  /** Overrides the hero's default supporting copy for category-specific landing pages. */
  supportingCopy?: string;
}
