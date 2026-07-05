import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { KNOWLEDGE_ARTICLES } from "@/features/homepage/knowledge-center-preview";

export const metadata: Metadata = {
  title: "Knowledge Center",
  description:
    "Practical guides on product strategy, architecture, AI, accessibility, and commerce.",
};

/** A minimal index of every previewed article — the full Knowledge Center platform (CLAUDE.md Part 18) is a future milestone. */
export default function KnowledgePage() {
  return (
    <Container size="content" className="py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <Heading variant="display">Knowledge Center</Heading>
          <Text variant="subtitle">
            Practical engineering and product guides, not marketing content.
          </Text>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {KNOWLEDGE_ARTICLES.map((article) => (
            <Card key={article.slug} className="p-5">
              <Badge variant="neutral">{article.category}</Badge>
              <Heading variant="h5" className="mt-2">
                <Link
                  href={`/knowledge/${article.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  {article.title}
                </Link>
              </Heading>
              <Text variant="caption" className="mt-1">
                {article.difficulty} · {article.readingTime}
              </Text>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
