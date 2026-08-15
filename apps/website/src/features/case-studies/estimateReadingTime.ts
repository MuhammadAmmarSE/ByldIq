import type { CaseStudy } from "./data/case-study.schema";

/** Average adult silent-reading speed in words per minute, the same rate typically used for article reading-time estimates. */
const WORDS_PER_MINUTE = 200;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Estimates a case study's reading time from its actual narrative text
 * (CLAUDE.md Part 23's "Estimated reading time") — computed from the real
 * content, not a hand-authored guess kept separately in sync, since a
 * case study's word count is spread across many typed fields (unlike a
 * single article body) and would drift the moment content changed.
 * Deliberately covers only the sections a visitor actually reads as
 * prose (not badge lists, ids, or metric labels).
 */
export function estimateReadingTime(caseStudy: CaseStudy): number {
  const words = [
    caseStudy.executiveSummary,
    caseStudy.challenge,
    caseStudy.whyItMattered,
    caseStudy.businessContext.businessModel,
    caseStudy.businessContext.market,
    caseStudy.businessContext.existingTechnology,
    caseStudy.businessContext.competitivePressure,
    ...caseStudy.discovery.map((activity) => activity.description),
    ...caseStudy.productDecisions.flatMap((decision) => [decision.reasoning, decision.tradeoff]),
    ...caseStudy.architecture.map((node) => node.description),
    ...caseStudy.technologyDecisions.flatMap((technology) => [
      technology.why,
      technology.tradeoffs,
      technology.businessImpact,
    ]),
    ...caseStudy.engineeringProcess.map((stage) => stage.description),
    ...caseStudy.challenges.flatMap((challenge) => [challenge.issue, challenge.resolution]),
    caseStudy.approach,
    caseStudy.outcome,
    ...caseStudy.whatWorked,
    ...caseStudy.whatCouldImprove,
    ...caseStudy.recommendations,
    ...caseStudy.futureRoadmap.map((item) => item.item),
    ...caseStudy.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].reduce((total, text) => total + countWords(text), 0);

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
