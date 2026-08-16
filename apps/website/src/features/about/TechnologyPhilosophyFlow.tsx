"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { TechnologyPhilosophyFlowProps } from "./TechnologyPhilosophyFlow.types";

const DECISION_INPUTS = [
  "Business Requirements",
  "Product Constraints",
  "Team Capability",
  "Performance",
  "Scalability",
  "Security",
  "Cost",
];

/**
 * CLAUDE.md Milestone 13 §12's Technology Philosophy — deliberately not a
 * second Technology Explorer. Explains *how* Byld IQ chooses technology
 * (a funnel of real constraints narrowing to one decision) and links out
 * to the real explorer (CLAUDE.md Part 22) for the *what* — every
 * individual technology's trade-offs already live there.
 */
export function TechnologyPhilosophyFlow({ className }: TechnologyPhilosophyFlowProps) {
  const analytics = useAnalytics();

  return (
    <section id="technology-philosophy" className={cn("space-y-8", className)}>
      <SectionHeader
        eyebrow="Technology Philosophy"
        heading="No technology is 'best.' Only appropriate."
        description="Every recommendation starts from the same funnel of constraints — never from which technology is trending."
      />

      <div className="flex flex-col items-center gap-1">
        {DECISION_INPUTS.map((input, index) => (
          <div key={input} className="flex flex-col items-center gap-1">
            <span className="bg-surface-raised text-foreground rounded-md px-4 py-2 text-sm font-medium">
              {input}
            </span>
            {index < DECISION_INPUTS.length - 1 && (
              <Icon icon={ArrowDown} size="sm" className="text-muted" aria-hidden="true" />
            )}
          </div>
        ))}
        <Icon icon={ArrowDown} size="sm" className="text-muted" aria-hidden="true" />
        <span className="bg-accent text-accent-foreground rounded-md px-4 py-2 text-sm font-medium">
          Technology Decision
        </span>
      </div>

      <Text variant="body" className="mx-auto max-w-2xl text-center">
        Every one of these constraints is weighed for the specific product in front of us — a
        decision that fits a five-person startup rarely fits a regulated enterprise, even when the
        underlying problem looks similar.
      </Text>

      <div className="flex justify-center">
        <Button
          asChild
          variant="outline"
          onClick={() => analytics.track("about_technology_explorer_clicked", {})}
        >
          <Link href="/technology">
            Explore Technology Decisions
            <Icon icon={ArrowRight} size="sm" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
