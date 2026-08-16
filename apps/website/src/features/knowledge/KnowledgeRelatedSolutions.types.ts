import type { KnowledgeArticle } from "./data/knowledge-article.schema";

export interface KnowledgeRelatedSolutionsProps {
  article: KnowledgeArticle;
  className?: string;
}
