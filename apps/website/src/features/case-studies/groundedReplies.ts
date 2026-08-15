import type { AiGroundedReply } from "@/store/ai-companion-store";

import type { CaseStudy } from "./data/case-study.schema";

/**
 * Builds the AI Companion's "Ask Byld about this project" quick replies
 * (CLAUDE.md Part 21) from a case study's own real, already-published
 * fields — never new copy invented for the AI specifically. Each answer
 * is a real field (or a small, honest recomposition of one), so nothing
 * here can drift out of sync with what the page itself says, and nothing
 * claims certainty the data doesn't support (the "could this work for my
 * company" answer is deliberately non-committal, since that genuinely
 * depends on specifics this case study can't know).
 */
export function buildCaseStudyGroundedReplies(caseStudy: CaseStudy): AiGroundedReply[] {
  const [topTechnology] = caseStudy.technologyDecisions;

  const replies: AiGroundedReply[] = [
    {
      question: "What problem did this project solve?",
      answer: caseStudy.challenge,
    },
    {
      question: "What was the architecture?",
      answer:
        `Request flow: ${caseStudy.architecture.map((node) => node.label).join(" → ")}. ${caseStudy.architecture[0]?.description ?? ""}`.trim(),
    },
  ];

  if (topTechnology) {
    replies.push({
      question: `Why ${topTechnology.name}?`,
      answer: topTechnology.why,
    });
  }

  replies.push(
    {
      question: "What would you build differently today?",
      answer: caseStudy.whatCouldImprove.join(" "),
    },
    {
      question: "Could this architecture work for my company?",
      answer:
        "That genuinely depends on your scale, team, and constraints — this project's approach was scoped to its own situation, not a universal template. BuildPath can map the same trade-offs onto your product in a few minutes.",
    },
  );

  return replies;
}
