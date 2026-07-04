import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ScrollIndicator } from "./ScrollIndicator";

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", { value, configurable: true });
  window.dispatchEvent(new Event("scroll"));
}

describe("ScrollIndicator", () => {
  afterEach(() => {
    setScrollY(0);
  });

  it("is visible at the top of the page", () => {
    const { container } = render(<ScrollIndicator />);
    expect(container.firstElementChild).not.toBeNull();
  });

  it("disappears once the visitor scrolls past the threshold", () => {
    const { container } = render(<ScrollIndicator />);
    act(() => setScrollY(200));
    expect(container.firstElementChild).toBeNull();
  });
});
