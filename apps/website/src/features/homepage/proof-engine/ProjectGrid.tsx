import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import { ProjectCard } from "./ProjectCard";
import type { ProjectGridProps } from "./ProjectGrid.types";

/**
 * Renders the filtered project list, or an educational empty state
 * (CLAUDE.md Part 7: "Every empty state teaches... explain why, what
 * happened, what to do next") rather than a bare "No results."
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
          <ProjectCard
            key={caseStudy.slug}
            caseStudy={caseStudy}
            company={company}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}
