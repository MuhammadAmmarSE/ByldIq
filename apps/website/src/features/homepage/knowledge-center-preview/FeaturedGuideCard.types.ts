import type { KnowledgeArticle } from "./data/articles";

export interface FeaturedGuideCardProps {
  article: KnowledgeArticle;
  onSelect?: (slug: string) => void;
  className?: string;
}
