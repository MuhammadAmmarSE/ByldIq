import type { KnowledgeArticle } from "./data/knowledge-article.schema";

export interface KnowledgeRelatedLearningProps {
  article: KnowledgeArticle;
  className?: string;
}
