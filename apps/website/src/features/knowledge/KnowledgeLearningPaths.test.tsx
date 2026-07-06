import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LEARNING_PATHS } from "./data/learning-paths";
import { KnowledgeLearningPaths } from "./KnowledgeLearningPaths";

describe("KnowledgeLearningPaths", () => {
  it("renders a card linking to every learning path", () => {
    render(<KnowledgeLearningPaths />);

    for (const path of LEARNING_PATHS) {
      expect(screen.getByRole("link", { name: path.title })).toHaveAttribute(
        "href",
        `/knowledge/learning-paths/${path.slug}`,
      );
      expect(screen.getByText(path.audience)).toBeInTheDocument();
      expect(screen.getByText(`${path.articleSlugs.length} articles`)).toBeInTheDocument();
    }
  });
});
