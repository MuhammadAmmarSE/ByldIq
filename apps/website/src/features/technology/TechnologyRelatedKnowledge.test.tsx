import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { KNOWLEDGE_ARTICLES } from "@/features/homepage/knowledge-center-preview";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyRelatedKnowledge } from "./TechnologyRelatedKnowledge";

const nextJs = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!nextJs) throw new Error("Missing next-js fixture");

const mongoDb = TECHNOLOGIES.find((candidate) => candidate.slug === "mongodb");
if (!mongoDb) throw new Error("Missing mongodb fixture");

describe("TechnologyRelatedKnowledge", () => {
  it("renders a card for every related article", () => {
    render(<TechnologyRelatedKnowledge technology={nextJs} />);

    expect(screen.getByRole("heading", { name: "Go deeper" })).toBeInTheDocument();
    for (const slug of nextJs.relatedArticleSlugs) {
      const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === slug);
      if (!article) throw new Error(`Missing ${slug} article fixture`);
      expect(screen.getByText(article.title)).toBeInTheDocument();
    }
  });

  it("renders nothing when there are no related articles", () => {
    const { container } = render(<TechnologyRelatedKnowledge technology={mongoDb} />);
    expect(container).toBeEmptyDOMElement();
  });
});
