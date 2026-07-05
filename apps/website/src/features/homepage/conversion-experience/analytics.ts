/** Final CTA / Conversion Experience analytics events (CLAUDE.md Part 19). */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    conversion_decision_selected: { decision: string; wasRecommended: boolean };
    conversion_calendar_slot_selected: { slot: string };
    conversion_newsletter_submitted: Record<string, never>;
    conversion_faq_expanded: { question: string };
  }
}

export {};
