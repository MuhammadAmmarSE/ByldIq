import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { CaseStudyOverviewProps } from "./CaseStudyOverview.types";

const CHALLENGE_LISTS = [
  { id: "constraints", heading: "Constraints" },
  { id: "risks", heading: "Risks" },
  { id: "success-criteria", heading: "Success criteria" },
] as const;

/**
 * CLAUDE.md Part 21's Executive Summary and Business Challenge sections,
 * grouped into one component since neither carries its own interactivity —
 * mirrors `SolutionOverview`'s reasoning for the same grouping. Each keeps a
 * stable `id` (`#executive-summary`, `#business-challenge`) for the sticky
 * sidebar/scrollspy a later phase adds once every section exists.
 */
export function CaseStudyOverview({ caseStudy, className }: CaseStudyOverviewProps) {
  const lists: Record<(typeof CHALLENGE_LISTS)[number]["id"], string[]> = {
    constraints: caseStudy.constraints,
    risks: caseStudy.risks,
    "success-criteria": caseStudy.successCriteria,
  };

  return (
    <div className={cn("space-y-12", className)}>
      <section id="executive-summary" className="space-y-3">
        <Heading variant="h3" as="h2">
          Executive summary
        </Heading>
        <Text variant="body">{caseStudy.executiveSummary}</Text>
      </section>

      <section id="business-challenge" className="space-y-5">
        <Heading variant="h3" as="h2">
          The business challenge
        </Heading>
        <Text variant="body">{caseStudy.challenge}</Text>
        <Text variant="body" className="text-muted">
          {caseStudy.whyItMattered}
        </Text>

        <div className="grid gap-6 sm:grid-cols-3">
          {CHALLENGE_LISTS.map((list) => (
            <div key={list.id} className="space-y-2">
              <Heading variant="h6" as="h3">
                {list.heading}
              </Heading>
              <ul className="space-y-1.5">
                {lists[list.id].map((item) => (
                  <li key={item} className="text-muted text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
