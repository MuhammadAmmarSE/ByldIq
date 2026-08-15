"use client";

import { motion } from "motion/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { staggerContainer, staggerItemTransformOnly } from "@/lib/motion-variants";
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
 *
 * Milestone 12: stages reveal sequentially on scroll into view (CLAUDE.md
 * Part 12: "timeline sequential reveal") via `staggerItemTransformOnly`,
 * not the usual fade-based `staggerItem` — each trigger's numeral badge
 * uses `text-muted`, the same marginal-contrast token whose opacity-fade
 * entrance produced a real axe `color-contrast` failure in `ProjectGrid`.
 * Moving on `y` alone, with opacity always at its final value, avoids that
 * failure mode entirely. Each item is wrapped in its own `motion.div`
 * rather than animated on `AccordionItem` directly, since Radix's
 * `AccordionItem` doesn't forward arbitrary style/animation props.
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
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {caseStudy.engineeringProcess.map((stage, index) => (
            <motion.div key={stage.id} variants={staggerItemTransformOnly}>
              <AccordionItem value={stage.id}>
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
            </motion.div>
          ))}
        </motion.div>
      </Accordion>
    </section>
  );
}
