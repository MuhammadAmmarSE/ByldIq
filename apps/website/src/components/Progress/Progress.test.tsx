import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Progress } from "./Progress";

describe("Progress", () => {
  it("exposes the current value to assistive tech", () => {
    render(<Progress value={40} label="Generating roadmap" />);
    const progress = screen.getByRole("progressbar", { name: "Generating roadmap" });
    expect(progress).toHaveAttribute("aria-valuenow", "40");
    expect(progress).toHaveAttribute("aria-valuemax", "100");
  });

  it("respects a custom max", () => {
    render(<Progress value={3} max={5} label="Steps completed" />);
    const progress = screen.getByRole("progressbar", { name: "Steps completed" });
    expect(progress).toHaveAttribute("aria-valuemax", "5");
  });
});
