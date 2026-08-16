import { describe, expect, it } from "vitest";

import { decodeSharePayload, encodeSharePayload, type SharePayload } from "./share-encoding";

describe("share-encoding", () => {
  it("round-trips a payload through encode and decode", () => {
    const payload = {
      projectTypes: ["MVP", "AI Product"] as SharePayload["projectTypes"],
      vision: "A booking tool for clinics",
      problem: "Clinics lose bookings to phone tag",
      mvpFeatureNames: ["Online booking calendar", "SMS reminders"],
      nextSteps: ["Review this plan with your team"],
    };

    const encoded = encodeSharePayload(payload);
    expect(decodeSharePayload(encoded)).toEqual(payload);
  });

  it("produces a URL-safe string with no padding characters", () => {
    const encoded = encodeSharePayload({
      projectTypes: [],
      vision: "Something with special chars: é, ñ, 中文, +/=",
      problem: "",
      mvpFeatureNames: [],
      nextSteps: [],
    });

    expect(encoded).not.toMatch(/[+/=]/);
  });

  it("returns null for a garbled or unrelated id", () => {
    expect(decodeSharePayload("not-a-real-payload")).toBeNull();
    expect(decodeSharePayload("")).toBeNull();
  });
});
