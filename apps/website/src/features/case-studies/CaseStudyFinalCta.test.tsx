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

import { CaseStudyFinalCta } from "./CaseStudyFinalCta";
import { CASE_STUDIES } from "./data/case-studies";

function requireFieldnoteCaseStudy() {
  const found = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
  if (!found) throw new Error("Missing fieldnote-mvp case study fixture");
  return found;
}

const caseStudy = requireFieldnoteCaseStudy();

function renderCta() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <CaseStudyFinalCta caseStudy={caseStudy} />
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("CaseStudyFinalCta", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("links the primary CTA to BuildPath with the case study prefilled, and tracks the click", async () => {
    const user = userEvent.setup();
    renderCta();

    const cta = screen.getByRole("link", { name: "Plan a similar project" });
    expect(cta).toHaveAttribute("href", `/buildpath?caseStudy=${caseStudy.slug}`);

    await user.click(cta);
    expect(mockTrack).toHaveBeenCalledWith("case_study_cta_selected", {
      slug: caseStudy.slug,
      cta: "final-primary",
    });
    expect(mockTrack).toHaveBeenCalledWith("case_study_buildpath_started", {
      slug: caseStudy.slug,
    });
  });

  it("links back to the work landing page", () => {
    renderCta();
    expect(screen.getByRole("link", { name: "Explore more engineering stories" })).toHaveAttribute(
      "href",
      "/work",
    );
  });

  it("opens the AI companion from Talk to Byld", async () => {
    const user = userEvent.setup();

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <CaseStudyFinalCta caseStudy={caseStudy} />
          <p data-testid="ai-open-state">{isOpen ? "open" : "closed"}</p>
        </>
      );
    }

    render(
      <StoreProvider>
        <AiCompanionStoreProvider>
          <Harness />
        </AiCompanionStoreProvider>
      </StoreProvider>,
    );

    await user.click(screen.getByRole("button", { name: /talk to byld/i }));
    expect(screen.getByTestId("ai-open-state")).toHaveTextContent("open");
    expect(mockTrack).toHaveBeenCalledWith("case_study_cta_selected", {
      slug: caseStudy.slug,
      cta: "final-ai",
    });
  });
});
