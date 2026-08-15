"use client";

import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { CASE_STUDIES, FICTIONAL_COMPANIES } from "@/features/case-studies";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { ProjectCard } from "@/features/homepage/proof-engine";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { SOLUTIONS } from "./data/solutions";
import type { IndustryDetailProps } from "./IndustryDetail.types";
import { SolutionCard } from "./SolutionCard";

const SOLUTIONS_BY_SLUG = new Map(SOLUTIONS.map((solution) => [solution.slug, solution]));
const CASE_STUDIES_BY_SLUG = new Map(CASE_STUDIES.map((caseStudy) => [caseStudy.slug, caseStudy]));
const COMPANIES_BY_ID = new Map(FICTIONAL_COMPANIES.map((company) => [company.id, company]));

/**
 * Milestone 10's Industry detail page content: challenges, recommended
 * solutions (real `SolutionCard`s), and example case studies where a real
 * one exists — or an honest "none published yet" state when it doesn't,
 * rather than a fabricated story (`data/industries.ts`).
 */
export function IndustryDetail({ industry, className }: IndustryDetailProps) {
  const analytics = useAnalytics();
  const { open: openAiCompanion } = useAiCompanion();
  const recommendedSolutions = industry.recommendedSolutionSlugs
    .map((slug) => SOLUTIONS_BY_SLUG.get(slug))
    .filter((solution) => solution !== undefined);
  const [primaryRecommendation] = recommendedSolutions;

  function handleSolutionSelect(slug: string) {
    analytics.track("industry_solution_clicked", {
      industrySlug: industry.slug,
      solutionSlug: slug,
    });
  }

  return (
    <div className={cn("space-y-12", className)}>
      <div className="max-w-2xl space-y-3">
        <Badge variant="outline">Industry</Badge>
        <Heading variant="display">{industry.label}</Heading>
        <Text variant="subtitle">{industry.description}</Text>
      </div>

      <section className="max-w-3xl space-y-4">
        <Heading variant="h3" as="h2">
          What we typically see
        </Heading>
        <ul className="space-y-2">
          {industry.challenges.map((challenge) => (
            <Text key={challenge} variant="body" as="li" className="flex gap-2">
              <span aria-hidden className="text-accent">
                —
              </span>
              {challenge}
            </Text>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <Heading variant="h3" as="h2">
          Recommended solutions
        </Heading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedSolutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} onSelect={handleSolutionSelect} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <Heading variant="h3" as="h2">
          Example work
        </Heading>
        {industry.exampleCaseStudySlugs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {industry.exampleCaseStudySlugs.map((slug) => {
              const caseStudy = CASE_STUDIES_BY_SLUG.get(slug);
              const company = caseStudy ? COMPANIES_BY_ID.get(caseStudy.companyId) : undefined;
              if (!caseStudy || !company) return null;
              return <ProjectCard key={slug} caseStudy={caseStudy} company={company} />;
            })}
          </div>
        ) : (
          <div className="border-border bg-surface-raised space-y-3 rounded-lg border border-dashed p-6">
            <Text variant="body">
              We haven&apos;t published a {industry.label.toLowerCase()} case study yet — this is a
              genuinely new area for us, not one we&apos;re hiding results from.
            </Text>
            <Text variant="caption">
              Talk to Byld about what a {industry.label.toLowerCase()} engagement would look like,
              or start BuildPath to get a roadmap for your specific project.
            </Text>
          </div>
        )}
      </section>

      <section
        id="get-started"
        className="border-border bg-surface-raised space-y-4 rounded-lg border p-8 text-center"
      >
        <Heading variant="h4" as="h2">
          Ready to think this through?
        </Heading>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {primaryRecommendation && (
            <Button asChild size="lg">
              <Link href={`/buildpath?solution=${primaryRecommendation.slug}`}>
                Plan My {industry.label} Product
              </Link>
            </Button>
          )}
          <Button variant="outline" size="lg" onClick={openAiCompanion}>
            Talk to Byld
          </Button>
        </div>
      </section>
    </div>
  );
}
