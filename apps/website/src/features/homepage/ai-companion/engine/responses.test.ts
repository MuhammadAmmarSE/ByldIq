import { describe, expect, it } from "vitest";

import { JOURNEYS } from "@/types/journey";

import { GREETINGS, RESPONSES } from "./responses";

describe("GREETINGS", () => {
  it("has a greeting for every journey plus a default", () => {
    const keys = Object.keys(GREETINGS);
    expect(keys).toEqual(expect.arrayContaining([...JOURNEYS, "default"]));
  });

  it("gives every greeting content and at least one quick reply", () => {
    for (const greeting of Object.values(GREETINGS)) {
      expect(greeting.content.length).toBeGreaterThan(0);
      expect(greeting.quickReplies.length).toBeGreaterThan(0);
    }
  });
});

describe("RESPONSES", () => {
  it("gives every response content and at least one quick reply", () => {
    for (const response of Object.values(RESPONSES)) {
      expect(response.content.length).toBeGreaterThan(0);
      expect(response.quickReplies.length).toBeGreaterThan(0);
    }
  });
});
