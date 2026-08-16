import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack, mockOpen } = vi.hoisted(() => ({ mockTrack: vi.fn(), mockOpen: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

vi.mock("@/features/homepage/ai-companion", () => ({
  useAiCompanion: () => ({ open: mockOpen, setPageContext: vi.fn() }),
}));

import { StoreProvider } from "@/providers/StoreProvider";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgePlaybookDetail } from "./KnowledgePlaybookDetail";

function requirePlaybook(slug: string) {
  const found = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === slug);
  if (!found?.playbook) throw new Error(`Missing playbook fixture: ${slug}`);
  return found;
}

const article = requirePlaybook("architecture-review-playbook");

function renderDetail() {
  return render(
    <StoreProvider>
      <KnowledgePlaybookDetail article={article} categoryLabel="Architecture" />
    </StoreProvider>,
  );
}

describe("KnowledgePlaybookDetail", () => {
  afterEach(() => {
    mockTrack.mockClear();
    window.print = vi.fn();
  });

  it("renders the title, summary, and every step", () => {
    renderDetail();

    expect(screen.getByRole("heading", { name: article.title })).toBeInTheDocument();
    expect(screen.getByText(article.summary)).toBeInTheDocument();
    for (const step of article.playbook?.steps ?? []) {
      expect(screen.getByRole("heading", { name: step.title })).toBeInTheDocument();
    }
  });

  it("tracks knowledge_playbook_started once on mount", () => {
    renderDetail();
    expect(mockTrack).toHaveBeenCalledWith("knowledge_playbook_started", { slug: article.slug });
  });

  it("shows an initial 0-of-N checked count", () => {
    renderDetail();
    const total = article.playbook?.steps.reduce(
      (sum, step) => sum + step.checklistItems.length,
      0,
    );
    expect(screen.getByText(`0 of ${total} checked`)).toBeInTheDocument();
  });

  it("checks off an item, updates the count, and tracks it", async () => {
    const user = userEvent.setup();
    renderDetail();

    const [firstStep] = article.playbook?.steps ?? [];
    const [firstItem] = firstStep?.checklistItems ?? [];
    if (!firstStep || !firstItem) throw new Error("Expected at least one checklist item");

    const itemButton = screen.getByRole("button", { name: firstItem });
    await user.click(itemButton);

    expect(itemButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/^1 of \d+ checked$/)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("knowledge_playbook_item_toggled", {
      slug: article.slug,
      itemId: `${article.slug}:${firstStep.id}:0`,
      checked: true,
    });
  });

  it("links to the full article and lists resources", () => {
    renderDetail();

    expect(screen.getByRole("link", { name: "Read the full guide" })).toHaveAttribute(
      "href",
      `/knowledge/${article.slug}`,
    );
    for (const resource of article.playbook?.resources ?? []) {
      expect(screen.getByRole("link", { name: resource.label })).toHaveAttribute(
        "href",
        resource.href,
      );
    }
  });

  it("calls window.print when Print or save as PDF is clicked", async () => {
    const user = userEvent.setup();
    renderDetail();

    await user.click(screen.getByRole("button", { name: "Print or save as PDF" }));
    expect(window.print).toHaveBeenCalled();
  });
});
