import { KNOWLEDGE_CATEGORIES } from "./categories";
import { KNOWLEDGE_ARTICLES } from "./articles";

/**
 * `KNOWLEDGE_CATEGORIES` declares the full 20-category taxonomy for future
 * growth (see that file's doc comment), but only categories with at least
 * one real `KNOWLEDGE_ARTICLES` entry should ever appear as a filter chip,
 * grid heading, or route — the same pattern as the Technology Explorer's
 * `POPULATED_CATEGORIES`.
 *
 * Deliberately scoped to articles only, not `TUTORIALS` — this list
 * drives `KnowledgeExplorer`'s article grid/filter chips, and a category
 * with a tutorial but zero articles would otherwise show as filterable
 * here while filtering to a confusing, empty article grid. A tutorial's
 * own category label still resolves correctly via `CATEGORIES_BY_SLUG`,
 * which covers the full taxonomy independently of this filtered list.
 */
export const POPULATED_CATEGORIES = KNOWLEDGE_CATEGORIES.filter((category) =>
  KNOWLEDGE_ARTICLES.some((article) => article.category === category.slug),
);

export const CATEGORIES_BY_SLUG = new Map(
  KNOWLEDGE_CATEGORIES.map((category) => [category.slug, category]),
);
