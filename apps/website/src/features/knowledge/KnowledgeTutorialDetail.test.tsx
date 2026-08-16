import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack, mockSetPageContext } = vi.hoisted(() => ({
  mockTrack: vi.fn(),
  mockSetPageContext: vi.fn(),
}));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

vi.mock("@/features/homepage/ai-companion", () => ({
  useAiCompanion: () => ({ setPageContext: mockSetPageContext }),
}));

import { TUTORIALS } from "./data/tutorials";
import { KnowledgeTutorialDetail } from "./KnowledgeTutorialDetail";

const [tutorial] = TUTORIALS;
if (!tutorial) throw new Error("Expected at least one tutorial fixture");

describe("KnowledgeTutorialDetail", () => {
  afterEach(() => {
    mockTrack.mockClear();
    mockSetPageContext.mockClear();
  });

  it("renders the title, summary, and every section heading", () => {
    render(<KnowledgeTutorialDetail tutorial={tutorial} categoryLabel="Testing" />);

    expect(screen.getByRole("heading", { name: tutorial.title })).toBeInTheDocument();
    expect(screen.getByText(tutorial.summary)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Prerequisites" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Setup" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Validation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Next steps" })).toBeInTheDocument();
  });

  it("renders every prerequisite and every step", () => {
    render(<KnowledgeTutorialDetail tutorial={tutorial} />);

    for (const prerequisite of tutorial.prerequisites) {
      expect(screen.getByText(prerequisite)).toBeInTheDocument();
    }
    tutorial.steps.forEach((step, index) => {
      expect(
        screen.getByRole("heading", { name: `Step ${index + 1}: ${step.title}` }),
      ).toBeInTheDocument();
    });
  });

  it("tracks knowledge_tutorial_started once on mount", () => {
    render(<KnowledgeTutorialDetail tutorial={tutorial} />);
    expect(mockTrack).toHaveBeenCalledWith("knowledge_tutorial_started", { slug: tutorial.slug });
  });

  it("sets the AI companion's page context with real grounded replies", () => {
    render(<KnowledgeTutorialDetail tutorial={tutorial} />);
    expect(mockSetPageContext).toHaveBeenCalledWith(
      expect.objectContaining({ label: tutorial.title, slug: tutorial.slug }),
    );

    const call = mockSetPageContext.mock.calls.find(
      (args): args is [{ groundedReplies?: unknown[] }] => args[0] !== null,
    );
    expect(call?.[0].groundedReplies?.length).toBeGreaterThan(0);
  });

  it("links to BuildPath with the tutorial prefilled", () => {
    render(<KnowledgeTutorialDetail tutorial={tutorial} />);
    expect(
      screen.getByRole("link", { name: "Plan a similar build with BuildPath" }),
    ).toHaveAttribute("href", `/buildpath?tutorial=${tutorial.slug}`);
  });
});
