import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { BUSINESS_PROBLEMS, WorkExplorer } from "@/features/case-studies";
import { ScrollDepthTracker } from "@/features/homepage/shared";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

interface BusinessProblemWorkPageProps {
  params: Promise<{ problem: string }>;
}

/** Pre-renders every business-problem facet at build time — unknown slugs fall through to `notFound()`. */
export function generateStaticParams() {
  return BUSINESS_PROBLEMS.map((problem) => ({ problem: problem.slug }));
}

function getBusinessProblem(slug: string) {
  return BUSINESS_PROBLEMS.find((candidate) => candidate.slug === slug);
}

export async function generateMetadata({
  params,
}: BusinessProblemWorkPageProps): Promise<Metadata> {
  const { problem: problemSlug } = await params;
  const problem = getBusinessProblem(problemSlug);
  if (!problem) return {};

  const title = `${problem.label} case studies`;
  const description = `Engineering stories about ${problem.label.toLowerCase()} — the business challenge, decisions, and results behind each project.`;

  return {
    title,
    description,
    alternates: { canonical: `/work/business-problem/${problem.slug}` },
    openGraph: {
      title,
      description,
      url: `/work/business-problem/${problem.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * CLAUDE.md Part 21's `/work/business-problem/[problem]` required route:
 * reuses `WorkExplorer` pre-seeded with this business-problem filter, the
 * same reasoning as the industry and technology routes.
 */
export default async function BusinessProblemWorkPage({ params }: BusinessProblemWorkPageProps) {
  const { problem: problemSlug } = await params;
  const problem = getBusinessProblem(problemSlug);
  if (!problem) notFound();

  return (
    <Container size="wide" className="py-16">
      <ScrollDepthTracker page={`work/business-problem/${problem.slug}`} />
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Work", url: `${siteConfig.url}/work` },
            {
              name: problem.label,
              url: `${siteConfig.url}/work/business-problem/${problem.slug}`,
            },
          ]),
        )}
      />
      <WorkExplorer
        initialBusinessProblemFilter={problem.slug}
        headline={`${problem.label} engineering stories.`}
        supportingCopy={`Case studies where ${problem.label.toLowerCase()} was the core challenge — search or filter further to explore the rest of the library.`}
      />
    </Container>
  );
}
