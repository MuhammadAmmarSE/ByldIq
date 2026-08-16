import type {
  AiFeatureSuggestion,
  AiOpportunities,
  ArchitectureNode,
  BuildPathAnswers,
  BuildPathSummary,
  DiscoveryAnswers,
  EffortEstimate,
  ProblemStatement,
  Risk,
  RoadmapPhase,
  TeamRoleRecommendation,
  TechnologyRecommendation,
} from "../types";

/**
 * The contract every BuildPath recommendation engine implements —
 * `MockAIProvider` today, a real LLM-backed provider later. Every method
 * takes the visitor's answers and returns a *derived* recommendation; none
 * of them mutate state or read from persistence themselves (`types.ts`'s
 * answers/recommendations split). Swapping providers means implementing
 * this interface again — nothing in the wizard UI, the store, or the data
 * model has to change (CLAUDE.md Milestone 14 §38).
 */
export interface AIProvider {
  /** The next question Byld should ask in the Discovery conversation, given what's been answered so far. */
  generateFollowUpQuestion: (answers: BuildPathAnswers) => string;
  /** Which `DiscoveryAnswers` field the current question targets — lets the UI route the visitor's reply into structured data instead of only a chat transcript. `null` once every field is filled. */
  nextDiscoveryField: (answers: BuildPathAnswers) => keyof DiscoveryAnswers | null;
  /** A first-pass Problem Definition drafted from the Discovery answers — never applied without the visitor confirming it (CLAUDE.md §8: "AI suggestions must never overwrite user information without confirmation"). */
  draftProblemStatement: (answers: BuildPathAnswers) => Omit<ProblemStatement, "confirmed">;
  /** Candidate features the visitor hasn't already added — always surfaced as suggestions, never auto-added (CLAUDE.md §11). */
  suggestFeatures: (answers: BuildPathAnswers) => AiFeatureSuggestion[];
  generateArchitecture: (answers: BuildPathAnswers) => ArchitectureNode[];
  generateTechnologyStack: (answers: BuildPathAnswers) => TechnologyRecommendation[];
  /** Honest about irrelevance — `relevant: false` when the product has no real AI angle (CLAUDE.md §17). */
  generateAiOpportunities: (answers: BuildPathAnswers) => AiOpportunities;
  generateRoadmap: (answers: BuildPathAnswers) => RoadmapPhase[];
  generateTeamRecommendation: (answers: BuildPathAnswers) => TeamRoleRecommendation[];
  /** Ranges only — never a fabricated exact number (CLAUDE.md §24). */
  generateEffortEstimate: (answers: BuildPathAnswers) => EffortEstimate;
  generateRisks: (answers: BuildPathAnswers) => Risk[];
  generateSummary: (answers: BuildPathAnswers) => BuildPathSummary;
}
