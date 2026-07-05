"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { ArchitectureExplorerProps } from "./ArchitectureExplorer.types";

/**
 * CLAUDE.md Part 20's Architecture Explorer: a clickable system diagram of
 * how a solution's components fit together end to end. `architecture` data
 * is authored in request-flow order (e.g. Visitor → Web App → API →
 * Database), so array order doubles as the diagram's sequence — there's no
 * separate connections model, which keeps content authoring simple while
 * every node stays independently inspectable.
 */
export function ArchitectureExplorer({ solution, className }: ArchitectureExplorerProps) {
  const analytics = useAnalytics();
  const [selectedId, setSelectedId] = useState(solution.architecture[0]?.id);
  const selected = solution.architecture.find((node) => node.id === selectedId);

  function handleSelect(id: string) {
    setSelectedId(id);
    analytics.track("solution_architecture_node_selected", { slug: solution.slug, node: id });
  }

  return (
    <section id="architecture" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        How it fits together
      </Heading>

      <div
        role="list"
        aria-label={`${solution.title} architecture`}
        className="flex flex-wrap items-center gap-1 overflow-x-auto"
      >
        {solution.architecture.map((node, index) => (
          <div key={node.id} role="listitem" className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleSelect(node.id)}
              aria-pressed={selectedId === node.id}
              className={cn(
                "shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                selectedId === node.id
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface-raised text-foreground hover:bg-border/60",
              )}
            >
              {node.label}
            </button>
            {index < solution.architecture.length - 1 && (
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
