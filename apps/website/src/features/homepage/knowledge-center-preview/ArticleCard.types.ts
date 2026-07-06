import type { KnowledgeArticle } from "@/features/knowledge";

export interface ArticleCardProps {
  article: KnowledgeArticle;
  onSelect?: (slug: string) => void;
  onExpandAiSummary?: (slug: string) => void;
  className?: string;
}
