import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import {
  ArchitectureExplorer,
  CapabilityExplorer,
  DeliveryFramework,
  RelatedCaseStudies,
  RelatedKnowledge,
  SOLUTIONS,
  SolutionFaqSection,
  SolutionFinalCta,
  SolutionHero,
  SolutionOverview,
  SolutionSidebar,
  SuccessMetrics,
  TechnologyExplorer,
} from "@/features/solutions";
import { breadcrumbJsonLd, faqPageJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

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
    alternates: { canonical: `/solutions/${solution.slug}` },
    openGraph: {
      title: solution.title,
      description: solution.heroSupportingCopy,
      url: `/solutions/${solution.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: solution.title,
      description: solution.heroSupportingCopy,
    },
  };
}

/**
 * One shared template driven entirely by `SOLUTIONS` data — every solution
 * page has the same section order (CLAUDE.md Part 20: "all pages must
 * share the same architecture"). All sections are now real: Hero, Business
 * Problem, Business Outcomes, Engineering Philosophy, Capability Explorer,
 * Architecture Explorer, Technology Explorer, Delivery Framework, Success
 * Metrics, Related Case Studies, Related Knowledge, FAQ, and the final CTA.
 * A sticky sidebar (desktop only) provides scrollspy navigation across the
 * middle sections; the hero and final CTA span full width.
 */
export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <Container size="content" className="space-y-16 py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Solutions", url: `${siteConfig.url}/solutions` },
            { name: solution.navLabel, url: `${siteConfig.url}/solutions/${solution.slug}` },
          ]),
        )}
      />
      <script {...jsonLdScriptProps(faqPageJsonLd(solution.faqs))} />
      <SolutionHero solution={solution} />
      <div className="lg:grid lg:grid-cols-[14rem_1fr] lg:gap-12">
        <SolutionSidebar className="hidden lg:block" />
        <div className="space-y-16">
          <SolutionOverview solution={solution} />
          <CapabilityExplorer solution={solution} />
          <ArchitectureExplorer solution={solution} />
          <TechnologyExplorer solution={solution} />
          <DeliveryFramework solution={solution} />
          <SuccessMetrics solution={solution} />
          <RelatedCaseStudies solution={solution} />
          <RelatedKnowledge solution={solution} />
          <SolutionFaqSection solution={solution} />
        </div>
      </div>
      <SolutionFinalCta solution={solution} />
    </Container>
  );
}
