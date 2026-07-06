import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import {
  CATEGORIES_BY_SLUG,
  KNOWLEDGE_ARTICLES,
  KnowledgeArticleHero,
  KnowledgeCommonMistakes,
  KnowledgeCoreConcepts,
  KnowledgeExecutiveSummary,
  KnowledgeRealExamples,
  KnowledgeRelatedCaseStudies,
  KnowledgeRelatedTechnologies,
  KnowledgeWalkthrough,
  KnowledgeWhyItMatters,
} from "@/features/knowledge";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

interface KnowledgeArticlePageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-renders every known article at build time (CLAUDE.md Part 18) — unknown slugs fall through to `notFound()`. */
export function generateStaticParams() {
  return KNOWLEDGE_ARTICLES.map((article) => ({ slug: article.slug }));
}

function getArticle(slug: string) {
  return KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === slug);
}

export async function generateMetadata({ params }: KnowledgeArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/knowledge/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `/knowledge/${article.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
    },
  };
}

/**
 * One shared template driven entirely by `KNOWLEDGE_ARTICLES` data — every
 * article page has the same section order (CLAUDE.md Part 18). Currently
 * covers the article template's first ten sections (through Related Case
 * Studies, AI Companion, and BuildPath integration via the hero); Related
 * Learning and the sticky sidebar land in a later phase of this milestone.
 */
export default async function KnowledgeArticlePage({ params }: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const category = CATEGORIES_BY_SLUG.get(article.category);

  return (
    <Container size="content" className="space-y-16 py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Knowledge Center", url: `${siteConfig.url}/knowledge` },
            { name: article.title, url: `${siteConfig.url}/knowledge/${article.slug}` },
          ]),
        )}
      />
      <KnowledgeArticleHero article={article} categoryLabel={category?.label} />
      <div className="space-y-16">
        <KnowledgeExecutiveSummary article={article} />
        <KnowledgeWhyItMatters article={article} />
        <KnowledgeCoreConcepts article={article} />
        <KnowledgeWalkthrough article={article} />
        <KnowledgeRealExamples article={article} />
        <KnowledgeCommonMistakes article={article} />
        <KnowledgeRelatedTechnologies article={article} />
        <KnowledgeRelatedCaseStudies article={article} />
      </div>
    </Container>
  );
}
