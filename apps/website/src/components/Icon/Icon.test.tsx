import { ArrowRight } from "lucide-react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Icon } from "./Icon";

describe("Icon", () => {
  it("is decorative (aria-hidden) by default", () => {
    const { container } = render(<Icon icon={ArrowRight} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("role");
  });

  it("exposes an accessible name when given a label", () => {
    render(<Icon icon={ArrowRight} label="Next" />);
    expect(screen.getByRole("img", { name: "Next" })).toBeInTheDocument();
  });

  it("sizes according to the size prop", () => {
    const { container } = render(<Icon icon={ArrowRight} size="lg" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "24");
  });
});
