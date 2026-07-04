import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { FeaturedProjectStoryProps } from "./FeaturedProjectStory.types";

/** The Proof Engine's large featured-project presentation (CLAUDE.md Part 13). */
export function FeaturedProjectStory({ caseStudy, company, className }: FeaturedProjectStoryProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="grid gap-8 p-6 lg:grid-cols-2 lg:p-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="accent">Featured</Badge>
            <Badge variant="neutral">{company.industry}</Badge>
          </div>
          <Heading variant="h2">{caseStudy.headline}</Heading>
          <Text variant="caption">{company.name}</Text>
          <Text variant="body">{caseStudy.challenge}</Text>
          <Button asChild>
            <Link href={`/case-studies/${caseStudy.slug}`}>Read the full story</Link>
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {caseStudy.metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-border bg-surface-raised rounded-lg border p-4"
              >
                <p className="text-foreground text-2xl font-semibold">{metric.value}</p>
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
