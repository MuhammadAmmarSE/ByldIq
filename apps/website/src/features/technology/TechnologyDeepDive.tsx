import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { TechnologyDeepDiveProps } from "./TechnologyDeepDive.types";

const SECTIONS = [
  { id: "performance", title: "Performance", field: "performance" },
  { id: "security", title: "Security", field: "security" },
  { id: "accessibility", title: "Accessibility", field: "accessibility" },
  { id: "scalability", title: "Scalability", field: "scalability" },
  { id: "cost-analysis", title: "Cost analysis", field: "costAnalysis" },
] as const;

/**
 * CLAUDE.md Part 22's Performance, Security, Accessibility, Scalability,
 * and Cost sections — grouped in one component since none carry their own
 * interactivity, but each keeps a stable `id` for the sticky sidebar/
 * scrollspy a later phase adds, mirroring `TechnologyBusinessValue` and
 * `SolutionOverview`.
 */
export function TechnologyDeepDive({ technology, className }: TechnologyDeepDiveProps) {
  return (
    <div className={cn("space-y-12", className)}>
      {SECTIONS.map(({ id, title, field }) => (
        <section key={id} id={id} className="max-w-3xl space-y-3">
          <Heading variant="h3" as="h2">
            {title}
          </Heading>
          <Text variant="body">{technology[field]}</Text>
        </section>
      ))}
    </div>
  );
}
