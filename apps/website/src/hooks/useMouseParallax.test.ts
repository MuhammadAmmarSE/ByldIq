import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useMouseParallax } from "./useMouseParallax";

function mockMatchMedia({ reducedMotion = false, coarsePointer = false } = {}) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("reduce") ? reducedMotion : coarsePointer,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

describe("useMouseParallax", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns motion values starting at zero", () => {
    mockMatchMedia();
    const { result } = renderHook(() => useMouseParallax());
    expect(result.current.x.get()).toBe(0);
    expect(result.current.y.get()).toBe(0);
  });

  it("listens for pointermove on desktop with no motion preference", () => {
    mockMatchMedia();
    const addSpy = vi.spyOn(window, "addEventListener");
    renderHook(() => useMouseParallax());
    expect(addSpy).toHaveBeenCalledWith("pointermove", expect.any(Function), { passive: true });
  });

  it("does not listen for pointermove under prefers-reduced-motion", () => {
    mockMatchMedia({ reducedMotion: true });
    const addSpy = vi.spyOn(window, "addEventListener");
    renderHook(() => useMouseParallax());
    expect(addSpy).not.toHaveBeenCalledWith("pointermove", expect.any(Function), {
      passive: true,
    });
  });

  it("does not listen for pointermove on coarse-pointer (touch) devices", () => {
    mockMatchMedia({ coarsePointer: true });
    const addSpy = vi.spyOn(window, "addEventListener");
    renderHook(() => useMouseParallax());
    expect(addSpy).not.toHaveBeenCalledWith("pointermove", expect.any(Function), {
      passive: true,
    });
  });
});
