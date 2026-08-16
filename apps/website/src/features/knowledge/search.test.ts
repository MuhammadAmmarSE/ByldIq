import { describe, expect, it } from "vitest";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { searchKnowledgeArticles, suggestForZeroResults } from "./search";

describe("searchKnowledgeArticles", () => {
  it("returns every article, unscored, for an empty query", () => {
    const results = searchKnowledgeArticles(KNOWLEDGE_ARTICLES, "");
    expect(results).toHaveLength(KNOWLEDGE_ARTICLES.length);
    expect(results.every((result) => result.score === 0)).toBe(true);
  });

  it("ranks a title match above a body-only match", () => {
    const results = searchKnowledgeArticles(KNOWLEDGE_ARTICLES, "MVP");
    expect(results[0]?.article.slug).toBe("validating-an-mvp");
  });

  it("matches on a related technology's name, not just prose fields", () => {
    const results = searchKnowledgeArticles(KNOWLEDGE_ARTICLES, "kubernetes");
    expect(results.some((result) => result.article.slug === "monolith-vs-microservices")).toBe(
      true,
    );
  });

  it("resolves a common alias to the term the corpus actually uses", () => {
    const aliasResults = searchKnowledgeArticles(KNOWLEDGE_ARTICLES, "postgres");
    const canonicalResults = searchKnowledgeArticles(KNOWLEDGE_ARTICLES, "postgresql");
    expect(aliasResults.map((result) => result.article.slug)).toEqual(
      canonicalResults.map((result) => result.article.slug),
    );
    expect(aliasResults.length).toBeGreaterThan(0);
  });

  it("excludes articles when nothing in the corpus genuinely matches the query", () => {
    const results = searchKnowledgeArticles(KNOWLEDGE_ARTICLES, "zzqzzqzz flibbergibbet");
    expect(results).toHaveLength(0);
  });

  it("only searches within the given (already category-scoped) articles", () => {
    const aiOnly = KNOWLEDGE_ARTICLES.filter((article) => article.category === "ai");
    const results = searchKnowledgeArticles(aiOnly, "mvp");
    expect(results).toHaveLength(0);
  });
});

describe("suggestForZeroResults", () => {
  it("suggests a populated category when the query matches one", () => {
    const suggestions = suggestForZeroResults("accessibility");
    expect(
      suggestions.some((suggestion) => suggestion.href === "/knowledge/category/accessibility"),
    ).toBe(true);
  });

  it("suggests a Technology Explorer page when the query matches a technology no article covers", () => {
    const suggestions = suggestForZeroResults("mongodb");
    expect(suggestions.some((suggestion) => suggestion.href === "/technology/mongodb")).toBe(true);
  });

  it("returns no suggestions for a query matching nothing real", () => {
    expect(suggestForZeroResults("zzzznonexistentzzz")).toHaveLength(0);
  });

  it("returns no suggestions for an empty query", () => {
    expect(suggestForZeroResults("")).toHaveLength(0);
  });
});
