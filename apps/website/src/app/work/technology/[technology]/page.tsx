import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { TECHNOLOGIES, WorkExplorer } from "@/features/case-studies";
import { ScrollDepthTracker } from "@/features/homepage/shared";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

interface TechnologyWorkPageProps {
  params: Promise<{ technology: string }>;
}

/** Pre-renders every technology facet at build time — unknown slugs fall through to `notFound()`. */
export function generateStaticParams() {
  return TECHNOLOGIES.map((technology) => ({ technology: technology.slug }));
}

function getTechnology(slug: string) {
  return TECHNOLOGIES.find((candidate) => candidate.slug === slug);
}

export async function generateMetadata({ params }: TechnologyWorkPageProps): Promise<Metadata> {
  const { technology: technologySlug } = await params;
  const technology = getTechnology(technologySlug);
  if (!technology) return {};

  const title = `Case studies built with ${technology.label}`;
  const description = `Engineering stories that used ${technology.label} — why it was chosen, the trade-offs, and the results.`;

  return {
    title,
    description,
    alternates: { canonical: `/work/technology/${technology.slug}` },
    openGraph: {
      title,
      description,
      url: `/work/technology/${technology.slug}`,
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
 * CLAUDE.md Part 21's `/work/technology/[technology]` required route:
 * reuses `WorkExplorer` pre-seeded with this technology's filter, the
 * same reasoning as the industry route — one component, every facet.
 */
export default async function TechnologyWorkPage({ params }: TechnologyWorkPageProps) {
  const { technology: technologySlug } = await params;
  const technology = getTechnology(technologySlug);
  if (!technology) notFound();

  return (
    <Container size="wide" className="py-16">
      <ScrollDepthTracker page={`work/technology/${technology.slug}`} />
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Work", url: `${siteConfig.url}/work` },
            {
              name: technology.label,
              url: `${siteConfig.url}/work/technology/${technology.slug}`,
            },
          ]),
        )}
      />
      <WorkExplorer
        initialTechnologyFilter={technology.slug}
        headline={`Built with ${technology.label}.`}
        supportingCopy={`Case studies where ${technology.label} was part of the stack — search or filter further to explore the rest of the library.`}
      />
    </Container>
  );
}
