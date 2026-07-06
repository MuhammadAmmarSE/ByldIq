import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyStrengthsWeaknesses } from "./TechnologyStrengthsWeaknesses";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "mongodb");
if (!technology) throw new Error("Missing mongodb fixture");

describe("TechnologyStrengthsWeaknesses", () => {
  it("renders every strength and weakness with its description", () => {
    render(<TechnologyStrengthsWeaknesses technology={technology} />);

    for (const strength of technology.strengths) {
      expect(screen.getByText(strength.label)).toBeInTheDocument();
      expect(screen.getByText(strength.description)).toBeInTheDocument();
    }
    for (const weakness of technology.weaknesses) {
      expect(screen.getByText(weakness.label)).toBeInTheDocument();
      expect(screen.getByText(weakness.description)).toBeInTheDocument();
    }
  });

  it("gives each section a stable id for future in-page navigation", () => {
    const { container } = render(<TechnologyStrengthsWeaknesses technology={technology} />);

    expect(container.querySelector("#strengths")).toBeInTheDocument();
    expect(container.querySelector("#weaknesses")).toBeInTheDocument();
  });
});
