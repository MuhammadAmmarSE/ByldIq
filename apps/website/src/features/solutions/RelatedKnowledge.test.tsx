import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { KNOWLEDGE_ARTICLES } from "@/features/homepage/knowledge-center-preview";

import { SOLUTIONS } from "./data/solutions";
import { RelatedKnowledge } from "./RelatedKnowledge";

function requireSolution(slug: string) {
  const found = SOLUTIONS.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} solution fixture`);
  return found;
}

function requireArticle(slug: string) {
  const found = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} article fixture`);
  return found;
}

const solution = requireSolution("startup");

describe("RelatedKnowledge", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every related article as a link to its dedicated page", () => {
    render(<RelatedKnowledge solution={solution} />);

    for (const slug of solution.relatedArticleSlugs) {
      const article = requireArticle(slug);
      expect(screen.getByRole("link", { name: article.title })).toHaveAttribute(
        "href",
        `/knowledge/${slug}`,
      );
    }
  });

  it("tracks clicking a related article", async () => {
    const user = userEvent.setup();
    render(<RelatedKnowledge solution={solution} />);

    const [firstSlug] = solution.relatedArticleSlugs;
    if (!firstSlug) throw new Error("Solution has no related articles");
    const article = requireArticle(firstSlug);

    await user.click(screen.getByRole("link", { name: article.title }));

    expect(mockTrack).toHaveBeenCalledWith("solution_article_clicked", {
      slug: solution.slug,
      articleSlug: firstSlug,
    });
  });
});
