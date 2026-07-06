import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyArchitecture } from "./TechnologyArchitecture";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!technology) throw new Error("Missing next-js fixture");

describe("TechnologyArchitecture", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every node and shows the first node's description by default", () => {
    render(<TechnologyArchitecture technology={technology} />);

    const [firstNode] = technology.architecture;
    if (!firstNode) throw new Error("Technology has no architecture nodes");

    for (const node of technology.architecture) {
      expect(screen.getByRole("button", { name: node.label })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: firstNode.label })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText(firstNode.description)).toBeInTheDocument();
  });

  it("shows another node's description on click and tracks the selection", async () => {
    const user = userEvent.setup();
    render(<TechnologyArchitecture technology={technology} />);

    const secondNode = technology.architecture[1];
    if (!secondNode) throw new Error("Technology needs at least two architecture nodes");

    await user.click(screen.getByRole("button", { name: secondNode.label }));

    expect(screen.getByText(secondNode.description)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("technology_architecture_node_selected", {
      slug: technology.slug,
      node: secondNode.id,
    });
  });
});
