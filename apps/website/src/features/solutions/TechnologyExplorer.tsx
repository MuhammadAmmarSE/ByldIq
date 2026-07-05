"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Badge } from "@/components/Badge";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { TechnologyExplorerProps } from "./TechnologyExplorer.types";

/**
 * CLAUDE.md Part 20's Technology Explorer: explains why each technology was
 * chosen for this solution rather than just naming it — strengths, fit,
 * trade-offs, alternatives, cost and scaling implications, all before any
 * mention of the technology itself carries weight on its own ("technology
 * is never 'best', only appropriate or inappropriate for a specific
 * problem", Part 22).
 */
export function TechnologyExplorer({ solution, className }: TechnologyExplorerProps) {
  const analytics = useAnalytics();

  return (
    <section id="technology" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Why these technologies
      </Heading>

      <Accordion
        type="single"
        collapsible
        onValueChange={(technology) => {
          if (technology) {
            analytics.track("solution_technology_selected", { slug: solution.slug, technology });
          }
        }}
      >
        {solution.technologies.map((technology) => (
          <AccordionItem key={technology.id} value={technology.id}>
            <AccordionTrigger>{technology.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Text variant="caption" className="font-medium">
                    Why
                  </Text>
                  <Text variant="body">{technology.why}</Text>
                </div>

                <div className="space-y-1">
                  <Text variant="caption" className="font-medium">
                    When
                  </Text>
                  <Text variant="body">{technology.when}</Text>
                </div>

                <div className="space-y-1">
                  <Text variant="caption" className="font-medium">
                    Trade-offs
                  </Text>
                  <Text variant="body">{technology.tradeoffs}</Text>
                </div>

                <div className="space-y-1.5">
                  <Text variant="caption" className="font-medium">
                    Alternatives considered
                  </Text>
                  <div className="flex flex-wrap gap-1.5">
                    {technology.alternatives.map((alternative) => (
                      <Badge key={alternative} variant="outline">
                        {alternative}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1">
                    <Text variant="caption" className="font-medium">
                      Cost
                    </Text>
                    <Text variant="body">{technology.cost}</Text>
                  </div>
                  <div className="space-y-1">
                    <Text variant="caption" className="font-medium">
                      Scalability
                    </Text>
                    <Text variant="body">{technology.scalability}</Text>
                  </div>
                  <div className="space-y-1">
                    <Text variant="caption" className="font-medium">
                      Team requirements
                    </Text>
                    <Text variant="body">{technology.teamRequirements}</Text>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
