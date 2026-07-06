import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack, mockOpen } = vi.hoisted(() => ({ mockTrack: vi.fn(), mockOpen: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

vi.mock("@/features/homepage/ai-companion", () => ({
  useAiCompanion: () => ({ open: mockOpen }),
}));

import { KnowledgeExplorer } from "./KnowledgeExplorer";

describe("KnowledgeExplorer", () => {
  afterEach(() => {
    mockTrack.mockClear();
    mockOpen.mockClear();
  });

  it("renders the hero, the featured guide, and every article by default", () => {
    render(<KnowledgeExplorer />);

    expect(screen.getByRole("heading", { name: "Featured guide" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "All articles" })).toBeInTheDocument();
    expect(screen.getAllByText(/Monolith vs\.? Microservices/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Validate an MVP/i)).toBeInTheDocument();
    expect(screen.getByText(/RAG vs\.? Fine-Tuning/i)).toBeInTheDocument();
  });

  it("filters by category via the hero's quick filter and tracks it", async () => {
    const user = userEvent.setup();
    render(<KnowledgeExplorer />);

    await user.click(screen.getByRole("button", { name: "AI" }));

    expect(screen.getByText(/RAG vs\.? Fine-Tuning/i)).toBeInTheDocument();
    expect(screen.queryByText(/Validate an MVP/i)).not.toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("knowledge_category_selected", { category: "ai" });
  });

  it("filters by search query and tracks it", async () => {
    const user = userEvent.setup();
    render(<KnowledgeExplorer />);

    await user.type(screen.getByRole("searchbox", { name: /search the knowledge center/i }), "MVP");

    expect(screen.getByText(/Validate an MVP/i)).toBeInTheDocument();
    expect(screen.queryByText(/RAG vs\.? Fine-Tuning/i)).not.toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith(
      "knowledge_search",
      expect.objectContaining({ query: expect.stringContaining("M") }),
    );
  });

  it("shows an educational empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<KnowledgeExplorer />);

    await user.type(
      screen.getByRole("searchbox", { name: /search the knowledge center/i }),
      "nonexistent topic xyz",
    );

    expect(screen.getByText(/No articles match/i)).toBeInTheDocument();
  });

  it("opens the AI companion from the hero's Ask Byld prompt", async () => {
    const user = userEvent.setup();
    render(<KnowledgeExplorer />);

    await user.click(screen.getByRole("button", { name: /ask byld what to read next/i }));
    expect(mockOpen).toHaveBeenCalled();
  });

  it("links to the Learning Paths landing page", () => {
    render(<KnowledgeExplorer />);

    expect(screen.getByRole("link", { name: "Explore Learning Paths" })).toHaveAttribute(
      "href",
      "/knowledge/learning-paths",
    );
  });

  it("tracks card clicks", async () => {
    const user = userEvent.setup();
    render(<KnowledgeExplorer />);

    await user.click(screen.getByRole("link", { name: /Validate an MVP/i }));
    expect(mockTrack).toHaveBeenCalledWith("knowledge_card_clicked", {
      slug: "validating-an-mvp",
    });
  });

  it("preseeds the search box, filters, and hero copy from the initial* and headline props", () => {
    render(
      <KnowledgeExplorer
        initialQuery="Postgres"
        initialCategoryFilter="ai"
        headline="AI engineering guides."
        supportingCopy="Guides on RAG, fine-tuning, and model selection."
      />,
    );

    expect(screen.getByRole("searchbox", { name: /search the knowledge center/i })).toHaveValue(
      "Postgres",
    );
    expect(screen.getByRole("button", { name: "AI" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "AI engineering guides." })).toBeInTheDocument();
    expect(
      screen.getByText("Guides on RAG, fine-tuning, and model selection."),
    ).toBeInTheDocument();
  });
});
