import { describe, expect, it } from "vitest";

import { JOURNEYS } from "@/types/journey";

import { getGroundedAnswer, getPageContextGreeting, GREETINGS, RESPONSES } from "./responses";

describe("GREETINGS", () => {
  it("has a greeting for every journey plus a default", () => {
    const keys = Object.keys(GREETINGS);
    expect(keys).toEqual(expect.arrayContaining([...JOURNEYS, "default"]));
  });

  it("gives every greeting content and at least one quick reply", () => {
    for (const greeting of Object.values(GREETINGS)) {
      expect(greeting.content.length).toBeGreaterThan(0);
      expect(greeting.quickReplies.length).toBeGreaterThan(0);
    }
  });
});

describe("RESPONSES", () => {
  it("gives every response content and at least one quick reply", () => {
    for (const response of Object.values(RESPONSES)) {
      expect(response.content.length).toBeGreaterThan(0);
      expect(response.quickReplies.length).toBeGreaterThan(0);
    }
  });
});

describe("getPageContextGreeting", () => {
  it("mentions the given page label and offers at least one quick reply", () => {
    const greeting = getPageContextGreeting("Startup Product Engineering");
    expect(greeting.content).toContain("Startup Product Engineering");
    expect(greeting.quickReplies.length).toBeGreaterThan(0);
  });

  it("offers a page's grounded questions as quick replies when given some", () => {
    const greeting = getPageContextGreeting("the Fieldnote case study", [
      { question: "Why Next.js?", answer: "..." },
      { question: "What was the architecture?", answer: "..." },
    ]);
    expect(greeting.quickReplies).toEqual(["Why Next.js?", "What was the architecture?"]);
  });

  it("falls back to the generic three quick replies when given an empty array", () => {
    const greeting = getPageContextGreeting("the Fieldnote case study", []);
    expect(greeting.quickReplies).toEqual([
      "What's a typical roadmap?",
      "Compare technologies",
      "Start BuildPath",
    ]);
  });
});

describe("getGroundedAnswer", () => {
  const groundedReplies = [
    { question: "Why Next.js?", answer: "Server rendering meant fast loads for technicians." },
  ];

  it("returns the real answer for an exact question match", () => {
    const answer = getGroundedAnswer(groundedReplies, "Why Next.js?");
    expect(answer?.content).toBe("Server rendering meant fast loads for technicians.");
  });

  it("matches case- and whitespace-insensitively", () => {
    const answer = getGroundedAnswer(groundedReplies, "  why next.js?  ");
    expect(answer?.content).toBe("Server rendering meant fast loads for technicians.");
  });

  it("returns null for a message that doesn't match any grounded question", () => {
    expect(getGroundedAnswer(groundedReplies, "What's an MVP scope?")).toBeNull();
  });

  it("returns null when there are no grounded replies to check", () => {
    expect(getGroundedAnswer(undefined, "Why Next.js?")).toBeNull();
  });
});
