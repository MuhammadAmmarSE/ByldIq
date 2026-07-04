/**
 * Cross-cutting homepage analytics events, declared via the
 * `AnalyticsEventMap` declaration-merging pattern (see
 * `@/types/analytics`). Per-module events (journey_selected,
 * hero_cta_clicked, ai_companion_opened, ...) are declared next to the
 * module that fires them, not here — this file only covers events shared by
 * every homepage section.
 */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    /** Fires once, the first time a homepage section scrolls into view. */
    section_viewed: { section: string };
    /** Fires once per threshold as the visitor scrolls down the homepage. */
    scroll_depth_reached: { depth: 25 | 50 | 75 | 100 };
  }
}

export {};
