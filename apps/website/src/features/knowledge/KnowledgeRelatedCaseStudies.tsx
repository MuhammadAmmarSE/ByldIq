"use client";

import { Heading } from "@/components/Heading";
import { CASE_STUDIES, FICTIONAL_COMPANIES } from "@/features/case-studies";
import { ProjectCard } from "@/features/homepage/proof-engine";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { KnowledgeRelatedCaseStudiesProps } from "./KnowledgeRelatedCaseStudies.types";

const CASE_STUDIES_BY_SLUG = new Map(CASE_STUDIES.map((caseStudy) => [caseStudy.slug, caseStudy]));
const COMPANIES_BY_ID = new Map(FICTIONAL_COMPANIES.map((company) => [company.id, company]));

/**
 * CLAUDE.md Part 18's Related Case Studies section: reuses the Proof
 * Engine's real `ProjectCard` rather than building a second card for the
 * same content, mirroring `TechnologyRelatedCaseStudies`. Renders nothing
 * when `relatedCaseStudySlugs` is empty — a genuine, intentional state for
 * this platform (e.g. the accessibility checklist article has none).
 */
export function KnowledgeRelatedCaseStudies({
  article,
  className,
}: KnowledgeRelatedCaseStudiesProps) {
  const analytics = useAnalytics();

  if (article.relatedCaseStudySlugs.length === 0) return null;

  return (
    <section id="related-case-studies" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Seen in the field
      </Heading>

      <div className="grid gap-6 sm:grid-cols-2">
        {article.relatedCaseStudySlugs.map((slug) => {
          const caseStudy = CASE_STUDIES_BY_SLUG.get(slug);
          const company = caseStudy ? COMPANIES_BY_ID.get(caseStudy.companyId) : undefined;
          if (!caseStudy || !company) return null;

          return (
            <ProjectCard
              key={slug}
              caseStudy={caseStudy}
              company={company}
              onSelect={(caseStudySlug) =>
                analytics.track("knowledge_case_study_clicked", {
                  slug: article.slug,
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
