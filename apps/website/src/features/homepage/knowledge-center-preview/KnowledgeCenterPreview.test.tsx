import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeCenterPreview } from "./KnowledgeCenterPreview";

describe("KnowledgeCenterPreview", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the featured article and every other article", () => {
    render(<KnowledgeCenterPreview />);

    for (const article of KNOWLEDGE_ARTICLES) {
      expect(screen.getAllByText(article.title).length).toBeGreaterThan(0);
    }
  });

  it("expands an article's AI summary on click and tracks it", async () => {
    const user = userEvent.setup();
    render(<KnowledgeCenterPreview />);

    const [firstButton] = screen.getAllByRole("button", { name: /ask byld to summarize/i });
    if (!firstButton) throw new Error("Expected at least one summarize button");
    await user.click(firstButton);

    expect(mockTrack).toHaveBeenCalledWith(
      "knowledge_ai_summary_expanded",
      expect.objectContaining({ slug: expect.any(String) }),
    );
  });

  it("links every non-featured article's title to its dedicated knowledge page", () => {
    render(<KnowledgeCenterPreview />);

    for (const article of KNOWLEDGE_ARTICLES.filter((candidate) => !candidate.featured)) {
      const link = screen.getByRole("link", { name: article.title });
      expect(link).toHaveAttribute("href", `/knowledge/${article.slug}`);
    }
  });

  it("links the featured article's CTA to its dedicated knowledge page", () => {
    render(<KnowledgeCenterPreview />);

    const featured = KNOWLEDGE_ARTICLES.find((article) => article.featured);
    if (!featured) throw new Error("Expected a featured article fixture");

    expect(screen.getByRole("link", { name: /read the full guide/i })).toHaveAttribute(
      "href",
      `/knowledge/${featured.slug}`,
    );
  });
});
