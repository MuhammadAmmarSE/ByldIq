"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import { PIPELINE_STAGES } from "./data/pipeline-stages";
import type { PipelineVisualizerProps } from "./PipelineVisualizer.types";

/**
 * A clickable walkthrough of this repository's real CI/CD stages
 * (CLAUDE.md Part 15's pipeline visualizer) — each stage expands into a
 * plain-language explanation of what actually happens at that point.
 */
export function PipelineVisualizer({ onStageSelect, className }: PipelineVisualizerProps) {
  const [selectedId, setSelectedId] = useState(PIPELINE_STAGES[0]?.id);
  const selected = PIPELINE_STAGES.find((stage) => stage.id === selectedId);

  function handleSelect(id: string) {
    setSelectedId(id);
    onStageSelect?.(id);
  }

  return (
    <div className={cn(className)}>
      <div
        role="list"
        aria-label="CI/CD pipeline stages"
        className="flex flex-wrap items-center gap-1 overflow-x-auto"
      >
        {PIPELINE_STAGES.map((stage, index) => (
          <div key={stage.id} role="listitem" className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleSelect(stage.id)}
              aria-pressed={selectedId === stage.id}
              className={cn(
                "shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                selectedId === stage.id
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface-raised text-foreground hover:bg-border/60",
              )}
            >
              {stage.label}
            </button>
            {index < PIPELINE_STAGES.length - 1 && (
              <Icon icon={ChevronRight} size="sm" className="text-muted shrink-0" />
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className="border-border bg-surface-raised mt-4 rounded-lg border p-4">
          <Text variant="body">{selected.description}</Text>
        </div>
      )}
    </div>
  );
}
