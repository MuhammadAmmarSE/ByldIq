import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BuildPathStoreProvider, useBuildPathStore } from "@/providers/BuildPathStoreProvider";

import { DiscoveryConversation } from "./DiscoveryConversation";

function Harness() {
  const accomplish = useBuildPathStore((state) => state.discovery.accomplish);
  const problem = useBuildPathStore((state) => state.discovery.problem);
  return (
    <>
      <DiscoveryConversation />
      <p data-testid="accomplish">{accomplish}</p>
      <p data-testid="problem">{problem}</p>
    </>
  );
}

function renderConversation() {
  return render(
    <BuildPathStoreProvider>
      <Harness />
    </BuildPathStoreProvider>,
  );
}

describe("DiscoveryConversation", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("seeds an opening question from Byld", async () => {
    renderConversation();
    expect(
      await screen.findByText(/what are you trying to build or accomplish/i),
    ).toBeInTheDocument();
  });

  it("routes a reply into the matching discovery field and asks the next question", async () => {
    const user = userEvent.setup({ delay: null });
    renderConversation();
    await screen.findByText(/what are you trying to build or accomplish/i);

    await user.type(screen.getByLabelText("Reply to Byld"), "A booking tool for clinics");
    await user.click(screen.getByRole("button", { name: "Send reply" }));

    expect(screen.getByTestId("accomplish")).toHaveTextContent("A booking tool for clinics");
    expect(screen.getAllByText("A booking tool for clinics")).toHaveLength(2);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });

    expect(await screen.findByText(/what problem does this solve/i)).toBeInTheDocument();
  });
});
