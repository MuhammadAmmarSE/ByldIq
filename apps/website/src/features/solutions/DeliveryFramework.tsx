"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import { DELIVERY_STAGES } from "./data/delivery-stages";

import "./analytics";

import type { DeliveryFrameworkProps } from "./DeliveryFramework.types";

/**
 * CLAUDE.md Part 20's Delivery Framework: the same nine-stage engineering
 * process (Discovery → Optimization, `data/delivery-stages.ts`) walked
 * through for every solution. Same selectable-pipeline interaction as
 * `ArchitectureExplorer` and the homepage's `PipelineVisualizer`.
 */
export function DeliveryFramework({ solution, className }: DeliveryFrameworkProps) {
  const analytics = useAnalytics();
  const [selectedId, setSelectedId] = useState(DELIVERY_STAGES[0]?.id);
  const selected = DELIVERY_STAGES.find((stage) => stage.id === selectedId);

  function handleSelect(id: string) {
    setSelectedId(id);
    analytics.track("solution_delivery_stage_selected", { slug: solution.slug, stage: id });
  }

  return (
    <section id="delivery" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        How we deliver it
      </Heading>

      <div
        role="list"
        aria-label="Delivery framework stages"
        className="flex flex-wrap items-center gap-1 overflow-x-auto"
      >
        {DELIVERY_STAGES.map((stage, index) => (
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
            {index < DELIVERY_STAGES.length - 1 && (
              <Icon icon={ChevronRight} size="sm" className="text-muted shrink-0" />
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className="border-border bg-surface-raised rounded-lg border p-4">
          <Text variant="body">{selected.description}</Text>
        </div>
      )}
    </section>
  );
}
