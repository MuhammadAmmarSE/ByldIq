import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { ProjectCardProps } from "./ProjectCard.types";

/**
 * A Proof Engine project card (CLAUDE.md Part 13). Clicking navigates to a
 * dedicated case study page — Part 13 explicitly says "Instead of opening a
 * modal, navigate to a dedicated case study."
 */
export function ProjectCard({ caseStudy, company, onSelect, className }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "group hover:border-accent/50 relative flex h-full flex-col transition hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      <Card.Header>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="neutral">{company.industry}</Badge>
        </div>
        {/* `as="h3"` keeps correct document heading order (this card follows
            the featured story's h2) while `variant="h5"` keeps the smaller
            visual size a grid card needs. */}
        <Heading variant="h5" as="h3" className="mt-2">
          <Link
            href={`/case-studies/${caseStudy.slug}`}
            onClick={() => onSelect?.(caseStudy.slug)}
            className="hover:text-accent focus-visible:ring-focus-ring rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <span className="after:absolute after:inset-0">{caseStudy.headline}</span>
          </Link>
        </Heading>
        <Text variant="caption">{company.name}</Text>
      </Card.Header>

      <Card.Content className="flex flex-1 flex-col gap-4">
        <Text variant="body" className="line-clamp-3">
          {caseStudy.challenge}
        </Text>

        <div className="mt-auto grid grid-cols-2 gap-3">
          {caseStudy.metrics.slice(0, 2).map((metric) => (
            <div key={metric.label}>
              <p className="text-foreground text-lg font-semibold">{metric.value}</p>
              <p className="text-muted text-xs">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {caseStudy.technologies.map((technology) => (
            <Badge key={technology} variant="outline">
              {technology}
            </Badge>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
