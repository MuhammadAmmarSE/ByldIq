import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import {
  AiCompanionStoreProvider,
  useAiCompanionStore,
} from "@/providers/AiCompanionStoreProvider";
import { StoreProvider } from "@/providers/StoreProvider";

import { INDUSTRIES } from "./data/industries";
import { IndustryDetail } from "./IndustryDetail";

function requireIndustry(slug: string) {
  const found = INDUSTRIES.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} industry fixture`);
  return found;
}

// `SolutionCard`'s accessible name is composite (icon + title + full
// business problem copy), and one card's prose can incidentally contain
// another card's name (e.g. "Enterprise" appearing inside a different
// solution's description) — so matching by href is the reliable way to
// find a specific solution's card among several rendered together.
function getSolutionLink(slug: string) {
  const link = screen
    .getAllByRole("link")
    .find((candidate) => candidate.getAttribute("href") === `/solutions/${slug}`);
  if (!link) throw new Error(`No link found for /solutions/${slug}`);
  return link;
}

function renderDetail(ui: ReactElement) {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>{ui}</AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("IndustryDetail", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every challenge and recommended solution for an industry with a real case study", () => {
    const logistics = requireIndustry("logistics");
    renderDetail(<IndustryDetail industry={logistics} />);

    for (const challenge of logistics.challenges) {
      expect(screen.getByText(challenge)).toBeInTheDocument();
    }
    for (const slug of logistics.recommendedSolutionSlugs) {
      expect(getSolutionLink(slug)).toBeInTheDocument();
    }
    expect(screen.queryByText(/we haven't published/i)).not.toBeInTheDocument();
  });

  it("shows an honest gap message for an industry with no real case study, and a BuildPath CTA", () => {
    const fintech = requireIndustry("fintech");
    renderDetail(<IndustryDetail industry={fintech} />);

    expect(screen.getByText(/we haven't published a fintech case study yet/i)).toBeInTheDocument();

    const [firstSolutionSlug] = fintech.recommendedSolutionSlugs;
    expect(screen.getByRole("link", { name: /plan my fintech product/i })).toHaveAttribute(
      "href",
      `/buildpath?solution=${firstSolutionSlug}`,
    );
  });

  it("opens the AI companion from Talk to Byld", async () => {
    const user = userEvent.setup();
    const logistics = requireIndustry("logistics");

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <IndustryDetail industry={logistics} />
          <p data-testid="ai-open-state">{isOpen ? "open" : "closed"}</p>
        </>
      );
    }

    renderDetail(<Harness />);

    await user.click(screen.getByRole("button", { name: /talk to byld/i }));
    expect(screen.getByTestId("ai-open-state")).toHaveTextContent("open");
  });

  it("sets the AI companion's page context to this industry on mount", () => {
    const logistics = requireIndustry("logistics");

    function Harness() {
      const pageContext = useAiCompanionStore((state) => state.pageContext);
      return (
        <>
          <IndustryDetail industry={logistics} />
          <p data-testid="page-context">{pageContext ? pageContext.slug : "none"}</p>
        </>
      );
    }

    renderDetail(<Harness />);

    expect(screen.getByTestId("page-context")).toHaveTextContent(`industry-${logistics.slug}`);
  });

  it("tracks selecting a recommended solution", async () => {
    const user = userEvent.setup();
    const logistics = requireIndustry("logistics");
    renderDetail(<IndustryDetail industry={logistics} />);

    const [firstSolutionSlug] = logistics.recommendedSolutionSlugs;
    if (!firstSolutionSlug) throw new Error("Expected at least one recommended solution");

    await user.click(getSolutionLink(firstSolutionSlug));
    expect(mockTrack).toHaveBeenCalledWith("industry_solution_clicked", {
      industrySlug: logistics.slug,
      solutionSlug: firstSolutionSlug,
    });
  });
});
