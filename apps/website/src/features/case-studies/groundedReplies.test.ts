import { describe, expect, it } from "vitest";

import { CASE_STUDIES } from "./data/case-studies";
import { buildCaseStudyGroundedReplies } from "./groundedReplies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("buildCaseStudyGroundedReplies", () => {
  it("grounds 'what problem did this solve' in the real challenge field", () => {
    const replies = buildCaseStudyGroundedReplies(caseStudy);
    const problem = replies.find(
      (reply) => reply.question === "What problem did this project solve?",
    );
    expect(problem?.answer).toBe(caseStudy.challenge);
  });

  it("grounds the architecture answer in the real node labels and first description", () => {
    const replies = buildCaseStudyGroundedReplies(caseStudy);
    const architecture = replies.find((reply) => reply.question === "What was the architecture?");
    for (const node of caseStudy.architecture) {
      expect(architecture?.answer).toContain(node.label);
    }
    expect(architecture?.answer).toContain(caseStudy.architecture[0]?.description);
  });

  it("asks about the first technology decision, grounded in its real 'why'", () => {
    const [topTechnology] = caseStudy.technologyDecisions;
    if (!topTechnology) throw new Error("Fixture needs at least one technology decision");

    const replies = buildCaseStudyGroundedReplies(caseStudy);
    const techReply = replies.find((reply) => reply.question === `Why ${topTechnology.name}?`);
    expect(techReply?.answer).toBe(topTechnology.why);
  });

  it("grounds 'what would you build differently' in the real whatCouldImprove field", () => {
    const replies = buildCaseStudyGroundedReplies(caseStudy);
    const differently = replies.find(
      (reply) => reply.question === "What would you build differently today?",
    );
    for (const item of caseStudy.whatCouldImprove) {
      expect(differently?.answer).toContain(item);
    }
  });

  it("gives an honest, non-committal answer to 'could this work for my company', not a false guarantee", () => {
    const replies = buildCaseStudyGroundedReplies(caseStudy);
    const transfer = replies.find(
      (reply) => reply.question === "Could this architecture work for my company?",
    );
    expect(transfer?.answer).toMatch(/depends|BuildPath/i);
  });

  it("returns every reply with non-empty question and answer text", () => {
    for (const caseStudyRecord of CASE_STUDIES) {
      const replies = buildCaseStudyGroundedReplies(caseStudyRecord);
      expect(replies.length).toBeGreaterThan(0);
      for (const reply of replies) {
        expect(reply.question.length).toBeGreaterThan(0);
        expect(reply.answer.length).toBeGreaterThan(0);
      }
    }
  });
});
