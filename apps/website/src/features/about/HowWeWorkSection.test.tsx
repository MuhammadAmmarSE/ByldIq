import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HowWeWorkSection } from "./HowWeWorkSection";

describe("HowWeWorkSection", () => {
  it("gives both anchors a stable id for the sidebar", () => {
    const { container } = render(<HowWeWorkSection />);
    expect(container.querySelector("#how-we-work")).toBeInTheDocument();
    expect(container.querySelector("#transparency")).toBeInTheDocument();
  });

  it("renders the collaboration model layers in order", () => {
    render(<HowWeWorkSection />);
    const items = screen.getAllByRole("listitem");
    expect(items.map((item) => item.textContent)).toEqual([
      "Client",
      "Product",
      "Design",
      "Engineering",
      "Byld IQ",
    ]);
  });

  it("renders every transparency item", () => {
    render(<HowWeWorkSection />);
    for (const title of [
      "Risks",
      "Technical debt",
      "Estimates",
      "Trade-offs",
      "Constraints",
      "Dependencies",
      "Unknowns",
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });
});
