/** Knowledge Center Preview analytics events (CLAUDE.md Part 18). */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    knowledge_article_clicked: { slug: string };
    knowledge_ai_summary_expanded: { slug: string };
  }
}

export {};
