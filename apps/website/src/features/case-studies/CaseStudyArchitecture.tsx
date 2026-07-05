"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { CaseStudyArchitectureProps } from "./CaseStudyArchitecture.types";

/**
 * CLAUDE.md Part 21's Architecture section: a clickable system diagram of
 * how this project's components fit together end to end. Same pattern as
 * the Solutions Platform's `ArchitectureExplorer` — `architecture` is
 * authored in request-flow order, so array order doubles as the diagram's
 * sequence, keeping every node independently inspectable without a
 * separate connections model.
 */
export function CaseStudyArchitecture({ caseStudy, className }: CaseStudyArchitectureProps) {
  const analytics = useAnalytics();
  const [selectedId, setSelectedId] = useState(caseStudy.architecture[0]?.id);
  const selected = caseStudy.architecture.find((node) => node.id === selectedId);

  function handleSelect(id: string) {
    setSelectedId(id);
    analytics.track("case_study_architecture_node_selected", { slug: caseStudy.slug, node: id });
  }

  return (
    <section id="architecture" className={cn("space-y-4", className)}>
      <Heading variant="h3" as="h2">
        How it fits together
      </Heading>

      <div
        role="list"
        aria-label={`${caseStudy.headline} architecture`}
        className="flex flex-wrap items-center gap-1 overflow-x-auto"
      >
        {caseStudy.architecture.map((node, index) => (
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
            {index < caseStudy.architecture.length - 1 && (
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
