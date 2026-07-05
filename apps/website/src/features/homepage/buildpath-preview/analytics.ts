/** BuildPath Preview analytics events (CLAUDE.md Part 17). */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    buildpath_preview_goal_selected: { goal: string };
    buildpath_preview_cta_clicked: Record<string, never>;
  }
}

export {};
