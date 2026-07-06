import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import {
  TECHNOLOGIES,
  TECHNOLOGY_CATEGORIES,
  TechnologyArchitecture,
  TechnologyBusinessValue,
  TechnologyDetailHero,
  TechnologyStrengthsWeaknesses,
  TechnologyTradeOffExplorer,
} from "@/features/technology";

interface TechnologyPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-renders every known technology at build time (CLAUDE.md Part 22) — unknown slugs fall through to `notFound()`. */
export function generateStaticParams() {
  return TECHNOLOGIES.map((technology) => ({ slug: technology.slug }));
}

function getTechnology(slug: string) {
  return TECHNOLOGIES.find((candidate) => candidate.slug === slug);
}

export async function generateMetadata({ params }: TechnologyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const technology = getTechnology(slug);
  if (!technology) return {};

  return {
    title: technology.name,
    description: technology.tagline,
  };
}

/**
 * One shared template driven entirely by `TECHNOLOGIES` data — every
 * technology page has the same section order (CLAUDE.md Part 22). Built
 * incrementally across Milestone 6's phases; hero, business value,
 * strengths/weaknesses, the Trade-Off Explorer, and interactive
 * architecture are real so far. The remaining sections (performance,
 * security, accessibility, scalability, cost, comparisons, decision
 * wizard, related content) land in later phases.
 */
export default async function TechnologyDetailPage({ params }: TechnologyPageProps) {
  const { slug } = await params;
  const technology = getTechnology(slug);
  if (!technology) notFound();

  const category = TECHNOLOGY_CATEGORIES.find(
    (candidate) => candidate.slug === technology.category,
  );

  return (
    <Container size="content" className="space-y-16 py-16">
      <TechnologyDetailHero technology={technology} categoryLabel={category?.label} />
      <TechnologyBusinessValue technology={technology} />
      <TechnologyStrengthsWeaknesses technology={technology} />
      <TechnologyTradeOffExplorer technology={technology} />
      <TechnologyArchitecture technology={technology} />
    </Container>
  );
}
