/** Interactive Product Showcase analytics events (CLAUDE.md Part 14). */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    showcase_pod_viewed: { pod: string };
    showcase_interaction: { pod: string; action: string };
  }
}

export {};
