"use client";

import { motion } from "motion/react";

import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import { ProjectCard } from "./ProjectCard";
import type { ProjectGridProps } from "./ProjectGrid.types";

/**
 * Renders the filtered project list, or an educational empty state
 * (CLAUDE.md Part 7: "Every empty state teaches... explain why, what
 * happened, what to do next") rather than a bare "No results."
 *
 * Cards remaining after a filter change reflow smoothly into their new
 * grid position via Motion's `layout` prop — CLAUDE.md Part 11:
 * "Filtering. Cards transition using layout animation." Deliberately no
 * `AnimatePresence`/exit animation, and no opacity-based entrance fade
 * either (an earlier version animated `opacity: 0 -> 1` on mount): a
 * filtered-out card is removed from the DOM immediately, the same
 * standard React behavior every existing test already assumes, and axe's
 * Storybook scan caught the opacity fade-in mid-transition, at partial
 * opacity blended toward the white background — a real, reproducible
 * color-contrast failure, not a hypothetical one. `layout` alone (a
 * transform, not a color/opacity change) gives the reflow this section
 * actually needs without that risk. `MotionProvider`'s
 * `reducedMotion="user"` disables this globally under
 * `prefers-reduced-motion`, with no per-component opt-in needed.
 */
export function ProjectGrid({ caseStudies, companiesById, onSelect, className }: ProjectGridProps) {
  if (caseStudies.length === 0) {
    return (
      <div className="border-border rounded-lg border border-dashed p-12 text-center">
        <Text variant="body">No projects match that search or journey yet.</Text>
        <Text variant="caption" className="mt-1">
          Try a different journey, or clear the search to see every project.
        </Text>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {caseStudies.map((caseStudy) => {
        const company = companiesById.get(caseStudy.companyId);
        if (!company) return null;
        return (
          <motion.div key={caseStudy.slug} layout>
            <ProjectCard caseStudy={caseStudy} company={company} onSelect={onSelect} />
          </motion.div>
        );
      })}
    </div>
  );
}
