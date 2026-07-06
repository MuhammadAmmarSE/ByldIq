import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { DecisionWizard } from "./DecisionWizard";

describe("DecisionWizard", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("shows no results until both questions are answered", () => {
    render(<DecisionWizard />);
    expect(screen.queryByRole("heading", { name: /candidate/i })).not.toBeInTheDocument();
  });

  it("narrows to the selected category and shows the chosen concern's real content", async () => {
    const user = userEvent.setup();
    render(<DecisionWizard />);

    await user.click(screen.getByRole("button", { name: "Databases" }));
    await user.click(screen.getByRole("button", { name: "Cost & budget" }));

    expect(screen.getByRole("link", { name: "PostgreSQL" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "MongoDB" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Next.js" })).not.toBeInTheDocument();

    expect(mockTrack).toHaveBeenCalledWith("decision_wizard_answered", {
      question: "what-are-you-building",
      answer: "databases",
    });
    expect(mockTrack).toHaveBeenCalledWith("decision_wizard_answered", {
      question: "what-matters-most",
      answer: "costAnalysis",
    });
    expect(mockTrack).toHaveBeenCalledWith("decision_wizard_completed", {
      recommendedSlugs: ["postgresql", "mongodb"],
    });
  });

  it("shows a single candidate for a category with only one real technology", async () => {
    const user = userEvent.setup();
    render(<DecisionWizard />);

    await user.click(screen.getByRole("button", { name: "Infrastructure" }));
    await user.click(screen.getByRole("button", { name: "Scalability & traffic" }));

    expect(screen.getByRole("heading", { name: "Your candidate" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Kubernetes" })).toBeInTheDocument();
  });
});
