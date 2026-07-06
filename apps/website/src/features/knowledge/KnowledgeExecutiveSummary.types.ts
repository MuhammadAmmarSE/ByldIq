import type { KnowledgeArticle } from "./data/knowledge-article.schema";

export interface KnowledgeExecutiveSummaryProps {
  article: KnowledgeArticle;
  className?: string;
}
