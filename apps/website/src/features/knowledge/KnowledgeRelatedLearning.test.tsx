import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeRelatedLearning } from "./KnowledgeRelatedLearning";

const validatingAnMvp = KNOWLEDGE_ARTICLES.find(
  (candidate) => candidate.slug === "validating-an-mvp",
);
if (!validatingAnMvp) throw new Error("Missing validating-an-mvp fixture");

const monolithVsMicroservices = KNOWLEDGE_ARTICLES.find(
  (candidate) => candidate.slug === "monolith-vs-microservices",
);
if (!monolithVsMicroservices) throw new Error("Missing monolith-vs-microservices fixture");

describe("KnowledgeRelatedLearning", () => {
  it("renders a card for every related article", () => {
    render(<KnowledgeRelatedLearning article={validatingAnMvp} />);

    expect(screen.getByRole("heading", { name: "Related learning" })).toBeInTheDocument();
    for (const slug of validatingAnMvp.relatedArticleSlugs) {
      const related = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === slug);
      if (!related) throw new Error(`Missing ${slug} article fixture`);
      expect(screen.getByText(related.title)).toBeInTheDocument();
    }
  });

  it("renders nothing when there are no related articles", () => {
    const { container } = render(<KnowledgeRelatedLearning article={monolithVsMicroservices} />);
    expect(container).toBeEmptyDOMElement();
  });
});
