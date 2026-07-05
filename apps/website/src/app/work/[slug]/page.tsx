import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import {
  CASE_STUDIES,
  CaseStudyArchitecture,
  CaseStudyDiscovery,
  CaseStudyHero,
  CaseStudyOverview,
  CaseStudyProductThinking,
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
 * discovery, product thinking, and architecture are real as of this phase;
 * results and technology remain a lightweight preview until Phases 4 and 5
 * build their dedicated explorers. The remaining sections (engineering
 * process, challenges, lessons learned, related content, FAQ, final CTA)
 * land in later phases.
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

        <section className="space-y-2">
          <Heading variant="h3" as="h2">
            The outcome
          </Heading>
          <Text variant="body">{caseStudy.outcome}</Text>
        </section>

        <section className="space-y-2">
          <Heading variant="h3" as="h2">
            Technology
          </Heading>
          <div className="flex flex-wrap gap-1.5">
            {caseStudy.technologies.map((technology) => (
              <Badge key={technology} variant="outline">
                {technology}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
