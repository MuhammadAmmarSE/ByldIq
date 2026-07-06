import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import { LEARNING_PATHS } from "./data/learning-paths";
import type { KnowledgeLearningPathsProps } from "./KnowledgeLearningPaths.types";

/**
 * CLAUDE.md Part 18's Learning Paths landing list. Currently ships one
 * real path (`data/learning-paths.ts` explains why the spec's other seven
 * named audiences aren't built yet) — rendered the same way any list
 * would be, so adding a second real path later requires no changes here.
 */
export function KnowledgeLearningPaths({ className }: KnowledgeLearningPathsProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2", className)}>
      {LEARNING_PATHS.map((path) => (
        <Card key={path.slug} className="flex h-full flex-col p-6">
          <Badge variant="neutral">{path.articleSlugs.length} articles</Badge>
          <Heading variant="h4" as="h3" className="mt-3">
            <Link
              href={`/knowledge/learning-paths/${path.slug}`}
              className="hover:text-accent transition-colors"
            >
              {path.title}
            </Link>
          </Heading>
          <Text variant="caption" className="mt-1">
            {path.audience}
          </Text>
          <Text variant="body" className="mt-3">
            {path.description}
          </Text>
        </Card>
      ))}
    </div>
  );
}
