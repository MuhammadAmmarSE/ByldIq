import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { CaseStudyProductThinkingProps } from "./CaseStudyProductThinking.types";

/**
 * CLAUDE.md Part 21's Product Thinking section: the decisions made, why
 * they were made, and what each cost — plus what was deliberately left
 * out. Trade-offs are shown alongside every decision, not hidden in a
 * separate section, since CLAUDE.md Part 3 treats honest trade-offs as
 * part of the story itself, not a caveat.
 */
export function CaseStudyProductThinking({ caseStudy, className }: CaseStudyProductThinkingProps) {
  return (
    <section id="product-thinking" className={cn("space-y-6", className)}>
      <Heading variant="h3" as="h2">
        How we thought about the product
      </Heading>

      <div className="space-y-4">
        {caseStudy.productDecisions.map((decision) => (
          <div
            key={decision.decision}
            className="border-border bg-surface-raised space-y-3 rounded-lg border p-4"
          >
            <Text variant="body" className="font-medium">
              {decision.decision}
            </Text>
            <div className="space-y-1">
              <Text variant="caption" className="font-medium">
                Reasoning
              </Text>
              <Text variant="body" className="text-muted">
                {decision.reasoning}
              </Text>
            </div>
            <div className="space-y-1">
              <Text variant="caption" className="font-medium">
                Trade-off
              </Text>
              <Text variant="body" className="text-muted">
                {decision.tradeoff}
              </Text>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Heading variant="h6" as="h3">
          What we deliberately left out
        </Heading>
        <ul className="space-y-1.5">
          {caseStudy.rejectedIdeas.map((idea) => (
            <li key={idea} className="text-muted text-sm">
              {idea}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
