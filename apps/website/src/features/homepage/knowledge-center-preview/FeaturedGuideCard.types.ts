import type { KnowledgeArticle } from "@/features/knowledge";

export interface FeaturedGuideCardProps {
  article: KnowledgeArticle;
  /** Resolved from `KNOWLEDGE_CATEGORIES` by the parent; falls back to `article.category` if omitted. */
  categoryLabel?: string;
  onSelect?: (slug: string) => void;
  className?: string;
}
