import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { CATEGORIES_BY_SLUG, KnowledgeTutorialDetail, TUTORIALS } from "@/features/knowledge";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

interface KnowledgeTutorialPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-renders every real tutorial at build time — unknown slugs fall through to `notFound()`. */
export function generateStaticParams() {
  return TUTORIALS.map((tutorial) => ({ slug: tutorial.slug }));
}

function getTutorial(slug: string) {
  return TUTORIALS.find((candidate) => candidate.slug === slug);
}

export async function generateMetadata({ params }: KnowledgeTutorialPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) return {};

  return {
    title: tutorial.title,
    description: tutorial.summary,
    alternates: { canonical: `/knowledge/tutorials/${tutorial.slug}` },
    openGraph: {
      title: tutorial.title,
      description: tutorial.summary,
      url: `/knowledge/tutorials/${tutorial.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: tutorial.title,
      description: tutorial.summary,
    },
  };
}

/**
 * CLAUDE.md Part 18/19's `/knowledge/tutorials/[slug]` route —
 * prerequisites → setup → steps → validation → next steps
 * (`KnowledgeTutorialDetail`).
 */
export default async function KnowledgeTutorialPage({ params }: KnowledgeTutorialPageProps) {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) notFound();

  const category = CATEGORIES_BY_SLUG.get(tutorial.category);

  return (
    <Container size="content" className="py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Knowledge Center", url: `${siteConfig.url}/knowledge` },
            { name: "Tutorials", url: `${siteConfig.url}/knowledge/tutorials` },
            { name: tutorial.title, url: `${siteConfig.url}/knowledge/tutorials/${tutorial.slug}` },
          ]),
        )}
      />
      <KnowledgeTutorialDetail tutorial={tutorial} categoryLabel={category?.label} />
    </Container>
  );
}
