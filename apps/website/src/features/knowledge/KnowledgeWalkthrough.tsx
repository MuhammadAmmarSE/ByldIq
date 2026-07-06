"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { KnowledgeWalkthroughProps } from "./KnowledgeWalkthrough.types";

/**
 * CLAUDE.md Part 18's Interactive Learning section: a clickable walkthrough
 * of the article's argument, one step at a time. `walkthrough` data is
 * authored in the order the reasoning unfolds, so array order doubles as
 * the walkthrough's sequence — the same data model and interaction pattern
 * as the Technology Explorer's `TechnologyArchitecture` and Solutions'
 * `ArchitectureExplorer`, applied here to a reasoning sequence instead of
 * a system diagram.
 */
export function KnowledgeWalkthrough({ article, className }: KnowledgeWalkthroughProps) {
  const analytics = useAnalytics();
  const [selectedId, setSelectedId] = useState(article.walkthrough[0]?.id);
  const selected = article.walkthrough.find((step) => step.id === selectedId);

  function handleSelect(id: string) {
    setSelectedId(id);
    analytics.track("knowledge_walkthrough_step_selected", { slug: article.slug, step: id });
  }

  return (
    <section id="interactive-learning" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Walk through it
      </Heading>

      <div
        role="list"
        aria-label={`${article.title} walkthrough`}
        className="flex flex-wrap items-center gap-1 overflow-x-auto"
      >
        {article.walkthrough.map((step, index) => (
          <div key={step.id} role="listitem" className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleSelect(step.id)}
              aria-pressed={selectedId === step.id}
              className={cn(
                "shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                selectedId === step.id
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface-raised text-foreground hover:bg-border/60",
              )}
            >
              {step.label}
            </button>
            {index < article.walkthrough.length - 1 && (
              <Icon icon={ChevronRight} size="sm" className="text-muted shrink-0" />
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className="border-border bg-surface-raised rounded-lg border p-4">
          <Text variant="caption" className="font-medium">
            {selected.label}
          </Text>
          <Text variant="body" className="mt-1">
            {selected.description}
          </Text>
        </div>
      )}
    </section>
  );
}
