import { describe, expect, it } from "vitest";

import { parseBeforeAfter } from "./before-after";

describe("parseBeforeAfter", () => {
  it("parses a value with an ASCII arrow", () => {
    expect(parseBeforeAfter("2 days -> 12 min")).toEqual({ before: "2 days", after: "12 min" });
  });

  it("parses a value with a real arrow character", () => {
    expect(parseBeforeAfter("4.2 sec → 1.1 sec")).toEqual({ before: "4.2 sec", after: "1.1 sec" });
  });

  it("returns null for a value with no arrow", () => {
    expect(parseBeforeAfter("+17%")).toBeNull();
    expect(parseBeforeAfter("99.97%")).toBeNull();
    expect(parseBeforeAfter("Zero unplanned")).toBeNull();
  });
});
