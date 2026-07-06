import type { Technology } from "./data/technology.schema";

export interface TechnologyGridProps {
  technologies: Technology[];
  categoriesBySlug: Map<string, { slug: string; label: string }>;
  onSelect?: (slug: string) => void;
  className?: string;
}
