import { describe, expect, it } from "vitest";

import { slugify } from "./slugify";

describe("slugify", () => {
  it("lowercases and hyphenates spaces", () => {
    expect(slugify("Developer Tools")).toBe("developer-tools");
  });

  it("replaces punctuation with hyphens", () => {
    expect(slugify("Next.js")).toBe("next-js");
  });

  it("collapses consecutive separators and trims leading/trailing hyphens", () => {
    expect(slugify(" Node.js / Express ")).toBe("node-js-express");
  });
});
