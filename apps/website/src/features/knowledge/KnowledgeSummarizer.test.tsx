import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeSummarizer } from "./KnowledgeSummarizer";
import { generateArticleSummary } from "./summarize";

const [article] = KNOWLEDGE_ARTICLES;
if (!article) throw new Error("Expected at least one knowledge article for this test");

describe("KnowledgeSummarizer", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("shows the 30-second summary by default", () => {
    render(<KnowledgeSummarizer article={article} />);
    expect(screen.getByText(article.summary)).toBeInTheDocument();
  });

  it("switches to a different summary mode and tracks it", async () => {
    const user = userEvent.setup();
    render(<KnowledgeSummarizer article={article} />);

    await user.click(screen.getByRole("tab", { name: "Explain it simply" }));

    expect(screen.getByText(generateArticleSummary(article, "beginner"))).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("knowledge_summary_mode_selected", {
      slug: article.slug,
      mode: "beginner",
    });
  });

  it("renders a tab per summary mode", () => {
    render(<KnowledgeSummarizer article={article} />);
    expect(screen.getByRole("tab", { name: "30-second summary" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Executive summary" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Explain it simply" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Technical summary" })).toBeInTheDocument();
  });
});
