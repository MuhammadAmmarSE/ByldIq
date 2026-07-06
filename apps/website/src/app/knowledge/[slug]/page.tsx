import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Badge } from "@/components/Badge";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { KNOWLEDGE_ARTICLES } from "@/features/knowledge";

interface KnowledgeArticlePageProps {
  params: Promise<{ slug: string }>;
}

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
  return { title: article.title, description: article.summary };
}

/**
 * A minimal article page — the full Knowledge Center reading experience
 * (bookmarking, AI summaries, related content, learning paths per
 * CLAUDE.md Part 18) is a future milestone. This exists so the homepage
 * preview's links go somewhere real rather than a dead end.
 */
export default async function KnowledgeArticlePage({ params }: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <Container size="content" className="py-16">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="neutral">{article.category}</Badge>
            <Text variant="caption">
              {article.difficulty} · {article.readingTime}
            </Text>
          </div>
          <Heading variant="display">{article.title}</Heading>
        </div>

        <Text variant="subtitle">{article.summary}</Text>
        <Text variant="body">{article.aiSummary}</Text>
      </div>
    </Container>
  );
}
