import { Alert } from "@/components/Alert";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { StagePanelProps } from "./StagePanel.types";

/**
 * The Product Thinking Timeline's side panel (CLAUDE.md Part 12): overview,
 * a common mistake, Byld IQ's approach, deliverables, and recommended
 * technologies for the active stage.
 */
export function StagePanel({ stage, className }: StagePanelProps) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]", className)}>
      <div className="space-y-4">
        <Heading variant="h3">{stage.headline}</Heading>
        <Text variant="subtitle">{stage.description}</Text>
        <Text variant="body">{stage.overview}</Text>

        {/* `info`, not `warning` — this is educational copy, not an urgent
            warning about the visitor's own action, and `warning`'s
            `role="alert"` would assertively interrupt screen readers on
            every tab switch. */}
        <Alert variant="info" title="A common mistake at this stage">
          {stage.commonMistake}
        </Alert>

        <div className="border-border bg-surface-raised rounded-lg border p-4">
          <Text variant="caption" className="font-medium">
            Our approach
          </Text>
          <Text variant="body" className="mt-1">
            {stage.approach}
          </Text>
        </div>

        <div className="pt-2">
          <Button asChild variant="outline">
            <a href="#buildpath-preview">See how this fits your roadmap</a>
          </Button>
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

        {stage.technologies.length > 0 && (
          <div>
            <Text variant="caption" className="font-medium">
              Related technologies
            </Text>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {stage.technologies.map((technology) => (
                <Badge key={technology} variant="outline">
                  {technology}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
