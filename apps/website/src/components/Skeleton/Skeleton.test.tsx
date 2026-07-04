import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders as a presentational, assistive-tech-hidden element", () => {
    render(<Skeleton data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveAttribute("role", "presentation");
    expect(el).toHaveAttribute("aria-hidden", "true");
  });

  it("merges custom className with the defaults", () => {
    render(<Skeleton data-testid="skeleton" className="h-4 w-32" />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveClass("animate-pulse", "h-4", "w-32");
  });
});
