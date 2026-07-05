"use client";

import { useState } from "react";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { BuildPathPreviewProps } from "./BuildPathPreview.types";
import { QuestionnaireTaste } from "./QuestionnaireTaste";
import { RoadmapPreview } from "./RoadmapPreview";

const PREVIEW_TECHNOLOGIES = ["Next.js", "PostgreSQL", "AWS", "OpenAI", "Shopify"];

/**
 * CLAUDE.md Part 17's BuildPath, scoped to a homepage teaser (per the plan
 * decision): a real one-question taste of the questionnaire, a live
 * roadmap preview, and a technology strip — not the full 11-stage wizard,
 * which is BuildPath-scale product surface for a future milestone.
 */
export function BuildPathPreview({ className }: BuildPathPreviewProps) {
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const analytics = useAnalytics();

  function handleSelectGoal(goalId: string) {
    setSelectedGoalId(goalId);
    analytics.track("buildpath_preview_goal_selected", { goal: goalId });
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Headline and description verbatim from CLAUDE.md Part 17 Stage 1. */}
      <div className="space-y-2">
        <Heading variant="h2">Let&apos;s plan your product together.</Heading>
        <Text variant="subtitle">
          In about three minutes we&apos;ll help you understand your product roadmap.
        </Text>
      </div>

      <Card className="grid gap-8 p-6 lg:grid-cols-2 lg:p-10">
        <div className="space-y-6">
          <QuestionnaireTaste selectedGoalId={selectedGoalId} onSelectGoal={handleSelectGoal} />
          <RoadmapPreview selectedGoalId={selectedGoalId} />
        </div>

        <div className="space-y-6">
          <div>
            <Text variant="caption" className="font-medium">
              Representative technology
            </Text>
            <Text variant="body" className="mt-1">
              BuildPath explains why a technology fits your product, not just that it exists.
            </Text>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {PREVIEW_TECHNOLOGIES.map((technology) => (
                <Badge key={technology} variant="outline">
                  {technology}
                </Badge>
              ))}
            </div>
          </div>

          <Button asChild onClick={() => analytics.track("buildpath_preview_cta_clicked", {})}>
            <Link href="/buildpath">Continue in BuildPath</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
