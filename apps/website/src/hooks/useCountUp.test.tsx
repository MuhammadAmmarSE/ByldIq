import { render, screen } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useCountUp } from "@/hooks/useCountUp";

const { mockUseInView, mockUseReducedMotion } = vi.hoisted(() => ({
  mockUseInView: vi.fn(),
  mockUseReducedMotion: vi.fn(),
}));

vi.mock("motion/react", () => ({
  useInView: mockUseInView,
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: mockUseReducedMotion,
}));

function Harness({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const value = useCountUp(ref, target);
  return (
    <span ref={ref} data-testid="value">
      {value}
    </span>
  );
}

describe("useCountUp", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("stays at 0 while out of view", () => {
    mockUseInView.mockReturnValue(false);
    mockUseReducedMotion.mockReturnValue(false);

    render(<Harness target={100} />);
    expect(screen.getByTestId("value")).toHaveTextContent("0");
  });

  it("jumps straight to the target under reduced motion", () => {
    mockUseInView.mockReturnValue(true);
    mockUseReducedMotion.mockReturnValue(true);

    render(<Harness target={42} />);
    expect(screen.getByTestId("value")).toHaveTextContent("42");
  });

  it("preserves decimal precision on the target under reduced motion", () => {
    mockUseInView.mockReturnValue(true);
    mockUseReducedMotion.mockReturnValue(true);

    render(<Harness target={99.97} />);
    expect(screen.getByTestId("value")).toHaveTextContent("99.97");
  });
});
