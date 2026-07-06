import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { TechnologyCardProps } from "./TechnologyCard.types";

/**
 * A Technology Explorer grid card (CLAUDE.md Part 22). Clicking navigates
 * to the technology's detail page — the same "no modal, dedicated page"
 * pattern the Proof Engine's `ProjectCard` uses for case studies.
 */
export function TechnologyCard({
  technology,
  categoryLabel,
  onSelect,
  className,
}: TechnologyCardProps) {
  return (
    <Card
      className={cn(
        "group hover:border-accent/50 relative flex h-full flex-col transition hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      <Card.Header>
        <div className="flex items-center justify-between gap-2">
          {categoryLabel ? <Badge variant="neutral">{categoryLabel}</Badge> : null}
          <Text variant="caption">{technology.maturity}</Text>
        </div>
        {/* `as="h3"` keeps correct document heading order under the grid's h2. */}
        <Heading variant="h5" as="h3" className="mt-2">
          <Link
            href={`/technology/${technology.slug}`}
            onClick={() => onSelect?.(technology.slug)}
            className="hover:text-accent focus-visible:ring-focus-ring rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <span className="after:absolute after:inset-0">{technology.name}</span>
          </Link>
        </Heading>
      </Card.Header>

      <Card.Content className="flex flex-1 flex-col gap-4">
        <Text variant="body" className="line-clamp-3">
          {technology.tagline}
        </Text>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {technology.strengths.slice(0, 3).map((strength) => (
            <Badge key={strength.label} variant="outline">
              {strength.label}
            </Badge>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
