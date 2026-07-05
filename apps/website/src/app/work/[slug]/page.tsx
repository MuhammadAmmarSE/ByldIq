import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { CASE_STUDIES, FICTIONAL_COMPANIES } from "@/features/case-studies";

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
 * Milestone 5's phases; this is the routing skeleton only — executive
 * summary, results, and technology are real so far, using the richer data
 * model built in this phase. The remaining twelve sections land in later
 * phases.
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
          <Heading variant="h3" as="h2">
            Executive summary
          </Heading>
          <Text variant="body">{caseStudy.executiveSummary}</Text>
        </section>

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
