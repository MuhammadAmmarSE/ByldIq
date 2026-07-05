import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { SOLUTIONS } from "@/features/solutions";

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
 * phases; this is the routing/data-wiring skeleton, not the finished page.
 */
export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <Container size="content" className="py-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <Heading variant="display">{solution.heroHeadline}</Heading>
        <Text variant="subtitle">{solution.heroSupportingCopy}</Text>
        <Text variant="body">{solution.businessProblem}</Text>
      </div>
    </Container>
  );
}
