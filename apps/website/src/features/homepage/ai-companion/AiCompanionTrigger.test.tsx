import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import {
  AiCompanionStoreProvider,
  useAiCompanionStore,
} from "@/providers/AiCompanionStoreProvider";
import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
import { StoreProvider } from "@/providers/StoreProvider";

import { AiCompanionTrigger } from "./AiCompanionTrigger";

function Harness() {
  const isOpen = useAiCompanionStore((state) => state.isOpen);
  return (
    <>
      <AiCompanionTrigger />
      <p data-testid="open-state">{isOpen ? "open" : "closed"}</p>
    </>
  );
}

describe("AiCompanionTrigger", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("toggles the companion's open state when clicked", async () => {
    const user = userEvent.setup();
    render(
      <StoreProvider>
        <AiCompanionStoreProvider>
          <AnalyticsProvider>
            <Harness />
          </AnalyticsProvider>
        </AiCompanionStoreProvider>
      </StoreProvider>,
    );

    expect(screen.getByTestId("open-state")).toHaveTextContent("closed");

    await user.click(screen.getByRole("button", { name: "Ask Byld" }));
    expect(screen.getByTestId("open-state")).toHaveTextContent("open");
  });
});
