import { act } from "react";
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

import { CaseStudyHero } from "./CaseStudyHero";
import { CASE_STUDIES } from "./data/case-studies";
import { FICTIONAL_COMPANIES } from "./data/fictional-companies";
import { estimateReadingTime } from "./estimateReadingTime";
import { buildCaseStudyGroundedReplies } from "./groundedReplies";

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

function mockScroll({ scrollY, scrollHeight, innerHeight }: Record<string, number>) {
  Object.defineProperty(window, "scrollY", { value: scrollY, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, configurable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

function renderHero(children = <CaseStudyHero caseStudy={caseStudy} company={company} />) {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <ToastProvider>{children}</ToastProvider>
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
    Reflect.deleteProperty(navigator, "share");
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

  it("shows a real estimated reading time (Milestone 12)", () => {
    renderHero();

    expect(screen.getByText(`${estimateReadingTime(caseStudy)} min read`)).toBeInTheDocument();
  });

  it("links 'Explore the architecture' to the architecture section, and tracks the click", async () => {
    const user = userEvent.setup();
    renderHero();

    const link = screen.getByRole("link", { name: "Explore the architecture" });
    expect(link).toHaveAttribute("href", "#architecture");

    await user.click(link);
    expect(mockTrack).toHaveBeenCalledWith("case_study_cta_selected", {
      slug: caseStudy.slug,
      cta: "hero-architecture",
    });
  });

  it("tracks case_study_shared when Share is used", async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, "share", {
      value: vi.fn().mockResolvedValue(undefined),
      configurable: true,
    });
    renderHero();

    await user.click(screen.getByRole("button", { name: "Share" }));

    expect(mockTrack).toHaveBeenCalledWith("case_study_shared", { slug: caseStudy.slug });
  });

  it("tracks case_study_reading_completed once scroll progress reaches 100%", () => {
    // Establish real, non-degenerate document dimensions before mount.
    // jsdom's own defaults leave `scrollHeight` at 0, which (being less
    // than `innerHeight`) reads as "nothing left to scroll" and would fire
    // completion on the very first render — unlike any real browser, which
    // has already laid out the page by the time this effect runs.
    mockScroll({ scrollY: 0, scrollHeight: 1000, innerHeight: 200 });

    renderHero();
    expect(mockTrack).not.toHaveBeenCalledWith("case_study_reading_completed", expect.anything());

    mockScroll({ scrollY: 400, scrollHeight: 1000, innerHeight: 200 }); // 50%
    expect(mockTrack).not.toHaveBeenCalledWith("case_study_reading_completed", expect.anything());

    mockScroll({ scrollY: 800, scrollHeight: 1000, innerHeight: 200 }); // 100%
    expect(mockTrack).toHaveBeenCalledWith("case_study_reading_completed", {
      slug: caseStudy.slug,
    });
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

    renderHero(<Harness />);

    expect(screen.getByTestId("page-context")).toHaveTextContent(caseStudy.slug);
  });

  it("includes this case study's real grounded Q&A in the page context", () => {
    function Harness() {
      const pageContext = useAiCompanionStore((state) => state.pageContext);
      return (
        <>
          <CaseStudyHero caseStudy={caseStudy} company={company} />
          <p data-testid="grounded-count">{pageContext?.groundedReplies?.length ?? 0}</p>
        </>
      );
    }

    renderHero(<Harness />);

    expect(screen.getByTestId("grounded-count")).toHaveTextContent(
      String(buildCaseStudyGroundedReplies(caseStudy).length),
    );
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

    renderHero(<Harness />);

    await user.click(screen.getByRole("button", { name: /talk to byld/i }));
    expect(screen.getByTestId("ai-open-state")).toHaveTextContent("open");
    expect(mockTrack).toHaveBeenCalledWith("case_study_cta_selected", {
      slug: caseStudy.slug,
      cta: "ai",
    });
  });
});
