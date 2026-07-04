import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Timeline } from "./Timeline";

describe("Timeline", () => {
  it("renders every item's title and description", () => {
    render(
      <Timeline
        items={[
          { title: "Discovery", description: "Understand the business.", status: "complete" },
          { title: "Architecture", description: "Design the system.", status: "current" },
          { title: "Launch", status: "upcoming" },
        ]}
      />,
    );
    expect(screen.getByText("Discovery")).toBeInTheDocument();
    expect(screen.getByText("Understand the business.")).toBeInTheDocument();
    expect(screen.getByText("Architecture")).toBeInTheDocument();
    expect(screen.getByText("Launch")).toBeInTheDocument();
  });

  it("renders as an ordered list", () => {
    render(<Timeline items={[{ title: "Discovery" }, { title: "Launch" }]} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
