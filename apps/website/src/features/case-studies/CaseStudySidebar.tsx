"use client";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/utils/cn";

import type { CaseStudySidebarProps } from "./CaseStudySidebar.types";

/**
 * The section ids/labels every case study page renders, in order
 * (CLAUDE.md Part 21: "every case study follows the same architecture")
 * — kept as a fixed list rather than derived from `CaseStudy` data, since
 * the section structure itself doesn't vary by case study, only the
 * content within it. Mirrors `SolutionSidebar`; `get-started` (the final
 * CTA) is excluded since it renders full-width outside the sidebar grid,
 * the same convention `SolutionSidebar` uses.
 */
const SECTIONS = [
  { id: "executive-summary", label: "Executive summary" },
  { id: "business-challenge", label: "The business challenge" },
  { id: "discovery", label: "Getting to know the problem" },
  { id: "product-thinking", label: "How we thought about the product" },
  { id: "architecture", label: "How it fits together" },
  { id: "technology-decisions", label: "Why these technologies" },
  { id: "engineering-process", label: "How we built it" },
  { id: "challenges", label: "What didn't go to plan" },
  { id: "results", label: "The results" },
  { id: "lessons-learned", label: "Lessons learned" },
  { id: "related-solutions", label: "Related solutions" },
  { id: "related-knowledge", label: "Go deeper" },
  { id: "faq", label: "Common questions" },
];

/**
 * Sticky in-page navigation with scrollspy (CLAUDE.md Part 8), desktop
 * only — mobile already has the bottom nav dock, and thirteen anchor
 * links don't fit a small viewport usefully.
 */
export function CaseStudySidebar({ className }: CaseStudySidebarProps) {
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
