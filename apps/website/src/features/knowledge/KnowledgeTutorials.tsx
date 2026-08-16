"use client";

import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { CATEGORIES_BY_SLUG } from "./data/facets";
import { TUTORIALS } from "./data/tutorials";
import type { KnowledgeTutorialsProps } from "./KnowledgeTutorials.types";

/**
 * CLAUDE.md Part 18/19's Tutorials entry point (`/knowledge/tutorials`).
 * A real listing over `data/tutorials.ts` — the honest count is stated
 * plainly (CLAUDE.md's content strategy never pads volume), the same
 * discipline `KnowledgePlaybooks` follows.
 *
 * Tutorials get their own small card here rather than reusing
 * `ArticleCard`: a `Tutorial` isn't a `KnowledgeArticle` (no executive
 * summary, no AI summary to expand) — forcing it through that card would
 * mean fabricating fields it doesn't have.
 */
export function KnowledgeTutorials({ className }: KnowledgeTutorialsProps) {
  const analytics = useAnalytics();

  return (
    <div className={cn("space-y-6", className)} aria-labelledby="knowledge-tutorials-heading">
      <Heading variant="h3" as="h2" id="knowledge-tutorials-heading">
        All tutorials
      </Heading>
      <Text variant="body" className="text-muted max-w-2xl">
        {TUTORIALS.length === 1
          ? "One hands-on tutorial is published so far. More are added as they're written — never padded out to look busier than the collection really is."
          : `${TUTORIALS.length} hands-on tutorials are published so far. More are added as they're written.`}
      </Text>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TUTORIALS.map((tutorial) => (
          <Card key={tutorial.slug} className="flex h-full flex-col">
            <Card.Header>
              <div className="flex items-center gap-2">
                <Badge variant="neutral">
                  {CATEGORIES_BY_SLUG.get(tutorial.category)?.label ?? tutorial.category}
                </Badge>
                <Text variant="caption">{tutorial.difficulty}</Text>
                <Text variant="caption">·</Text>
                <Text variant="caption">{tutorial.duration}</Text>
              </div>
              <Heading variant="h5" as="h3" className="mt-2">
                <Link
                  href={`/knowledge/tutorials/${tutorial.slug}`}
                  onClick={() => analytics.track("knowledge_card_clicked", { slug: tutorial.slug })}
                  className="hover:text-accent transition-colors"
                >
                  {tutorial.title}
                </Link>
              </Heading>
            </Card.Header>
            <Card.Content className="flex flex-1 flex-col">
              <Text variant="body">{tutorial.summary}</Text>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}
