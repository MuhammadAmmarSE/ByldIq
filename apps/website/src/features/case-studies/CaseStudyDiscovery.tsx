import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { CaseStudyDiscoveryProps } from "./CaseStudyDiscovery.types";

/**
 * CLAUDE.md Part 21's Discovery section: the research and stakeholder work
 * behind the eventual strategy, shown as a card grid rather than a text
 * list to visually separate it from the surrounding paragraph-only
 * sections (CLAUDE.md Part 5: "cards communicate grouping").
 */
export function CaseStudyDiscovery({ caseStudy, className }: CaseStudyDiscoveryProps) {
  return (
    <section id="discovery" className={cn("space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Getting to know the problem
      </Heading>
      <div className="grid gap-4 sm:grid-cols-2">
        {caseStudy.discovery.map((activity) => (
          <div
            key={activity.title}
            className="border-border bg-surface-raised space-y-1.5 rounded-lg border p-4"
          >
            <Heading variant="h6" as="h3">
              {activity.title}
            </Heading>
            <Text variant="body" className="text-muted">
              {activity.description}
            </Text>
          </div>
        ))}
      </div>
    </section>
  );
}
