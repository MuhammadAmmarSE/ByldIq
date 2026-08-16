"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Heading } from "@/components/Heading";
import { Label } from "@/components/Label";
import { Progress } from "@/components/Progress";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useAppStore } from "@/providers/StoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { CATEGORIES_BY_SLUG } from "./data/facets";
import type { KnowledgeLearningPathDetailProps } from "./KnowledgeLearningPathDetail.types";

const ARTICLES_BY_SLUG = new Map(KNOWLEDGE_ARTICLES.map((article) => [article.slug, article]));

/**
 * CLAUDE.md Part 18's Learning Path detail: the ordered article sequence,
 * a progress bar, and per-step completion checkboxes — completion is
 * persisted through the app store's `completedArticleSlugs`, the same
 * safe-storage-backed persistence `bookmarkedArticleSlugs` already uses.
 * Certificates (also named in the spec) aren't built — there's no user
 * account or identity system to issue one against yet.
 */
export function KnowledgeLearningPathDetail({ path, className }: KnowledgeLearningPathDetailProps) {
  const analytics = useAnalytics();
  const completedArticleSlugs = useAppStore((state) => state.completedArticleSlugs);
  const toggleArticleCompleted = useAppStore((state) => state.toggleArticleCompleted);

  const steps = path.articleSlugs
    .map((slug) => ARTICLES_BY_SLUG.get(slug))
    .filter((article) => article !== undefined);
  const completedCount = steps.filter((article) =>
    completedArticleSlugs.includes(article.slug),
  ).length;
  const percent = steps.length === 0 ? 0 : Math.round((completedCount / steps.length) * 100);
  const firstStep = steps[0];
  const hasFiredCompletion = useRef(false);

  useEffect(() => {
    if (steps.length > 0 && completedCount === steps.length && !hasFiredCompletion.current) {
      hasFiredCompletion.current = true;
      analytics.track("learning_path_completed", { pathSlug: path.slug });
    }
    if (completedCount < steps.length) {
      hasFiredCompletion.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCount, steps.length, path.slug]);

  function handleStepSelect(articleSlug: string) {
    analytics.track("learning_path_step_selected", { pathSlug: path.slug, articleSlug });
  }

  function handleStart() {
    analytics.track("learning_path_started", { pathSlug: path.slug });
    if (firstStep) handleStepSelect(firstStep.slug);
  }

  return (
    <div className={cn("space-y-8", className)}>
      <div className="max-w-2xl space-y-3">
        <Badge variant="neutral">{steps.length} articles</Badge>
        <Heading variant="display">{path.title}</Heading>
        <Text variant="subtitle">{path.audience}</Text>
        <Text variant="body">{path.description}</Text>
      </div>

      <div className="max-w-2xl space-y-2">
        <Text variant="caption">
          {completedCount} of {steps.length} complete
        </Text>
        <Progress value={percent} label={`${path.title} progress`} />
      </div>

      {firstStep && (
        <Button asChild size="lg" onClick={handleStart}>
          <Link href={`/knowledge/${firstStep.slug}`}>Start this path</Link>
        </Button>
      )}

      <Heading variant="h3" as="h2">
        Articles in this path
      </Heading>

      <ol className="space-y-3">
        {steps.map((article, index) => {
          const isComplete = completedArticleSlugs.includes(article.slug);
          const checkboxId = `learning-path-step-${article.slug}`;
          const categoryLabel = CATEGORIES_BY_SLUG.get(article.category)?.label;

          return (
            <li
              key={article.slug}
              className="border-border flex items-start gap-4 rounded-lg border p-4"
            >
              <span className="bg-surface-raised text-muted flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                {index + 1}
              </span>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  {categoryLabel ? <Badge variant="neutral">{categoryLabel}</Badge> : null}
                  <Text variant="caption">
                    {article.difficulty} · {article.readingTime}
                  </Text>
                </div>
                <Heading variant="h5" as="h3">
                  <Link
                    href={`/knowledge/${article.slug}`}
                    onClick={() => handleStepSelect(article.slug)}
                    className="hover:text-accent transition-colors"
                  >
                    {article.title}
                  </Link>
                </Heading>
                <Text variant="body" className="text-muted">
                  {article.summary}
                </Text>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id={checkboxId}
                  checked={isComplete}
                  onCheckedChange={() => toggleArticleCompleted(article.slug)}
                />
                <Label htmlFor={checkboxId} className="text-sm">
                  Complete
                </Label>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
