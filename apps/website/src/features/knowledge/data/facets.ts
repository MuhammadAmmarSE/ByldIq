import { KNOWLEDGE_CATEGORIES } from "./categories";
import { KNOWLEDGE_ARTICLES } from "./articles";

/**
 * `KNOWLEDGE_CATEGORIES` declares the full 20-category taxonomy for future
 * growth (see that file's doc comment), but only categories with at least
 * one real `KNOWLEDGE_ARTICLES` entry should ever appear as a filter chip,
 * grid heading, or route — the same pattern as the Technology Explorer's
 * `POPULATED_CATEGORIES`.
 */
export const POPULATED_CATEGORIES = KNOWLEDGE_CATEGORIES.filter((category) =>
  KNOWLEDGE_ARTICLES.some((article) => article.category === category.slug),
);

export const CATEGORIES_BY_SLUG = new Map(
  KNOWLEDGE_CATEGORIES.map((category) => [category.slug, category]),
);
