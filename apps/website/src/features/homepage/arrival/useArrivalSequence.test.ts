import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useArrivalSequence } from "./useArrivalSequence";

describe("useArrivalSequence", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves immediately to complete when skipIntro is true", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useArrivalSequence({ skipIntro: true, onComplete }));

    expect(result.current.stage).toBe("complete");
    expect(onComplete).toHaveBeenCalledWith("bypassed");
  });

  it("resolves to complete if skipIntro flips to true after mount", () => {
    // Reproduces a real hydration timing gap: `useReducedMotion` always
    // reports `false` during SSR, so a reduced-motion visitor with no
    // "seen intro" cookie mounts with `skipIntro: false` and only flips to
    // `true` once the client media query resolves post-hydration.
    const onComplete = vi.fn();
    const { result, rerender } = renderHook(
      ({ skipIntro }) => useArrivalSequence({ skipIntro, onComplete }),
      { initialProps: { skipIntro: false } },
    );

    expect(result.current.stage).toBe("initial");

    rerender({ skipIntro: true });

    expect(result.current.stage).toBe("complete");
    expect(onComplete).toHaveBeenCalledWith("bypassed");
  });

  it("advances through every stage on its own timeline and completes once", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useArrivalSequence({ skipIntro: false, onComplete }));

    expect(result.current.stage).toBe("initial");

    act(() => vi.advanceTimersByTime(200));
    expect(result.current.stage).toBe("background");

    act(() => vi.advanceTimersByTime(400)); // 600ms total
    expect(result.current.stage).toBe("logo");

    act(() => vi.advanceTimersByTime(400)); // 1000ms total
    expect(result.current.stage).toBe("wordmark");

    act(() => vi.advanceTimersByTime(200)); // 1200ms total
    expect(result.current.stage).toBe("tagline");

    act(() => vi.advanceTimersByTime(200)); // 1400ms total
    expect(result.current.stage).toBe("navigation");

    act(() => vi.advanceTimersByTime(400)); // 1800ms total
    expect(result.current.stage).toBe("complete");
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith("finished");
  });

  it("jumps to complete and fires onComplete('skipped') when skip is called mid-sequence", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() => useArrivalSequence({ skipIntro: false, onComplete }));

    act(() => vi.advanceTimersByTime(600));
    expect(result.current.stage).toBe("logo");

    act(() => result.current.skip());
    expect(result.current.stage).toBe("complete");
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith("skipped");

    // Further time passing must not fire the natural completion too.
    act(() => vi.advanceTimersByTime(2000));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
