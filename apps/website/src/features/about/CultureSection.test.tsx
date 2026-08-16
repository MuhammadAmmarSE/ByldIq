import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CULTURE_VALUES } from "./data/culture-values";
import { CultureSection } from "./CultureSection";

describe("CultureSection", () => {
  it("renders every value's title and real example", () => {
    render(<CultureSection />);

    for (const value of CULTURE_VALUES) {
      expect(screen.getByText(value.title)).toBeInTheDocument();
      expect(screen.getByText(value.example)).toBeInTheDocument();
    }
  });

  it("gives the section a stable id for the sidebar", () => {
    const { container } = render(<CultureSection />);
    expect(container.querySelector("#culture")).toBeInTheDocument();
  });
});
