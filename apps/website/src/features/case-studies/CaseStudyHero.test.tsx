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

import { CaseStudyHero } from "./CaseStudyHero";
import { CASE_STUDIES } from "./data/case-studies";
import { FICTIONAL_COMPANIES } from "./data/fictional-companies";

function requireFieldnoteCaseStudy() {
  const found = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
  if (!found) throw new Error("Missing fieldnote-mvp case study fixture");
  return found;
}

function requireFieldnoteCompany() {
  const found = FICTIONAL_COMPANIES.find((candidate) => candidate.id === "fieldnote");
  if (!found) throw new Error("Missing fieldnote company fixture");
  return found;
}

const caseStudy = requireFieldnoteCaseStudy();
const company = requireFieldnoteCompany();

function renderHero() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <CaseStudyHero caseStudy={caseStudy} company={company} />
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("CaseStudyHero", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the breadcrumb, headline, and key facts", () => {
    renderHero();

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: caseStudy.headline })).toBeInTheDocument();
    expect(screen.getByText(caseStudy.teamSize)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.timeline)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.projectScale)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.platform.join(", "))).toBeInTheDocument();
    expect(screen.getByText(caseStudy.projectType)).toBeInTheDocument();
  });

  it("tracks case_study_viewed once on mount", () => {
    renderHero();
    expect(mockTrack).toHaveBeenCalledWith("case_study_viewed", { slug: caseStudy.slug });
  });

  it("links the primary CTA to BuildPath with the case study prefilled, and tracks the click", async () => {
    const user = userEvent.setup();
    renderHero();

    const cta = screen.getByRole("link", { name: "Plan a similar project" });
    expect(cta).toHaveAttribute("href", `/buildpath?caseStudy=${caseStudy.slug}`);

    await user.click(cta);
    expect(mockTrack).toHaveBeenCalledWith("case_study_cta_selected", {
      slug: caseStudy.slug,
      cta: "hero-primary",
    });
    expect(mockTrack).toHaveBeenCalledWith("case_study_buildpath_started", {
      slug: caseStudy.slug,
    });
  });

  it("sets the AI companion's page context to this case study on mount", () => {
    function Harness() {
      const pageContext = useAiCompanionStore((state) => state.pageContext);
      return (
        <>
          <CaseStudyHero caseStudy={caseStudy} company={company} />
          <p data-testid="page-context">{pageContext ? pageContext.slug : "none"}</p>
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

    expect(screen.getByTestId("page-context")).toHaveTextContent(caseStudy.slug);
  });

  it("opens the AI companion from Talk to Byld", async () => {
    const user = userEvent.setup();

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <CaseStudyHero caseStudy={caseStudy} company={company} />
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
      cta: "ai",
    });
  });
});
