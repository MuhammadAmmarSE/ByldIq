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

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeFinalCta } from "./KnowledgeFinalCta";

function requireValidatingAnMvp() {
  const found = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
  if (!found) throw new Error("Missing validating-an-mvp fixture");
  return found;
}

const article = requireValidatingAnMvp();

function renderCta() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <KnowledgeFinalCta article={article} />
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("KnowledgeFinalCta", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("links the primary CTA to BuildPath with the article prefilled, and tracks the click", async () => {
    const user = userEvent.setup();
    renderCta();

    const cta = screen.getByRole("link", { name: "Plan Your Roadmap" });
    expect(cta).toHaveAttribute("href", `/buildpath?article=${article.slug}`);

    await user.click(cta);
    expect(mockTrack).toHaveBeenCalledWith("knowledge_cta_selected", {
      slug: article.slug,
      cta: "final-primary",
    });
    expect(mockTrack).toHaveBeenCalledWith("knowledge_buildpath_started", { slug: article.slug });
  });

  it("links back to the knowledge landing page", () => {
    renderCta();
    expect(screen.getByRole("link", { name: "Explore the Knowledge Center" })).toHaveAttribute(
      "href",
      "/knowledge",
    );
  });

  it("opens the AI companion from Talk to Byld", async () => {
    const user = userEvent.setup();

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <KnowledgeFinalCta article={article} />
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
    expect(mockTrack).toHaveBeenCalledWith("knowledge_cta_selected", {
      slug: article.slug,
      cta: "final-ai",
    });
  });
});
