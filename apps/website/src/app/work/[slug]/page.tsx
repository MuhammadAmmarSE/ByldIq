import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import {
  CASE_STUDIES,
  CaseStudyArchitecture,
  CaseStudyChallenges,
  CaseStudyDiscovery,
  CaseStudyEngineeringProcess,
  CaseStudyHero,
  CaseStudyLessonsLearned,
  CaseStudyOverview,
  CaseStudyProductThinking,
  CaseStudyRelatedKnowledge,
  CaseStudyRelatedSolutions,
  CaseStudyResults,
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
 * Milestone 5's phases: every section through Related Knowledge is real
 * as of this phase (the AI Companion and BuildPath are already wired in
 * via `CaseStudyHero`). The remaining sections (FAQ, final CTA) and the
 * filter/search routes land in later phases.
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
        <CaseStudyOverview caseStudy={caseStudy} />
        <CaseStudyDiscovery caseStudy={caseStudy} />
        <CaseStudyProductThinking caseStudy={caseStudy} />
        <CaseStudyArchitecture caseStudy={caseStudy} />
        <CaseStudyTechnologyDecisions caseStudy={caseStudy} />
        <CaseStudyEngineeringProcess caseStudy={caseStudy} />
        <CaseStudyChallenges caseStudy={caseStudy} />
        <CaseStudyResults caseStudy={caseStudy} />
        <CaseStudyLessonsLearned caseStudy={caseStudy} />
        <CaseStudyRelatedSolutions caseStudy={caseStudy} />
        <CaseStudyRelatedKnowledge caseStudy={caseStudy} />
      </div>
    </Container>
  );
}
