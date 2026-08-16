"use client";

import { useMemo } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Badge } from "@/components/Badge";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { mockAIProvider } from "./engine";
import { useBuildPathAnswers } from "./useBuildPathAnswers";
import type { RoadmapStageProps } from "./RoadmapStage.types";

function PhaseList({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <Text variant="caption" className="text-muted font-medium">
        {label}
      </Text>
      <ul className="list-inside list-disc space-y-0.5">
        {items.map((item) => (
          <li key={item}>
            <Text variant="body" as="span">
              {item}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** CLAUDE.md Milestone 14 §19's phased Roadmap Builder — six phases, each showing what it delivers and what it depends on. */
export function RoadmapStage({ className }: RoadmapStageProps) {
  const analytics = useAnalytics();
  const answers = useBuildPathAnswers();
  const phases = useMemo(() => mockAIProvider.generateRoadmap(answers), [answers]);

  return (
    <div className={cn("space-y-4", className)}>
      <Text variant="body" className="text-muted">
        A phased path from here to launch and beyond — timelines are ranges, not commitments.
      </Text>

      <Accordion
        type="single"
        collapsible
        defaultValue={`phase-${phases[0]?.phase ?? 1}`}
        onValueChange={(value) => {
          if (value) analytics.track("buildpath_roadmap_phase_expanded", { phase: value });
        }}
      >
        {phases.map((phase) => (
          <AccordionItem key={phase.phase} value={`phase-${phase.phase}`}>
            <AccordionTrigger>
              <span className="flex flex-wrap items-center gap-2">
                <Text variant="body" className="font-medium" as="span">
                  Phase {phase.phase}: {phase.name}
                </Text>
                <Badge variant="outline">{phase.timelineRangeLabel}</Badge>
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              <PhaseList label="Goals" items={phase.goals} />
              <PhaseList label="Features" items={phase.features} />
              <PhaseList label="Engineering work" items={phase.engineeringWork} />
              <PhaseList label="Dependencies" items={phase.dependencies} />
              <PhaseList label="Deliverables" items={phase.deliverables} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
