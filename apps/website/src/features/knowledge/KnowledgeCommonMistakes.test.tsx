import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeCommonMistakes } from "./KnowledgeCommonMistakes";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

describe("KnowledgeCommonMistakes", () => {
  it("renders every mistake and its consequence", () => {
    render(<KnowledgeCommonMistakes article={article} />);

    for (const mistake of article.commonMistakes) {
      expect(screen.getByText(mistake.mistake)).toBeInTheDocument();
      expect(screen.getByText(mistake.consequence)).toBeInTheDocument();
    }
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<KnowledgeCommonMistakes article={article} />);
    expect(container.querySelector("#common-mistakes")).toBeInTheDocument();
  });
});
