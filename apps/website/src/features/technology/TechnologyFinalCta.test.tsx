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
import { TechnologyFinalCta } from "./TechnologyFinalCta";

function requireNextJs() {
  const found = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
  if (!found) throw new Error("Missing next-js fixture");
  return found;
}

const technology = requireNextJs();

function renderCta() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <TechnologyFinalCta technology={technology} />
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("TechnologyFinalCta", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("links the primary CTA to BuildPath with the technology prefilled, and tracks the click", async () => {
    const user = userEvent.setup();
    renderCta();

    const cta = screen.getByRole("link", { name: "Plan Your Roadmap" });
    expect(cta).toHaveAttribute("href", `/buildpath?technology=${technology.slug}`);

    await user.click(cta);
    expect(mockTrack).toHaveBeenCalledWith("technology_cta_selected", {
      slug: technology.slug,
      cta: "final-primary",
    });
    expect(mockTrack).toHaveBeenCalledWith("technology_buildpath_started", {
      slug: technology.slug,
    });
  });

  it("links back to the technology landing page", () => {
    renderCta();
    expect(screen.getByRole("link", { name: "Explore other technologies" })).toHaveAttribute(
      "href",
      "/technology",
    );
  });

  it("opens the AI companion from Talk to Byld", async () => {
    const user = userEvent.setup();

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <TechnologyFinalCta technology={technology} />
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
      cta: "final-ai",
    });
  });
});
