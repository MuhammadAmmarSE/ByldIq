import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import {
  CASE_STUDIES,
  CaseStudyArchitecture,
  CaseStudyDiscovery,
  CaseStudyEngineeringProcess,
  CaseStudyHero,
  CaseStudyOverview,
  CaseStudyProductThinking,
  CaseStudyTechnologyDecisions,
  FICTIONAL_COMPANIES,
} from "@/features/case-studies";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-renders every known case study at build time (CLAUDE.md Part 21) — unknown slugs fall through to `notFound()`. */
export function generateStaticParams() {
  return CASE_STUDIES.map((caseStudy) => ({ slug: caseStudy.slug }));
}

function getCaseStudy(slug: string) {
  const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!caseStudy) return undefined;
  const company = FICTIONAL_COMPANIES.find((candidate) => candidate.id === caseStudy.companyId);
  if (!company) return undefined;
  return { caseStudy, company };
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const found = getCaseStudy(slug);
  if (!found) return {};

  return {
    title: found.caseStudy.headline,
    description: found.caseStudy.executiveSummary,
  };
}

/**
 * One shared template driven entirely by `CASE_STUDIES` data — every case
 * study page has the same section order (CLAUDE.md Part 21: "Every case
 * study follows the same architecture"). Built incrementally across
 * Milestone 5's phases: the hero, executive summary, business challenge,
 * discovery, product thinking, architecture, technology decisions, and
 * engineering process are real as of this phase; results remain a
 * lightweight preview until Phase 5 builds its dedicated section. The
 * remaining sections (challenges, lessons learned, related content, FAQ,
 * final CTA) land in later phases.
 */
export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const found = getCaseStudy(slug);
  if (!found) notFound();

  const { caseStudy, company } = found;

  return (
    <Container size="content" className="space-y-16 py-16">
      <CaseStudyHero caseStudy={caseStudy} company={company} />

      <div className="mx-auto max-w-3xl space-y-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {caseStudy.metrics.map((metric) => (
            <div
              key={metric.label}
              className="border-border bg-surface-raised rounded-lg border p-4"
            >
              <p className="text-foreground text-2xl font-semibold">{metric.value}</p>
              <p className="text-muted text-sm">{metric.label}</p>
            </div>
          ))}
        </div>

        <CaseStudyOverview caseStudy={caseStudy} />
        <CaseStudyDiscovery caseStudy={caseStudy} />
        <CaseStudyProductThinking caseStudy={caseStudy} />
        <CaseStudyArchitecture caseStudy={caseStudy} />
        <CaseStudyTechnologyDecisions caseStudy={caseStudy} />
        <CaseStudyEngineeringProcess caseStudy={caseStudy} />

        <section id="outcome" className="space-y-2">
          <Heading variant="h3" as="h2">
            The outcome
          </Heading>
          <Text variant="body">{caseStudy.outcome}</Text>
        </section>
      </div>
    </Container>
  );
}
