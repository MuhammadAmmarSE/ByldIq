import type { KnowledgeArticle } from "./data/knowledge-article.schema";

export interface KnowledgeSummarizerProps {
  article: KnowledgeArticle;
  className?: string;
}
