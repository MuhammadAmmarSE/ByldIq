import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HERO_CONTENT } from "./data/hero-content";
import { HeroProductPreview } from "./HeroProductPreview";

describe("HeroProductPreview", () => {
  it("exposes the real metric value to assistive tech regardless of the count-up animation state", () => {
    render(<HeroProductPreview content={HERO_CONTENT.startup} />);

    expect(
      screen.getByText(`${HERO_CONTENT.startup.metric.label}: 12,400`, { exact: false }),
    ).toBeInTheDocument();
  });

  it("renders every technology badge for the given content", () => {
    render(<HeroProductPreview content={HERO_CONTENT.enterprise} />);

    for (const technology of HERO_CONTENT.enterprise.technologies) {
      expect(screen.getByText(technology)).toBeInTheDocument();
    }
  });
});
