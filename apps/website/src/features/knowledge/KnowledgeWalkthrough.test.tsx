import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeWalkthrough } from "./KnowledgeWalkthrough";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

describe("KnowledgeWalkthrough", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every step and shows the first step's description by default", () => {
    render(<KnowledgeWalkthrough article={article} />);

    const [firstStep] = article.walkthrough;
    if (!firstStep) throw new Error("Article has no walkthrough steps");

    for (const step of article.walkthrough) {
      expect(screen.getByRole("button", { name: step.label })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: firstStep.label })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText(firstStep.description)).toBeInTheDocument();
  });

  it("shows another step's description on click and tracks the selection", async () => {
    const user = userEvent.setup();
    render(<KnowledgeWalkthrough article={article} />);

    const secondStep = article.walkthrough[1];
    if (!secondStep) throw new Error("Article needs at least two walkthrough steps");

    await user.click(screen.getByRole("button", { name: secondStep.label }));

    expect(screen.getByText(secondStep.description)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("knowledge_walkthrough_step_selected", {
      slug: article.slug,
      step: secondStep.id,
    });
  });
});
