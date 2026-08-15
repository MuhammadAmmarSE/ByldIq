import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { GREETINGS, RESPONSES } from "@/features/homepage/ai-companion";
import {
  AiCompanionStoreProvider,
  useAiCompanionStore,
} from "@/providers/AiCompanionStoreProvider";
import { StoreProvider } from "@/providers/StoreProvider";

import { SolutionsAiAdvisor } from "./SolutionsAiAdvisor";

function Harness() {
  const isOpen = useAiCompanionStore((state) => state.isOpen);
  return (
    <>
      <SolutionsAiAdvisor />
      <p data-testid="open-state">{isOpen ? "open" : "closed"}</p>
    </>
  );
}

function renderAdvisor() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <Harness />
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("SolutionsAiAdvisor", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the real greeting and startup-intent reply from the response engine", () => {
    renderAdvisor();

    expect(screen.getByText(GREETINGS.default.content)).toBeInTheDocument();
    expect(screen.getByText(RESPONSES.startup.content)).toBeInTheDocument();
  });

  it("opens the real AI companion and tracks it when the CTA is clicked", async () => {
    const user = userEvent.setup();
    renderAdvisor();

    expect(screen.getByTestId("open-state")).toHaveTextContent("closed");

    await user.click(screen.getByRole("button", { name: "Ask Byld a question" }));
    expect(screen.getByTestId("open-state")).toHaveTextContent("open");
    expect(mockTrack).toHaveBeenCalledWith("solutions_ai_advisor_opened", {});
  });
});
