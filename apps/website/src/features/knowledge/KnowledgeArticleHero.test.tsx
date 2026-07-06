import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeArticleHero } from "./KnowledgeArticleHero";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

describe("KnowledgeArticleHero", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the breadcrumb, title, and summary", () => {
    render(<KnowledgeArticleHero article={article} categoryLabel="MVP" />);

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: article.title })).toBeInTheDocument();
    expect(screen.getByText(article.summary)).toBeInTheDocument();
    expect(screen.getByText("MVP")).toBeInTheDocument();
    expect(screen.getByText(article.difficulty)).toBeInTheDocument();
    expect(screen.getByText(article.readingTime)).toBeInTheDocument();
  });

  it("tracks knowledge_viewed once on mount", () => {
    render(<KnowledgeArticleHero article={article} />);
    expect(mockTrack).toHaveBeenCalledWith("knowledge_viewed", { slug: article.slug });
  });
});
