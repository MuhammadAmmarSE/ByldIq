import type { KnowledgeArticle } from "@/features/knowledge";

export interface ArticleCardProps {
  article: KnowledgeArticle;
  /** Resolved from `KNOWLEDGE_CATEGORIES` by the parent grid; falls back to `article.category` if omitted. */
  categoryLabel?: string;
  onSelect?: (slug: string) => void;
  onExpandAiSummary?: (slug: string) => void;
  className?: string;
}
