import type { BuildPathAnswers, IntegrationCategory, ProjectType } from "../types";

/**
 * Every generator function in `mock-ai-provider.ts` reasons about the same
 * handful of yes/no questions ("is this commerce," "does it need auth,"
 * "is AI actually relevant") rather than re-deriving them from
 * `projectTypes`/`integrations`/`features` independently in ten places.
 * Centralizing them here also makes it obvious what a real LLM-backed
 * provider would need to reason about too.
 */
export interface ProjectSignals {
  projectTypes: ProjectType[];
  hasType: (type: ProjectType) => boolean;
  isMvp: boolean;
  isSaas: boolean;
  isMobile: boolean;
  isCommerce: boolean;
  isEnterprise: boolean;
  isModernization: boolean;
  isAutomation: boolean;
  /** Visitor explicitly flagged this as an AI product — the strongest AI signal. */
  isAiProduct: boolean;
  mustHaveFeatureCount: number;
  totalFeatureCount: number;
  integrations: IntegrationCategory[];
  hasIntegration: (category: IntegrationCategory) => boolean;
  needsAuth: boolean;
  needsPayments: boolean;
  needsStorage: boolean;
  needsSearch: boolean;
  /** A feature name or description mentions something an AI feature commonly touches (search, recommend, chat, summar-ize/y, classif-y). */
  featuresSuggestAi: boolean;
}

const AI_HINT_PATTERN = /search|recommend|chat|summar|classif|predict|assist|generat/i;

export function deriveSignals(answers: BuildPathAnswers): ProjectSignals {
  const { projectTypes, integrations, features } = answers;
  const hasType = (type: ProjectType) => projectTypes.includes(type);
  const hasIntegration = (category: IntegrationCategory) => integrations.includes(category);
  const isCommerce = hasType("E-commerce");
  const isEnterprise = hasType("Enterprise Platform") || hasType("Modernization");
  const isSaas = hasType("SaaS");
  const mustHaveFeatureCount = features.filter((feature) => feature.priority === "must").length;

  return {
    projectTypes,
    hasType,
    isMvp: hasType("MVP") || hasType("New Product"),
    isSaas,
    isMobile: hasType("Mobile App"),
    isCommerce,
    isEnterprise,
    isModernization: hasType("Modernization"),
    isAutomation: hasType("Automation"),
    isAiProduct: hasType("AI Product"),
    mustHaveFeatureCount,
    totalFeatureCount: features.length,
    integrations,
    hasIntegration,
    needsAuth: hasIntegration("authentication") || isSaas || isEnterprise,
    needsPayments: hasIntegration("payments") || isCommerce,
    needsStorage: hasIntegration("storage"),
    needsSearch: hasIntegration("search"),
    featuresSuggestAi: features.some((feature) =>
      AI_HINT_PATTERN.test(`${feature.name} ${feature.description}`),
    ),
  };
}
