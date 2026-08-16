"use client";

import { useEffect, useRef } from "react";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { AboutSidebarProps } from "./AboutSidebar.types";

/**
 * The section ids/labels the About page renders, in order — a fixed list
 * rather than derived from data, since (like the Case Studies and
 * Solutions templates) the section structure doesn't vary. `get-started`
 * (the final CTA) is excluded since it renders full-width outside the
 * sidebar grid, the same convention `CaseStudySidebar`/`SolutionSidebar`
 * use. "How We Work" and "Transparency" are two anchors from one
 * component (`HowWeWorkSection`) — closely related themes presented as
 * one section with two headings, the same "one component, two ids"
 * pattern `CaseStudyOverview` uses for Executive Summary/Business
 * Challenge.
 */
const SECTIONS = [
  { id: "philosophy", label: "Our philosophy" },
  { id: "approach", label: "How we work, stage by stage" },
  { id: "engineering-standards", label: "Engineering standards" },
  { id: "design-engineering", label: "Design + engineering" },
  { id: "team", label: "Team" },
  { id: "culture", label: "Culture" },
  { id: "how-we-work", label: "How we work with clients" },
  { id: "transparency", label: "Transparency" },
  { id: "technology-philosophy", label: "Technology philosophy" },
  { id: "ai-philosophy", label: "AI philosophy" },
  { id: "whats-next", label: "What's next" },
  { id: "ecosystem", label: "Explore further" },
];

/**
 * Sticky in-page navigation with scrollspy (CLAUDE.md Part 8), desktop
 * only — mobile already has the bottom nav dock, and twelve anchor links
 * don't fit a small viewport usefully. Mirrors `CaseStudySidebar`/
 * `SolutionSidebar`, including firing `about_section_viewed` as the
 * active section changes.
 */
export function AboutSidebar({ className }: AboutSidebarProps) {
  const activeId = useScrollSpy(SECTIONS.map((section) => section.id));
  const analytics = useAnalytics();
  const lastTrackedId = useRef<string | null>(null);

  useEffect(() => {
    if (!activeId || activeId === lastTrackedId.current) return;
    lastTrackedId.current = activeId;
    analytics.track("about_section_viewed", { section: activeId });
  }, [activeId, analytics]);

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
