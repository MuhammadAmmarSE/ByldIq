import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import {
  AiCompanionStoreProvider,
  useAiCompanionStore,
} from "@/providers/AiCompanionStoreProvider";
import { StoreProvider } from "@/providers/StoreProvider";

import { AboutHero } from "./AboutHero";

function renderHero(children = <AboutHero />) {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>{children}</AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("AboutHero", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the breadcrumb and headline", () => {
    renderHero();

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "We build software with intention." }),
    ).toBeInTheDocument();
  });

  it("tracks about_viewed once on mount", () => {
    renderHero();
    expect(mockTrack).toHaveBeenCalledWith("about_viewed", {});
  });

  it("sets the AI companion's page context to the About page on mount", () => {
    function Harness() {
      const pageContext = useAiCompanionStore((state) => state.pageContext);
      return (
        <>
          <AboutHero />
          <p data-testid="page-context">{pageContext ? pageContext.slug : "none"}</p>
        </>
      );
    }

    renderHero(<Harness />);
    expect(screen.getByTestId("page-context")).toHaveTextContent("about");
  });

  it("links the primary CTA to BuildPath, and tracks the click", async () => {
    const user = userEvent.setup();
    renderHero();

    const cta = screen.getByRole("link", { name: "Start BuildPath" });
    expect(cta).toHaveAttribute("href", "/buildpath");

    await user.click(cta);
    expect(mockTrack).toHaveBeenCalledWith("about_cta_selected", { cta: "hero-buildpath" });
    expect(mockTrack).toHaveBeenCalledWith("about_buildpath_started", {});
  });

  it("opens the AI companion from Talk to Byld", async () => {
    const user = userEvent.setup();

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <AboutHero />
          <p data-testid="ai-open-state">{isOpen ? "open" : "closed"}</p>
        </>
      );
    }

    renderHero(<Harness />);

    await user.click(screen.getByRole("button", { name: /talk to byld/i }));
    expect(screen.getByTestId("ai-open-state")).toHaveTextContent("open");
    expect(mockTrack).toHaveBeenCalledWith("about_cta_selected", { cta: "ai" });
  });
});
