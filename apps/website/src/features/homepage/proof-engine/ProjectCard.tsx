import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AnimatedMetricValue } from "@/components/AnimatedMetricValue";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import { ProjectVisual } from "./ProjectVisual";
import type { ProjectCardProps } from "./ProjectCard.types";

/**
 * A Proof Engine project card (CLAUDE.md Part 13). Clicking navigates to a
 * dedicated case study page — Part 13 explicitly says "Instead of opening a
 * modal, navigate to a dedicated case study."
 *
 * Hover (CLAUDE.md Part 13: "Image. Subtle zoom. Gradient overlay. Metric
 * appears. Arrow moves"): `ProjectVisual`'s grid subtly scales/brightens,
 * and the "View project" arrow translates. Metrics stay always-visible
 * rather than hover-gated — this codebase's own UX philosophy (Part 4:
 * "Never hide critical information") outweighs matching the spec's
 * hover-reveal sequence literally, and hover has no equivalent on touch
 * devices without a tap-triggered fallback the spec doesn't call for.
 */
export function ProjectCard({ caseStudy, company, onSelect, className }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "group hover:border-accent/50 relative flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      <ProjectVisual id={`project-visual-${caseStudy.slug}`} className="h-32 w-full shrink-0" />

      <Card.Header>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="neutral">{company.industry}</Badge>
        </div>
        {/* `as="h3"` keeps correct document heading order (this card follows
            the featured story's h2) while `variant="h5"` keeps the smaller
            visual size a grid card needs. */}
        <Heading variant="h5" as="h3" className="mt-2">
          <Link
            href={`/work/${caseStudy.slug}`}
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
              <p className="text-foreground text-lg font-semibold">
                <AnimatedMetricValue value={metric.value} />
              </p>
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

        {/* Purely a visual affordance — the actual click target is the
            heading link's `after:absolute after:inset-0` above, so this
            stays non-interactive rather than nesting a second link. */}
        <div aria-hidden="true" className="text-accent flex items-center gap-1 text-sm font-medium">
          View project
          <Icon
            icon={ArrowRight}
            size="sm"
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </Card.Content>
    </Card>
  );
}
