export interface BuildPathGoal {
  id: string;
  label: string;
  recommendation: string;
}

/** CLAUDE.md Part 17 Stage 2's business-goal options, with a one-line Phase 1 recommendation for the preview's live-updating roadmap. */
export const BUILDPATH_GOALS: BuildPathGoal[] = [
  {
    id: "launch-startup",
    label: "Launch a startup",
    recommendation:
      "Phase 1 would focus on validating your core hypothesis with a tightly scoped MVP.",
  },
  {
    id: "modernize",
    label: "Modernize an existing platform",
    recommendation: "Phase 1 would focus on a safe, incremental migration plan with zero downtime.",
  },
  {
    id: "improve-commerce",
    label: "Improve commerce performance",
    recommendation: "Phase 1 would focus on a checkout and conversion audit before any rebuild.",
  },
  {
    id: "build-ai",
    label: "Build an AI product",
    recommendation:
      "Phase 1 would focus on identifying the one workflow AI can meaningfully improve.",
  },
  {
    id: "automate",
    label: "Automate a workflow",
    recommendation:
      "Phase 1 would focus on mapping the manual process before automating any of it.",
  },
];
