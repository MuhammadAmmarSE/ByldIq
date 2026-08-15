import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ParticleField } from "./ParticleField";

function mockMatchMedia(reducedMotion: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reducedMotion,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

describe("ParticleField", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the requested number of particles", () => {
    mockMatchMedia(false);
    const { container } = render(<ParticleField count={8} />);
    expect(container.querySelectorAll("span")).toHaveLength(8);
  });

  it("defaults to 12 particles", () => {
    mockMatchMedia(false);
    const { container } = render(<ParticleField />);
    expect(container.querySelectorAll("span")).toHaveLength(12);
  });

  it("renders nothing under prefers-reduced-motion", () => {
    mockMatchMedia(true);
    const { container } = render(<ParticleField />);
    expect(container).toBeEmptyDOMElement();
  });

  it("is purely decorative", () => {
    mockMatchMedia(false);
    const { container } = render(<ParticleField count={3} />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});
