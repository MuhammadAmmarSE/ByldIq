import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { useScrollDirection } from "./useScrollDirection";

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true, writable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("useScrollDirection", () => {
  afterEach(() => {
    scrollTo(0);
  });

  it("starts unscrolled, facing up", () => {
    const { result } = renderHook(() => useScrollDirection());
    expect(result.current).toEqual({ scrolled: false, direction: "up" });
  });

  it("reports scrolled once past the threshold", () => {
    const { result } = renderHook(() => useScrollDirection());
    scrollTo(100);
    expect(result.current.scrolled).toBe(true);
    expect(result.current.direction).toBe("down");
  });

  it("reports direction changes", () => {
    const { result } = renderHook(() => useScrollDirection());
    scrollTo(200);
    expect(result.current.direction).toBe("down");
    scrollTo(50);
    expect(result.current.direction).toBe("up");
  });
});
