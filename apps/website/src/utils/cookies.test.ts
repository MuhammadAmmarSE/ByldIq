import { afterEach, describe, expect, it } from "vitest";

import { setCookie } from "@/utils/cookies";

function clearCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (name) document.cookie = `${name}=; path=/; max-age=0`;
  });
}

describe("setCookie", () => {
  afterEach(() => {
    clearCookies();
  });

  it("sets a readable cookie with the given name and value", () => {
    setCookie("byld_intro_seen", "1", 365);
    expect(document.cookie).toContain("byld_intro_seen=1");
  });
});
