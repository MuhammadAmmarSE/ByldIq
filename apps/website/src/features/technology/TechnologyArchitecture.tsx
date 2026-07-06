"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { TechnologyArchitectureProps } from "./TechnologyArchitecture.types";

/**
 * CLAUDE.md Part 22's Interactive Architecture section: a clickable diagram
 * showing where a technology sits inside a real system end to end.
 * `architecture` data is authored in request-flow order, so array order
 * doubles as the diagram's sequence — the same data model and interaction
 * pattern as Solutions' `ArchitectureExplorer`.
 */
export function TechnologyArchitecture({ technology, className }: TechnologyArchitectureProps) {
  const analytics = useAnalytics();
  const [selectedId, setSelectedId] = useState(technology.architecture[0]?.id);
  const selected = technology.architecture.find((node) => node.id === selectedId);

  function handleSelect(id: string) {
    setSelectedId(id);
    analytics.track("technology_architecture_node_selected", { slug: technology.slug, node: id });
  }

  return (
    <section id="architecture" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Where it fits in a real system
      </Heading>

      <div
        role="list"
        aria-label={`${technology.name} architecture`}
        className="flex flex-wrap items-center gap-1 overflow-x-auto"
      >
        {technology.architecture.map((node, index) => (
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
            {index < technology.architecture.length - 1 && (
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
