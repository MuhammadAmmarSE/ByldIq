import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { cn } from "@/utils/cn";

import { BUILDPATH_GOALS } from "./data/goals";
import type { QuestionnaireTasteProps } from "./QuestionnaireTaste.types";

/**
 * A real (if small) taste of the BuildPath questionnaire (CLAUDE.md Part
 * 17 Stage 2) — one working multiple-choice question whose answer updates
 * the roadmap preview live, then hands off to the real BuildPath product.
 */
export function QuestionnaireTaste({
  selectedGoalId,
  onSelectGoal,
  className,
}: QuestionnaireTasteProps) {
  return (
    <div className={cn(className)}>
      <Heading variant="h5" as="h3" className="mb-3">
        What are you trying to achieve?
      </Heading>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="What are you trying to achieve?"
      >
        {BUILDPATH_GOALS.map((goal) => (
          <Button
            key={goal.id}
            size="sm"
            variant={selectedGoalId === goal.id ? "primary" : "outline"}
            aria-pressed={selectedGoalId === goal.id}
            onClick={() => onSelectGoal(goal.id)}
          >
            {goal.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
