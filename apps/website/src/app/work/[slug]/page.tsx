import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import {
  CASE_STUDIES,
  CaseStudyArchitecture,
  CaseStudyBeforeAfter,
  CaseStudyBusinessContext,
  CaseStudyChallenges,
  CaseStudyDiscovery,
  CaseStudyEngineeringProcess,
  CaseStudyFaqSection,
  CaseStudyFinalCta,
  CaseStudyFutureRoadmap,
  CaseStudyHero,
  CaseStudyLessonsLearned,
  CaseStudyOverview,
  CaseStudyProductThinking,
  CaseStudyQuote,
  CaseStudyRelatedKnowledge,
  CaseStudyRelatedSolutions,
  CaseStudyResults,
  CaseStudySidebar,
  CaseStudyTechnologyDecisions,
  FICTIONAL_COMPANIES,
} from "@/features/case-studies";
import { ScrollDepthTracker } from "@/features/homepage/shared";
import { articleJsonLd, breadcrumbJsonLd, faqPageJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

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
    alternates: { canonical: `/work/${found.caseStudy.slug}` },
    openGraph: {
      title: found.caseStudy.headline,
      description: found.caseStudy.executiveSummary,
      url: `/work/${found.caseStudy.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: found.caseStudy.headline,
      description: found.caseStudy.executiveSummary,
    },
  };
}

/**
 * One shared template driven entirely by `CASE_STUDIES` data — every case
 * study page has the same section order (CLAUDE.md Part 21: "Every case
 * study follows the same architecture"). Every section is now real: Hero
 * (Milestone 12: visual band, reading time, reading progress, share, and
 * an "Explore the architecture" jump link — see `CaseStudyHero`),
 * Executive Summary, Business Challenge, Business Context (Milestone 12),
 * Discovery, Product Thinking, Architecture, Technology Decisions,
 * Engineering Process, Challenges, a before/after comparison (Milestone
 * 12 — real for 1 of 5 case studies, renders nothing for the rest),
 * Results, a client quote (Milestone 11
 * — real for 3 of 5 case studies, renders nothing for the rest), Lessons
 * Learned, Future Roadmap (Milestone 12), Related Solutions, Related
 * Knowledge, FAQ, and the final CTA. A sticky sidebar (desktop only)
 * provides scrollspy navigation across the middle sections; the hero and
 * final CTA span full width, mirroring the Solutions Platform's page
 * template.
 */
export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const found = getCaseStudy(slug);
  if (!found) notFound();

  const { caseStudy, company } = found;

  return (
    <Container size="content" className="space-y-16 py-16">
      <ScrollDepthTracker page={`work/${caseStudy.slug}`} />
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Work", url: `${siteConfig.url}/work` },
            { name: company.name, url: `${siteConfig.url}/work/${caseStudy.slug}` },
          ]),
        )}
      />
      <script
        {...jsonLdScriptProps(
          articleJsonLd({
            headline: caseStudy.headline,
            description: caseStudy.executiveSummary,
            url: `${siteConfig.url}/work/${caseStudy.slug}`,
          }),
        )}
      />
      <script {...jsonLdScriptProps(faqPageJsonLd(caseStudy.faqs))} />
      <CaseStudyHero caseStudy={caseStudy} company={company} />

      <div className="lg:grid lg:grid-cols-[14rem_1fr] lg:gap-12">
        <CaseStudySidebar slug={caseStudy.slug} className="hidden lg:block" />
        <div className="max-w-3xl space-y-16">
          <CaseStudyOverview caseStudy={caseStudy} />
          <CaseStudyBusinessContext caseStudy={caseStudy} />
          <CaseStudyDiscovery caseStudy={caseStudy} />
          <CaseStudyProductThinking caseStudy={caseStudy} />
          <CaseStudyArchitecture caseStudy={caseStudy} />
          <CaseStudyTechnologyDecisions caseStudy={caseStudy} />
          <CaseStudyEngineeringProcess caseStudy={caseStudy} />
          <CaseStudyChallenges caseStudy={caseStudy} />
          <CaseStudyBeforeAfter caseStudy={caseStudy} />
          <CaseStudyResults caseStudy={caseStudy} />
          <CaseStudyQuote caseStudy={caseStudy} />
          <CaseStudyLessonsLearned caseStudy={caseStudy} />
          <CaseStudyFutureRoadmap caseStudy={caseStudy} />
          <CaseStudyRelatedSolutions caseStudy={caseStudy} />
          <CaseStudyRelatedKnowledge caseStudy={caseStudy} />
          <CaseStudyFaqSection caseStudy={caseStudy} />
        </div>
      </div>

      <CaseStudyFinalCta caseStudy={caseStudy} />
    </Container>
  );
}
