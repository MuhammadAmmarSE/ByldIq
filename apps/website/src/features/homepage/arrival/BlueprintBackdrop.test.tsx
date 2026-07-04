import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlueprintBackdrop } from "./BlueprintBackdrop";

describe("BlueprintBackdrop", () => {
  it("renders as a decorative, non-interactive layer", () => {
    const { container } = render(<BlueprintBackdrop />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root).toHaveClass("pointer-events-none");
  });
});
