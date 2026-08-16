import type { KnowledgeArticle } from "@/features/knowledge";

export interface ArticleCardProps {
  article: KnowledgeArticle;
  /** Resolved from `KNOWLEDGE_CATEGORIES` by the parent grid; falls back to `article.category` if omitted. */
  categoryLabel?: string;
  /** Overrides the link target's base path, e.g. `/knowledge/playbooks` when a grid of playbook-typed articles should open the dedicated checklist view instead of the full article. Defaults to `/knowledge`. */
  hrefBase?: string;
  onSelect?: (slug: string) => void;
  onExpandAiSummary?: (slug: string) => void;
  className?: string;
}
