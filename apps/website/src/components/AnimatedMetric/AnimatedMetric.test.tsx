import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AnimatedMetric } from "./AnimatedMetric";

describe("AnimatedMetric", () => {
  it("renders the label and, for a parseable value, exposes the exact value to assistive tech", () => {
    render(<AnimatedMetric value="+17%" label="Checkout conversion" />);
    expect(screen.getByText("Checkout conversion")).toBeInTheDocument();
    expect(screen.getByText("+17%")).toBeInTheDocument();
  });

  it("preserves decimal precision for a decimal metric", () => {
    render(<AnimatedMetric value="99.97%" label="Platform uptime" />);
    expect(screen.getByText("99.97%")).toBeInTheDocument();
  });

  it("renders a negative value correctly", () => {
    render(<AnimatedMetric value="-64%" label="First-response time" />);
    expect(screen.getByText("-64%")).toBeInTheDocument();
  });

  it("falls back to the literal text for a non-numeric value, without fabricating a count", () => {
    render(<AnimatedMetric value="Zero unplanned" label="Migration downtime" />);
    expect(screen.getByText("Zero unplanned")).toBeInTheDocument();
    expect(screen.getByText("Migration downtime")).toBeInTheDocument();
  });

  it("falls back to the literal text for a value with a second embedded number", () => {
    render(<AnimatedMetric value="2 days -> 12 min" label="Environment provisioning" />);
    expect(screen.getByText("2 days -> 12 min")).toBeInTheDocument();
  });
});
