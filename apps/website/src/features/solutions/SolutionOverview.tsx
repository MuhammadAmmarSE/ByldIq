import { Check } from "lucide-react";

import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { SolutionOverviewProps } from "./SolutionOverview.types";

/**
 * CLAUDE.md Part 20's Business Problem, Business Outcomes, and Engineering
 * Philosophy sections — grouped in one component since none carry their
 * own interactivity, but each keeps a stable `id` for the in-page
 * navigation a later phase adds (sticky sidebar + scrollspy).
 *
 * Order matters: the customer's problem always comes before Byld IQ's
 * approach to it (CLAUDE.md Part 20: "Start with the customer's pain.
 * Never begin by talking about Byld IQ").
 */
export function SolutionOverview({ solution, className }: SolutionOverviewProps) {
  return (
    <div className={cn("space-y-12", className)}>
      <section id="business-problem" className="max-w-3xl space-y-3">
        <Heading variant="h3" as="h2">
          The problem
        </Heading>
        <Text variant="body">{solution.businessProblem}</Text>
      </section>

      <section id="business-outcomes" className="max-w-3xl space-y-3">
        <Heading variant="h3" as="h2">
          What changes
        </Heading>
        <ul className="space-y-2.5">
          {solution.businessOutcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2.5">
              <span className="bg-accent/10 text-accent mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                <Icon icon={Check} size="xs" />
              </span>
              <Text variant="body">{outcome}</Text>
            </li>
          ))}
        </ul>
      </section>

      <section id="engineering-philosophy" className="max-w-3xl space-y-3">
        <Heading variant="h3" as="h2">
          How we think about it
        </Heading>
        <Text variant="body">{solution.engineeringPhilosophy}</Text>
      </section>
    </div>
  );
}
