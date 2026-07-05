import type { Solution } from "./data/solution.schema";

export interface SolutionCardProps {
  solution: Solution;
  isRecommended?: boolean;
  onSelect?: (slug: string) => void;
  onHover?: (slug: string) => void;
  className?: string;
}
