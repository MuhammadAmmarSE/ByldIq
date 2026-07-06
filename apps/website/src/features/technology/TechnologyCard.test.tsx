import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyCard } from "./TechnologyCard";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!technology) throw new Error("Missing next-js fixture");

describe("TechnologyCard", () => {
  it("links to the technology's dedicated page", () => {
    render(<TechnologyCard technology={technology} categoryLabel="Frontend" />);

    const link = screen.getByRole("link", { name: technology.name });
    expect(link).toHaveAttribute("href", `/technology/${technology.slug}`);
  });

  it("calls onSelect with the slug when clicked", () => {
    const onSelect = vi.fn();
    render(<TechnologyCard technology={technology} onSelect={onSelect} />);

    screen.getByRole("link", { name: technology.name }).click();
    expect(onSelect).toHaveBeenCalledWith(technology.slug);
  });

  it("renders the tagline, category, and top strengths", () => {
    render(<TechnologyCard technology={technology} categoryLabel="Frontend" />);

    expect(screen.getByText(technology.tagline)).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    for (const strength of technology.strengths.slice(0, 3)) {
      expect(screen.getByText(strength.label)).toBeInTheDocument();
    }
  });

  it("omits the category badge when no label is given", () => {
    render(<TechnologyCard technology={technology} />);
    expect(screen.queryByText("Frontend")).not.toBeInTheDocument();
  });
});
