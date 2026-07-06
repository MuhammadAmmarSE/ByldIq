"use client";

import { Heading } from "@/components/Heading";
import { CASE_STUDIES, FICTIONAL_COMPANIES } from "@/features/case-studies";
import { ProjectCard } from "@/features/homepage/proof-engine";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { TechnologyRelatedCaseStudiesProps } from "./TechnologyRelatedCaseStudies.types";

const CASE_STUDIES_BY_SLUG = new Map(CASE_STUDIES.map((caseStudy) => [caseStudy.slug, caseStudy]));
const COMPANIES_BY_ID = new Map(FICTIONAL_COMPANIES.map((company) => [company.id, company]));

/**
 * CLAUDE.md Part 22's Case Study integration: reuses the Proof Engine's
 * real `ProjectCard` rather than building a second card for the same
 * content. Renders nothing when `relatedCaseStudySlugs` is empty — see
 * `TechnologyRelatedSolutions.docs.md` for why an empty related array is
 * a genuine, intentional state for this platform.
 */
export function TechnologyRelatedCaseStudies({
  technology,
  className,
}: TechnologyRelatedCaseStudiesProps) {
  const analytics = useAnalytics();

  if (technology.relatedCaseStudySlugs.length === 0) return null;

  return (
    <section id="related-case-studies" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Seen in the field
      </Heading>

      <div className="grid gap-6 sm:grid-cols-2">
        {technology.relatedCaseStudySlugs.map((slug) => {
          const caseStudy = CASE_STUDIES_BY_SLUG.get(slug);
          const company = caseStudy ? COMPANIES_BY_ID.get(caseStudy.companyId) : undefined;
          if (!caseStudy || !company) return null;

          return (
            <ProjectCard
              key={slug}
              caseStudy={caseStudy}
              company={company}
              onSelect={(caseStudySlug) =>
                analytics.track("technology_case_study_clicked", {
                  slug: technology.slug,
                  caseStudySlug,
                })
              }
            />
          );
        })}
      </div>
    </section>
  );
}
