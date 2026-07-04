import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// RTL's own auto-cleanup only registers itself when vitest's `globals: true`
// is set; we don't set that, so clean up explicitly to avoid one test's
// render leaking into the next.
afterEach(() => {
  cleanup();
});
