/**
 * CLAUDE.md Milestone 14's BuildPath analytics. Declared incrementally as
 * each phase ships — Phase 1 only needs the wizard-shell-level events;
 * later phases (feature suggestions, exports, AI opportunities, etc.) add
 * their own events here rather than opening a second analytics file.
 */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    /** Fires once per BuildPath session, the first time the wizard mounts. */
    buildpath_started: { source: string };
    /** Fires whenever the visible wizard stage changes. */
    buildpath_stage_viewed: { stage: string };
    /** Selecting a node in the generated Architecture diagram. */
    buildpath_architecture_node_selected: { node: string };
    /** Toggling an integration category on/off. */
    buildpath_integration_toggled: { category: string; enabled: boolean };
    /** Clicking through from an architecture node to the real Technology Explorer. */
    buildpath_technology_explorer_clicked: { technologySlug: string };
    /** Expanding a phase in the Roadmap accordion. */
    buildpath_roadmap_phase_expanded: { phase: string };
    /** Opening the print-optimized view to export the plan as a PDF. */
    buildpath_pdf_exported: Record<string, never>;
    /** Copying the plain-text summary to the clipboard. */
    buildpath_summary_copied: Record<string, never>;
    /** Sharing or copying the shareable plan link. */
    buildpath_plan_shared: Record<string, never>;
    /** A feature was added to the board — manually, or accepted from an AI suggestion. */
    buildpath_feature_added: { source: "user" | "ai"; priority: string };
    /** An AI feature suggestion was dismissed without adding it. */
    buildpath_ai_suggestion_ignored: Record<string, never>;
    /** The visitor confirmed the (possibly AI-drafted) Problem Definition. */
    buildpath_problem_confirmed: Record<string, never>;
    /** A target user group was added. */
    buildpath_target_user_added: { type: string };
  }
}

export {};
