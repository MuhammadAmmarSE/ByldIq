import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import {
  CATEGORIES_BY_SLUG,
  KNOWLEDGE_ARTICLES,
  KnowledgePlaybookDetail,
} from "@/features/knowledge";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

interface KnowledgePlaybookPageProps {
  params: Promise<{ slug: string }>;
}

const PLAYBOOKS = KNOWLEDGE_ARTICLES.filter(
  (article) => article.type === "playbook" && article.playbook,
);

/** Pre-renders every real playbook at build time — unknown or non-playbook slugs fall through to `notFound()`. */
export function generateStaticParams() {
  return PLAYBOOKS.map((article) => ({ slug: article.slug }));
}

function getPlaybookArticle(slug: string) {
  return PLAYBOOKS.find((candidate) => candidate.slug === slug);
}

export async function generateMetadata({ params }: KnowledgePlaybookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPlaybookArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/knowledge/playbooks/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `/knowledge/playbooks/${article.slug}`,
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
 * CLAUDE.md Part 18/19's dedicated playbook route — the same real
 * content `/knowledge/[slug]` renders as a full article, here as an
 * actionable checklist (`KnowledgePlaybookDetail`). Only articles with a
 * real `playbook` field are reachable; a playbook-typed article without
 * one (there shouldn't be any — `articles.test.ts` enforces it) would
 * otherwise render an empty checklist.
 */
export default async function KnowledgePlaybookPage({ params }: KnowledgePlaybookPageProps) {
  const { slug } = await params;
  const article = getPlaybookArticle(slug);
  if (!article) notFound();

  const category = CATEGORIES_BY_SLUG.get(article.category);

  return (
    <Container size="content" className="py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Knowledge Center", url: `${siteConfig.url}/knowledge` },
            { name: "Playbooks", url: `${siteConfig.url}/knowledge/playbooks` },
            { name: article.title, url: `${siteConfig.url}/knowledge/playbooks/${article.slug}` },
          ]),
        )}
      />
      <KnowledgePlaybookDetail article={article} categoryLabel={category?.label} />
    </Container>
  );
}
