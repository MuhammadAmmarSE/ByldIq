import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { TUTORIALS } from "./data/tutorials";
import { KnowledgeTutorials } from "./KnowledgeTutorials";

describe("KnowledgeTutorials", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every tutorial with a link to its detail route", () => {
    render(<KnowledgeTutorials />);
    for (const tutorial of TUTORIALS) {
      expect(screen.getByRole("link", { name: tutorial.title })).toHaveAttribute(
        "href",
        `/knowledge/tutorials/${tutorial.slug}`,
      );
    }
  });

  it("states the real tutorial count honestly", () => {
    render(<KnowledgeTutorials />);
    if (TUTORIALS.length === 1) {
      expect(screen.getByText(/one hands-on tutorial is published so far/i)).toBeInTheDocument();
    } else {
      expect(
        screen.getByText(new RegExp(`${TUTORIALS.length} hands-on tutorials`, "i")),
      ).toBeInTheDocument();
    }
  });

  it("tracks selecting a tutorial card", async () => {
    const user = userEvent.setup();
    render(<KnowledgeTutorials />);

    const [first] = TUTORIALS;
    if (!first) throw new Error("Expected at least one tutorial");

    await user.click(screen.getByRole("link", { name: first.title }));
    expect(mockTrack).toHaveBeenCalledWith("knowledge_card_clicked", { slug: first.slug });
  });
});
