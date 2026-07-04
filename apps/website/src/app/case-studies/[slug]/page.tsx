import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { CASE_STUDIES } from "@/features/homepage/proof-engine";
import { FICTIONAL_COMPANIES } from "@/features/homepage/shared";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-renders every known case study at build time — unknown slugs fall through to `notFound()`. */
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
    description: found.caseStudy.challenge,
  };
}

/**
 * A minimal case study page (CLAUDE.md Part 13 explicitly calls for a
 * dedicated page, not a modal). Fictional companies and outcomes, per Part
 * 14's "realistic fictional companies" convention — Byld IQ has no real
 * client history yet to publish here.
 */
export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const found = getCaseStudy(slug);
  if (!found) notFound();

  const { caseStudy, company } = found;

  return (
    <Container size="content" className="py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="neutral">{company.industry}</Badge>
            <Text variant="caption">{company.name}</Text>
          </div>
          <Heading variant="display">{caseStudy.headline}</Heading>
        </div>

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

        <section className="space-y-2">
          <Heading variant="h4">The challenge</Heading>
          <Text variant="body">{caseStudy.challenge}</Text>
        </section>

        <section className="space-y-2">
          <Heading variant="h4">Our approach</Heading>
          <Text variant="body">{caseStudy.approach}</Text>
        </section>

        <section className="space-y-2">
          <Heading variant="h4">The outcome</Heading>
          <Text variant="body">{caseStudy.outcome}</Text>
        </section>

        <section className="space-y-2">
          <Heading variant="h4">Technology</Heading>
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
