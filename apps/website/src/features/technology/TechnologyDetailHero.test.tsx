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

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyDetailHero } from "./TechnologyDetailHero";

function requireNextJs() {
  const found = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
  if (!found) throw new Error("Missing next-js fixture");
  return found;
}

const technology = requireNextJs();

function renderHero() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <TechnologyDetailHero technology={technology} categoryLabel="Frontend" />
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("TechnologyDetailHero", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the breadcrumb, headline, and who-benefits copy", () => {
    renderHero();

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: technology.name })).toBeInTheDocument();
    expect(screen.getByText(technology.whoBenefits)).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("tracks technology_viewed once on mount", () => {
    renderHero();
    expect(mockTrack).toHaveBeenCalledWith("technology_viewed", { slug: technology.slug });
  });

  it("links the primary CTA to BuildPath with the technology prefilled, and tracks the click", async () => {
    const user = userEvent.setup();
    renderHero();

    const cta = screen.getByRole("link", { name: "Plan Your Roadmap" });
    expect(cta).toHaveAttribute("href", `/buildpath?technology=${technology.slug}`);

    await user.click(cta);
    expect(mockTrack).toHaveBeenCalledWith("technology_cta_selected", {
      slug: technology.slug,
      cta: "hero-primary",
    });
    expect(mockTrack).toHaveBeenCalledWith("technology_buildpath_started", {
      slug: technology.slug,
    });
  });

  it("sets the AI companion's page context to this technology on mount", () => {
    function Harness() {
      const pageContext = useAiCompanionStore((state) => state.pageContext);
      return (
        <>
          <TechnologyDetailHero technology={technology} />
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

    expect(screen.getByTestId("page-context")).toHaveTextContent(technology.slug);
  });

  it("opens the AI companion from Talk to Byld", async () => {
    const user = userEvent.setup();

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <TechnologyDetailHero technology={technology} />
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
    expect(mockTrack).toHaveBeenCalledWith("technology_cta_selected", {
      slug: technology.slug,
      cta: "ai",
    });
  });
});
