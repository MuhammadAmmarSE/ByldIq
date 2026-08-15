/**
 * CLAUDE.md Part 20's Solutions Platform analytics — declared up front for
 * the whole feature (rather than incrementally per phase) since the
 * tracking list is specified as one set: "Solution views, Capability
 * interactions, Architecture exploration, Technology clicks, AI usage,
 * BuildPath starts, Case study clicks, Knowledge engagement, CTA
 * conversions." AI usage itself is covered by the AI Companion's own
 * events (`features/homepage/ai-companion/analytics.ts`); solution pages
 * only need to record that context.
 */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    /** Fires once per solution page view. */
    solution_viewed: { slug: string };
    /** Landing page: hovering a solution selector card. */
    solution_card_hovered: { slug: string };
    /** Landing page: selecting a solution card. */
    solution_card_selected: { slug: string };
    /** Expanding a capability in the Capability Explorer. */
    solution_capability_expanded: { slug: string; capability: string };
    /** Selecting a node in the Architecture Explorer. */
    solution_architecture_node_selected: { slug: string; node: string };
    /** Selecting a technology in the Technology Explorer. */
    solution_technology_selected: { slug: string; technology: string };
    /** Selecting a stage in the Delivery Framework timeline. */
    solution_delivery_stage_selected: { slug: string; stage: string };
    /** Clicking a related case study. */
    solution_case_study_clicked: { slug: string; caseStudySlug: string };
    /** Clicking a related knowledge article. */
    solution_article_clicked: { slug: string; articleSlug: string };
    /** Expanding an FAQ item. */
    solution_faq_expanded: { slug: string; question: string };
    /** Selecting the final adaptive CTA. */
    solution_cta_selected: { slug: string; cta: string };
    /** Starting BuildPath from a solution page (prefilled). */
    solution_buildpath_started: { slug: string };
    /** Milestone 10: selecting an industry card on the Solutions landing page. */
    industry_card_clicked: { slug: string };
    /** Milestone 10: selecting a recommended solution from an industry detail page. */
    industry_solution_clicked: { industrySlug: string; solutionSlug: string };
    /** Milestone 10: expanding an engagement model's details. */
    engagement_model_expanded: { slug: string };
    /** Milestone 10: the compared solution pair changed. */
    solution_comparison_viewed: { slugs: [string, string] };
  }
}

export {};
