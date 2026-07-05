"use client";

import { useState } from "react";

import { Heading } from "@/components/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { TIMELINE_STAGES, type TimelineStageDefinition } from "./data/stages";
import type { ProductThinkingTimelineProps } from "./ProductThinkingTimeline.types";
import { StagePanel } from "./StagePanel";

function requireFirstStage(): TimelineStageDefinition {
  const [first] = TIMELINE_STAGES;
  if (!first) throw new Error("TIMELINE_STAGES must not be empty");
  return first;
}

const firstStage = requireFirstStage();

/**
 * CLAUDE.md Part 12's ten-stage Product Thinking Experience. Built on the
 * design system's `Tabs` (Radix) rather than a bespoke stepper — arrow-key
 * navigation between stages and the selector/content pairing both come from
 * the primitive, and the horizontally scrollable trigger strip doubles as
 * the "swipeable on mobile" requirement without a carousel dependency.
 */
export function ProductThinkingTimeline({ className }: ProductThinkingTimelineProps) {
  const [activeStage, setActiveStage] = useState(firstStage.id);
  const analytics = useAnalytics();

  function handleChange(stageId: string) {
    setActiveStage(stageId);
    analytics.track("timeline_stage_viewed", { stage: stageId });
  }

  return (
    <div className={cn(className)}>
      {/* Verbatim from CLAUDE.md Part 12's Core Message. */}
      <Heading variant="h2" className="mb-8">
        Great products are not coded. They are engineered.
      </Heading>

      <Tabs value={activeStage} onValueChange={handleChange}>
        <TabsList
          aria-label="Product thinking stages"
          className="w-full flex-nowrap overflow-x-auto border-b-0"
        >
          {TIMELINE_STAGES.map((stage, index) => (
            <TabsTrigger key={stage.id} value={stage.id} className="shrink-0">
              <span className="text-muted mr-2 font-mono text-xs" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {stage.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {TIMELINE_STAGES.map((stage) => (
          <TabsContent key={stage.id} value={stage.id} className="pt-8">
            <StagePanel stage={stage} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
