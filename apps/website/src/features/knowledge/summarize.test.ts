import { describe, expect, it } from "vitest";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { generateArticleSummary, SUMMARY_MODES, SUMMARY_MODE_OPTIONS } from "./summarize";

const [article] = KNOWLEDGE_ARTICLES;
if (!article) throw new Error("Expected at least one knowledge article for this test");

describe("SUMMARY_MODE_OPTIONS", () => {
  it("has one option per declared mode", () => {
    expect(SUMMARY_MODE_OPTIONS.map((option) => option.mode)).toEqual(SUMMARY_MODES);
  });
});

describe("generateArticleSummary", () => {
  it("returns the article's own summary for 30-second mode", () => {
    expect(generateArticleSummary(article, "30-second")).toBe(article.summary);
  });

  it("produces a distinct, non-empty string for every mode", () => {
    const outputs = SUMMARY_MODES.map((mode) => generateArticleSummary(article, mode));
    for (const output of outputs) {
      expect(output.length).toBeGreaterThan(0);
    }
    expect(new Set(outputs).size).toBe(outputs.length);
  });

  it("never fabricates content — every mode's output is built from real article fields", () => {
    expect(generateArticleSummary(article, "executive")).toContain(article.businessContext);
    expect(generateArticleSummary(article, "beginner")).toContain(article.problem);
    expect(generateArticleSummary(article, "technical")).toContain(article.engineeringContext);
  });
});
