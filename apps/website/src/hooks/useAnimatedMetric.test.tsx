import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useAnimatedMetric } from "@/hooks/useAnimatedMetric";

function Harness({ value }: { value: string }) {
  const animated = useAnimatedMetric(value);
  if (!animated) return <span data-testid="result">null</span>;
  return (
    <span data-testid="result" ref={animated.ref as never}>
      {animated.finalText}
    </span>
  );
}

describe("useAnimatedMetric", () => {
  it("returns null for a non-numeric value", () => {
    render(<Harness value="Zero unplanned" />);
    expect(screen.getByTestId("result")).toHaveTextContent("null");
  });

  it("formats a positive-sign percentage with the final value", () => {
    render(<Harness value="+17%" />);
    expect(screen.getByTestId("result")).toHaveTextContent("+17%");
  });

  it("formats a negative percentage with the final value", () => {
    render(<Harness value="-64%" />);
    expect(screen.getByTestId("result")).toHaveTextContent("-64%");
  });

  it("preserves decimal precision", () => {
    render(<Harness value="99.97%" />);
    expect(screen.getByTestId("result")).toHaveTextContent("99.97%");
  });

  it("preserves comma grouping for large numbers", () => {
    render(<Harness value="1,200+" />);
    expect(screen.getByTestId("result")).toHaveTextContent("1,200+");
  });
});
