import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const { mockOpen } = vi.hoisted(() => ({ mockOpen: vi.fn() }));

vi.mock("@/features/homepage/ai-companion", () => ({
  useAiCompanion: () => ({ open: mockOpen }),
}));

import { TechnologyHero } from "./TechnologyHero";

const categories = [
  { slug: "frontend", label: "Frontend" },
  { slug: "backend", label: "Backend" },
];

describe("TechnologyHero", () => {
  it("renders the search field and calls onQueryChange", async () => {
    const user = userEvent.setup();
    const onQueryChange = vi.fn();

    render(
      <TechnologyHero
        query=""
        onQueryChange={onQueryChange}
        categories={categories}
        categoryFilter={null}
        onCategoryQuickFilter={vi.fn()}
      />,
    );

    await user.type(screen.getByRole("searchbox", { name: /search technologies/i }), "a");
    expect(onQueryChange).toHaveBeenCalled();
  });

  it("renders a quick filter button per category and reports selection", async () => {
    const user = userEvent.setup();
    const onCategoryQuickFilter = vi.fn();

    render(
      <TechnologyHero
        query=""
        onQueryChange={vi.fn()}
        categories={categories}
        categoryFilter={null}
        onCategoryQuickFilter={onCategoryQuickFilter}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Backend" }));
    expect(onCategoryQuickFilter).toHaveBeenCalledWith("backend");
  });

  it("opens the AI companion from the Ask Byld prompt", async () => {
    const user = userEvent.setup();

    render(
      <TechnologyHero
        query=""
        onQueryChange={vi.fn()}
        categories={categories}
        categoryFilter={null}
        onCategoryQuickFilter={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /ask byld/i }));
    expect(mockOpen).toHaveBeenCalled();
  });

  it("uses the default headline and supporting copy when none are given", () => {
    render(
      <TechnologyHero
        query=""
        onQueryChange={vi.fn()}
        categories={categories}
        categoryFilter={null}
        onCategoryQuickFilter={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Technology Decisions, Explained." }),
    ).toBeInTheDocument();
  });

  it("overrides the headline and supporting copy when given", () => {
    render(
      <TechnologyHero
        query=""
        onQueryChange={vi.fn()}
        categories={categories}
        categoryFilter={null}
        onCategoryQuickFilter={vi.fn()}
        headline="Frontend technology decisions."
        supportingCopy="Technologies for building user interfaces."
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Frontend technology decisions." }),
    ).toBeInTheDocument();
    expect(screen.getByText("Technologies for building user interfaces.")).toBeInTheDocument();
  });
});
