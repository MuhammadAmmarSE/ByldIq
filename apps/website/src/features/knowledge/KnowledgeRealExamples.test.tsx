import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeRealExamples } from "./KnowledgeRealExamples";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

describe("KnowledgeRealExamples", () => {
  it("renders every example's title and description", () => {
    render(<KnowledgeRealExamples article={article} />);

    for (const example of article.realExamples) {
      expect(screen.getByRole("heading", { name: example.title })).toBeInTheDocument();
      expect(screen.getByText(example.description)).toBeInTheDocument();
    }
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<KnowledgeRealExamples article={article} />);
    expect(container.querySelector("#real-examples")).toBeInTheDocument();
  });
});
