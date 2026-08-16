/**
 * CLAUDE.md's Milestone 13 About / Company Experience analytics — declared
 * up front for the whole feature, the same convention Solutions and Case
 * Studies use. Naming mirrors those two platforms' events
 * (`{feature}_viewed`, `{feature}_cta_selected`, `{feature}_buildpath_started`,
 * `{feature}_section_viewed`) rather than the spec's flatter names
 * (`about_view`, `cta_click`, `buildpath_click`) so events stay
 * distinguishable in one shared analytics stream, consistent with every
 * other platform in this codebase. "AI open" isn't a separate event here
 * either, for the same reason Solutions doesn't duplicate it: the AI
 * Companion's own events already cover that, and this page only needs to
 * record that its "Talk to Byld" CTA was the one that opened it — captured
 * by `about_cta_selected` with `cta: "ai"`.
 */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    /** Fires once per About page view. */
    about_viewed: Record<string, never>;
    /** The sidebar's active section changed (desktop only — see `AboutSidebar`). */
    about_section_viewed: { section: string };
    /** Selecting a philosophy principle card. */
    about_philosophy_interaction: { principle: string };
    /** Selecting a stage in the Byld IQ Approach timeline. */
    about_approach_stage_viewed: { stage: string };
    /** Expanding an engineering standards principle. */
    about_engineering_principle_viewed: { principle: string };
    /** Selecting a team member (no-op safe today — see `TeamSection`). */
    about_team_member_viewed: { member: string };
    /** Clicking through to the real Technology Explorer. */
    about_technology_explorer_clicked: Record<string, never>;
    /** Clicking a case study from the Ecosystem section. */
    about_case_study_clicked: { slug: string };
    /** Clicking through to the Knowledge Center. */
    about_knowledge_clicked: Record<string, never>;
    /** Selecting an adaptive CTA (hero or final). */
    about_cta_selected: { cta: string };
    /** Starting BuildPath from the About page. */
    about_buildpath_started: Record<string, never>;
  }
}

export {};
