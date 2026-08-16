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

import { TeamSection } from "./TeamSection";

function renderSection(children = <TeamSection />) {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>{children}</AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("TeamSection", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("honestly states that no team profiles are published, rather than fabricating any", () => {
    renderSection();

    expect(
      screen.getByText(/individual team and leadership profiles aren't published/i),
    ).toBeInTheDocument();
    // No invented names/titles rendered anywhere.
    expect(screen.queryByRole("img", { name: /photo/i })).not.toBeInTheDocument();
  });

  it("gives the section a stable id for the sidebar", () => {
    const { container } = renderSection();
    expect(container.querySelector("#team")).toBeInTheDocument();
  });

  it("links to real work instead of a fabricated team grid", () => {
    renderSection();
    expect(screen.getByRole("link", { name: /see the work we've shipped/i })).toHaveAttribute(
      "href",
      "/work",
    );
  });

  it("opens the AI companion from 'Ask Byld who you'd work with'", async () => {
    const user = userEvent.setup();

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <TeamSection />
          <p data-testid="ai-open-state">{isOpen ? "open" : "closed"}</p>
        </>
      );
    }

    renderSection(<Harness />);

    await user.click(screen.getByRole("button", { name: /ask byld who you'd work with/i }));
    expect(screen.getByTestId("ai-open-state")).toHaveTextContent("open");
    expect(mockTrack).toHaveBeenCalledWith("about_cta_selected", { cta: "team-ai" });
  });
});
