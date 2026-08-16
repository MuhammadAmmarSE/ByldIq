import type { KnowledgeArticle } from "./data/knowledge-article.schema";

export interface KnowledgePlaybookDetailProps {
  /** A `KnowledgeArticle` whose `type` is `"playbook"` and `playbook` field is set — the route validates this before rendering. */
  article: KnowledgeArticle;
  categoryLabel?: string;
  className?: string;
}
