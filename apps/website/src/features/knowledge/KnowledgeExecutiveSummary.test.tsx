import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeExecutiveSummary } from "./KnowledgeExecutiveSummary";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

describe("KnowledgeExecutiveSummary", () => {
  it("renders every audience entry and learning outcome", () => {
    render(<KnowledgeExecutiveSummary article={article} />);

    for (const audience of article.audience) {
      expect(screen.getByText(audience)).toBeInTheDocument();
    }
    for (const outcome of article.learningOutcomes) {
      expect(screen.getByText(outcome)).toBeInTheDocument();
    }
  });

  it("gives each section a stable id for future in-page navigation", () => {
    const { container } = render(<KnowledgeExecutiveSummary article={article} />);

    expect(container.querySelector("#who-this-is-for")).toBeInTheDocument();
    expect(container.querySelector("#what-youll-learn")).toBeInTheDocument();
  });
});
