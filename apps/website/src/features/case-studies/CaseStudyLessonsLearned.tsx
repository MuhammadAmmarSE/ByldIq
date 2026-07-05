import { Heading } from "@/components/Heading";
import { cn } from "@/utils/cn";

import type { CaseStudyLessonsLearnedProps } from "./CaseStudyLessonsLearned.types";

const LESSON_LISTS = [
  { id: "what-worked", heading: "What worked" },
  { id: "what-could-improve", heading: "What we'd improve" },
  { id: "recommendations", heading: "Recommendations for similar projects" },
] as const;

/**
 * CLAUDE.md Part 21's Lessons Learned section — "the most valuable
 * section" per the spec, since honesty about trade-offs and hindsight is
 * what separates an engineering case study from a marketing portfolio.
 * Same three-column list layout `CaseStudyOverview` uses for constraints/
 * risks/success criteria, reused here for consistency across the page.
 */
export function CaseStudyLessonsLearned({ caseStudy, className }: CaseStudyLessonsLearnedProps) {
  const lists: Record<(typeof LESSON_LISTS)[number]["id"], string[]> = {
    "what-worked": caseStudy.whatWorked,
    "what-could-improve": caseStudy.whatCouldImprove,
    recommendations: caseStudy.recommendations,
  };

  return (
    <section id="lessons-learned" className={cn("space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Lessons learned
      </Heading>

      <div className="grid gap-6 sm:grid-cols-3">
        {LESSON_LISTS.map((list) => (
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
  );
}
