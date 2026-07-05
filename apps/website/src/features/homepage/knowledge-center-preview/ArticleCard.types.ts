import type { KnowledgeArticle } from "./data/articles";

export interface ArticleCardProps {
  article: KnowledgeArticle;
  onSelect?: (slug: string) => void;
  onExpandAiSummary?: (slug: string) => void;
  className?: string;
}
