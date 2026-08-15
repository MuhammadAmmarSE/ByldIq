import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { ToastProvider } from "@/components/Toast";
import {
  AiCompanionStoreProvider,
  useAiCompanionStore,
} from "@/providers/AiCompanionStoreProvider";
import { StoreProvider } from "@/providers/StoreProvider";

import { SOLUTIONS } from "./data/solutions";
import { SolutionFinalCta } from "./SolutionFinalCta";

function requireSolution(slug: string) {
  const found = SOLUTIONS.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} solution fixture`);
  return found;
}

const solution = requireSolution("startup");

function renderCta() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <ToastProvider>
          <SolutionFinalCta solution={solution} />
        </ToastProvider>
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("SolutionFinalCta", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("links the primary CTA to BuildPath with the solution prefilled, and tracks the click", async () => {
    const user = userEvent.setup();
    renderCta();

    const cta = screen.getByRole("link", { name: solution.primaryCtaLabel });
    expect(cta).toHaveAttribute("href", `/buildpath?solution=${solution.slug}`);

    await user.click(cta);
    expect(mockTrack).toHaveBeenCalledWith("solution_cta_selected", {
      slug: solution.slug,
      cta: "final-primary",
    });
    expect(mockTrack).toHaveBeenCalledWith("solution_buildpath_started", {
      slug: solution.slug,
    });
  });

  it("links back to the solutions landing page", () => {
    renderCta();
    expect(screen.getByRole("link", { name: "Explore other solutions" })).toHaveAttribute(
      "href",
      "/solutions",
    );
  });

  it("opens the AI companion from Talk to Byld", async () => {
    const user = userEvent.setup();

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <SolutionFinalCta solution={solution} />
          <p data-testid="ai-open-state">{isOpen ? "open" : "closed"}</p>
        </>
      );
    }

    render(
      <StoreProvider>
        <AiCompanionStoreProvider>
          <ToastProvider>
            <Harness />
          </ToastProvider>
        </AiCompanionStoreProvider>
      </StoreProvider>,
    );

    await user.click(screen.getByRole("button", { name: /talk to byld/i }));
    expect(screen.getByTestId("ai-open-state")).toHaveTextContent("open");
    expect(mockTrack).toHaveBeenCalledWith("solution_cta_selected", {
      slug: solution.slug,
      cta: "final-ai",
    });
  });

  it("reveals the calendar preview after clicking Book Discovery, and tracks it", async () => {
    const user = userEvent.setup();
    renderCta();

    expect(screen.queryByText(/discovery call — 30 minutes/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Book Discovery" }));

    expect(screen.getByText(/discovery call — 30 minutes/i)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("solution_cta_selected", {
      slug: solution.slug,
      cta: "final-discovery",
    });
  });
});
