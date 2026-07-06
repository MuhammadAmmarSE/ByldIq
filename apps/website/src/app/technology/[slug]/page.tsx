import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import {
  TECHNOLOGIES,
  TECHNOLOGY_CATEGORIES,
  TechnologyArchitecture,
  TechnologyBusinessValue,
  TechnologyDeepDive,
  TechnologyDetailHero,
  TechnologyFaqSection,
  TechnologyFinalCta,
  TechnologyRelatedCaseStudies,
  TechnologyRelatedKnowledge,
  TechnologyRelatedSolutions,
  TechnologySidebar,
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
 * technology page has the same section order (CLAUDE.md Part 22). Related
 * solutions/case studies/knowledge sections render nothing when their
 * curated slug array is empty (a genuine, intentional state — see
 * `TechnologyRelatedSolutions.docs.md`) rather than a dead-end heading. A
 * sticky sidebar (desktop only) provides scrollspy navigation across the
 * middle sections; the hero and final CTA span full width, mirroring the
 * Solutions page template.
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
      <div className="lg:grid lg:grid-cols-[14rem_1fr] lg:gap-12">
        <TechnologySidebar className="hidden lg:block" />
        <div className="space-y-16">
          <TechnologyBusinessValue technology={technology} />
          <TechnologyStrengthsWeaknesses technology={technology} />
          <TechnologyTradeOffExplorer technology={technology} />
          <TechnologyArchitecture technology={technology} />
          <TechnologyDeepDive technology={technology} />
          <TechnologyRelatedSolutions technology={technology} />
          <TechnologyRelatedCaseStudies technology={technology} />
          <TechnologyRelatedKnowledge technology={technology} />
          <TechnologyFaqSection technology={technology} />
        </div>
      </div>
      <TechnologyFinalCta technology={technology} />
    </Container>
  );
}
