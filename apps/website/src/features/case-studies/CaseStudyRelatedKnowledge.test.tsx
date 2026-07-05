import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { KNOWLEDGE_ARTICLES } from "@/features/homepage/knowledge-center-preview";

import { CaseStudyRelatedKnowledge } from "./CaseStudyRelatedKnowledge";
import { CASE_STUDIES } from "./data/case-studies";

function requireArticle(slug: string) {
  const found = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} article fixture`);
  return found;
}

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyRelatedKnowledge", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every related article as a link to its dedicated page", () => {
    render(<CaseStudyRelatedKnowledge caseStudy={caseStudy} />);

    for (const slug of caseStudy.relatedArticleSlugs) {
      const article = requireArticle(slug);
      expect(screen.getByRole("link", { name: article.title })).toHaveAttribute(
        "href",
        `/knowledge/${slug}`,
      );
    }
  });

  it("tracks clicking a related article", async () => {
    const user = userEvent.setup();
    render(<CaseStudyRelatedKnowledge caseStudy={caseStudy} />);

    const [firstSlug] = caseStudy.relatedArticleSlugs;
    if (!firstSlug) throw new Error("Case study has no related articles");
    const article = requireArticle(firstSlug);

    await user.click(screen.getByRole("link", { name: article.title }));

    expect(mockTrack).toHaveBeenCalledWith("case_study_article_clicked", {
      slug: caseStudy.slug,
      articleSlug: firstSlug,
    });
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyRelatedKnowledge caseStudy={caseStudy} />);

    expect(container.querySelector("#related-knowledge")).toBeInTheDocument();
  });
});
