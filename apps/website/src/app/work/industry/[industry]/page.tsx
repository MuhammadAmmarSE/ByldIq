import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { INDUSTRIES, WorkExplorer } from "@/features/case-studies";

interface IndustryWorkPageProps {
  params: Promise<{ industry: string }>;
}

/** Pre-renders every industry facet at build time — unknown slugs fall through to `notFound()`. */
export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ industry: industry.slug }));
}

function getIndustry(slug: string) {
  return INDUSTRIES.find((candidate) => candidate.slug === slug);
}

export async function generateMetadata({ params }: IndustryWorkPageProps): Promise<Metadata> {
  const { industry: industrySlug } = await params;
  const industry = getIndustry(industrySlug);
  if (!industry) return {};

  return {
    title: `${industry.label} case studies`,
    description: `Engineering stories from ${industry.label} — the business challenge, decisions, and results behind each project.`,
  };
}

/**
 * CLAUDE.md Part 21's `/work/industry/[industry]` required route: reuses
 * `WorkExplorer` pre-seeded with this industry's filter, rather than
 * building a second, thinner listing page for the same content — visitors
 * can still search or switch filters from here, they just start already
 * narrowed to this industry.
 */
export default async function IndustryWorkPage({ params }: IndustryWorkPageProps) {
  const { industry: industrySlug } = await params;
  const industry = getIndustry(industrySlug);
  if (!industry) notFound();

  return (
    <Container size="wide" className="py-16">
      <WorkExplorer
        initialIndustryFilter={industry.slug}
        headline={`${industry.label} engineering stories.`}
        supportingCopy={`Real business problems solved for ${industry.label} teams — search or filter further to explore the rest of the library.`}
      />
    </Container>
  );
}
