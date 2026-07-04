/** Proof Engine analytics events (CLAUDE.md Part 13). */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    proof_filter_changed: { journey: string | null };
    proof_search: { query: string };
    proof_project_clicked: { slug: string };
  }
}

export {};
