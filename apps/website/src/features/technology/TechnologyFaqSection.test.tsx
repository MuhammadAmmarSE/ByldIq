import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyFaqSection } from "./TechnologyFaqSection";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!technology) throw new Error("Missing next-js fixture");

describe("TechnologyFaqSection", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every question as a collapsed accordion trigger", () => {
    render(<TechnologyFaqSection technology={technology} />);

    for (const faq of technology.faqs) {
      expect(screen.getByRole("button", { name: faq.question })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
  });

  it("expands a question to reveal its answer, and tracks it", async () => {
    const user = userEvent.setup();
    render(<TechnologyFaqSection technology={technology} />);

    const [firstFaq] = technology.faqs;
    if (!firstFaq) throw new Error("Technology has no FAQs");

    await user.click(screen.getByRole("button", { name: firstFaq.question }));

    expect(screen.getByText(firstFaq.answer)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("technology_faq_expanded", {
      slug: technology.slug,
      question: firstFaq.question,
    });
  });
});
