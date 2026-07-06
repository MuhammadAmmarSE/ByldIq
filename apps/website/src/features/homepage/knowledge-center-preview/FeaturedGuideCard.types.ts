import type { KnowledgeArticle } from "@/features/knowledge";

export interface FeaturedGuideCardProps {
  article: KnowledgeArticle;
  onSelect?: (slug: string) => void;
  className?: string;
}
