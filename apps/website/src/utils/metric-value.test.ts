import { describe, expect, it } from "vitest";

import { parseMetricValue } from "./metric-value";

describe("parseMetricValue", () => {
  it("parses a leading-sign percentage", () => {
    expect(parseMetricValue("+17%")).toEqual({
      sign: "+",
      magnitude: 17,
      suffix: "%",
      decimals: 0,
    });
  });

  it("parses a negative percentage", () => {
    expect(parseMetricValue("-64%")).toEqual({
      sign: "-",
      magnitude: 64,
      suffix: "%",
      decimals: 0,
    });
  });

  it("parses a decimal value and reports its decimal places", () => {
    expect(parseMetricValue("99.97%")).toEqual({
      sign: "",
      magnitude: 99.97,
      suffix: "%",
      decimals: 2,
    });
  });

  it("parses a negative decimal with a unit suffix", () => {
    expect(parseMetricValue("-1.4s")).toEqual({
      sign: "-",
      magnitude: 1.4,
      suffix: "s",
      decimals: 1,
    });
  });

  it("strips comma grouping and keeps a trailing symbol suffix", () => {
    expect(parseMetricValue("1,200+")).toEqual({
      sign: "",
      magnitude: 1200,
      suffix: "+",
      decimals: 0,
    });
  });

  it("parses a multiplier", () => {
    expect(parseMetricValue("3x")).toEqual({
      sign: "",
      magnitude: 3,
      suffix: "x",
      decimals: 0,
    });
  });

  it("returns null for prose with no clean leading number", () => {
    expect(parseMetricValue("Zero unplanned")).toBeNull();
    expect(parseMetricValue("No increase")).toBeNull();
  });

  it("returns null when a second number appears after the unit text", () => {
    expect(parseMetricValue("2 days -> 12 min")).toBeNull();
  });
});
