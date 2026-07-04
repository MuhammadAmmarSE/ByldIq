import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Divider } from "./Divider";

describe("Divider", () => {
  it("is decorative (no semantic role) by default", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('[role="separator"]')).not.toBeInTheDocument();
  });

  it("exposes a separator role when not decorative", () => {
    const { container } = render(<Divider decorative={false} />);
    expect(container.querySelector('[role="separator"]')).toBeInTheDocument();
  });

  it("sizes for vertical orientation", () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(container.firstChild).toHaveClass("h-full", "w-px");
  });
});
