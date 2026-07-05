/**
 * CLAUDE.md Part 21's Case Studies Platform analytics — declared up front
 * for the whole feature, mirroring the Solutions Platform's approach.
 * "AI questions" is covered by the AI Companion's own events
 * (`features/homepage/ai-companion/analytics.ts`); case study pages only
 * need to record that context. "Scroll depth" reuses the homepage's
 * existing `scroll_depth_reached` event — every `/work` route mounts the
 * shared `ScrollDepthTracker` (see `features/homepage/shared`) rather than
 * duplicating that infrastructure here. "Time on page" has no tracker
 * anywhere in the codebase yet (not even on the homepage) — it isn't
 * fabricated here; it should land as its own generic addition to
 * `features/homepage/shared` when a real need for it is scoped, not as
 * one-off case-study-only code.
 */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    /** `/work` landing page: search query entered. */
    work_search: { query: string };
    /** `/work` landing page: a filter facet changed. */
    work_filter_changed: { facet: string; value: string | null };
    /** `/work` landing page: a project card selected. */
    work_project_clicked: { slug: string };
    /** Fires once per case study page view. */
    case_study_viewed: { slug: string };
    /** Selecting a node in the case study's Architecture Explorer. */
    case_study_architecture_node_selected: { slug: string; node: string };
    /** Selecting a technology in the case study's Technology Decisions explorer. */
    case_study_technology_clicked: { slug: string; technology: string };
    /** Selecting a stage in the Engineering Process timeline. */
    case_study_engineering_stage_selected: { slug: string; stage: string };
    /** Expanding an FAQ item. */
    case_study_faq_expanded: { slug: string; question: string };
    /** Clicking a related solution. */
    case_study_solution_clicked: { slug: string; solutionSlug: string };
    /** Clicking a related knowledge article. */
    case_study_article_clicked: { slug: string; articleSlug: string };
    /** Selecting the adaptive CTA (hero or final). */
    case_study_cta_selected: { slug: string; cta: string };
    /** Starting BuildPath from a case study (prefilled). */
    case_study_buildpath_started: { slug: string };
  }
}

export {};
