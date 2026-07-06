"use client";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/utils/cn";

import type { TechnologySidebarProps } from "./TechnologySidebar.types";

/**
 * The section ids/labels every technology page renders, in order
 * (CLAUDE.md Part 22: every technology page shares the same architecture)
 * — kept as a fixed list rather than derived from `Technology` data since
 * the section structure itself doesn't vary by technology, only the
 * content within it. Related-content sections are included even though
 * they sometimes render nothing (CLAUDE.md Part 8 accepts a slightly stale
 * sidebar link over deriving this list per-technology just to hide it).
 */
const SECTIONS = [
  { id: "business-problem", label: "The problem" },
  { id: "why-organizations-adopt", label: "Why organizations adopt it" },
  { id: "business-and-engineering-fit", label: "Where it fits" },
  { id: "strengths", label: "Strengths" },
  { id: "weaknesses", label: "Weaknesses" },
  { id: "trade-off-explorer", label: "Trade-off explorer" },
  { id: "architecture", label: "Where it fits in a system" },
  { id: "performance", label: "Performance" },
  { id: "security", label: "Security" },
  { id: "accessibility", label: "Accessibility" },
  { id: "scalability", label: "Scalability" },
  { id: "cost-analysis", label: "Cost analysis" },
  { id: "related-solutions", label: "Where this shows up" },
  { id: "related-case-studies", label: "Seen in the field" },
  { id: "related-knowledge", label: "Go deeper" },
  { id: "faq", label: "Common questions" },
];

/**
 * Sticky in-page navigation with scrollspy (CLAUDE.md Part 8), desktop
 * only — mobile already has the bottom nav dock, and sixteen anchor links
 * don't fit a small viewport usefully. Mirrors `SolutionSidebar`.
 */
export function TechnologySidebar({ className }: TechnologySidebarProps) {
  const activeId = useScrollSpy(SECTIONS.map((section) => section.id));

  return (
    <nav aria-label="On this page" className={cn("sticky top-24 self-start", className)}>
      <ul className="border-border space-y-1 border-l">
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1 pl-4 text-sm transition-colors",
                  isActive
                    ? "border-accent text-foreground font-medium"
                    : "text-muted hover:text-foreground border-transparent",
                )}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
