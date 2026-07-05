import type { AiIntent } from "./responses";

const INTENT_PATTERNS: [AiIntent, RegExp][] = [
  ["buildpath", /buildpath|roadmap|start.*plan/i],
  ["pricing", /price|pricing|cost|budget|invest/i],
  ["compare", /compare|\bvs\.?\b|versus|technology|stack|framework/i],
  ["startup", /mvp|startup|fundrais|seed round|investor/i],
  ["enterprise", /security|complian|legacy|downtime|enterprise|modernI?z/i],
  ["commerce", /shopify|checkout|commerce|conversion/i],
  ["ai", /\bai\b|agent|rag|fine-tun|llm|artificial intelligence/i],
  ["platform", /infrastructure|platform|developer experience|api|cloud|scale/i],
];

/**
 * Keyword-based intent matching — deliberately simple (not an LLM, see
 * `responses.ts`). Checked in order, so more specific intents (BuildPath,
 * pricing, direct comparison requests) are matched before broader
 * journey-topic keywords.
 */
export function matchIntent(message: string): AiIntent {
  for (const [intent, pattern] of INTENT_PATTERNS) {
    if (pattern.test(message)) return intent;
  }
  return "fallback";
}
