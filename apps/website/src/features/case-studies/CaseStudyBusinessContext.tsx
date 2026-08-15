import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { CaseStudyBusinessContextProps } from "./CaseStudyBusinessContext.types";

const FIELDS = [
  { key: "businessModel", heading: "Business model" },
  { key: "market", heading: "Market" },
  { key: "existingTechnology", heading: "Existing technology" },
  { key: "competitivePressure", heading: "Competitive pressure" },
] as const;

/**
 * Milestone 12's Business Context section — the environment the project
 * existed in, shown before any technical detail (CLAUDE.md Part 12: "The
 * visitor should understand why the project existed before seeing
 * technical implementation details"). Sits between Business Challenge
 * and Discovery in the page template, the same placement order the spec
 * describes.
 */
export function CaseStudyBusinessContext({ caseStudy, className }: CaseStudyBusinessContextProps) {
  return (
    <section id="business-context" className={cn("space-y-5", className)}>
      <Heading variant="h3" as="h2">
        Business context
      </Heading>

      <div className="grid gap-6 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <Heading variant="h6" as="h3">
              {field.heading}
            </Heading>
            <Text variant="body" className="text-muted">
              {caseStudy.businessContext[field.key]}
            </Text>
          </div>
        ))}
      </div>
    </section>
  );
}
