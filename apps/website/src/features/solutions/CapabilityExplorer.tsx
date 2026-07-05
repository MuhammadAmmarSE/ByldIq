"use client";

import { Check, Clock, TriangleAlert } from "lucide-react";

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
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { CapabilityExplorerProps } from "./CapabilityExplorer.types";

/**
 * CLAUDE.md Part 20's Capability Explorer: expandable cards, each
 * answering why/when/benefits/risks/timeline/related technologies. The
 * spec also lists "related case studies" per capability — deliberately
 * not implemented at that granularity, since there are only five
 * (fictional) case studies total and inventing a specific pairing to
 * each of a solution's four capabilities would mean fabricating
 * relevance that isn't real. The solution-wide Related Case Studies
 * section (a later phase) covers this honestly instead.
 */
export function CapabilityExplorer({ solution, className }: CapabilityExplorerProps) {
  const analytics = useAnalytics();

  return (
    <section id="capabilities" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        What this involves
      </Heading>

      <Accordion
        type="single"
        collapsible
        onValueChange={(capability) => {
          if (capability) {
            analytics.track("solution_capability_expanded", { slug: solution.slug, capability });
          }
        }}
      >
        {solution.capabilities.map((capability) => (
          <AccordionItem key={capability.id} value={capability.id}>
            <AccordionTrigger>{capability.title}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Text variant="caption" className="font-medium">
                    Why
                  </Text>
                  <Text variant="body">{capability.why}</Text>
                </div>

                <div className="space-y-1">
                  <Text variant="caption" className="font-medium">
                    When
                  </Text>
                  <Text variant="body">{capability.when}</Text>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Text variant="caption" className="font-medium">
                      Benefits
                    </Text>
                    <ul className="space-y-1.5">
                      {capability.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <Icon icon={Check} size="xs" className="text-accent mt-0.5 shrink-0" />
                          <Text variant="body">{benefit}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <Text variant="caption" className="font-medium">
                      Risks
                    </Text>
                    <ul className="space-y-1.5">
                      {capability.risks.map((risk) => (
                        <li key={risk} className="flex items-start gap-2">
                          <Icon
                            icon={TriangleAlert}
                            size="xs"
                            className="text-warning mt-0.5 shrink-0"
                          />
                          <Text variant="body">{risk}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Icon icon={Clock} size="xs" className="text-muted" />
                  <Text variant="caption">{capability.timeline}</Text>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {capability.relatedTechnologies.map((technology) => (
                    <Badge key={technology} variant="outline">
                      {technology}
                    </Badge>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
