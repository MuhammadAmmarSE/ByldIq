import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CASE_STUDIES, FICTIONAL_COMPANIES } from "@/features/case-studies";

import { ProjectGrid } from "./ProjectGrid";

const companiesById = new Map(FICTIONAL_COMPANIES.map((company) => [company.id, company]));

describe("ProjectGrid", () => {
  it("renders a card for every case study", () => {
    render(<ProjectGrid caseStudies={CASE_STUDIES} companiesById={companiesById} />);

    for (const caseStudy of CASE_STUDIES) {
      expect(screen.getByRole("heading", { name: caseStudy.headline })).toBeInTheDocument();
    }
  });

  it("renders an educational empty state instead of a bare 'no results'", () => {
    render(<ProjectGrid caseStudies={[]} companiesById={companiesById} />);

    expect(screen.getByText(/no projects match/i)).toBeInTheDocument();
    expect(screen.getByText(/try a different journey/i)).toBeInTheDocument();
  });
});
