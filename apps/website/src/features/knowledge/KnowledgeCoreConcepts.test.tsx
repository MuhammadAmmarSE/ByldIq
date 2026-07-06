import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeCoreConcepts } from "./KnowledgeCoreConcepts";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

describe("KnowledgeCoreConcepts", () => {
  it("renders every core concept's term and explanation", () => {
    render(<KnowledgeCoreConcepts article={article} />);

    for (const concept of article.coreConcepts) {
      expect(screen.getByText(concept.term)).toBeInTheDocument();
      expect(screen.getByText(concept.explanation)).toBeInTheDocument();
    }
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<KnowledgeCoreConcepts article={article} />);
    expect(container.querySelector("#core-concepts")).toBeInTheDocument();
  });
});
