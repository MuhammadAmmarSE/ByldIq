"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Icon } from "@/components/Icon";
import { MetricCard } from "@/components/MetricCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { PAIN_POINTS } from "./data/pain-points";
import type { ProblemStatementProps } from "./ProblemStatement.types";

const SOURCE =
  'Source: McKinsey & Company and the University of Oxford, "Delivering large-scale IT projects on time, on budget, and on value" (research on 5,400+ IT projects).';

/**
 * Milestone 9's Problem Statement section: two real, cited industry
 * statistics (never invented ones — see `ProblemStatement.docs.md` for
 * sourcing) plus four well-documented failure patterns, each expandable
 * into how Byld IQ's process addresses it — the section's transition
 * into the solution the rest of the homepage demonstrates.
 */
export function ProblemStatement({ className }: ProblemStatementProps) {
  const analytics = useAnalytics();

  function handleExpand(id: string) {
    const point = PAIN_POINTS.find((candidate) => candidate.id === id);
    if (point) analytics.track("problem_pain_point_expanded", { id: point.id });
  }

  return (
    <div className={cn("space-y-10", className)}>
      <SectionHeader
        eyebrow="The Problem"
        heading="Most software projects don't fail because of bad code."
        description="They fail because of decisions made before a single line was written — the ones nobody stopped to question. Independent research on IT project outcomes keeps finding the same patterns."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <MetricCard value={45} suffix="%" label="Average cost overrun on large IT projects" />
          <Text variant="caption" className="text-muted">
            {SOURCE}
          </Text>
        </div>
        <div className="space-y-2">
          <MetricCard value={56} suffix="%" label="Less value delivered than originally promised" />
          <Text variant="caption" className="text-muted">
            {SOURCE}
          </Text>
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-3" onValueChange={handleExpand}>
        {PAIN_POINTS.map((point) => (
          <AccordionItem
            key={point.id}
            value={point.id}
            className="border-border bg-surface rounded-lg border px-4 shadow-sm"
          >
            <AccordionTrigger>
              <span className="flex items-center gap-3">
                <Icon icon={point.icon} size="sm" className="text-accent shrink-0" />
                {point.title}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <Text variant="body">{point.description}</Text>
              <Text variant="body" className="text-foreground mt-3 font-medium">
                {point.response}
              </Text>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
