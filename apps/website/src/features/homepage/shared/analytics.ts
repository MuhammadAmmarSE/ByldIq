/**
 * Cross-cutting analytics events, declared via the `AnalyticsEventMap`
 * declaration-merging pattern (see `@/types/analytics`). Per-module
 * events (journey_selected, hero_cta_clicked, ai_companion_opened, ...)
 * are declared next to the module that fires them, not here — this file
 * only covers events shared across the whole site via `useScrollDepth`/
 * `useSectionAnalytics`/`ScrollDepthTracker` (`features/homepage/shared`,
 * despite the folder name, are reused by any page — e.g. `/work` and
 * `/work/[slug]`).
 */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    /** Fires once, the first time a tracked section scrolls into view. */
    section_viewed: { section: string };
    /** Fires once per threshold as the visitor scrolls down a page. `page` identifies which page fired it. */
    scroll_depth_reached: { depth: 25 | 50 | 75 | 100; page?: string };
  }
}

export {};
