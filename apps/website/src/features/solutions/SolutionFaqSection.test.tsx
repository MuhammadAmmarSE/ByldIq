import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { SOLUTIONS } from "./data/solutions";
import { SolutionFaqSection } from "./SolutionFaqSection";

function requireSolution(slug: string) {
  const found = SOLUTIONS.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} solution fixture`);
  return found;
}

const solution = requireSolution("startup");

describe("SolutionFaqSection", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every question as a collapsed accordion trigger", () => {
    render(<SolutionFaqSection solution={solution} />);

    for (const faq of solution.faqs) {
      expect(screen.getByRole("button", { name: faq.question })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
  });

  it("expands a question to reveal its answer, and tracks it", async () => {
    const user = userEvent.setup();
    render(<SolutionFaqSection solution={solution} />);

    const [firstFaq] = solution.faqs;
    if (!firstFaq) throw new Error("Solution has no FAQs");

    await user.click(screen.getByRole("button", { name: firstFaq.question }));

    expect(screen.getByText(firstFaq.answer)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("solution_faq_expanded", {
      slug: solution.slug,
      question: firstFaq.question,
    });
  });
});
