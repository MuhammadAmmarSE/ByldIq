import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { CaseStudyChallengesProps } from "./CaseStudyChallenges.types";

/**
 * CLAUDE.md Part 21's Challenges section: unexpected problems and how they
 * were resolved. "Most agencies hide problems. We document them" (Part
 * 21) — visitors trust an honest account of what went wrong more than a
 * story where everything worked on the first try.
 */
export function CaseStudyChallenges({ caseStudy, className }: CaseStudyChallengesProps) {
  return (
    <section id="challenges" className={cn("space-y-4", className)}>
      <Heading variant="h3" as="h2">
        What didn&apos;t go to plan
      </Heading>

      <div className="space-y-4">
        {caseStudy.challenges.map((challenge) => (
          <div
            key={challenge.issue}
            className="border-border bg-surface-raised space-y-3 rounded-lg border p-4"
          >
            <div className="space-y-1">
              <Text variant="caption" className="font-medium">
                What happened
              </Text>
              <Text variant="body">{challenge.issue}</Text>
            </div>
            <div className="space-y-1">
              <Text variant="caption" className="font-medium">
                How we resolved it
              </Text>
              <Text variant="body" className="text-muted">
                {challenge.resolution}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
