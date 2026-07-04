import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Text } from "./Text";

describe("Text", () => {
  it("renders a paragraph by default", () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText("Hello").tagName).toBe("P");
  });

  it("renders code variant as a <code> element", () => {
    render(<Text variant="code">const x = 1;</Text>);
    expect(screen.getByText("const x = 1;").tagName).toBe("CODE");
  });

  it("allows overriding the rendered tag", () => {
    render(
      <Text variant="caption" as="span">
        Caption text
      </Text>,
    );
    expect(screen.getByText("Caption text").tagName).toBe("SPAN");
  });
});
