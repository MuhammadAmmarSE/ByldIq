import { describe, expect, it } from "vitest";

import { DECISION_CARDS, getRecommendedCardId } from "./decision-cards";

describe("DECISION_CARDS", () => {
  it("gives every card a title, description, and cta", () => {
    for (const card of DECISION_CARDS) {
      expect(card.title.length).toBeGreaterThan(0);
      expect(card.description.length).toBeGreaterThan(0);
      expect(card.cta.length).toBeGreaterThan(0);
    }
  });
});

describe("getRecommendedCardId", () => {
  it("recommends BuildPath when no journey is selected", () => {
    expect(getRecommendedCardId(null)).toBe("buildpath");
  });

  it("recommends Book Discovery for the enterprise journey", () => {
    expect(getRecommendedCardId("enterprise")).toBe("book-discovery");
  });

  it("recommends Talk to Byld for the AI journey", () => {
    expect(getRecommendedCardId("ai")).toBe("talk-to-byld");
  });
});
