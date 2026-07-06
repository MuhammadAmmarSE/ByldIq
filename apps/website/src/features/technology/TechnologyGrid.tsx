import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import { TechnologyCard } from "./TechnologyCard";
import type { TechnologyGridProps } from "./TechnologyGrid.types";

/**
 * Renders the filtered technology list, or an educational empty state
 * (CLAUDE.md Part 7: "Every empty state teaches") rather than a bare
 * "No results."
 */
export function TechnologyGrid({
  technologies,
  categoriesBySlug,
  onSelect,
  className,
}: TechnologyGridProps) {
  if (technologies.length === 0) {
    return (
      <div className="border-border rounded-lg border border-dashed p-12 text-center">
        <Text variant="body">No technologies match that search or category yet.</Text>
        <Text variant="caption" className="mt-1">
          Try a different category, or clear the search to see every technology.
        </Text>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {technologies.map((technology) => (
        <TechnologyCard
          key={technology.slug}
          technology={technology}
          categoryLabel={categoriesBySlug.get(technology.category)?.label}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
