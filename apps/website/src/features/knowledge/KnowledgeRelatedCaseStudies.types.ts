import type { KnowledgeArticle } from "./data/knowledge-article.schema";

export interface KnowledgeRelatedCaseStudiesProps {
  article: KnowledgeArticle;
  className?: string;
}
