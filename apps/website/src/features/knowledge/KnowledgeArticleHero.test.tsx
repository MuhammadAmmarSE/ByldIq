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
import { KnowledgeArticleHero } from "./KnowledgeArticleHero";

function requireValidatingAnMvp() {
  const found = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
  if (!found) throw new Error("Missing validating-an-mvp fixture");
  return found;
}

const article = requireValidatingAnMvp();

function renderHero() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <KnowledgeArticleHero article={article} categoryLabel="MVP" />
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("KnowledgeArticleHero", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the breadcrumb, title, and summary", () => {
    renderHero();

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: article.title })).toBeInTheDocument();
    expect(screen.getByText(article.summary)).toBeInTheDocument();
    expect(screen.getByText("MVP")).toBeInTheDocument();
    expect(screen.getByText(article.difficulty)).toBeInTheDocument();
    expect(screen.getByText(article.readingTime)).toBeInTheDocument();
  });

  it("tracks knowledge_viewed once on mount", () => {
    renderHero();
    expect(mockTrack).toHaveBeenCalledWith("knowledge_viewed", { slug: article.slug });
  });

  it("links the primary CTA to BuildPath with the article prefilled, and tracks the click", async () => {
    const user = userEvent.setup();
    renderHero();

    const cta = screen.getByRole("link", { name: "Plan Your Roadmap" });
    expect(cta).toHaveAttribute("href", `/buildpath?article=${article.slug}`);

    await user.click(cta);
    expect(mockTrack).toHaveBeenCalledWith("knowledge_cta_selected", {
      slug: article.slug,
      cta: "hero-primary",
    });
    expect(mockTrack).toHaveBeenCalledWith("knowledge_buildpath_started", { slug: article.slug });
  });

  it("sets the AI companion's page context to this article on mount", () => {
    function Harness() {
      const pageContext = useAiCompanionStore((state) => state.pageContext);
      return (
        <>
          <KnowledgeArticleHero article={article} />
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

    expect(screen.getByTestId("page-context")).toHaveTextContent(article.slug);
  });

  it("opens the AI companion from Talk to Byld", async () => {
    const user = userEvent.setup();

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <KnowledgeArticleHero article={article} />
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
      cta: "ai",
    });
  });
});
