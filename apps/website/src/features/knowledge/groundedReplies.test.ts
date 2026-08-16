import { describe, expect, it } from "vitest";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { TUTORIALS } from "./data/tutorials";
import {
  buildKnowledgeArticleGroundedReplies,
  buildTutorialGroundedReplies,
} from "./groundedReplies";

const [article] = KNOWLEDGE_ARTICLES;
if (!article) throw new Error("Expected at least one knowledge article for this test");

const [tutorial] = TUTORIALS;
if (!tutorial) throw new Error("Expected at least one tutorial for this test");

describe("buildKnowledgeArticleGroundedReplies", () => {
  it("includes a question and real answer for every core concept", () => {
    const replies = buildKnowledgeArticleGroundedReplies(article);
    for (const concept of article.coreConcepts) {
      const reply = replies.find((candidate) => candidate.question === `What is ${concept.term}?`);
      expect(reply?.answer).toBe(concept.explanation);
    }
  });

  it("answers 'what problem does this solve?' with the article's own problem field", () => {
    const replies = buildKnowledgeArticleGroundedReplies(article);
    const reply = replies.find(
      (candidate) => candidate.question === "What problem does this solve?",
    );
    expect(reply?.answer).toBe(article.problem);
  });

  it("always offers a non-committal, honest answer for applying it to the visitor's own product", () => {
    const replies = buildKnowledgeArticleGroundedReplies(article);
    const reply = replies.find(
      (candidate) => candidate.question === "How would this apply to my product?",
    );
    expect(reply?.answer).toMatch(/BuildPath/);
  });

  it("every reply has a non-empty question and answer", () => {
    for (const knowledgeArticle of KNOWLEDGE_ARTICLES) {
      const replies = buildKnowledgeArticleGroundedReplies(knowledgeArticle);
      expect(replies.length).toBeGreaterThan(0);
      for (const reply of replies) {
        expect(reply.question.length).toBeGreaterThan(0);
        expect(reply.answer.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("buildTutorialGroundedReplies", () => {
  it("answers the setup question with the tutorial's own setup instructions", () => {
    const replies = buildTutorialGroundedReplies(tutorial);
    const reply = replies.find((candidate) => candidate.question === "What's the setup step?");
    expect(reply?.answer).toBe(tutorial.setup.instructions);
  });

  it("includes a question and real answer for every step", () => {
    const replies = buildTutorialGroundedReplies(tutorial);
    for (const step of tutorial.steps) {
      const reply = replies.find(
        (candidate) => candidate.question === `What does "${step.title}" involve?`,
      );
      expect(reply?.answer).toBe(step.instructions);
    }
  });

  it("answers how to validate it worked with the tutorial's real validation field", () => {
    const replies = buildTutorialGroundedReplies(tutorial);
    const reply = replies.find((candidate) => candidate.question === "How do I know it worked?");
    expect(reply?.answer).toBe(tutorial.validation);
  });

  it("every reply has a non-empty question and answer", () => {
    for (const candidateTutorial of TUTORIALS) {
      const replies = buildTutorialGroundedReplies(candidateTutorial);
      expect(replies.length).toBeGreaterThan(0);
      for (const reply of replies) {
        expect(reply.question.length).toBeGreaterThan(0);
        expect(reply.answer.length).toBeGreaterThan(0);
      }
    }
  });
});
