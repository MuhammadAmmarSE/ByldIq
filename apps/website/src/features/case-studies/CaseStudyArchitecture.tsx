"use client";

import { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { TECHNOLOGIES } from "@/features/technology/data/technologies";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";
import { slugify } from "@/utils/slugify";

import "./analytics";

import type { CaseStudyArchitectureProps } from "./CaseStudyArchitecture.types";

/**
 * CLAUDE.md Part 21's Architecture section: a clickable system diagram of
 * how this project's components fit together end to end. Same pattern as
 * the Solutions Platform's `ArchitectureExplorer` — `architecture` is
 * authored in request-flow order, so array order doubles as the diagram's
 * sequence, keeping every node independently inspectable without a
 * separate connections model. Nodes reveal in that same sequence on
 * scroll into view (CLAUDE.md Part 11: "Animate the architecture
 * diagram") via `staggerContainer`/`staggerItem`, which respect
 * `MotionProvider`'s reduced-motion setting like every other one-shot
 * transform in this codebase — click remains the only way to select a
 * node (not hover), keeping it keyboard- and touch-operable.
 *
 * Milestone 12: each node's detail panel shows its `technology` tag
 * (when set — see `data/case-study.schema.ts`'s doc comment on why this
 * is deliberately shallower than the spec's full alternatives/trade-offs
 * list, which `CaseStudyTechnologyDecisions` already covers on the same
 * page) and links to the real Technology Explorer when that technology
 * has an entry there — the same `TECHNOLOGY_EXPLORER_SLUGS` lookup
 * pattern `CaseStudyTechnologyDecisions` uses, imported from the leaf
 * data file rather than the `@/features/technology` barrel for the same
 * circular-dependency reason documented there.
 */
const TECHNOLOGY_EXPLORER_SLUGS = new Map(
  TECHNOLOGIES.map((technology) => [slugify(technology.name), technology.slug]),
);
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

      <motion.div
        role="list"
        aria-label={`${caseStudy.headline} architecture`}
        className="flex flex-wrap items-center gap-1 overflow-x-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {caseStudy.architecture.map((node, index) => (
          <motion.div
            key={node.id}
            role="listitem"
            className="flex items-center gap-1"
            variants={staggerItem}
          >
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
          </motion.div>
        ))}
      </motion.div>

      {selected &&
        (() => {
          const explorerSlug = selected.technology
            ? TECHNOLOGY_EXPLORER_SLUGS.get(slugify(selected.technology))
            : undefined;

          return (
            <div className="border-border bg-surface-raised space-y-2 rounded-lg border p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Text variant="caption" className="font-medium">
                  {selected.label}
                </Text>
                {selected.technology && <Badge variant="outline">{selected.technology}</Badge>}
              </div>
              <Text variant="body">{selected.description}</Text>
              {explorerSlug && (
                <Link
                  href={`/technology/${explorerSlug}`}
                  onClick={() =>
                    analytics.track("case_study_technology_explorer_clicked", {
                      slug: caseStudy.slug,
                      technology: selected.id,
                      technologySlug: explorerSlug,
                    })
                  }
                  className="text-accent hover:text-accent/80 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
                >
                  More on {selected.technology} in the Technology Explorer
                  <Icon icon={ArrowRight} size="xs" />
                </Link>
              )}
            </div>
          );
        })()}
    </section>
  );
}
