import { describe, expect, it } from "vitest";

import { matchIntent } from "./intents";

describe("matchIntent", () => {
  it("matches startup keywords", () => {
    expect(matchIntent("What should my MVP include?")).toBe("startup");
  });

  it("matches enterprise keywords", () => {
    expect(matchIntent("How do we handle security and compliance?")).toBe("enterprise");
  });

  it("matches commerce keywords", () => {
    expect(matchIntent("Should I use Shopify for checkout?")).toBe("commerce");
  });

  it("matches AI keywords", () => {
    expect(matchIntent("What's the difference between RAG and fine-tuning?")).toBe("ai");
  });

  it("matches platform keywords", () => {
    expect(matchIntent("How do we design our API infrastructure?")).toBe("platform");
  });

  it("prioritizes buildpath over other keywords", () => {
    expect(matchIntent("Can BuildPath help with my startup MVP?")).toBe("buildpath");
  });

  it("falls back for unrecognized input", () => {
    expect(matchIntent("what's the weather like")).toBe("fallback");
  });
});
