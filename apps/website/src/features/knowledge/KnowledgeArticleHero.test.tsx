import { useEffect, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

const { mockUseReadingProgress } = vi.hoisted(() => ({ mockUseReadingProgress: vi.fn(() => 0) }));
vi.mock("@/hooks/useReadingProgress", () => ({
  useReadingProgress: () => mockUseReadingProgress(),
}));

import {
  AiCompanionStoreProvider,
  useAiCompanionStore,
} from "@/providers/AiCompanionStoreProvider";
import { StoreProvider, useAppStore } from "@/providers/StoreProvider";
import { ToastProvider } from "@/components/Toast";

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
        <ToastProvider>
          <KnowledgeArticleHero article={article} categoryLabel="MVP" />
        </ToastProvider>
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("KnowledgeArticleHero", () => {
  beforeEach(() => {
    localStorage.clear();
    mockUseReadingProgress.mockReturnValue(0);
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
          <ToastProvider>
            <Harness />
          </ToastProvider>
        </AiCompanionStoreProvider>
      </StoreProvider>,
    );

    expect(screen.getByTestId("page-context")).toHaveTextContent(article.slug);
  });

  it("gives the AI companion real grounded Q&A built from this article's own content", () => {
    function Harness() {
      const groundedReplies = useAiCompanionStore((state) => state.pageContext?.groundedReplies);
      return (
        <>
          <KnowledgeArticleHero article={article} />
          <p data-testid="grounded-count">{groundedReplies?.length ?? 0}</p>
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

    expect(Number(screen.getByTestId("grounded-count").textContent)).toBeGreaterThan(0);
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
          <ToastProvider>
            <Harness />
          </ToastProvider>
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

  it("tracks knowledge_article_completed when the reading progress bar reaches 100%", () => {
    mockUseReadingProgress.mockReturnValue(100);
    renderHero();
    expect(mockTrack).toHaveBeenCalledWith("knowledge_article_completed", { slug: article.slug });
  });

  it("renders a share button", () => {
    renderHero();
    expect(screen.getByRole("button", { name: /share/i })).toBeInTheDocument();
  });

  it("persists the last known reading percentage to the store on unmount", async () => {
    const user = userEvent.setup();
    mockUseReadingProgress.mockReturnValue(37);

    function Wrapper() {
      const [showHero, setShowHero] = useState(true);
      const percent = useAppStore((state) => state.readingProgressBySlug[article.slug]);
      return (
        <ToastProvider>
          {showHero && <KnowledgeArticleHero article={article} />}
          <button type="button" onClick={() => setShowHero(false)}>
            Unmount hero
          </button>
          <p data-testid="saved-percent">{percent ?? "none"}</p>
        </ToastProvider>
      );
    }

    render(
      <StoreProvider>
        <AiCompanionStoreProvider>
          <Wrapper />
        </AiCompanionStoreProvider>
      </StoreProvider>,
    );

    expect(screen.getByTestId("saved-percent")).toHaveTextContent("none");
    await user.click(screen.getByRole("button", { name: "Unmount hero" }));
    expect(screen.getByTestId("saved-percent")).toHaveTextContent("37");
  });

  it("shows a 'jump back in' banner when there's meaningful saved progress, and dismisses it", async () => {
    const user = userEvent.setup();

    function Seed() {
      const setReadingProgress = useAppStore((state) => state.setReadingProgress);
      useEffect(() => {
        setReadingProgress(article.slug, 42);
      }, [setReadingProgress]);
      return null;
    }

    render(
      <StoreProvider>
        <AiCompanionStoreProvider>
          <ToastProvider>
            <Seed />
            <KnowledgeArticleHero article={article} />
          </ToastProvider>
        </AiCompanionStoreProvider>
      </StoreProvider>,
    );

    expect(screen.getByText(/you were 42% through this article/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.queryByText(/you were 42% through this article/i)).not.toBeInTheDocument();
  });
});
