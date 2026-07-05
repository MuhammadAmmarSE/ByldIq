import { Timeline } from "@/components/Timeline";
import { cn } from "@/utils/cn";

import { BUILDPATH_GOALS } from "./data/goals";
import type { RoadmapPreviewProps } from "./RoadmapPreview.types";

const DEFAULT_PHASE_ONE_DESCRIPTION = "Choose a goal above to see how Phase 1 would adapt to it.";

/** CLAUDE.md Part 17's phased roadmap (Research -> MVP -> Growth -> Scale -> Optimization), reused from the design system's `Timeline`. */
export function RoadmapPreview({ selectedGoalId, className }: RoadmapPreviewProps) {
  const selectedGoal = BUILDPATH_GOALS.find((goal) => goal.id === selectedGoalId);

  return (
    <Timeline
      className={cn(className)}
      items={[
        {
          title: "Phase 1 — Research",
          description: selectedGoal?.recommendation ?? DEFAULT_PHASE_ONE_DESCRIPTION,
          status: "current",
        },
        { title: "Phase 2 — MVP", status: "upcoming" },
        { title: "Phase 3 — Growth", status: "upcoming" },
        { title: "Phase 4 — Scale", status: "upcoming" },
        { title: "Phase 5 — Optimization", status: "upcoming" },
      ]}
    />
  );
}
