import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import {
  CASE_STUDIES,
  CaseStudyArchitecture,
  CaseStudyChallenges,
  CaseStudyDiscovery,
  CaseStudyEngineeringProcess,
  CaseStudyFaqSection,
  CaseStudyFinalCta,
  CaseStudyHero,
  CaseStudyLessonsLearned,
  CaseStudyOverview,
  CaseStudyProductThinking,
  CaseStudyRelatedKnowledge,
  CaseStudyRelatedSolutions,
  CaseStudyResults,
  CaseStudySidebar,
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
 * study follows the same architecture"). Every section is now real: Hero,
 * Executive Summary, Business Challenge, Discovery, Product Thinking,
 * Architecture, Technology Decisions, Engineering Process, Challenges,
 * Results, Lessons Learned, Related Solutions, Related Knowledge, FAQ,
 * and the final CTA. A sticky sidebar (desktop only) provides scrollspy
 * navigation across the middle sections; the hero and final CTA span full
 * width, mirroring the Solutions Platform's page template.
 */
export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const found = getCaseStudy(slug);
  if (!found) notFound();

  const { caseStudy, company } = found;

  return (
    <Container size="content" className="space-y-16 py-16">
      <CaseStudyHero caseStudy={caseStudy} company={company} />

      <div className="lg:grid lg:grid-cols-[14rem_1fr] lg:gap-12">
        <CaseStudySidebar className="hidden lg:block" />
        <div className="max-w-3xl space-y-16">
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
          <CaseStudyFaqSection caseStudy={caseStudy} />
        </div>
      </div>

      <CaseStudyFinalCta caseStudy={caseStudy} />
    </Container>
  );
}
