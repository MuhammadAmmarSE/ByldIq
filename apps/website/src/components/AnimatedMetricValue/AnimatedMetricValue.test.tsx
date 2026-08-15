import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AnimatedMetricValue } from "./AnimatedMetricValue";

describe("AnimatedMetricValue", () => {
  it("exposes the exact final value for a parseable metric", () => {
    render(<AnimatedMetricValue value="+17%" />);
    expect(screen.getByText("+17%")).toBeInTheDocument();
  });

  it("preserves decimal precision", () => {
    render(<AnimatedMetricValue value="99.97%" />);
    expect(screen.getByText("99.97%")).toBeInTheDocument();
  });

  it("renders the literal string for a non-numeric value", () => {
    render(<AnimatedMetricValue value="No increase" />);
    expect(screen.getByText("No increase")).toBeInTheDocument();
  });
});
