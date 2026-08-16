import type { Journey } from "@/types/journey";

/**
 * CLAUDE.md Milestone 14's BuildPath domain model. Two categories of
 * data, deliberately kept separate:
 *
 * 1. **Answers** (this file's `*Input`-ish types, held in
 *    `buildpath-store.ts`) — what the visitor actually entered. Persisted
 *    to `localStorage` so progress survives navigation and refresh.
 * 2. **Recommendations** (everything below "Generated recommendations")
 *    — architecture, technology, roadmap, effort, risks, summary. These
 *    are *derived*, computed fresh from the answers by `AIProvider` on
 *    every render (see `engine/ai-provider.ts`), never persisted
 *    themselves. A real LLM provider can replace `MockAIProvider` later
 *    without touching the data model, since both implementations answer
 *    the same "given these answers, what would you recommend" question.
 */

export const PROJECT_TYPES = [
  "New Product",
  "MVP",
  "SaaS",
  "Mobile App",
  "E-commerce",
  "Enterprise Platform",
  "AI Product",
  "Automation",
  "Modernization",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const BUILDPATH_STAGES = [
  "idea",
  "discovery",
  "product",
  "prioritization",
  "architecture",
  "technology",
  "ai-opportunities",
  "roadmap",
  "effort",
  "summary",
] as const;

export type BuildPathStage = (typeof BUILDPATH_STAGES)[number];

/** Where the visitor entered BuildPath from — CLAUDE.md §2's "context should be carried into BuildPath." */
export interface EntryContext {
  source:
    | "homepage"
    | "solution"
    | "case-study"
    | "technology"
    | "knowledge"
    | "about"
    | "nav"
    | "direct";
  label?: string;
  solutionSlug?: string;
  caseStudySlug?: string;
  technologySlug?: string;
  articleSlug?: string;
  industry?: string;
}

export interface ConversationMessage {
  id: string;
  role: "user" | "byld";
  content: string;
}

export interface DiscoveryAnswers {
  accomplish: string;
  problem: string;
  whoExperiencesIt: string;
  whyNow: string;
  successLooksLike: string;
}

export const defaultDiscoveryAnswers: DiscoveryAnswers = {
  accomplish: "",
  problem: "",
  whoExperiencesIt: "",
  whyNow: "",
  successLooksLike: "",
};

export interface ProblemStatement {
  problem: string;
  targetUsers: string;
  currentSituation: string;
  desiredOutcome: string;
  businessMotivation: string;
  constraints: string;
  /** Whether the visitor has confirmed the AI-suggested draft — CLAUDE.md §7: "AI suggestions must never overwrite user information without confirmation." */
  confirmed: boolean;
}

export const defaultProblemStatement: ProblemStatement = {
  problem: "",
  targetUsers: "",
  currentSituation: "",
  desiredOutcome: "",
  businessMotivation: "",
  constraints: "",
  confirmed: false,
};

export const USER_GROUP_TYPES = [
  "primary",
  "secondary",
  "admin",
  "operator",
  "internal",
  "customer",
] as const;

export type UserGroupType = (typeof USER_GROUP_TYPES)[number];

export interface TargetUserGroup {
  id: string;
  type: UserGroupType;
  role: string;
  needs: string;
  painPoints: string;
  goals: string;
}

export const FEATURE_PRIORITIES = ["must", "should", "could", "future"] as const;
export type FeaturePriority = (typeof FEATURE_PRIORITIES)[number];

export const FEATURE_COMPLEXITIES = ["low", "medium", "high"] as const;
export type FeatureComplexity = (typeof FEATURE_COMPLEXITIES)[number];

export interface ProductFeature {
  id: string;
  name: string;
  description: string;
  forUser: string;
  priority: FeaturePriority;
  complexity: FeatureComplexity;
  dependencies: string[];
  /** Whether this feature originated from a user or was accepted from an AI suggestion — CLAUDE.md §11: "AI suggestions must remain transparent." */
  source: "user" | "ai";
}

export interface AiFeatureSuggestion {
  id: string;
  name: string;
  description: string;
  reason: string;
  status: "pending" | "added" | "ignored";
}

export const INTEGRATION_CATEGORIES = [
  "payments",
  "crm",
  "email",
  "analytics",
  "authentication",
  "commerce",
  "storage",
  "search",
  "communication",
  "external-apis",
] as const;

export type IntegrationCategory = (typeof INTEGRATION_CATEGORIES)[number];

export interface ProductCanvasExtras {
  platforms: string[];
  constraints: string;
}

/** Everything the visitor has actually entered — the persisted shape. */
export interface BuildPathAnswers {
  stage: BuildPathStage;
  entryContext: EntryContext | null;
  projectTypes: ProjectType[];
  conversation: ConversationMessage[];
  discovery: DiscoveryAnswers;
  problemStatement: ProblemStatement;
  targetUserGroups: TargetUserGroup[];
  features: ProductFeature[];
  aiSuggestions: AiFeatureSuggestion[];
  integrations: IntegrationCategory[];
  canvasExtras: ProductCanvasExtras;
  startedAt: string | null;
  completedAt: string | null;
}

// ---------------------------------------------------------------------------
// Generated recommendations (derived, never persisted — see file doc comment)
// ---------------------------------------------------------------------------

export interface ArchitectureNode {
  id: string;
  label: string;
  category: string;
  what: string;
  why: string;
  alternative: string;
  tradeOff: string;
  costConsideration: string;
  scalingConsideration: string;
  /** A slug in `TECHNOLOGIES` this node maps to, when one applies — links to the real Technology Explorer, same pattern as Case Studies' architecture nodes. */
  technologySlug?: string;
}

export interface TechnologyRecommendation {
  category: string;
  recommended: string;
  recommendedSlug?: string;
  alternative: string;
  why: string;
}

export interface AiOpportunities {
  /** False when the product genuinely has no AI angle — CLAUDE.md §17: "Don't recommend AI merely because it is fashionable." */
  relevant: boolean;
  summary: string;
  useCases: string[];
  modelRequirements: string;
  needsRag: boolean;
  needsAgents: boolean;
  needsToolCalling: boolean;
  needsVectorSearch: boolean;
  evaluation: string;
  guardrails: string;
  dataPrivacy: string;
  humanReview: string;
}

export interface RoadmapPhase {
  phase: number;
  name: string;
  goals: string[];
  features: string[];
  engineeringWork: string[];
  dependencies: string[];
  deliverables: string[];
  timelineRangeLabel: string;
}

export interface TeamRoleRecommendation {
  role: string;
  responsibility: string;
  involvement: string;
}

export interface EffortEstimate {
  complexity: "Low" | "Medium" | "High" | "Very High";
  teamSizeRange: string;
  durationRange: string;
  effortRangeLabel: string;
}

export const RISK_CATEGORIES = [
  "Technical",
  "Product",
  "Security",
  "Integration",
  "Timeline",
  "Scalability",
  "AI",
] as const;

export type RiskCategory = (typeof RISK_CATEGORIES)[number];

export interface Risk {
  id: string;
  category: RiskCategory;
  risk: string;
  probability: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High";
  mitigation: string;
}

export interface BuildPathSummary {
  vision: string;
  problem: string;
  mvpFeatureNames: string[];
  nextSteps: string[];
}

export type { Journey };
