import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LightSweep } from "./LightSweep";

function mockMatchMedia(reducedMotion: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reducedMotion,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

describe("LightSweep", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a decorative sweep layer", () => {
    mockMatchMedia(false);
    const { container } = render(<LightSweep />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("renders nothing under prefers-reduced-motion", () => {
    mockMatchMedia(true);
    const { container } = render(<LightSweep />);
    expect(container).toBeEmptyDOMElement();
  });
});
