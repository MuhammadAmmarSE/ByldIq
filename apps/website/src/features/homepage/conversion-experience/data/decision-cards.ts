import type { Journey } from "@/types/journey";

export interface DecisionCardDefinition {
  id: "book-discovery" | "buildpath" | "talk-to-byld" | "explore-knowledge" | "download-resources";
  title: string;
  description: string;
  cta: string;
  /** Journeys for which this card is the highlighted recommendation. */
  recommendedFor: Journey[];
}

/** CLAUDE.md Part 19's decision engine — multiple next steps, one recommended per journey, never forced. */
export const DECISION_CARDS: DecisionCardDefinition[] = [
  {
    id: "book-discovery",
    title: "Book Discovery",
    description: "Talk through your project with our team — no pressure, no pitch.",
    cta: "View availability",
    recommendedFor: ["enterprise"],
  },
  {
    id: "buildpath",
    title: "Use BuildPath",
    description:
      "Get a roadmap, technology recommendations, and next steps in about three minutes.",
    cta: "Start BuildPath",
    recommendedFor: ["startup", "commerce"],
  },
  {
    id: "talk-to-byld",
    title: "Talk to Byld",
    description: "Ask questions and explore ideas with our AI companion — no booking required.",
    cta: "Open Byld",
    recommendedFor: ["ai"],
  },
  {
    id: "explore-knowledge",
    title: "Explore Knowledge",
    description: "Keep learning about product strategy, architecture, and engineering.",
    cta: "Browse guides",
    recommendedFor: ["platform"],
  },
  {
    id: "download-resources",
    title: "Download Resources",
    description: "Planning checklists and templates you can use on your own.",
    cta: "Get resources",
    recommendedFor: [],
  },
];

/** Falls back to BuildPath (the most educational, lowest-commitment option) when no journey is selected. */
export function getRecommendedCardId(journey: Journey | null): DecisionCardDefinition["id"] {
  const match = DECISION_CARDS.find((card) => journey && card.recommendedFor.includes(journey));
  return match?.id ?? "buildpath";
}
