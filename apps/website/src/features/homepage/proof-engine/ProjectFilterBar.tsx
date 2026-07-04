import { Button } from "@/components/Button";
import { SearchField } from "@/components/SearchField";
import { JOURNEYS } from "@/types/journey";
import { cn } from "@/utils/cn";

import type { ProjectFilterBarProps } from "./ProjectFilterBar.types";

const JOURNEY_LABELS: Record<(typeof JOURNEYS)[number], string> = {
  startup: "Startup",
  enterprise: "Enterprise",
  commerce: "Commerce",
  ai: "AI",
  platform: "Platform",
};

/**
 * Search + journey filter for the Proof Engine (CLAUDE.md Part 13's filter
 * bar). Filtering is client-side over a small, fully-loaded dataset — no
 * network round trip, so filtering feels instant.
 */
export function ProjectFilterBar({
  query,
  onQueryChange,
  journeyFilter,
  onJourneyFilterChange,
  className,
}: ProjectFilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by journey">
        <Button
          variant={journeyFilter === null ? "primary" : "outline"}
          size="sm"
          onClick={() => onJourneyFilterChange(null)}
        >
          All
        </Button>
        {JOURNEYS.map((journey) => (
          <Button
            key={journey}
            variant={journeyFilter === journey ? "primary" : "outline"}
            size="sm"
            aria-pressed={journeyFilter === journey}
            onClick={() => onJourneyFilterChange(journey)}
          >
            {JOURNEY_LABELS[journey]}
          </Button>
        ))}
      </div>

      <SearchField
        aria-label="Search projects"
        placeholder="Search projects..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        onClear={() => onQueryChange("")}
        className="sm:w-64"
      />
    </div>
  );
}
