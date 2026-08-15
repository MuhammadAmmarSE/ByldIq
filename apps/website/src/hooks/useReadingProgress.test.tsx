import { act } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useReadingProgress } from "./useReadingProgress";

function Harness() {
  const percent = useReadingProgress();
  return <p data-testid="percent">{percent}</p>;
}

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

describe("useReadingProgress", () => {
  it("computes the scrolled percentage of the document", () => {
    render(<Harness />);

    // 1000px document, 200px viewport -> 800px scrollable range.
    mockScroll({ scrollY: 400, scrollHeight: 1000, innerHeight: 200 }); // 50%
    expect(screen.getByTestId("percent")).toHaveTextContent("50");
  });

  it("clamps to 100 when the document is shorter than the viewport", () => {
    render(<Harness />);

    mockScroll({ scrollY: 0, scrollHeight: 200, innerHeight: 400 });
    expect(screen.getByTestId("percent")).toHaveTextContent("100");
  });

  it("clamps to a maximum of 100", () => {
    render(<Harness />);

    mockScroll({ scrollY: 900, scrollHeight: 1000, innerHeight: 200 });
    expect(screen.getByTestId("percent")).toHaveTextContent("100");
  });
});
