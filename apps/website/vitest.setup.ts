import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// RTL's own auto-cleanup only registers itself when vitest's `globals: true`
// is set; we don't set that, so clean up explicitly to avoid one test's
// render leaking into the next.
afterEach(() => {
  cleanup();
});

// jsdom doesn't implement IntersectionObserver, which Framer Motion's
// `whileInView` (used by the Reveal component) needs at mount time. A
// minimal stub is enough — tests care that components render without
// throwing, not about real viewport intersection behavior.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = (): IntersectionObserverEntry[] => [];
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

// jsdom also lacks ResizeObserver, which Radix's Popper-based positioning
// (Select/Popover/Tooltip/DropdownMenu content) uses to react to size changes.
class MockResizeObserver implements ResizeObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}

vi.stubGlobal("ResizeObserver", MockResizeObserver);

// jsdom implements neither the Pointer Events capture methods nor
// `scrollIntoView` — Radix's Select/Popover/DropdownMenu/Tooltip primitives
// call these during pointer interaction and positioning. Stub them as
// no-ops so component tests can simulate real clicks/keyboard nav.
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {};
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {};
}
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
