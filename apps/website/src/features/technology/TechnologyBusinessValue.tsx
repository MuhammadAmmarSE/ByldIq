import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { TechnologyBusinessValueProps } from "./TechnologyBusinessValue.types";

/**
 * CLAUDE.md Part 22's Business Value section: the business problem the
 * technology addresses, why organizations adopt it, who benefits, and the
 * business/engineering fit summary from the hero's data — grouped in one
 * component since none carry their own interactivity, but each keeps a
 * stable `id` for the sticky sidebar/scrollspy a later phase adds.
 *
 * Order matters: the business problem always comes before Byld IQ's
 * explanation of why organizations adopt the technology, mirroring
 * `SolutionOverview`'s "problem before approach" ordering.
 */
export function TechnologyBusinessValue({ technology, className }: TechnologyBusinessValueProps) {
  return (
    <div className={cn("space-y-12", className)}>
      <section id="business-problem" className="max-w-3xl space-y-3">
        <Heading variant="h3" as="h2">
          The problem
        </Heading>
        <Text variant="body">{technology.businessProblem}</Text>
      </section>

      <section id="why-organizations-adopt" className="max-w-3xl space-y-3">
        <Heading variant="h3" as="h2">
          Why organizations adopt it
        </Heading>
        <Text variant="body">{technology.whyOrganizationsAdopt}</Text>
      </section>

      <section id="business-and-engineering-fit" className="max-w-3xl space-y-6">
        <Heading variant="h3" as="h2">
          Where it fits
        </Heading>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Heading variant="h5" as="h3">
              Business fit
            </Heading>
            <Text variant="body">{technology.businessFit}</Text>
          </div>
          <div className="space-y-1.5">
            <Heading variant="h5" as="h3">
              Engineering fit
            </Heading>
            <Text variant="body">{technology.engineeringFit}</Text>
          </div>
        </div>
      </section>
    </div>
  );
}
