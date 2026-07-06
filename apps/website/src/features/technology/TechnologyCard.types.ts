import type { Technology } from "./data/technology.schema";

export interface TechnologyCardProps {
  technology: Technology;
  /** Resolved from `TECHNOLOGY_CATEGORIES` by the parent grid, kept optional so the card degrades gracefully if a category is ever removed. */
  categoryLabel?: string;
  onSelect?: (slug: string) => void;
  className?: string;
}
