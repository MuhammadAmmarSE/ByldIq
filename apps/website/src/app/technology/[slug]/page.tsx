import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { TECHNOLOGIES, TECHNOLOGY_CATEGORIES } from "@/features/technology";

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
 * incrementally across Milestone 6's phases; this is the routing skeleton
 * only — hero, business fit, and strengths/weaknesses are real so far. The
 * remaining sections (Trade-Off Explorer, architecture, performance,
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
    <Container size="content" className="py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {category ? <Badge variant="neutral">{category.label}</Badge> : null}
            <Text variant="caption">{technology.maturity}</Text>
          </div>
          <Heading variant="display">{technology.name}</Heading>
          <Text variant="body" className="text-muted">
            {technology.tagline}
          </Text>
        </div>

        <section className="space-y-2">
          <Heading variant="h3" as="h2">
            Business fit
          </Heading>
          <Text variant="body">{technology.businessFit}</Text>
        </section>

        <section className="space-y-2">
          <Heading variant="h3" as="h2">
            Strengths
          </Heading>
          <ul className="space-y-2">
            {technology.strengths.map((strength) => (
              <li key={strength.label}>
                <Text variant="body" className="font-medium">
                  {strength.label}
                </Text>
                <Text variant="body" className="text-muted">
                  {strength.description}
                </Text>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <Heading variant="h3" as="h2">
            Weaknesses
          </Heading>
          <ul className="space-y-2">
            {technology.weaknesses.map((weakness) => (
              <li key={weakness.label}>
                <Text variant="body" className="font-medium">
                  {weakness.label}
                </Text>
                <Text variant="body" className="text-muted">
                  {weakness.description}
                </Text>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
