"use client";

import { Sparkles } from "lucide-react";

import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { generateArticleSummary, SUMMARY_MODE_OPTIONS, type SummaryMode } from "./summarize";
import type { KnowledgeSummarizerProps } from "./KnowledgeSummarizer.types";

/**
 * CLAUDE.md Part 18/19's "AI summaries" — 30-second / executive /
 * beginner / technical, each a deterministic recombination of the
 * article's own fields (`summarize.ts`), not a live model call. Placed
 * right after the hero so a visitor can decide how to read before
 * committing to the full article.
 */
export function KnowledgeSummarizer({ article, className }: KnowledgeSummarizerProps) {
  const analytics = useAnalytics();

  function handleModeChange(mode: string) {
    analytics.track("knowledge_summary_mode_selected", {
      slug: article.slug,
      mode: mode as SummaryMode,
    });
  }

  return (
    <Card className={cn("space-y-4 p-5", className)}>
      <div className="flex items-center gap-2">
        <Icon icon={Sparkles} size="sm" className="text-accent" />
        <Heading variant="h3" as="h2">
          Ask Byld to summarize
        </Heading>
      </div>

      <Tabs defaultValue={SUMMARY_MODE_OPTIONS[0]?.mode} onValueChange={handleModeChange}>
        <TabsList aria-label="Summary style">
          {SUMMARY_MODE_OPTIONS.map((option) => (
            <TabsTrigger key={option.mode} value={option.mode}>
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {SUMMARY_MODE_OPTIONS.map((option) => (
          <TabsContent key={option.mode} value={option.mode} className="space-y-1">
            <Text variant="caption">{option.description}</Text>
            <Text variant="body">{generateArticleSummary(article, option.mode)}</Text>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
