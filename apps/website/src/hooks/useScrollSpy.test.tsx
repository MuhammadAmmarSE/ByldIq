import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useScrollSpy } from "@/hooks/useScrollSpy";

function mockIntersectionObserver() {
  let trigger: (
    entries: Array<{ target: Element; top: number; isIntersecting: boolean }>,
  ) => void = () => {};
  const disconnect = vi.fn();
  const observe = vi.fn();

  class MockObserver {
    constructor(callback: IntersectionObserverCallback) {
      trigger = (entries) => {
        callback(
          entries.map(
            (entry) =>
              ({
                target: entry.target,
                isIntersecting: entry.isIntersecting,
                boundingClientRect: { top: entry.top },
              }) as unknown as IntersectionObserverEntry,
          ),
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
  return {
    trigger: (entries: Array<{ target: Element; top: number; isIntersecting: boolean }>) =>
      trigger(entries),
    disconnect,
    observe,
  };
}

function Harness({ ids }: { ids: string[] }) {
  const activeId = useScrollSpy(ids);
  return (
    <>
      {ids.map((id) => (
        <div key={id} id={id} />
      ))}
      <p data-testid="active">{activeId ?? "none"}</p>
    </>
  );
}

describe("useScrollSpy", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts with no active section and observes every id's element", () => {
    const { observe } = mockIntersectionObserver();
    render(<Harness ids={["one", "two"]} />);

    expect(screen.getByTestId("active")).toHaveTextContent("none");
    expect(observe).toHaveBeenCalledTimes(2);
  });

  it("reports the topmost intersecting section as active", () => {
    const { trigger } = mockIntersectionObserver();
    render(<Harness ids={["one", "two"]} />);

    const one = document.getElementById("one");
    const two = document.getElementById("two");
    if (!one || !two) throw new Error("Expected both section elements to render");

    act(() =>
      trigger([
        { target: one, top: 50, isIntersecting: true },
        { target: two, top: 10, isIntersecting: true },
      ]),
    );

    expect(screen.getByTestId("active")).toHaveTextContent("two");
  });

  it("ignores entries that aren't currently intersecting", () => {
    const { trigger } = mockIntersectionObserver();
    render(<Harness ids={["one", "two"]} />);

    const one = document.getElementById("one");
    if (!one) throw new Error("Expected the first section element to render");

    act(() => trigger([{ target: one, top: 0, isIntersecting: false }]));

    expect(screen.getByTestId("active")).toHaveTextContent("none");
  });

  it("disconnects on unmount", () => {
    const { disconnect } = mockIntersectionObserver();
    const { unmount } = render(<Harness ids={["one"]} />);

    unmount();

    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
