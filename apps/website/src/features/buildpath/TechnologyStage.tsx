"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { mockAIProvider } from "./engine";
import { useBuildPathAnswers } from "./useBuildPathAnswers";
import type { TechnologyStageProps } from "./TechnologyStage.types";

/**
 * CLAUDE.md Milestone 14 §13's Technology Recommendations — each with a
 * real alternative and reasoning, never a bare technology name. Every
 * `recommendedSlug` cross-links to the real Technology Explorer rather
 * than duplicating that content here.
 */
export function TechnologyStage({ className }: TechnologyStageProps) {
  const analytics = useAnalytics();
  const answers = useBuildPathAnswers();
  const stack = useMemo(() => mockAIProvider.generateTechnologyStack(answers), [answers]);

  return (
    <div className={cn("space-y-4", className)}>
      <Text variant="body" className="text-muted">
        A starting stack for this plan — every recommendation lists an alternative and why we&apos;d
        lean one way or the other.
      </Text>

      <div className="grid gap-4 sm:grid-cols-2">
        {stack.map((recommendation) => (
          <Card key={recommendation.category} className="space-y-2 p-4">
            <Text variant="caption" className="text-muted font-medium">
              {recommendation.category}
            </Text>
            <Text variant="body" className="font-medium">
              {recommendation.recommended}
            </Text>
            <Text variant="caption">Alternative: {recommendation.alternative}</Text>
            <Text variant="body">{recommendation.why}</Text>
            {recommendation.recommendedSlug && (
              <Link
                href={`/technology/${recommendation.recommendedSlug}`}
                onClick={() =>
                  analytics.track("buildpath_technology_explorer_clicked", {
                    technologySlug: recommendation.recommendedSlug ?? "",
                  })
                }
                className="text-accent hover:text-accent/80 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
              >
                More on {recommendation.recommended}
                <Icon icon={ArrowRight} size="xs" />
              </Link>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
