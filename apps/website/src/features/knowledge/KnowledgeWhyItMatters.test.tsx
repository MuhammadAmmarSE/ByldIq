import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeWhyItMatters } from "./KnowledgeWhyItMatters";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

describe("KnowledgeWhyItMatters", () => {
  it("renders the problem, importance, business/engineering context, and real-world relevance", () => {
    render(<KnowledgeWhyItMatters article={article} />);

    expect(screen.getByText(article.problem)).toBeInTheDocument();
    expect(screen.getByText(article.importance)).toBeInTheDocument();
    expect(screen.getByText(article.businessContext)).toBeInTheDocument();
    expect(screen.getByText(article.engineeringContext)).toBeInTheDocument();
    expect(screen.getByText(article.realWorldRelevance)).toBeInTheDocument();
  });

  it("gives each section a stable id for future in-page navigation", () => {
    const { container } = render(<KnowledgeWhyItMatters article={article} />);

    expect(container.querySelector("#problem")).toBeInTheDocument();
    expect(container.querySelector("#why-it-matters")).toBeInTheDocument();
    expect(container.querySelector("#business-and-engineering-context")).toBeInTheDocument();
    expect(container.querySelector("#real-world-relevance")).toBeInTheDocument();
  });
});
