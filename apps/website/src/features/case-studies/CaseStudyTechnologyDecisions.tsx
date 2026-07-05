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

import type { CaseStudyTechnologyDecisionsProps } from "./CaseStudyTechnologyDecisions.types";

/**
 * CLAUDE.md Part 21's Technology Decisions section: why each technology
 * was chosen for this specific project — not just naming the stack, since
 * "technology is never 'best', only appropriate or inappropriate for a
 * specific problem" (Part 22). Same Accordion pattern as the Solutions
 * Platform's `TechnologyExplorer`, extended with `businessImpact` and
 * `maintenanceConsiderations` — fields a case study needs that a general
 * solution page doesn't, since a case study is judging one real decision
 * in hindsight rather than describing a reusable capability.
 */
export function CaseStudyTechnologyDecisions({
  caseStudy,
  className,
}: CaseStudyTechnologyDecisionsProps) {
  const analytics = useAnalytics();

  return (
    <section id="technology-decisions" className={cn("space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Why these technologies
      </Heading>

      <Accordion
        type="single"
        collapsible
        onValueChange={(technology) => {
          if (technology) {
            analytics.track("case_study_technology_clicked", {
              slug: caseStudy.slug,
              technology,
            });
          }
        }}
      >
        {caseStudy.technologyDecisions.map((technology) => (
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Text variant="caption" className="font-medium">
                      Business impact
                    </Text>
                    <Text variant="body">{technology.businessImpact}</Text>
                  </div>
                  <div className="space-y-1">
                    <Text variant="caption" className="font-medium">
                      Maintenance considerations
                    </Text>
                    <Text variant="body">{technology.maintenanceConsiderations}</Text>
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
