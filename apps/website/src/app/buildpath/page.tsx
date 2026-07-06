import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { BUSINESS_PROBLEMS, CASE_STUDIES, FICTIONAL_COMPANIES } from "@/features/case-studies";
import { KNOWLEDGE_ARTICLES } from "@/features/knowledge";
import { SOLUTIONS } from "@/features/solutions";
import { TECHNOLOGIES } from "@/features/technology";

interface BuildPathPageProps {
  searchParams: Promise<{
    solution?: string;
    caseStudy?: string;
    technology?: string;
    article?: string;
  }>;
}

function getReferringCaseStudy(slug: string | undefined) {
  const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!caseStudy) return undefined;
  const company = FICTIONAL_COMPANIES.find((candidate) => candidate.id === caseStudy.companyId);
  if (!company) return undefined;
  const businessProblem =
    BUSINESS_PROBLEMS.find((problem) => problem.slug === caseStudy.businessProblem)?.label ??
    caseStudy.businessProblem;
  return { caseStudy, company, businessProblem };
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
 * pages link here with `?solution={slug}`, case study pages with
 * `?caseStudy={slug}`, technology pages with `?technology={slug}`,
 * knowledge articles with `?article={slug}` (CLAUDE.md Part 20: "BuildPath
 * automatically remembers... journey selected, solution selected"; Part
 * 22: "BuildPath automatically remembers explored technologies"; Part 18:
 * "BuildPath automatically remembers explored technologies," applied here
 * to articles) — since there's no live questionnaire to prefill yet, this
 * page instead acknowledges the referring context honestly, naming the
 * specific industry, business challenge, technology, or article BuildPath
 * would start from, rather than fabricating a prefilled form that doesn't
 * exist.
 */
export default async function BuildPathPage({ searchParams }: BuildPathPageProps) {
  const {
    solution: solutionSlug,
    caseStudy: caseStudySlug,
    technology: technologySlug,
    article: articleSlug,
  } = await searchParams;
  const solution = SOLUTIONS.find((candidate) => candidate.slug === solutionSlug);
  const referringCaseStudy = getReferringCaseStudy(caseStudySlug);
  const technology = TECHNOLOGIES.find((candidate) => candidate.slug === technologySlug);
  const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === articleSlug);

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
        {referringCaseStudy && (
          <Text variant="body" className="text-accent">
            Continuing from {referringCaseStudy.company.name}&apos;s story — we&apos;d start from{" "}
            {referringCaseStudy.businessProblem} in {referringCaseStudy.company.industry}, with{" "}
            {referringCaseStudy.caseStudy.technologies.join(", ")} as a reference point.
          </Text>
        )}
        {technology && (
          <Text variant="body" className="text-accent">
            Continuing with {technology.name} — one reason it&apos;s often chosen:{" "}
            {technology.tradeOff.bestFor[0]}.
          </Text>
        )}
        {article && (
          <Text variant="body" className="text-accent">
            Continuing from &ldquo;{article.title}&rdquo; — {article.importance}
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
          ) : referringCaseStudy ? (
            <Button asChild>
              <Link href={`/work/${referringCaseStudy.caseStudy.slug}`}>
                Back to {referringCaseStudy.company.name}
              </Link>
            </Button>
          ) : technology ? (
            <Button asChild>
              <Link href={`/technology/${technology.slug}`}>Back to {technology.name}</Link>
            </Button>
          ) : article ? (
            <Button asChild>
              <Link href={`/knowledge/${article.slug}`}>Back to the article</Link>
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
