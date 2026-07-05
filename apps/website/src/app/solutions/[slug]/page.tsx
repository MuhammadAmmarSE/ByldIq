import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import {
  ArchitectureExplorer,
  CapabilityExplorer,
  SOLUTIONS,
  SolutionHero,
  SolutionOverview,
  TechnologyExplorer,
} from "@/features/solutions";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-renders all nine solutions at build time (CLAUDE.md Part 20) — unknown slugs fall through to `notFound()`. */
export function generateStaticParams() {
  return SOLUTIONS.map((solution) => ({ slug: solution.slug }));
}

function getSolution(slug: string) {
  return SOLUTIONS.find((candidate) => candidate.slug === slug);
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};

  return {
    title: solution.title,
    description: solution.heroSupportingCopy,
  };
}

/**
 * One shared template driven entirely by `SOLUTIONS` data — every solution
 * page has the same section order (CLAUDE.md Part 20: "all pages must
 * share the same architecture"). Built incrementally across Milestone 4's
 * phases; Hero, Business Problem, Business Outcomes, Engineering
 * Philosophy, Capability Explorer, Architecture Explorer, and Technology
 * Explorer are real so far — the remaining sections (delivery, metrics,
 * related content, FAQ, final CTA) land in later phases.
 */
export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <Container size="content" className="space-y-16 py-16">
      <SolutionHero solution={solution} />
      <SolutionOverview solution={solution} />
      <CapabilityExplorer solution={solution} />
      <ArchitectureExplorer solution={solution} />
      <TechnologyExplorer solution={solution} />
    </Container>
  );
}
