import type { Journey } from "@/types/journey";

/** Journey Selection Engine analytics events (CLAUDE.md Part 10). */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    journey_hovered: { journey: Journey };
    journey_selected: { journey: Journey; previousJourney: Journey | null };
    /** "Visitors can reset their journey at any time." */
    journey_reset: { previousJourney: Journey | null };
  }
}

export {};
