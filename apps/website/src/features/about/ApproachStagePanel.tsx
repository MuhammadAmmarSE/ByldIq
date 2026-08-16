import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { ApproachStagePanelProps } from "./ApproachStagePanel.types";

/**
 * The Byld IQ Approach timeline's side panel (CLAUDE.md Milestone 13
 * §4): what happens, who participates, typical decisions, how AI
 * assists, and what success looks like for the active stage — plus its
 * deliverables in a second column, the same two-column shape
 * `StagePanel` (homepage's Product Thinking Timeline) uses.
 */
export function ApproachStagePanel({ stage, className }: ApproachStagePanelProps) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]", className)}>
      <div className="space-y-4">
        <Heading variant="h3">{stage.headline}</Heading>
        <Text variant="body">{stage.whatHappens}</Text>

        <div className="border-border bg-surface-raised rounded-lg border p-4">
          <Text variant="caption" className="font-medium">
            Who participates
          </Text>
          <Text variant="body" className="mt-1">
            {stage.whoParticipates}
          </Text>
        </div>

        <div className="border-border bg-surface-raised rounded-lg border p-4">
          <Text variant="caption" className="font-medium">
            Typical decisions
          </Text>
          <Text variant="body" className="mt-1">
            {stage.typicalDecisions}
          </Text>
        </div>

        <div className="border-border bg-surface-raised rounded-lg border p-4">
          <Text variant="caption" className="font-medium">
            How AI assists
          </Text>
          <Text variant="body" className="mt-1">
            {stage.howAiAssists}
          </Text>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Text variant="caption" className="font-medium">
            Deliverables
          </Text>
          <ul className="mt-2 space-y-1.5">
            {stage.deliverables.map((deliverable) => (
              <li key={deliverable} className="text-foreground text-sm">
                {deliverable}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Text variant="caption" className="font-medium">
            What success looks like
          </Text>
          <Text variant="body" className="mt-2">
            {stage.successLooksLike}
          </Text>
        </div>
      </div>
    </div>
  );
}
