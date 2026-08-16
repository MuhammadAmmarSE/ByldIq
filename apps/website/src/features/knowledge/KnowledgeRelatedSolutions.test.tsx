import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { SOLUTIONS } from "@/features/solutions";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeRelatedSolutions } from "./KnowledgeRelatedSolutions";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

describe("KnowledgeRelatedSolutions", () => {
  it("renders a card for every related solution", () => {
    render(<KnowledgeRelatedSolutions article={article} />);

    expect(screen.getByRole("heading", { name: "Where this shows up" })).toBeInTheDocument();
    for (const slug of article.relatedSolutionSlugs) {
      const solution = SOLUTIONS.find((candidate) => candidate.slug === slug);
      if (!solution) throw new Error(`Missing ${slug} solution fixture`);
      expect(screen.getByText(solution.navLabel)).toBeInTheDocument();
    }
  });

  it("renders nothing when there are no related solutions", () => {
    const { container } = render(
      <KnowledgeRelatedSolutions article={{ ...article, relatedSolutionSlugs: [] }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
