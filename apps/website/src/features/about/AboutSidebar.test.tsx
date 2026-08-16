import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

vi.mock("@/hooks/useScrollSpy", () => ({
  useScrollSpy: () => "culture",
}));

import { AboutSidebar } from "./AboutSidebar";

describe("AboutSidebar", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders a link for every section", () => {
    render(<AboutSidebar />);

    expect(screen.getByRole("link", { name: "Our philosophy" })).toHaveAttribute(
      "href",
      "#philosophy",
    );
    expect(screen.getByRole("link", { name: "Explore further" })).toHaveAttribute(
      "href",
      "#ecosystem",
    );
  });

  it("marks the active section from useScrollSpy", () => {
    render(<AboutSidebar />);

    const activeLink = screen.getByRole("link", { name: "Culture" });
    expect(activeLink).toHaveAttribute("aria-current", "location");

    const inactiveLink = screen.getByRole("link", { name: "Our philosophy" });
    expect(inactiveLink).not.toHaveAttribute("aria-current");
  });

  it("tracks about_section_viewed when the active section changes", () => {
    render(<AboutSidebar />);
    expect(mockTrack).toHaveBeenCalledWith("about_section_viewed", { section: "culture" });
  });
});
