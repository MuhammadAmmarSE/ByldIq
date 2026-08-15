import { act } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ReadingProgressBar } from "./ReadingProgressBar";

function mockScroll({ scrollY, scrollHeight, innerHeight }: Record<string, number>) {
  Object.defineProperty(window, "scrollY", { value: scrollY, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, configurable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("ReadingProgressBar", () => {
  it("renders an accessible progress bar reflecting scroll position", () => {
    render(<ReadingProgressBar />);

    mockScroll({ scrollY: 400, scrollHeight: 1000, innerHeight: 200 }); // 50%

    expect(screen.getByRole("progressbar", { name: "Reading progress" })).toHaveAttribute(
      "aria-valuenow",
      "50",
    );
  });

  it("calls onComplete once when scroll progress reaches 100%", () => {
    const onComplete = vi.fn();
    render(<ReadingProgressBar onComplete={onComplete} />);

    mockScroll({ scrollY: 400, scrollHeight: 1000, innerHeight: 200 }); // 50%
    expect(onComplete).not.toHaveBeenCalled();

    mockScroll({ scrollY: 800, scrollHeight: 1000, innerHeight: 200 }); // 100%
    expect(onComplete).toHaveBeenCalledTimes(1);

    mockScroll({ scrollY: 800, scrollHeight: 1000, innerHeight: 200 }); // still 100%
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
