"use client";

import { cn } from "@/utils/cn";

import { AiFeatureSuggestions } from "./AiFeatureSuggestions";
import { FeatureBoard } from "./FeatureBoard";
import type { PrioritizationStageProps } from "./PrioritizationStage.types";

/** CLAUDE.md Milestone 14 §§10-11's Prioritization stage: AI suggestions feed the same board manual features land on. */
export function PrioritizationStage({ className }: PrioritizationStageProps) {
  return (
    <div className={cn("space-y-10", className)}>
      <AiFeatureSuggestions />
      <div className="border-border border-t pt-8">
        <FeatureBoard />
      </div>
    </div>
  );
}
