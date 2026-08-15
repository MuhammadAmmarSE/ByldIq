import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroBackdrop } from "./HeroBackdrop";

describe("HeroBackdrop", () => {
  it("is purely decorative", () => {
    const { container } = render(<HeroBackdrop />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});
