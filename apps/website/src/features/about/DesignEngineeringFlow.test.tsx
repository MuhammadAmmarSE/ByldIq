import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DesignEngineeringFlow } from "./DesignEngineeringFlow";

describe("DesignEngineeringFlow", () => {
  it("renders every stage of the flow in order", () => {
    render(<DesignEngineeringFlow />);

    const items = screen.getAllByRole("listitem");
    expect(items.map((item) => item.textContent)).toEqual([
      "Product Strategy",
      "UX",
      "UI",
      "Design System",
      "Architecture",
      "Engineering",
      "Validation",
    ]);
  });

  it("explains that the flow loops back, not a one-way handoff", () => {
    render(<DesignEngineeringFlow />);
    expect(screen.getByText(/feeds back into the ones before it/i)).toBeInTheDocument();
  });

  it("gives the section a stable id for the sidebar", () => {
    const { container } = render(<DesignEngineeringFlow />);
    expect(container.querySelector("#design-engineering")).toBeInTheDocument();
  });
});
