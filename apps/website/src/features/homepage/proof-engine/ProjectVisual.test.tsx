import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectVisual } from "./ProjectVisual";

describe("ProjectVisual", () => {
  it("renders as purely decorative (no text, nothing for a screen reader to announce)", () => {
    const { container } = render(<ProjectVisual id="test-visual" />);
    expect(container).toHaveTextContent("");
  });

  it("gives its BlueprintGrid pattern the provided id, to avoid collisions with other instances", () => {
    const { container } = render(<ProjectVisual id="unique-visual-id" />);
    expect(container.querySelector("#unique-visual-id")).toBeInTheDocument();
  });
});
