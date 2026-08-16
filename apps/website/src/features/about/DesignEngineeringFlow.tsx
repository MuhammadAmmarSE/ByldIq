import { ChevronRight, RefreshCw } from "lucide-react";

import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { DesignEngineeringFlowProps } from "./DesignEngineeringFlow.types";

const FLOW_STAGES = [
  "Product Strategy",
  "UX",
  "UI",
  "Design System",
  "Architecture",
  "Engineering",
  "Validation",
];

/**
 * CLAUDE.md Milestone 13 §6's Design + Engineering: a purely illustrative
 * flow (no per-node detail, unlike `CaseStudyArchitecture`'s clickable
 * pipeline — there's nothing project-specific to inspect here) making the
 * spec's central point visible: design isn't handed to engineering as a
 * finished artifact. The loop-back note beneath the row is the point —
 * without it, a left-to-right row of stages reads exactly like the
 * one-way handoff this section explicitly argues against.
 */
export function DesignEngineeringFlow({ className }: DesignEngineeringFlowProps) {
  return (
    <section id="design-engineering" className={cn("space-y-8", className)}>
      <SectionHeader
        eyebrow="Design + Engineering"
        heading="Design isn't handed off. It evolves alongside engineering."
        description="A design that can't be built well isn't a finished design — and an architecture that ignores the experience it serves isn't a finished architecture either."
      />

      <div className="space-y-4">
        <div
          role="list"
          aria-label="Design and engineering workflow"
          className="flex flex-wrap items-center gap-1 overflow-x-auto"
        >
          {FLOW_STAGES.map((stage, index) => (
            <div key={stage} role="listitem" className="flex items-center gap-1">
              <span className="bg-surface-raised text-foreground shrink-0 rounded-md px-3 py-2 text-sm font-medium">
                {stage}
              </span>
              {index < FLOW_STAGES.length - 1 && (
                <Icon icon={ChevronRight} size="sm" className="text-muted shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="border-border bg-surface-raised flex items-start gap-3 rounded-lg border p-4">
          <Icon icon={RefreshCw} size="sm" className="text-accent mt-0.5 shrink-0" />
          <Text variant="body">
            Each stage feeds back into the ones before it — an architecture constraint discovered
            during Engineering can send a flow back to UX, and usability findings from Validation
            regularly change the Design System. The order above is how work starts, not a
            one-directional handoff.
          </Text>
        </div>
      </div>
    </section>
  );
}
