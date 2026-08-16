import { describe, expect, it } from "vitest";

import {
  journeyToProjectTypes,
  knowledgeCategoryToProjectTypes,
  technologyCategoryToProjectTypes,
} from "./entry-context";

describe("journeyToProjectTypes", () => {
  it("maps every journey to at least one project type", () => {
    for (const journey of ["startup", "enterprise", "commerce", "ai", "platform"] as const) {
      expect(journeyToProjectTypes(journey).length).toBeGreaterThan(0);
    }
  });
});

describe("technologyCategoryToProjectTypes", () => {
  it("maps a known category", () => {
    expect(technologyCategoryToProjectTypes("ai")).toEqual(["AI Product"]);
  });

  it("returns an empty array for an unmapped category, rather than guessing", () => {
    expect(technologyCategoryToProjectTypes("cloud")).toEqual([]);
  });
});

describe("knowledgeCategoryToProjectTypes", () => {
  it("maps mvp to MVP and New Product", () => {
    expect(knowledgeCategoryToProjectTypes("mvp")).toEqual(["MVP", "New Product"]);
  });

  it("maps ai to AI Product", () => {
    expect(knowledgeCategoryToProjectTypes("ai")).toEqual(["AI Product"]);
  });

  it("maps shopify to E-commerce", () => {
    expect(knowledgeCategoryToProjectTypes("shopify")).toEqual(["E-commerce"]);
  });

  it("maps architecture and devops to Modernization", () => {
    expect(knowledgeCategoryToProjectTypes("architecture")).toEqual(["Modernization"]);
    expect(knowledgeCategoryToProjectTypes("devops")).toEqual(["Modernization"]);
  });

  it("returns an empty array for a genuinely cross-cutting category, rather than guessing", () => {
    expect(knowledgeCategoryToProjectTypes("accessibility")).toEqual([]);
    expect(knowledgeCategoryToProjectTypes("testing")).toEqual([]);
  });
});
