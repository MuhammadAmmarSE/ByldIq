/**
 * CLAUDE.md Part 18's Knowledge Center Platform analytics — declared up
 * front for the whole feature, mirroring Solutions/Case Studies/
 * Technology. Distinct from `features/homepage/knowledge-center-preview`'s
 * own `knowledge_article_clicked`/`knowledge_ai_summary_expanded` events,
 * which track the homepage preview module specifically (same precedent as
 * the homepage's Proof Engine keeping its own `proof_*` events separate
 * from the Case Studies platform's `work_*`/`case_study_*` events after
 * data ownership moved in Milestone 5).
 */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    /** Fires once per article page view — this platform's `article_started`. */
    knowledge_viewed: { slug: string };
    /** Fires once when a visitor's scroll reaches the end of an article. */
    knowledge_article_completed: { slug: string };
    /** Sharing an article via `ShareButton` (Web Share API or copy-link fallback). */
    knowledge_shared: { slug: string };
    /** Choosing "Jump back in" from the reading-resume banner. */
    knowledge_reading_resumed: { slug: string; percent: number };
    /** `/knowledge` landing page: search query entered. */
    knowledge_search: { query: string };
    /** `/knowledge` landing page or category route: a category selected. */
    knowledge_category_selected: { category: string };
    /** `/knowledge` landing page: an article card selected. */
    knowledge_card_clicked: { slug: string };
    /** An article card selected while a search query was active. */
    knowledge_search_result_clicked: { slug: string; query: string; position: number };
    /** Selecting a step in an article's interactive walkthrough. */
    knowledge_walkthrough_step_selected: { slug: string; step: string };
    /** Toggling an article's bookmark state. */
    knowledge_bookmark_toggled: { slug: string; bookmarked: boolean };
    /** Clicking a related technology from an article. */
    knowledge_technology_clicked: { slug: string; technologySlug: string };
    /** Clicking a related solution from an article. */
    knowledge_solution_clicked: { slug: string; solutionSlug: string };
    /** Clicking a related case study from an article. */
    knowledge_case_study_clicked: { slug: string; caseStudySlug: string };
    /** Clicking a related article from an article's "Related Learning" section. */
    knowledge_related_article_clicked: { slug: string; relatedSlug: string };
    /** Selecting the adaptive CTA (hero or final). */
    knowledge_cta_selected: { slug: string | null; cta: string };
    /** Starting BuildPath from an article (prefilled). */
    knowledge_buildpath_started: { slug: string };
    /** Switching the "Ask Byld to summarize" mode on an article. */
    knowledge_summary_mode_selected: { slug: string; mode: string };
    /** Fires once per mount of a playbook's dedicated checklist view (`/knowledge/playbooks/[slug]`). */
    knowledge_playbook_started: { slug: string };
    /** Checking or unchecking a playbook checklist item. */
    knowledge_playbook_item_toggled: { slug: string; itemId: string; checked: boolean };
    /** Fires once per mount of a tutorial's detail view (`/knowledge/tutorials/[slug]`). */
    knowledge_tutorial_started: { slug: string };
    /** Enrolling in a learning path. */
    learning_path_started: { pathSlug: string };
    /** Selecting an article within a learning path. */
    learning_path_step_selected: { pathSlug: string; articleSlug: string };
    /** Fires once when every article in a learning path is marked complete. */
    learning_path_completed: { pathSlug: string };
    /** Subscribing via the Knowledge Center's own newsletter signup. */
    knowledge_newsletter_signup: Record<string, never>;
  }
}

export {};
