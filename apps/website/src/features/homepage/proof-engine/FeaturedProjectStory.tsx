import Link from "next/link";

import { AnimatedMetricValue } from "@/components/AnimatedMetricValue";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import { ProjectVisual } from "./ProjectVisual";
import type { FeaturedProjectStoryProps } from "./FeaturedProjectStory.types";

/**
 * The Proof Engine's large featured-project presentation (CLAUDE.md Part
 * 13/11): image band, name, industry, problem, technology, and business
 * results, in that order.
 */
export function FeaturedProjectStory({
  caseStudy,
  company,
  onSelect,
  className,
}: FeaturedProjectStoryProps) {
  return (
    <Card className={cn("group overflow-hidden", className)}>
      <ProjectVisual id={`featured-visual-${caseStudy.slug}`} className="h-40 w-full sm:h-48" />

      <div className="grid gap-8 p-6 lg:grid-cols-2 lg:p-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="accent">Featured</Badge>
            <Badge variant="neutral">{company.industry}</Badge>
          </div>
          <Heading variant="h2">{caseStudy.headline}</Heading>
          <Text variant="caption">{company.name}</Text>
          <Text variant="body">{caseStudy.challenge}</Text>
          <Button asChild onClick={() => onSelect?.(caseStudy.slug)}>
            <Link href={`/work/${caseStudy.slug}`}>Read the full story</Link>
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {caseStudy.metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-border bg-surface-raised rounded-lg border p-4"
              >
                <p className="text-foreground text-2xl font-semibold">
                  <AnimatedMetricValue value={metric.value} />
                </p>
                <p className="text-muted text-sm">{metric.label}</p>
              </div>
            ))}
          </div>

          <div>
            <Text variant="caption" className="font-medium">
              Technology
            </Text>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {caseStudy.technologies.map((technology) => (
                <Badge key={technology} variant="outline">
                  {technology}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
