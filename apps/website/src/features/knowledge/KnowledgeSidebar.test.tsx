import { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockUseScrollSpy = vi.fn();

vi.mock("@/hooks/useScrollSpy", () => ({
  useScrollSpy: (...args: unknown[]) => mockUseScrollSpy(...args),
}));

import {
  AiCompanionStoreProvider,
  useAiCompanionStore,
} from "@/providers/AiCompanionStoreProvider";

import { KnowledgeSidebar } from "./KnowledgeSidebar";

function renderSidebar() {
  return render(
    <AiCompanionStoreProvider>
      <KnowledgeSidebar />
    </AiCompanionStoreProvider>,
  );
}

describe("KnowledgeSidebar", () => {
  it("renders a link for every section", () => {
    mockUseScrollSpy.mockReturnValue(null);
    renderSidebar();

    expect(screen.getByRole("link", { name: "Who this is for" })).toHaveAttribute(
      "href",
      "#who-this-is-for",
    );
    expect(screen.getByRole("link", { name: "Related learning" })).toHaveAttribute(
      "href",
      "#related-learning",
    );
  });

  it("marks the currently active section returned by the scrollspy hook", () => {
    mockUseScrollSpy.mockReturnValue("core-concepts");
    renderSidebar();

    expect(screen.getByRole("link", { name: "Core concepts" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Who this is for" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("syncs the active section's label into an already-set AI Companion page context", () => {
    mockUseScrollSpy.mockReturnValue("core-concepts");

    function ArticleHeroStub() {
      const setPageContext = useAiCompanionStore((state) => state.setPageContext);
      useEffect(() => {
        setPageContext({ label: "Monolith vs. Microservices", slug: "monolith-vs-microservices" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return null;
    }

    function CurrentSectionLabel() {
      const currentSectionLabel = useAiCompanionStore(
        (state) => state.pageContext?.currentSectionLabel,
      );
      return <p data-testid="section-label">{currentSectionLabel}</p>;
    }

    render(
      <AiCompanionStoreProvider>
        <ArticleHeroStub />
        <KnowledgeSidebar />
        <CurrentSectionLabel />
      </AiCompanionStoreProvider>,
    );

    expect(screen.getByTestId("section-label")).toHaveTextContent("Core concepts");
  });
});
