import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyBusinessValue } from "./TechnologyBusinessValue";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "postgresql");
if (!technology) throw new Error("Missing postgresql fixture");

describe("TechnologyBusinessValue", () => {
  it("renders the business problem, adoption reasoning, and business/engineering fit", () => {
    render(<TechnologyBusinessValue technology={technology} />);

    expect(screen.getByText(technology.businessProblem)).toBeInTheDocument();
    expect(screen.getByText(technology.whyOrganizationsAdopt)).toBeInTheDocument();
    expect(screen.getByText(technology.businessFit)).toBeInTheDocument();
    expect(screen.getByText(technology.engineeringFit)).toBeInTheDocument();
  });

  it("gives each section a stable id for future in-page navigation", () => {
    const { container } = render(<TechnologyBusinessValue technology={technology} />);

    expect(container.querySelector("#business-problem")).toBeInTheDocument();
    expect(container.querySelector("#why-organizations-adopt")).toBeInTheDocument();
    expect(container.querySelector("#business-and-engineering-fit")).toBeInTheDocument();
  });
});
