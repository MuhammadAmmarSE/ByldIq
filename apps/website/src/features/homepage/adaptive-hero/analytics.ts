import type { Journey } from "@/types/journey";

/** Adaptive Hero analytics events (CLAUDE.md Part 11). */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    hero_cta_clicked: { journey: Journey | null; cta: "primary" | "secondary"; label: string };
  }
}

export {};
