import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import {
  AiCompanionStoreProvider,
  useAiCompanionStore,
} from "@/providers/AiCompanionStoreProvider";
import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
import { StoreProvider } from "@/providers/StoreProvider";

import { AiCompanionPanel } from "./AiCompanionPanel";
import { GREETINGS } from "./engine/responses";

function OpenedPanel() {
  const open = useAiCompanionStore((state) => state.open);
  const addMessage = useAiCompanionStore((state) => state.addMessage);
  addMessage({
    id: "greeting",
    role: "assistant",
    content: GREETINGS.default.content,
    quickReplies: GREETINGS.default.quickReplies,
  });
  open();
  return <AiCompanionPanel />;
}

function renderOpenedPanel() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <AnalyticsProvider>
          <OpenedPanel />
        </AnalyticsProvider>
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("AiCompanionPanel", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the greeting and its quick replies once opened", () => {
    renderOpenedPanel();

    expect(screen.getByText(GREETINGS.default.content)).toBeInTheDocument();
    for (const reply of GREETINGS.default.quickReplies) {
      expect(screen.getByRole("button", { name: reply })).toBeInTheDocument();
    }
  });

  it("sends the typed message and shows it in the conversation", async () => {
    const user = userEvent.setup();
    renderOpenedPanel();

    await user.type(screen.getByLabelText("Message Byld"), "What's an MVP scope?");
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getByText("What's an MVP scope?")).toBeInTheDocument();
  });
});
