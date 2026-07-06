import type { Technology } from "./data/technology.schema";

export interface TechnologyDetailHeroProps {
  technology: Technology;
  /** Resolved from `TECHNOLOGY_CATEGORIES` by the page — see `TechnologyCard.types.ts` for the same pattern. */
  categoryLabel?: string;
  className?: string;
}
