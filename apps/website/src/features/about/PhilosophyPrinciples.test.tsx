import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { PHILOSOPHY_PRINCIPLES } from "./data/philosophy-principles";
import { PhilosophyPrinciples } from "./PhilosophyPrinciples";

describe("PhilosophyPrinciples", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every principle's title and description", () => {
    render(<PhilosophyPrinciples />);

    for (const principle of PHILOSOPHY_PRINCIPLES) {
      expect(screen.getByText(principle.title)).toBeInTheDocument();
      expect(screen.getByText(principle.description)).toBeInTheDocument();
    }
  });

  it("gives the section a stable id for the sidebar", () => {
    const { container } = render(<PhilosophyPrinciples />);
    expect(container.querySelector("#philosophy")).toBeInTheDocument();
  });

  it("tracks about_philosophy_interaction on hover", async () => {
    const user = userEvent.setup();
    render(<PhilosophyPrinciples />);
    const [firstPrinciple] = PHILOSOPHY_PRINCIPLES;
    if (!firstPrinciple) throw new Error("No philosophy principles defined");

    // React re-implements enter/leave semantics with synthetic bubbling, so
    // hovering the heading (a descendant) still fires the card wrapper's
    // `onPointerEnter` — no need to locate the wrapper element itself.
    await user.hover(screen.getByRole("heading", { name: firstPrinciple.title }));

    expect(mockTrack).toHaveBeenCalledWith("about_philosophy_interaction", {
      principle: firstPrinciple.id,
    });
  });
});
