import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { KnowledgeLearningPathDetail, LEARNING_PATHS } from "@/features/knowledge";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

interface LearningPathPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-renders every known learning path at build time — unknown slugs fall through to `notFound()`. */
export function generateStaticParams() {
  return LEARNING_PATHS.map((path) => ({ slug: path.slug }));
}

function getPath(slug: string) {
  return LEARNING_PATHS.find((candidate) => candidate.slug === slug);
}

export async function generateMetadata({ params }: LearningPathPageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = getPath(slug);
  if (!path) return {};

  return {
    title: `${path.title} Learning Path`,
    description: path.description,
    alternates: { canonical: `/knowledge/learning-paths/${path.slug}` },
    openGraph: {
      title: `${path.title} Learning Path`,
      description: path.description,
      url: `/knowledge/learning-paths/${path.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${path.title} Learning Path`,
      description: path.description,
    },
  };
}

/**
 * CLAUDE.md Part 18's Learning Path detail page — the ordered article
 * sequence, progress, and completion for one path.
 */
export default async function LearningPathPage({ params }: LearningPathPageProps) {
  const { slug } = await params;
  const path = getPath(slug);
  if (!path) notFound();

  return (
    <Container size="content" className="py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Knowledge Center", url: `${siteConfig.url}/knowledge` },
            { name: "Learning Paths", url: `${siteConfig.url}/knowledge/learning-paths` },
            {
              name: path.title,
              url: `${siteConfig.url}/knowledge/learning-paths/${path.slug}`,
            },
          ]),
        )}
      />
      <KnowledgeLearningPathDetail path={path} />
    </Container>
  );
}
