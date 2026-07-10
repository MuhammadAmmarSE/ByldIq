import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MetricCard } from "./MetricCard";

describe("MetricCard", () => {
  it("exposes the real metric value to assistive tech regardless of the count-up animation state", () => {
    render(<MetricCard value={12400} label="Active users" suffix="+" />);

    expect(screen.getByText("Active users: 12,400+", { exact: false })).toBeInTheDocument();
  });

  it("renders the label as visible text", () => {
    render(<MetricCard value={98} label="Deployment success rate" suffix="%" />);
    expect(screen.getAllByText("Deployment success rate").length).toBeGreaterThan(0);
  });

  it("supports a prefix", () => {
    render(<MetricCard value={2} label="Average cost reduction" prefix="$" suffix="M" />);
    expect(screen.getByText("Average cost reduction: $2M", { exact: false })).toBeInTheDocument();
  });
});
