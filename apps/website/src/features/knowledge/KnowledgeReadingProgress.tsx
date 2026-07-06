"use client";

import { Progress } from "@/components/Progress";
import { cn } from "@/utils/cn";

import { useReadingProgress } from "./useReadingProgress";
import type { KnowledgeReadingProgressProps } from "./KnowledgeReadingProgress.types";

/**
 * CLAUDE.md Part 18's Reading Experience: reading progress. A thin bar
 * fixed to the top of the viewport, filled by how far down the article a
 * visitor has scrolled — reuses the design system's real `Progress`
 * primitive rather than a bespoke bar.
 */
export function KnowledgeReadingProgress({ className }: KnowledgeReadingProgressProps) {
  const percent = useReadingProgress();

  return (
    <Progress
      value={percent}
      label="Reading progress"
      className={cn("z-fixed fixed top-0 left-0 h-1 rounded-none", className)}
    />
  );
}
