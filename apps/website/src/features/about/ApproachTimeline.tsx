"use client";

import { useState } from "react";

import { SectionHeader } from "@/components/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { ApproachStagePanel } from "./ApproachStagePanel";
import { APPROACH_STAGES, type ApproachStage } from "./data/approach-stages";
import type { ApproachTimelineProps } from "./ApproachTimeline.types";

function requireFirstStage(): ApproachStage {
  const [first] = APPROACH_STAGES;
  if (!first) throw new Error("APPROACH_STAGES must not be empty");
  return first;
}

const firstStage = requireFirstStage();

/**
 * CLAUDE.md Milestone 13 §4's "The Byld IQ Approach": nine interactive
 * stages, Tabs-based — the same primitive (and the same reasoning: arrow-
 * key navigation and a horizontally scrollable trigger strip cover
 * desktop and mobile without a carousel dependency) the homepage's
 * `ProductThinkingTimeline` uses, with fresh content for what a real
 * client engagement looks like stage by stage (see `data/approach-stages.ts`).
 */
export function ApproachTimeline({ className }: ApproachTimelineProps) {
  const [activeStage, setActiveStage] = useState(firstStage.id);
  const analytics = useAnalytics();

  function handleChange(stageId: string) {
    setActiveStage(stageId);
    analytics.track("about_approach_stage_viewed", { stage: stageId });
  }

  return (
    <section id="approach" className={cn("space-y-10", className)}>
      <SectionHeader
        eyebrow="The Byld IQ Approach"
        heading="How we work, stage by stage."
        description="Nine stages, from the first conversation to a product that keeps evolving after launch — each with its own participants, decisions, and definition of success."
      />

      <Tabs value={activeStage} onValueChange={handleChange}>
        <TabsList
          aria-label="Byld IQ approach stages"
          className="w-full flex-nowrap overflow-x-auto border-b-0"
        >
          {APPROACH_STAGES.map((stage, index) => (
            <TabsTrigger key={stage.id} value={stage.id} className="shrink-0">
              <span className="text-muted mr-2 font-mono text-xs" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {stage.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {APPROACH_STAGES.map((stage) => (
          <TabsContent key={stage.id} value={stage.id} className="pt-8">
            <ApproachStagePanel stage={stage} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
