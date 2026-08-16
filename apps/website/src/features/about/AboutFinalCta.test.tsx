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

import { AboutFinalCta } from "./AboutFinalCta";

function renderCta(children = <AboutFinalCta />) {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>{children}</AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("AboutFinalCta", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("gives the section a stable id", () => {
    const { container } = renderCta();
    expect(container.querySelector("#get-started")).toBeInTheDocument();
  });

  it("links 'I have an idea' to BuildPath, and tracks both events", async () => {
    const user = userEvent.setup();
    renderCta();

    const link = screen.getByRole("link", { name: /i have an idea[\s\S]*start buildpath/i });
    expect(link).toHaveAttribute("href", "/buildpath");

    await user.click(link);
    expect(mockTrack).toHaveBeenCalledWith("about_cta_selected", { cta: "idea" });
    expect(mockTrack).toHaveBeenCalledWith("about_buildpath_started", {});
  });

  it("links 'I want to see your work' to /work", () => {
    renderCta();
    expect(
      screen.getByRole("link", { name: /i want to see your work[\s\S]*explore work/i }),
    ).toHaveAttribute("href", "/work");
  });

  it("links 'I want to learn' to /knowledge, and tracks knowledge click", async () => {
    const user = userEvent.setup();
    renderCta();

    const link = screen.getByRole("link", { name: /i want to learn[\s\S]*knowledge center/i });
    expect(link).toHaveAttribute("href", "/knowledge");

    await user.click(link);
    expect(mockTrack).toHaveBeenCalledWith("about_knowledge_clicked", {});
  });

  it("opens the AI companion from 'I need technical guidance'", async () => {
    const user = userEvent.setup();

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <AboutFinalCta />
          <p data-testid="ai-open-state">{isOpen ? "open" : "closed"}</p>
        </>
      );
    }

    renderCta(<Harness />);

    await user.click(
      screen.getByRole("button", { name: /i need technical guidance[\s\S]*ask byld/i }),
    );
    expect(screen.getByTestId("ai-open-state")).toHaveTextContent("open");
    expect(mockTrack).toHaveBeenCalledWith("about_cta_selected", { cta: "guidance" });
  });
});
