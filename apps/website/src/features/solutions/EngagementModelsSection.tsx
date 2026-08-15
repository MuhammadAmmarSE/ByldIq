"use client";

import Link from "next/link";

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

import { ENGAGEMENT_MODELS } from "./data/engagement-models";
import { SOLUTIONS } from "./data/solutions";
import type { EngagementModelsSectionProps } from "./EngagementModelsSection.types";

const SOLUTIONS_BY_SLUG = new Map(SOLUTIONS.map((solution) => [solution.slug, solution]));

function ModelList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <Text variant="caption" className="font-medium">
        {title}
      </Text>
      <ul className="space-y-1">
        {items.map((item) => (
          <Text key={item} variant="body" as="li" className="text-sm">
            {item}
          </Text>
        ))}
      </ul>
    </div>
  );
}

/**
 * Milestone 10's Engagement Models section: how an engagement is
 * structured, orthogonal to what's being built (`SOLUTIONS`) and who
 * it's for (`INDUSTRIES`). Card-styled `Accordion` items, same pattern as
 * the homepage's Problem Statement section — five models' worth of
 * best-for/pros/process/team-structure content doesn't fit usefully in a
 * static grid, but expanding one at a time does.
 */
export function EngagementModelsSection({ className }: EngagementModelsSectionProps) {
  const analytics = useAnalytics();

  function handleExpand(value: string) {
    if (value) analytics.track("engagement_model_expanded", { slug: value });
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <Heading variant="h2">How we work together.</Heading>
        <Text variant="subtitle">
          The right delivery model depends on how defined your scope is and how long you need us
          involved — not one size fits all.
        </Text>
      </div>

      <Accordion type="single" collapsible className="space-y-3" onValueChange={handleExpand}>
        {ENGAGEMENT_MODELS.map((model) => {
          const relatedSolution = model.relatedSolutionSlug
            ? SOLUTIONS_BY_SLUG.get(model.relatedSolutionSlug)
            : undefined;

          return (
            <AccordionItem
              key={model.slug}
              value={model.slug}
              className="border-border bg-surface rounded-lg border px-4 shadow-sm"
            >
              <AccordionTrigger>
                <div className="space-y-1 text-left">
                  <Text variant="body" className="font-semibold">
                    {model.label}
                  </Text>
                  <Text variant="caption">{model.description}</Text>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 pb-2 sm:grid-cols-2">
                  <ModelList title="Best for" items={model.bestFor} />
                  <ModelList title="Pros" items={model.pros} />
                  <ModelList title="Process" items={model.process} />
                  <ModelList title="Team structure" items={model.teamStructure} />
                </div>
                {relatedSolution && (
                  <Link
                    href={`/solutions/${relatedSolution.slug}`}
                    className="text-accent mt-2 inline-block text-sm font-medium hover:underline"
                  >
                    See the full {relatedSolution.navLabel} solution →
                  </Link>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
