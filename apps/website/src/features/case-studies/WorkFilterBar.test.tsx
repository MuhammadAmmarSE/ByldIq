import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { WorkFilterBar } from "./WorkFilterBar";

const industries = [{ slug: "retail", label: "Retail" }];
const technologies = [{ slug: "shopify-plus", label: "Shopify Plus" }];
const businessProblems = [{ slug: "checkout-conversion", label: "Checkout Conversion" }];

function renderFilterBar(overrides: Partial<Parameters<typeof WorkFilterBar>[0]> = {}) {
  return render(
    <WorkFilterBar
      industries={industries}
      industryFilter={null}
      onIndustryFilterChange={vi.fn()}
      technologies={technologies}
      technologyFilter={null}
      onTechnologyFilterChange={vi.fn()}
      businessProblems={businessProblems}
      businessProblemFilter={null}
      onBusinessProblemFilterChange={vi.fn()}
      aiOnly={false}
      onAiOnlyChange={vi.fn()}
      {...overrides}
    />,
  );
}

describe("WorkFilterBar", () => {
  it("renders a select for every facet", () => {
    renderFilterBar();

    expect(screen.getByRole("combobox", { name: "Filter by industry" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Filter by technology" })).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Filter by business challenge" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Filter by AI involvement" })).toBeInTheDocument();
  });

  it("reports selecting an industry", async () => {
    const user = userEvent.setup();
    const onIndustryFilterChange = vi.fn();
    renderFilterBar({ onIndustryFilterChange });

    await user.click(screen.getByRole("combobox", { name: "Filter by industry" }));
    await user.click(screen.getByRole("option", { name: "Retail" }));

    expect(onIndustryFilterChange).toHaveBeenCalledWith("retail");
  });

  it("reports selecting AI-powered only", async () => {
    const user = userEvent.setup();
    const onAiOnlyChange = vi.fn();
    renderFilterBar({ onAiOnlyChange });

    await user.click(screen.getByRole("combobox", { name: "Filter by AI involvement" }));
    await user.click(screen.getByRole("option", { name: "AI-powered only" }));

    expect(onAiOnlyChange).toHaveBeenCalledWith(true);
  });

  it("reports clearing back to all industries", async () => {
    const user = userEvent.setup();
    const onIndustryFilterChange = vi.fn();
    renderFilterBar({ industryFilter: "retail", onIndustryFilterChange });

    await user.click(screen.getByRole("combobox", { name: "Filter by industry" }));
    await user.click(screen.getByRole("option", { name: "All industries" }));

    expect(onIndustryFilterChange).toHaveBeenCalledWith(null);
  });
});
