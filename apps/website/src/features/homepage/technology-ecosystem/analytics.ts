/** Technology Ecosystem section analytics events (Milestone 9). */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    technology_ecosystem_category_filtered: { category: string | null };
    technology_ecosystem_card_clicked: { slug: string };
  }
}

export {};
