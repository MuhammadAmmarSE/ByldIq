import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders the tag matching its variant by default", () => {
    render(<Heading variant="h3">Section title</Heading>);
    const el = screen.getByText("Section title");
    expect(el.tagName).toBe("H3");
  });

  it("allows overriding the rendered tag without changing the variant", () => {
    render(
      <Heading variant="h1" as="h2">
        Visually h1, semantically h2
      </Heading>,
    );
    const el = screen.getByText("Visually h1, semantically h2");
    expect(el.tagName).toBe("H2");
    expect(el.className).toContain("text-5xl");
  });

  it("merges custom className", () => {
    render(
      <Heading variant="h2" className="mb-4">
        Title
      </Heading>,
    );
    expect(screen.getByText("Title")).toHaveClass("mb-4");
  });
});
