import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { TECHNOLOGIES } from "@/features/technology";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeRelatedTechnologies } from "./KnowledgeRelatedTechnologies";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

describe("KnowledgeRelatedTechnologies", () => {
  it("renders a card for every related technology", () => {
    render(<KnowledgeRelatedTechnologies article={article} />);

    expect(screen.getByRole("heading", { name: "Related technologies" })).toBeInTheDocument();
    for (const slug of article.relatedTechnologySlugs) {
      const technology = TECHNOLOGIES.find((candidate) => candidate.slug === slug);
      if (!technology) throw new Error(`Missing ${slug} technology fixture`);
      expect(screen.getByText(technology.name)).toBeInTheDocument();
    }
  });

  it("renders nothing when there are no related technologies", () => {
    const { container } = render(
      <KnowledgeRelatedTechnologies article={{ ...article, relatedTechnologySlugs: [] }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
