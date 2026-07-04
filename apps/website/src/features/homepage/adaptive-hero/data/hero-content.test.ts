import { describe, expect, it } from "vitest";

import { JOURNEYS } from "@/types/journey";

import { HERO_CONTENT } from "./hero-content";

describe("HERO_CONTENT", () => {
  it("defines content for every journey plus a default", () => {
    const keys = Object.keys(HERO_CONTENT);
    expect(keys).toEqual(expect.arrayContaining([...JOURNEYS, "default"]));
    expect(keys).toHaveLength(JOURNEYS.length + 1);
  });

  it("gives every variant a headline, both CTAs, and at least one trust indicator", () => {
    for (const content of Object.values(HERO_CONTENT)) {
      expect(content.headline.length).toBeGreaterThan(0);
      expect(content.primaryCta.label.length).toBeGreaterThan(0);
      expect(content.primaryCta.href.startsWith("#")).toBe(true);
      expect(content.secondaryCta.label.length).toBeGreaterThan(0);
      expect(content.trustIndicators.length).toBeGreaterThan(0);
      expect(content.technologies.length).toBeGreaterThan(0);
    }
  });
});
