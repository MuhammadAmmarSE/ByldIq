import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { GREETINGS, RESPONSES } from "@/features/homepage/ai-companion";
import {
  AiCompanionStoreProvider,
  useAiCompanionStore,
} from "@/providers/AiCompanionStoreProvider";
import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
import { StoreProvider } from "@/providers/StoreProvider";

import { AiCompanionHighlight } from "./AiCompanionHighlight";

function Harness() {
  const isOpen = useAiCompanionStore((state) => state.isOpen);
  return (
    <>
      <AiCompanionHighlight />
      <p data-testid="open-state">{isOpen ? "open" : "closed"}</p>
    </>
  );
}

function renderHighlight() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <AnalyticsProvider>
          <Harness />
        </AnalyticsProvider>
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("AiCompanionHighlight", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the real greeting and AI-intent reply from the response engine", () => {
    renderHighlight();

    expect(screen.getByText(GREETINGS.default.content)).toBeInTheDocument();
    expect(screen.getByText(RESPONSES.ai.content)).toBeInTheDocument();
  });

  it("opens the real AI companion when the CTA is clicked", async () => {
    const user = userEvent.setup();
    renderHighlight();

    expect(screen.getByTestId("open-state")).toHaveTextContent("closed");

    await user.click(screen.getByRole("button", { name: "Ask Byld a question" }));
    expect(screen.getByTestId("open-state")).toHaveTextContent("open");
  });
});
