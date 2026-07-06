import { TECHNOLOGY_CATEGORIES } from "./categories";
import { TECHNOLOGIES } from "./technologies";

/**
 * `TECHNOLOGY_CATEGORIES` declares the full 20-category taxonomy for future
 * growth (see that file's doc comment), but only categories with at least
 * one real `TECHNOLOGIES` entry should ever appear as a filter chip or grid
 * heading — an empty category page or filter option would be exactly the
 * dead end CLAUDE.md Part 8 warns against.
 */
export const POPULATED_CATEGORIES = TECHNOLOGY_CATEGORIES.filter((category) =>
  TECHNOLOGIES.some((technology) => technology.category === category.slug),
);

export const CATEGORIES_BY_SLUG = new Map(
  TECHNOLOGY_CATEGORIES.map((category) => [category.slug, category]),
);
