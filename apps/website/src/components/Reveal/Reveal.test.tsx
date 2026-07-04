import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(<Reveal>Section content</Reveal>);
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("renders as the requested element", () => {
    render(
      <Reveal as="section" data-testid="reveal">
        content
      </Reveal>,
    );
    expect(screen.getByTestId("reveal").tagName).toBe("SECTION");
  });
});
