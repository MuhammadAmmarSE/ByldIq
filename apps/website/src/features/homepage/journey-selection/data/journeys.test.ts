import { describe, expect, it } from "vitest";

import { JOURNEYS } from "@/types/journey";

import { JOURNEY_DEFINITIONS } from "./journeys";

describe("JOURNEY_DEFINITIONS", () => {
  it("defines exactly the five journeys from the shared Journey type, in order", () => {
    expect(JOURNEY_DEFINITIONS.map((definition) => definition.id)).toEqual([...JOURNEYS]);
  });

  it("gives every journey a non-empty title, description, and example list", () => {
    for (const definition of JOURNEY_DEFINITIONS) {
      expect(definition.title.length).toBeGreaterThan(0);
      expect(definition.description.length).toBeGreaterThan(0);
      expect(definition.examples.length).toBeGreaterThan(0);
    }
  });
});
