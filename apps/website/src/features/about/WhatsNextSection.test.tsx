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

import { FUTURE_PLATFORM_STAGES } from "./data/future-platform";
import { WhatsNextSection } from "./WhatsNextSection";

function renderSection(children = <WhatsNextSection />) {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>{children}</AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("WhatsNextSection", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the real future platform stages from CLAUDE.md Part 1, not a fabricated timeline", () => {
    renderSection();

    const items = screen.getAllByRole("listitem");
    expect(items.map((item) => item.textContent)).toEqual(FUTURE_PLATFORM_STAGES);
  });

  it("gives the section a stable id for the sidebar", () => {
    const { container } = renderSection();
    expect(container.querySelector("#whats-next")).toBeInTheDocument();
  });

  it("states Labs and Careers honestly, without fabricated experiments or listings", () => {
    renderSection();
    expect(screen.getByText(/byld labs.*isn't public yet/i)).toBeInTheDocument();
    expect(screen.getByText(/we're not publicly hiring right now/i)).toBeInTheDocument();
  });

  it("opens the AI companion from the Careers interest CTA", async () => {
    const user = userEvent.setup();

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <WhatsNextSection />
          <p data-testid="ai-open-state">{isOpen ? "open" : "closed"}</p>
        </>
      );
    }

    renderSection(<Harness />);

    await user.click(screen.getByRole("button", { name: /tell byld you're interested/i }));
    expect(screen.getByTestId("ai-open-state")).toHaveTextContent("open");
    expect(mockTrack).toHaveBeenCalledWith("about_cta_selected", { cta: "careers-ai" });
  });
});
