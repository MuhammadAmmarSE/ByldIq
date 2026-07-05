import type { DecisionCardDefinition } from "./data/decision-cards";

export interface DecisionCardsProps {
  onSelect: (card: DecisionCardDefinition) => void;
  className?: string;
}
