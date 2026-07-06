import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { ComparisonEngine } from "./ComparisonEngine";

describe("ComparisonEngine", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("defaults to Next.js vs Remix and tracks the initial comparison", () => {
    render(<ComparisonEngine />);

    const table = screen.getByRole("table");
    expect(within(table).getByRole("link", { name: "Next.js" })).toBeInTheDocument();
    expect(within(table).getByRole("link", { name: "Remix" })).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("technology_comparison_viewed", {
      slugs: ["next-js", "remix"],
    });
  });

  it("preseeds the comparison from initialSlugA/initialSlugB", () => {
    render(<ComparisonEngine initialSlugA="postgresql" initialSlugB="mongodb" />);

    const table = screen.getByRole("table");
    expect(within(table).getByRole("link", { name: "PostgreSQL" })).toBeInTheDocument();
    expect(within(table).getByRole("link", { name: "MongoDB" })).toBeInTheDocument();
  });

  it("falls back to the default pair when given an unknown slug", () => {
    render(<ComparisonEngine initialSlugA="not-a-real-technology" />);

    const table = screen.getByRole("table");
    expect(within(table).getByRole("link", { name: "Next.js" })).toBeInTheDocument();
  });

  it("switches to a popular comparison on click", async () => {
    const user = userEvent.setup();
    render(<ComparisonEngine />);

    await user.click(screen.getByRole("button", { name: "PostgreSQL vs MongoDB" }));

    const table = screen.getByRole("table");
    expect(within(table).getByRole("link", { name: "PostgreSQL" })).toBeInTheDocument();
    expect(within(table).getByRole("link", { name: "MongoDB" })).toBeInTheDocument();
  });

  it("renders the same dimensions for both technologies without declaring a winner", () => {
    render(<ComparisonEngine />);

    expect(screen.getByText("Cost")).toBeInTheDocument();
    expect(screen.getByText("Complexity")).toBeInTheDocument();
    expect(screen.getByText("Best for")).toBeInTheDocument();
    expect(screen.getByText("Avoid when")).toBeInTheDocument();
    expect(screen.getByText(/no universal winner/i)).toBeInTheDocument();
  });
});
