import { act } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { KnowledgeReadingProgress } from "./KnowledgeReadingProgress";

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

describe("KnowledgeReadingProgress", () => {
  it("renders an accessible progress bar reflecting scroll position", () => {
    render(<KnowledgeReadingProgress />);

    mockScroll({ scrollY: 400, scrollHeight: 1000, innerHeight: 200 }); // 50%

    expect(screen.getByRole("progressbar", { name: "Reading progress" })).toHaveAttribute(
      "aria-valuenow",
      "50",
    );
  });
});
