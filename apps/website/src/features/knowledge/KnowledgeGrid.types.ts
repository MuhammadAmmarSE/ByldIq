import type { KnowledgeArticle } from "./data/knowledge-article.schema";
import type { KnowledgeSearchSuggestion } from "./search";

export interface KnowledgeGridProps {
  articles: KnowledgeArticle[];
  categoriesBySlug: Map<string, { slug: string; label: string }>;
  /** Forwarded to every `ArticleCard` — see `ArticleCardProps.hrefBase`. */
  hrefBase?: string;
  onSelect?: (slug: string) => void;
  onExpandAiSummary?: (slug: string) => void;
  /** Real, honest next steps shown only when `articles` is empty — never a fabricated match. */
  suggestions?: KnowledgeSearchSuggestion[];
  className?: string;
}
