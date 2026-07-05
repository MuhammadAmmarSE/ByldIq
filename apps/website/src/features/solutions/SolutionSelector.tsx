"use client";

import { Reveal } from "@/components/Reveal";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useAppStore } from "@/providers/StoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { getRecommendedSolution, SOLUTIONS } from "./data/solutions";
import { SolutionCard } from "./SolutionCard";
import type { SolutionSelectorProps } from "./SolutionSelector.types";

/**
 * CLAUDE.md Part 20's interactive Solution Selector: nine cards, one
 * highlighted when the visitor has already chosen a homepage journey
 * (`getRecommendedSolution`) but every card is a real, keyboard-reachable
 * link — the grid never removes a choice, only prioritizes one.
 */
export function SolutionSelector({ className }: SolutionSelectorProps) {
  const journey = useAppStore((state) => state.journey);
  const analytics = useAnalytics();
  const recommended = getRecommendedSolution(journey);

  return (
    <div
      role="list"
      aria-label="Explore solutions by business need"
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {SOLUTIONS.map((solution, index) => (
        <Reveal key={solution.slug} delay={index * 0.04} role="listitem">
          <SolutionCard
            solution={solution}
            isRecommended={solution.slug === recommended?.slug}
            onSelect={(slug) => analytics.track("solution_card_selected", { slug })}
            onHover={(slug) => analytics.track("solution_card_hovered", { slug })}
          />
        </Reveal>
      ))}
    </div>
  );
}
