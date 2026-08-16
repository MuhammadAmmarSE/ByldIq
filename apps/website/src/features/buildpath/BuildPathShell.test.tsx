import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockTrack, mockReplace } = vi.hoisted(() => ({
  mockTrack: vi.fn(),
  mockReplace: vi.fn(),
}));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace, push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(""),
}));

import { BuildPathStoreProvider } from "@/providers/BuildPathStoreProvider";

import { BuildPathShell } from "./BuildPathShell";

function renderShell(props: Partial<React.ComponentProps<typeof BuildPathShell>> = {}) {
  return render(
    <BuildPathStoreProvider>
      <BuildPathShell entryContext={null} prefillProjectTypes={[]} {...props} />
    </BuildPathStoreProvider>,
  );
}

describe("BuildPathShell", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
    mockReplace.mockClear();
  });

  it("starts on the Idea stage, step 1 of 7", async () => {
    renderShell();
    expect(await screen.findByText(/step 1 of 7/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Let's start with your idea" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back" })).toBeDisabled();
  });

  it("prefills project types from a fresh session's entry context", async () => {
    renderShell({
      entryContext: { source: "solution", label: "Startup Product Engineering" },
      prefillProjectTypes: ["MVP", "New Product"],
    });

    expect(
      await screen.findByText("Continuing from Startup Product Engineering"),
    ).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "MVP" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "New Product" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("advances to the next stage when Continue is clicked", async () => {
    const user = userEvent.setup();
    renderShell();
    await screen.findByText(/step 1 of 7/i);

    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText(/step 2 of 7/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tell Byld more" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back" })).toBeEnabled();
  });

  it("returns to the Idea stage when Back is clicked", async () => {
    const user = userEvent.setup();
    renderShell();
    await screen.findByText(/step 1 of 7/i);

    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(screen.getByRole("button", { name: "Back" }));

    expect(screen.getByText(/step 1 of 7/i)).toBeInTheDocument();
  });

  it("fires buildpath_started once, with the entry context source", async () => {
    renderShell({
      entryContext: { source: "technology", label: "Next.js" },
      prefillProjectTypes: [],
    });
    await screen.findByText(/step 1 of 7/i);

    expect(mockTrack).toHaveBeenCalledWith("buildpath_started", { source: "technology" });
    expect(mockTrack.mock.calls.filter(([event]) => event === "buildpath_started")).toHaveLength(1);
  });

  it("resets back to the Idea stage when Start over is chosen", async () => {
    const user = userEvent.setup();
    renderShell();
    await screen.findByText(/step 1 of 7/i);

    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(await screen.findByText(/step 2 of 7/i)).toBeInTheDocument();

    await user.click(await screen.findByRole("button", { name: "Start over" }));
    expect(await screen.findByText(/step 1 of 7/i)).toBeInTheDocument();
  });
});
