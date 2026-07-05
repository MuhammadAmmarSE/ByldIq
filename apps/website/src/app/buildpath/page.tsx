import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { SOLUTIONS } from "@/features/solutions";

interface BuildPathPageProps {
  searchParams: Promise<{ solution?: string }>;
}

export const metadata: Metadata = {
  title: "BuildPath",
  description:
    "BuildPath turns a conversation about your product into a roadmap, technology recommendations, and next steps.",
};

/**
 * A real page, not a "coming soon" modal — CLAUDE.md Part 17's full
 * BuildPath wizard (11-stage questionnaire, AI recommendation engine, PDF
 * export) is out of scope for this milestone; this explains the vision
 * honestly rather than dead-ending the homepage preview's CTA. Solution
 * pages link here with `?solution={slug}` (CLAUDE.md Part 20: "BuildPath
 * automatically remembers... journey selected, solution selected") — since
 * there's no live questionnaire to prefill yet, this page instead
 * acknowledges the referring solution honestly rather than fabricating a
 * prefilled form that doesn't exist.
 */
export default async function BuildPathPage({ searchParams }: BuildPathPageProps) {
  const { solution: solutionSlug } = await searchParams;
  const solution = SOLUTIONS.find((candidate) => candidate.slug === solutionSlug);

  return (
    <Container size="content" className="py-16">
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <Badge variant="accent">Coming soon</Badge>
        <Heading variant="display">Let&apos;s plan your product together.</Heading>
        {solution && (
          <Text variant="body" className="text-accent">
            Continuing from {solution.title}
          </Text>
        )}
        <Text variant="subtitle">
          BuildPath will turn a short conversation about your product into a phased roadmap,
          technology recommendations with reasoning, a suggested team, and the risks worth planning
          for — the full experience previewed on the homepage.
        </Text>
        <Text variant="body">
          The full BuildPath questionnaire isn&apos;t live yet. In the meantime, talk to Byld or
          explore how we think about product engineering.
        </Text>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {solution ? (
            <Button asChild>
              <Link href={`/solutions/${solution.slug}`}>Back to {solution.navLabel}</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/#product-thinking">Explore our process</Link>
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
