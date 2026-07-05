import { describe, expect, it } from "vitest";

import { FICTIONAL_COMPANIES } from "./fictional-companies";

describe("FICTIONAL_COMPANIES", () => {
  it("has unique ids and names", () => {
    const ids = FICTIONAL_COMPANIES.map((company) => company.id);
    const names = FICTIONAL_COMPANIES.map((company) => company.name);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(names).size).toBe(names.length);
  });

  it("gives every company a journey and industry", () => {
    for (const company of FICTIONAL_COMPANIES) {
      expect(company.journey.length).toBeGreaterThan(0);
      expect(company.industry.length).toBeGreaterThan(0);
    }
  });
});
