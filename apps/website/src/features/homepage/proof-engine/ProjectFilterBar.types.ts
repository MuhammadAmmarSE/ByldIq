import type { Journey } from "@/types/journey";

export interface ProjectFilterBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  journeyFilter: Journey | null;
  onJourneyFilterChange: (journey: Journey | null) => void;
  className?: string;
}
