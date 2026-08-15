import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { INDUSTRIES, IndustryDetail } from "@/features/solutions";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

interface IndustrySolutionPageProps {
  params: Promise<{ industry: string }>;
}

/** Pre-renders all ten industries at build time — unknown slugs fall through to `notFound()`. */
export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ industry: industry.slug }));
}

function getIndustry(slug: string) {
  return INDUSTRIES.find((candidate) => candidate.slug === slug);
}

export async function generateMetadata({ params }: IndustrySolutionPageProps): Promise<Metadata> {
  const { industry: industrySlug } = await params;
  const industry = getIndustry(industrySlug);
  if (!industry) return {};

  return {
    title: `${industry.label} Solutions`,
    description: industry.description,
    alternates: { canonical: `/solutions/industry/${industry.slug}` },
    openGraph: {
      title: `${industry.label} Solutions`,
      description: industry.description,
      url: `/solutions/industry/${industry.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.label} Solutions`,
      description: industry.description,
    },
  };
}

/**
 * Milestone 10's `/solutions/industry/[industry]` route, mirroring
 * `/work/industry/[industry]`'s facet pattern: unlike Work's version
 * (which reuses `WorkExplorer` pre-seeded with a filter), this page has
 * its own real content per industry — challenges, recommended solutions,
 * and example work — rather than a filtered view of an existing list.
 */
export default async function IndustrySolutionPage({ params }: IndustrySolutionPageProps) {
  const { industry: industrySlug } = await params;
  const industry = getIndustry(industrySlug);
  if (!industry) notFound();

  return (
    <Container size="content" className="py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Solutions", url: `${siteConfig.url}/solutions` },
            {
              name: industry.label,
              url: `${siteConfig.url}/solutions/industry/${industry.slug}`,
            },
          ]),
        )}
      />
      <IndustryDetail industry={industry} />
    </Container>
  );
}
