import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "./Container";

describe("Container", () => {
  it("applies the content max-width by default", () => {
    render(<Container data-testid="c">content</Container>);
    expect(screen.getByTestId("c")).toHaveClass("max-w-content");
  });

  it("applies the requested size", () => {
    render(
      <Container data-testid="c" size="narrow">
        content
      </Container>,
    );
    expect(screen.getByTestId("c")).toHaveClass("max-w-narrow");
  });

  it("renders as the given element", () => {
    render(
      <Container as="section" data-testid="c">
        content
      </Container>,
    );
    expect(screen.getByTestId("c").tagName).toBe("SECTION");
  });
});
