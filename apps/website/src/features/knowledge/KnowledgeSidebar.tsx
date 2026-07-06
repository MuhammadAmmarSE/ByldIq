"use client";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/utils/cn";

import type { KnowledgeSidebarProps } from "./KnowledgeSidebar.types";

/**
 * The section ids/labels every article page renders, in order (CLAUDE.md
 * Part 18: every article shares the same eleven-section template) — kept
 * as a fixed list rather than derived from `KnowledgeArticle` data since
 * the section structure itself doesn't vary by article, only the content
 * within it. Related-content sections are included even though they
 * sometimes render nothing (CLAUDE.md Part 8 accepts a slightly stale
 * sidebar link over deriving this list per-article just to hide it).
 */
const SECTIONS = [
  { id: "who-this-is-for", label: "Who this is for" },
  { id: "what-youll-learn", label: "What you'll learn" },
  { id: "problem", label: "The problem" },
  { id: "why-it-matters", label: "Why it matters" },
  { id: "business-and-engineering-context", label: "Business and engineering context" },
  { id: "real-world-relevance", label: "Real-world relevance" },
  { id: "core-concepts", label: "Core concepts" },
  { id: "interactive-learning", label: "Walk through it" },
  { id: "real-examples", label: "Real examples" },
  { id: "common-mistakes", label: "Common mistakes" },
  { id: "related-technologies", label: "Related technologies" },
  { id: "related-case-studies", label: "Seen in the field" },
  { id: "related-learning", label: "Related learning" },
];

/**
 * Sticky in-page navigation with scrollspy (CLAUDE.md Part 8), desktop
 * only — mobile already has the bottom nav dock, and thirteen anchor links
 * don't fit a small viewport usefully. Mirrors `TechnologySidebar`.
 */
export function KnowledgeSidebar({ className }: KnowledgeSidebarProps) {
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
