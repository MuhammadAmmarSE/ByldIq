import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyDeepDive } from "./TechnologyDeepDive";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "openai");
if (!technology) throw new Error("Missing openai fixture");

describe("TechnologyDeepDive", () => {
  it("renders every narrative section", () => {
    render(<TechnologyDeepDive technology={technology} />);

    expect(screen.getByText(technology.performance)).toBeInTheDocument();
    expect(screen.getByText(technology.security)).toBeInTheDocument();
    expect(screen.getByText(technology.accessibility)).toBeInTheDocument();
    expect(screen.getByText(technology.scalability)).toBeInTheDocument();
    expect(screen.getByText(technology.costAnalysis)).toBeInTheDocument();
  });

  it("gives each section a stable id for future in-page navigation", () => {
    const { container } = render(<TechnologyDeepDive technology={technology} />);

    expect(container.querySelector("#performance")).toBeInTheDocument();
    expect(container.querySelector("#security")).toBeInTheDocument();
    expect(container.querySelector("#accessibility")).toBeInTheDocument();
    expect(container.querySelector("#scalability")).toBeInTheDocument();
    expect(container.querySelector("#cost-analysis")).toBeInTheDocument();
  });
});
