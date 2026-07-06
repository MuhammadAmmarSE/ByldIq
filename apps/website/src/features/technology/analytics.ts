/**
 * CLAUDE.md Part 22's Technology Explorer analytics — declared up front for
 * the whole feature, mirroring the Solutions and Case Studies platforms.
 * "AI" is covered by the AI Companion's own events
 * (`features/homepage/ai-companion/analytics.ts`); technology pages only
 * need to record that context.
 */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    /** Fires once per technology detail page view. */
    technology_viewed: { slug: string };
    /** `/technology` landing page: search query entered. */
    technology_search: { query: string };
    /** `/technology` landing page or category route: a category selected. */
    technology_category_selected: { category: string };
    /** `/technology` landing page: a technology card selected. */
    technology_card_clicked: { slug: string };
    /** `/technology/compare`: a comparison pair viewed. */
    technology_comparison_viewed: { slugs: string[] };
    /** Selecting a node in a technology's Architecture Explorer. */
    technology_architecture_node_selected: { slug: string; node: string };
    /** Expanding a Trade-Off Explorer section (bestFor/avoidWhen/alternatives). */
    technology_trade_off_expanded: { slug: string; section: string };
    /** `/technology/decision-framework`: a wizard question answered. */
    decision_wizard_answered: { question: string; answer: string };
    /** `/technology/decision-framework`: the wizard produced a recommendation. */
    decision_wizard_completed: { recommendedSlugs: string[] };
    /** Expanding an FAQ item. */
    technology_faq_expanded: { slug: string; question: string };
    /** Clicking a related solution. */
    technology_solution_clicked: { slug: string; solutionSlug: string };
    /** Clicking a related case study. */
    technology_case_study_clicked: { slug: string; caseStudySlug: string };
    /** Clicking a related knowledge article. */
    technology_article_clicked: { slug: string; articleSlug: string };
    /** Selecting the adaptive CTA (hero or final). */
    technology_cta_selected: { slug: string | null; cta: string };
    /** Starting BuildPath from a technology page (prefilled). */
    technology_buildpath_started: { slug: string };
  }
}

export {};
