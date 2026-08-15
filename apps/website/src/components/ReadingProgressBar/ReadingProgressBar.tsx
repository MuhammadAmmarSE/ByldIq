"use client";

import { useEffect, useRef } from "react";

import { Progress } from "@/components/Progress";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { cn } from "@/utils/cn";

import type { ReadingProgressBarProps } from "./ReadingProgressBar.types";

/**
 * CLAUDE.md Part 18/23's Reading Experience: reading progress. A thin bar
 * fixed to the top of the viewport, filled by how far down the page a
 * visitor has scrolled — reuses the design system's real `Progress`
 * primitive rather than a bespoke bar. Shared by the Knowledge Center
 * (`/knowledge/[slug]`) and Case Studies (`/work/[slug]`) — promoted here
 * in Milestone 12 once Case Studies became a second real consumer of what
 * was previously `KnowledgeReadingProgress`.
 */
export function ReadingProgressBar({ onComplete, className }: ReadingProgressBarProps) {
  const percent = useReadingProgress();
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (percent >= 100 && !hasCompleted.current) {
      hasCompleted.current = true;
      onComplete?.();
    }
  }, [percent, onComplete]);

  return (
    <Progress
      value={percent}
      label="Reading progress"
      className={cn("z-fixed fixed top-0 left-0 h-1 rounded-none", className)}
    />
  );
}
