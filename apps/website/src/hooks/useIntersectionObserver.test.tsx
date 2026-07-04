import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

function mockIntersectionObserver() {
  let trigger: (isIntersecting: boolean) => void = () => {};
  const disconnect = vi.fn();
  const observe = vi.fn();

  class MockObserver {
    constructor(callback: IntersectionObserverCallback) {
      trigger = (isIntersecting) => {
        callback(
          [{ isIntersecting } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver,
        );
      };
    }
    observe = observe;
    unobserve = vi.fn();
    disconnect = disconnect;
    takeRecords = () => [];
  }

  vi.stubGlobal("IntersectionObserver", MockObserver);
  return { trigger: (value: boolean) => trigger(value), disconnect, observe };
}

function Harness({ once }: { once?: boolean }) {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({ once });
  return (
    <div ref={ref} data-testid="target">
      {isIntersecting ? "visible" : "hidden"}
    </div>
  );
}

describe("useIntersectionObserver", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts as not intersecting and observes the attached node", () => {
    const { observe } = mockIntersectionObserver();
    render(<Harness />);

    expect(screen.getByTestId("target")).toHaveTextContent("hidden");
    expect(observe).toHaveBeenCalledWith(screen.getByTestId("target"));
  });

  it("flips to intersecting and disconnects once, by default", () => {
    const { trigger, disconnect } = mockIntersectionObserver();
    render(<Harness />);

    act(() => trigger(true));

    expect(screen.getByTestId("target")).toHaveTextContent("visible");
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it("keeps tracking changes and never disconnects when once is false", () => {
    const { trigger, disconnect } = mockIntersectionObserver();
    render(<Harness once={false} />);

    act(() => trigger(true));
    expect(screen.getByTestId("target")).toHaveTextContent("visible");

    act(() => trigger(false));
    expect(screen.getByTestId("target")).toHaveTextContent("hidden");
    expect(disconnect).not.toHaveBeenCalled();
  });
});
