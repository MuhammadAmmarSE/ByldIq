import type { KnowledgeArticle } from "./data/knowledge-article.schema";

/**
 * CLAUDE.md Part 18's "AI Summaries" (Milestone 15, Part 19): "Provide
 * optional Summarize... For the current Mock AI architecture, these can
 * use deterministic content transformations. Don't pretend an LLM is
 * being used if it isn't." Every mode below recombines fields the article
 * already has — never a new fact, never a live model call.
 */

export const SUMMARY_MODES = ["30-second", "executive", "beginner", "technical"] as const;
export type SummaryMode = (typeof SUMMARY_MODES)[number];

export interface SummaryModeOption {
  mode: SummaryMode;
  label: string;
  description: string;
}

export const SUMMARY_MODE_OPTIONS: SummaryModeOption[] = [
  { mode: "30-second", label: "30-second summary", description: "The shortest version." },
  {
    mode: "executive",
    label: "Executive summary",
    description: "Framed around business impact.",
  },
  { mode: "beginner", label: "Explain it simply", description: "No assumed background." },
  { mode: "technical", label: "Technical summary", description: "Framed for engineers." },
];

export function generateArticleSummary(article: KnowledgeArticle, mode: SummaryMode): string {
  switch (mode) {
    case "30-second":
      return article.summary;

    case "executive": {
      const outcome = article.learningOutcomes[0];
      return `${article.businessContext} Read this if you need to: ${outcome ?? "understand the trade-offs before deciding"}.`;
    }

    case "beginner": {
      const concept = article.coreConcepts[0];
      return concept ? `${article.problem} Simply put: ${concept.explanation}` : article.problem;
    }

    case "technical": {
      const terms = article.coreConcepts.map((concept) => concept.term).join(", ");
      return `${article.engineeringContext} Core concepts covered: ${terms || "see the walkthrough below"}.`;
    }
  }
}
