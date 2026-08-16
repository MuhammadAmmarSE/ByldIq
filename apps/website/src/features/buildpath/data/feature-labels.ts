import type { FeatureComplexity, FeaturePriority } from "../types";

/** CLAUDE.md Milestone 14 §10's MVP / V1 / Future classification, mapped onto the real `FeaturePriority` values rather than a lossy 3-way regrouping. */
export const PRIORITY_LABELS: Record<FeaturePriority, string> = {
  must: "MVP — Must have",
  should: "V1 — Should have",
  could: "Later — Could have",
  future: "Future — Not now",
};

export const PRIORITY_OPTIONS = (Object.keys(PRIORITY_LABELS) as FeaturePriority[]).map(
  (priority) => ({ value: priority, label: PRIORITY_LABELS[priority] }),
);

export const COMPLEXITY_LABELS: Record<FeatureComplexity, string> = {
  low: "Low complexity",
  medium: "Medium complexity",
  high: "High complexity",
};

export const COMPLEXITY_OPTIONS = (Object.keys(COMPLEXITY_LABELS) as FeatureComplexity[]).map(
  (complexity) => ({ value: complexity, label: COMPLEXITY_LABELS[complexity] }),
);
