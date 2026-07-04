import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { CASE_STUDIES } from "./data/case-studies";
import { ProofEngine } from "./ProofEngine";

describe("ProofEngine", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the featured story and every project by default", () => {
    render(<ProofEngine />);

    expect(screen.getAllByText(/Featured/i).length).toBeGreaterThan(0);
    for (const caseStudy of CASE_STUDIES) {
      expect(screen.getAllByText(caseStudy.headline).length).toBeGreaterThan(0);
    }
  });

  it("filters projects by journey and tracks the change", async () => {
    const user = userEvent.setup();
    render(<ProofEngine />);

    await user.click(screen.getByRole("button", { name: "Commerce" }));

    expect(screen.getAllByText(/Nova Commerce/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Atlas Logistics/i)).not.toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("proof_filter_changed", { journey: "commerce" });
  });

  it("filters projects by search query and tracks it", async () => {
    const user = userEvent.setup();
    render(<ProofEngine />);

    await user.type(screen.getByRole("searchbox", { name: /search projects/i }), "Fieldnote");

    expect(screen.getAllByText(/Fieldnote/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Nova Commerce/i)).not.toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith(
      "proof_search",
      expect.objectContaining({ query: expect.stringContaining("F") }),
    );
  });

  it("shows an educational empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<ProofEngine />);

    await user.type(
      screen.getByRole("searchbox", { name: /search projects/i }),
      "nonexistent company xyz",
    );

    expect(screen.getByText(/No projects match/i)).toBeInTheDocument();
  });
});
