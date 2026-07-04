/** Engineering Excellence Engine analytics events (CLAUDE.md Part 15). */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    engineering_practice_expanded: { practice: string };
    engineering_pipeline_stage_selected: { stage: string };
  }
}

export {};
