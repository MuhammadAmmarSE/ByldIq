/** Arrival Experience analytics events (CLAUDE.md Part 9: "Track: Intro Started, Intro Completed, Intro Skipped, Time to Interaction..."). */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    intro_started: { reducedMotion: boolean; device: "mobile" | "desktop" };
    intro_completed: { reducedMotion: boolean; theme: string | undefined };
    intro_skipped: { stageAtSkip: string };
    /** Elapsed ms from mount to the overlay unmounting, whichever path (finished/skipped/bypassed) got it there. */
    intro_time_to_interaction: {
      milliseconds: number;
      reason: "finished" | "skipped" | "bypassed";
    };
  }
}

export {};
