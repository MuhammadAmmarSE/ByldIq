import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { StoreProvider } from "@/providers/StoreProvider";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { LEARNING_PATHS } from "./data/learning-paths";
import { KnowledgeLearningPathDetail } from "./KnowledgeLearningPathDetail";

function requireStartupFounder() {
  const found = LEARNING_PATHS.find((candidate) => candidate.slug === "startup-founder");
  if (!found) throw new Error("Missing startup-founder fixture");
  return found;
}

const path = requireStartupFounder();

function renderDetail() {
  return render(
    <StoreProvider>
      <KnowledgeLearningPathDetail path={path} />
    </StoreProvider>,
  );
}

describe("KnowledgeLearningPathDetail", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every step with a progress bar starting at 0", () => {
    renderDetail();

    expect(screen.getByRole("heading", { name: "Articles in this path" })).toBeInTheDocument();
    for (const slug of path.articleSlugs) {
      const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === slug);
      if (!article) throw new Error(`Missing ${slug} article fixture`);
      expect(screen.getByRole("link", { name: article.title })).toHaveAttribute(
        "href",
        `/knowledge/${article.slug}`,
      );
    }
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getByText(`0 of ${path.articleSlugs.length} complete`)).toBeInTheDocument();
  });

  it("links Start this path to the first article and tracks learning_path_started", async () => {
    const user = userEvent.setup();
    renderDetail();

    const startLink = screen.getByRole("link", { name: "Start this path" });
    expect(startLink).toHaveAttribute("href", `/knowledge/${path.articleSlugs[0]}`);

    await user.click(startLink);
    expect(mockTrack).toHaveBeenCalledWith("learning_path_started", { pathSlug: path.slug });
  });

  it("toggles a step's completion and updates the progress bar", async () => {
    const user = userEvent.setup();
    renderDetail();

    const [firstCheckbox] = screen.getAllByRole("checkbox", { name: "Complete" });
    if (!firstCheckbox) throw new Error("Expected at least one checkbox");
    await user.click(firstCheckbox);

    expect(firstCheckbox).toBeChecked();
    expect(screen.getByText(`1 of ${path.articleSlugs.length} complete`)).toBeInTheDocument();
  });

  it("tracks learning_path_completed exactly once when every step is checked", async () => {
    const user = userEvent.setup();
    renderDetail();

    const checkboxes = screen.getAllByRole("checkbox", { name: "Complete" });
    for (const checkbox of checkboxes) {
      await user.click(checkbox);
    }

    expect(mockTrack).toHaveBeenCalledWith("learning_path_completed", { pathSlug: path.slug });
    expect(
      mockTrack.mock.calls.filter(([event]) => event === "learning_path_completed"),
    ).toHaveLength(1);

    // Unchecking and rechecking the last box should fire it again — a
    // genuine second completion, not a stale guard.
    const lastCheckbox = checkboxes[checkboxes.length - 1];
    if (!lastCheckbox) throw new Error("Expected at least one checkbox");
    await user.click(lastCheckbox);
    await user.click(lastCheckbox);

    expect(
      mockTrack.mock.calls.filter(([event]) => event === "learning_path_completed"),
    ).toHaveLength(2);
  });
});
