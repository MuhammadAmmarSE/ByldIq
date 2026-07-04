import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlueprintGrid } from "./BlueprintGrid";

describe("BlueprintGrid", () => {
  it("is decorative", () => {
    const { container } = render(<BlueprintGrid />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses a unique pattern id to avoid collisions between instances", () => {
    const { container } = render(
      <>
        <BlueprintGrid id="grid-a" />
        <BlueprintGrid id="grid-b" />
      </>,
    );
    const patterns = container.querySelectorAll("pattern");
    expect(patterns).toHaveLength(2);
    expect(patterns[0]).toHaveAttribute("id", "grid-a");
    expect(patterns[1]).toHaveAttribute("id", "grid-b");
  });
});
