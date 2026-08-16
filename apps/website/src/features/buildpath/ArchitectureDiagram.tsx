"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/Badge";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { staggerContainer, staggerItemTransformOnly } from "@/lib/motion-variants";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { mockAIProvider } from "./engine";
import { useBuildPathAnswers } from "./useBuildPathAnswers";
import type { ArchitectureDiagramProps } from "./ArchitectureDiagram.types";

/**
 * CLAUDE.md Milestone 14 §12's generated architecture — the same
 * selectable-pipeline pattern as `CaseStudyArchitecture` (a chip row in
 * request-flow order, click to inspect), but every node carries the
 * fuller What/Why/Alternative/Trade-off/Cost/Scaling explanation CLAUDE.md
 * §12 calls for ("No black-box AI decisions"), not just a description.
 * Nodes are recomputed on every render from the current answers — adding
 * or removing an integration changes the diagram immediately, no manual
 * regeneration step.
 */
export function ArchitectureDiagram({ className }: ArchitectureDiagramProps) {
  const analytics = useAnalytics();
  const answers = useBuildPathAnswers();
  const nodes = useMemo(() => mockAIProvider.generateArchitecture(answers), [answers]);
  const [selectedId, setSelectedId] = useState(nodes[0]?.id);

  const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0];

  function handleSelect(id: string) {
    setSelectedId(id);
    analytics.track("buildpath_architecture_node_selected", { node: id });
  }

  return (
    <div className={cn("space-y-4", className)}>
      <motion.div
        role="list"
        aria-label="Generated architecture"
        className="flex flex-wrap items-center gap-1 overflow-x-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            role="listitem"
            className="flex items-center gap-1"
            variants={staggerItemTransformOnly}
          >
            <button
              type="button"
              onClick={() => handleSelect(node.id)}
              aria-pressed={selected?.id === node.id}
              className={cn(
                "shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                selected?.id === node.id
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface-raised text-foreground hover:bg-border/60",
              )}
            >
              {node.label}
            </button>
            {index < nodes.length - 1 && (
              <Icon icon={ChevronRight} size="sm" className="text-muted shrink-0" />
            )}
          </motion.div>
        ))}
      </motion.div>

      {selected && (
        <div className="border-border bg-surface-raised space-y-3 rounded-lg border p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Text variant="caption" className="font-medium">
              {selected.label}
            </Text>
            <Badge variant="outline">{selected.category}</Badge>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Text variant="caption" className="text-muted font-medium">
                What
              </Text>
              <Text variant="body">{selected.what}</Text>
            </div>
            <div>
              <Text variant="caption" className="text-muted font-medium">
                Why
              </Text>
              <Text variant="body">{selected.why}</Text>
            </div>
            <div>
              <Text variant="caption" className="text-muted font-medium">
                Alternative
              </Text>
              <Text variant="body">{selected.alternative}</Text>
            </div>
            <div>
              <Text variant="caption" className="text-muted font-medium">
                Trade-off
              </Text>
              <Text variant="body">{selected.tradeOff}</Text>
            </div>
            <div>
              <Text variant="caption" className="text-muted font-medium">
                Cost
              </Text>
              <Text variant="body">{selected.costConsideration}</Text>
            </div>
            <div>
              <Text variant="caption" className="text-muted font-medium">
                Scaling
              </Text>
              <Text variant="body">{selected.scalingConsideration}</Text>
            </div>
          </div>

          {selected.technologySlug && (
            <Link
              href={`/technology/${selected.technologySlug}`}
              onClick={() =>
                analytics.track("buildpath_technology_explorer_clicked", {
                  technologySlug: selected.technologySlug ?? "",
                })
              }
              className="text-accent hover:text-accent/80 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
            >
              More in the Technology Explorer
              <Icon icon={ArrowRight} size="xs" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
