import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { FeaturedGuideCardProps } from "./FeaturedGuideCard.types";

/** The Knowledge Center preview's featured guide (CLAUDE.md Part 18). */
export function FeaturedGuideCard({
  article,
  categoryLabel,
  onSelect,
  className,
}: FeaturedGuideCardProps) {
  return (
    <Card className={cn("p-6 lg:p-10", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="accent">Featured</Badge>
        <Badge variant="neutral">{categoryLabel ?? article.category}</Badge>
        <Text variant="caption">
          {article.difficulty} · {article.readingTime}
        </Text>
      </div>
      <Heading variant="h2" className="mt-4">
        {article.title}
      </Heading>
      <Text variant="body" className="mt-3 max-w-2xl">
        {article.summary}
      </Text>
      <Text variant="caption" className="mt-2">
        Part of the {categoryLabel ?? article.category} learning path.
      </Text>
      <Button asChild className="mt-6">
        <Link href={`/knowledge/${article.slug}`} onClick={() => onSelect?.(article.slug)}>
          Read the full guide
        </Link>
      </Button>
    </Card>
  );
}
