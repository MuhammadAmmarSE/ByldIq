"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { CaseStudyEngineeringProcessProps } from "./CaseStudyEngineeringProcess.types";

/**
 * CLAUDE.md Part 21's Engineering Process section: the Research →
 * Architecture → Design → Development → Testing → Deployment →
 * Optimization stages this specific project went through, "each stage
 * expandable" per the spec — an Accordion rather than the
 * select-one-at-a-time button row `CaseStudyArchitecture` uses, since the
 * spec's own wording ("expandable") describes disclosure, not selection
 * among alternatives.
 */
export function CaseStudyEngineeringProcess({
  caseStudy,
  className,
}: CaseStudyEngineeringProcessProps) {
  const analytics = useAnalytics();

  return (
    <section id="engineering-process" className={cn("space-y-4", className)}>
      <Heading variant="h3" as="h2">
        How we built it
      </Heading>

      <Accordion
        type="single"
        collapsible
        onValueChange={(stage) => {
          if (stage) {
            analytics.track("case_study_engineering_stage_selected", {
              slug: caseStudy.slug,
              stage,
            });
          }
        }}
      >
        {caseStudy.engineeringProcess.map((stage, index) => (
          <AccordionItem key={stage.id} value={stage.id}>
            <AccordionTrigger>
              <span className="text-muted mr-2 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              {stage.label}
            </AccordionTrigger>
            <AccordionContent>
              <Text variant="body">{stage.description}</Text>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
