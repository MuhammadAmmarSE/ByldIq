import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { INDUSTRIES, WorkExplorer } from "@/features/case-studies";
import { ScrollDepthTracker } from "@/features/homepage/shared";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

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

  const description = `Engineering stories from ${industry.label} — the business challenge, decisions, and results behind each project.`;

  return {
    title: `${industry.label} case studies`,
    description,
    alternates: { canonical: `/work/industry/${industry.slug}` },
    openGraph: {
      title: `${industry.label} case studies`,
      description,
      url: `/work/industry/${industry.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.label} case studies`,
      description,
    },
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
      <ScrollDepthTracker page={`work/industry/${industry.slug}`} />
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Work", url: `${siteConfig.url}/work` },
            { name: industry.label, url: `${siteConfig.url}/work/industry/${industry.slug}` },
          ]),
        )}
      />
      <WorkExplorer
        initialIndustryFilter={industry.slug}
        headline={`${industry.label} engineering stories.`}
        supportingCopy={`Real business problems solved for ${industry.label} teams — search or filter further to explore the rest of the library.`}
      />
    </Container>
  );
}
