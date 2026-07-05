"use client";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/utils/cn";

import type { SolutionSidebarProps } from "./SolutionSidebar.types";

/**
 * The section ids/labels every solution page renders, in order (CLAUDE.md
 * Part 20: "all pages must share the same architecture") — kept as a fixed
 * list rather than derived from `Solution` data since the section
 * structure itself doesn't vary by solution, only the content within it.
 */
const SECTIONS = [
  { id: "business-problem", label: "The problem" },
  { id: "business-outcomes", label: "What changes" },
  { id: "engineering-philosophy", label: "How we think about it" },
  { id: "capabilities", label: "What this involves" },
  { id: "architecture", label: "How it fits together" },
  { id: "technology", label: "Why these technologies" },
  { id: "delivery", label: "How we deliver it" },
  { id: "success-metrics", label: "What success looks like" },
  { id: "related-case-studies", label: "Related work" },
  { id: "related-knowledge", label: "Go deeper" },
  { id: "faq", label: "Common questions" },
];

/**
 * Sticky in-page navigation with scrollspy (CLAUDE.md Part 8), desktop
 * only — mobile already has the bottom nav dock, and eleven anchor links
 * don't fit a small viewport usefully.
 */
export function SolutionSidebar({ className }: SolutionSidebarProps) {
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
