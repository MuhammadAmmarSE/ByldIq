import type { KnowledgeArticle } from "./data/knowledge-article.schema";

export interface KnowledgeArticleHeroProps {
  article: KnowledgeArticle;
  /** Resolved from `KNOWLEDGE_CATEGORIES` by the page — see `TechnologyCard.types.ts` for the same pattern. */
  categoryLabel?: string;
  className?: string;
}
