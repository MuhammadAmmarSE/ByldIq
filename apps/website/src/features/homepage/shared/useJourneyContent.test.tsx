import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StoreProvider, useAppStore } from "@/providers/StoreProvider";

import { useJourneyContent } from "./useJourneyContent";

const contentMap = {
  startup: "Startup copy",
  enterprise: "Enterprise copy",
  commerce: "Commerce copy",
  ai: "AI copy",
  platform: "Platform copy",
  default: "Generic copy",
};

function Harness() {
  const setJourney = useAppStore((state) => state.setJourney);
  const content = useJourneyContent(contentMap);
  return (
    <div>
      <p data-testid="content">{content}</p>
      <button type="button" onClick={() => setJourney("enterprise")}>
        Choose enterprise
      </button>
    </div>
  );
}

describe("useJourneyContent", () => {
  it("returns the default entry when no journey is selected", () => {
    render(
      <StoreProvider>
        <Harness />
      </StoreProvider>,
    );

    expect(screen.getByTestId("content")).toHaveTextContent("Generic copy");
  });

  it("switches to the journey-specific entry once a journey is selected", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();

    render(
      <StoreProvider>
        <Harness />
      </StoreProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Choose enterprise" }));
    expect(screen.getByTestId("content")).toHaveTextContent("Enterprise copy");
  });
});
