"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Badge } from "@/components/Badge";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { TECHNOLOGIES } from "@/features/technology/data/technologies";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";
import { slugify } from "@/utils/slugify";

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
 *
 * Milestone 11: cross-links to the real Technology Explorer
 * (`/technology/[slug]`, CLAUDE.md Part 22) where this project's
 * technology also has a general, non-project-specific writeup. Only 9 of
 * the technologies named across all case studies are in that platform's
 * 11-technology roster — `TECHNOLOGY_EXPLORER_SLUGS` looks up a real
 * match rather than guessing, so a technology without one (e.g.
 * "Backstage", "Klaviyo") never gets a dead link. Imports `TECHNOLOGIES`
 * from the technology feature's leaf data file, not its barrel — the
 * barrel also exports `TechnologyRelatedCaseStudies`, which imports back
 * from this feature's own barrel, and going through both barrels here
 * would create a circular module dependency (CLAUDE.md Part 24: "Never
 * create circular dependencies"), the same reasoning
 * `CaseStudyRelatedSolutions` already applies to `@/features/solutions`.
 */
const TECHNOLOGY_EXPLORER_SLUGS = new Map(
  TECHNOLOGIES.map((technology) => [slugify(technology.name), technology.slug]),
);

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
        {caseStudy.technologyDecisions.map((technology) => {
          const explorerSlug = TECHNOLOGY_EXPLORER_SLUGS.get(slugify(technology.name));

          return (
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

                  {explorerSlug && (
                    <Link
                      href={`/technology/${explorerSlug}`}
                      onClick={() =>
                        analytics.track("case_study_technology_explorer_clicked", {
                          slug: caseStudy.slug,
                          technology: technology.id,
                          technologySlug: explorerSlug,
                        })
                      }
                      className="text-accent hover:text-accent/80 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
                    >
                      More on {technology.name} in the Technology Explorer
                      <Icon icon={ArrowRight} size="xs" />
                    </Link>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
