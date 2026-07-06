import type { KnowledgeArticle } from "./data/knowledge-article.schema";

export interface KnowledgeGridProps {
  articles: KnowledgeArticle[];
  categoriesBySlug: Map<string, { slug: string; label: string }>;
  onSelect?: (slug: string) => void;
  onExpandAiSummary?: (slug: string) => void;
  className?: string;
}
