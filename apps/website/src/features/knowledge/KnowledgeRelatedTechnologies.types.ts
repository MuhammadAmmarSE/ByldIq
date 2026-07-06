import type { KnowledgeArticle } from "./data/knowledge-article.schema";

export interface KnowledgeRelatedTechnologiesProps {
  article: KnowledgeArticle;
  className?: string;
}
