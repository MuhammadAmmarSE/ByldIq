"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Heading } from "@/components/Heading";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { ENGINEERING_PRACTICES } from "./data/practices";
import type { EngineeringExcellenceEngineProps } from "./EngineeringExcellenceEngine.types";
import { PipelineVisualizer } from "./PipelineVisualizer";

/**
 * CLAUDE.md Part 15's Engineering Excellence Engine, consolidated into a
 * pipeline visualizer plus five expandable practice categories (see
 * `data/practices.ts` for the scope-reduction rationale). Every claim here
 * describes this repository's actual practices — this section is about
 * Byld IQ's own engineering, not a fictional client demo.
 */
export function EngineeringExcellenceEngine({ className }: EngineeringExcellenceEngineProps) {
  const analytics = useAnalytics();

  return (
    <div className={cn("space-y-10", className)}>
      {/* Headline option from CLAUDE.md Part 15. */}
      <Heading variant="h2">Engineering Built For Scale.</Heading>

      <div>
        <Heading variant="h4" as="h3" className="mb-4">
          Every change follows the same pipeline
        </Heading>
        <PipelineVisualizer
          onStageSelect={(stage) =>
            analytics.track("engineering_pipeline_stage_selected", { stage })
          }
        />
      </div>

      <Accordion
        type="single"
        collapsible
        onValueChange={(practice) => {
          if (practice) analytics.track("engineering_practice_expanded", { practice });
        }}
      >
        {ENGINEERING_PRACTICES.map((practice) => (
          <AccordionItem key={practice.id} value={practice.id}>
            <AccordionTrigger>{practice.title}</AccordionTrigger>
            <AccordionContent>
              <p className="text-foreground mb-3">{practice.summary}</p>
              <ul className="list-disc space-y-1.5 pl-5">
                {practice.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
