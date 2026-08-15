"use client";

import Link from "next/link";

import { Badge } from "@/components/Badge";
import { SectionHeader } from "@/components/SectionHeader";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CASE_STUDIES, FICTIONAL_COMPANIES, TESTIMONIALS } from "@/features/case-studies";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { SocialProofProps } from "./SocialProof.types";

const CASE_STUDIES_BY_SLUG = new Map(CASE_STUDIES.map((caseStudy) => [caseStudy.slug, caseStudy]));
const CASE_STUDY_SLUG_BY_COMPANY = new Map(
  CASE_STUDIES.map((caseStudy) => [caseStudy.companyId, caseStudy.slug]),
);

/**
 * Milestone 9's Social Proof section. CLAUDE.md Part 13 ("never inflate
 * numbers... only display metrics that can be verified") and the
 * case-studies dataset's own doc comment ("no real client history yet")
 * rule out fabricated business-age or client-count stats — the M9 spec's
 * "years-of-experience stats" would be exactly that fabrication. Instead,
 * each testimonial is paired with a real metric pulled directly from that
 * same company's actual case study, so every number shown is one a
 * visitor can click through and verify rather than a trust badge invented
 * for this section.
 */
export function SocialProof({ className }: SocialProofProps) {
  const analytics = useAnalytics();

  return (
    <div className={cn("space-y-10", className)}>
      <SectionHeader
        eyebrow="Social Proof"
        heading="What clients say once the work is done."
        description="Every quote below is tied to a full case study — the metric badge underneath is pulled from that same story, not asserted separately."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => {
          const caseStudy = CASE_STUDIES_BY_SLUG.get(testimonial.caseStudySlug);
          const metric = caseStudy?.metrics[0];

          return (
            <div key={testimonial.id} className="space-y-3">
              <TestimonialCard
                quote={testimonial.quote}
                authorName={testimonial.authorName}
                authorRole={testimonial.authorRole}
              />
              {metric && (
                <Badge variant="outline">
                  {metric.label}: {metric.value}
                </Badge>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <p className="text-muted text-sm font-medium">
          Companies we&apos;ve engineered products for
        </p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {FICTIONAL_COMPANIES.map((company) => {
            const caseStudySlug = CASE_STUDY_SLUG_BY_COMPANY.get(company.id);

            if (!caseStudySlug) {
              return (
                <span key={company.id} className="text-muted text-lg font-semibold tracking-tight">
                  {company.name}
                </span>
              );
            }

            return (
              <Link
                key={company.id}
                href={`/work/${caseStudySlug}`}
                onClick={() =>
                  analytics.track("social_proof_company_clicked", { companyId: company.id })
                }
                className="text-muted hover:text-accent focus-visible:ring-focus-ring rounded-sm text-lg font-semibold tracking-tight transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                {company.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
