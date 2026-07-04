import type { Journey } from "@/types/journey";

import type { JourneyDefinition } from "./data/journeys";

export interface JourneyCardProps {
  journey: JourneyDefinition;
  isSelected: boolean;
  /** True once any journey has been chosen — de-emphasizes every other card. */
  isAnySelected: boolean;
  onHover?: (journey: Journey) => void;
  className?: string;
}
