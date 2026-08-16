import type { BuildPathStage } from "../types";

export interface ProgressGroup {
  index: number;
  label: string;
  stages: BuildPathStage[];
}

/**
 * CLAUDE.md Milestone 14 §33's Progress System calls for "7 shown stages."
 * The store tracks all 10 `BuildPathStage`s individually (finer-grained
 * routing and validation), but Architecture/Technology/AI Opportunities
 * share one visible step, as do Roadmap/Effort — visitors care about
 * "we're figuring out how to build this" and "here's the plan," not the
 * internal stage count.
 */
const IDEA_GROUP: ProgressGroup = { index: 1, label: "Idea", stages: ["idea"] };

export const PROGRESS_GROUPS: ProgressGroup[] = [
  IDEA_GROUP,
  { index: 2, label: "Discovery", stages: ["discovery"] },
  { index: 3, label: "Product", stages: ["product"] },
  { index: 4, label: "Prioritization", stages: ["prioritization"] },
  {
    index: 5,
    label: "Architecture & Technology",
    stages: ["architecture", "technology", "ai-opportunities"],
  },
  { index: 6, label: "Roadmap & Investment", stages: ["roadmap", "effort"] },
  { index: 7, label: "Your Plan", stages: ["summary"] },
];

export function groupForStage(stage: BuildPathStage): ProgressGroup {
  return PROGRESS_GROUPS.find((group) => group.stages.includes(stage)) ?? IDEA_GROUP;
}

export const STAGE_TITLES: Record<BuildPathStage, string> = {
  idea: "Let's start with your idea",
  discovery: "Tell Byld more",
  product: "Product definition",
  prioritization: "Feature prioritization",
  architecture: "Architecture",
  technology: "Technology recommendations",
  "ai-opportunities": "AI opportunities",
  roadmap: "Roadmap",
  effort: "Estimated effort",
  summary: "Your plan",
};
