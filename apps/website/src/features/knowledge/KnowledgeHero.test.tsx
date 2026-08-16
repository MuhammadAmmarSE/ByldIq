import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const { mockOpen } = vi.hoisted(() => ({ mockOpen: vi.fn() }));

vi.mock("@/features/homepage/ai-companion", () => ({
  useAiCompanion: () => ({ open: mockOpen }),
}));

import { KnowledgeHero } from "./KnowledgeHero";

const categories = [
  { slug: "architecture", label: "Architecture" },
  { slug: "ai", label: "AI" },
];

describe("KnowledgeHero", () => {
  it("renders the search field and calls onQueryChange", async () => {
    const user = userEvent.setup();
    const onQueryChange = vi.fn();

    render(
      <KnowledgeHero
        query=""
        onQueryChange={onQueryChange}
        categories={categories}
        categoryFilter={null}
        onCategoryQuickFilter={vi.fn()}
      />,
    );

    await user.type(screen.getByRole("searchbox", { name: /search the knowledge center/i }), "a");
    expect(onQueryChange).toHaveBeenCalled();
  });

  it("renders a quick filter button per category and reports selection", async () => {
    const user = userEvent.setup();
    const onCategoryQuickFilter = vi.fn();

    render(
      <KnowledgeHero
        query=""
        onQueryChange={vi.fn()}
        categories={categories}
        categoryFilter={null}
        onCategoryQuickFilter={onCategoryQuickFilter}
      />,
    );

    await user.click(screen.getByRole("button", { name: "AI" }));
    expect(onCategoryQuickFilter).toHaveBeenCalledWith("ai");
  });

  it("opens the AI companion from the Ask Byld prompt", async () => {
    const user = userEvent.setup();

    render(
      <KnowledgeHero
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
      <KnowledgeHero
        query=""
        onQueryChange={vi.fn()}
        categories={categories}
        categoryFilter={null}
        onCategoryQuickFilter={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Engineering Knowledge That Lasts." }),
    ).toBeInTheDocument();
  });

  it("shows an honest 'more categories on the way' note when the taxonomy is larger than what's populated", () => {
    render(
      <KnowledgeHero
        query=""
        onQueryChange={vi.fn()}
        categories={categories}
        categoryFilter={null}
        onCategoryQuickFilter={vi.fn()}
        totalCategoryCount={20}
      />,
    );

    expect(screen.getByText(/2 of 20 knowledge categories are live so far/i)).toBeInTheDocument();
  });

  it("omits the note when every category is already populated", () => {
    render(
      <KnowledgeHero
        query=""
        onQueryChange={vi.fn()}
        categories={categories}
        categoryFilter={null}
        onCategoryQuickFilter={vi.fn()}
        totalCategoryCount={categories.length}
      />,
    );

    expect(screen.queryByText(/knowledge categories are live so far/i)).not.toBeInTheDocument();
  });

  it("overrides the headline and supporting copy when given", () => {
    render(
      <KnowledgeHero
        query=""
        onQueryChange={vi.fn()}
        categories={categories}
        categoryFilter={null}
        onCategoryQuickFilter={vi.fn()}
        headline="Architecture guides."
        supportingCopy="Guides on system design and trade-offs."
      />,
    );

    expect(screen.getByRole("heading", { name: "Architecture guides." })).toBeInTheDocument();
    expect(screen.getByText("Guides on system design and trade-offs.")).toBeInTheDocument();
  });
});
