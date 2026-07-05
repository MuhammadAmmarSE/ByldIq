import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockTrack, mockPush } = vi.hoisted(() => ({
  mockTrack: vi.fn(),
  mockPush: vi.fn(),
}));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

import {
  AiCompanionStoreProvider,
  useAiCompanionStore,
} from "@/providers/AiCompanionStoreProvider";
import { StoreProvider } from "@/providers/StoreProvider";
import { ToastProvider } from "@/components/Toast";

import { ConversionExperience } from "./ConversionExperience";

function renderConversionExperience() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <ToastProvider>
          <ConversionExperience />
        </ToastProvider>
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("ConversionExperience", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
    mockPush.mockClear();
  });

  it("reveals the calendar preview after choosing Book Discovery", async () => {
    const user = userEvent.setup();
    renderConversionExperience();

    expect(screen.queryByText(/discovery call — 30 minutes/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "View availability" }));

    expect(screen.getByText(/discovery call — 30 minutes/i)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith(
      "conversion_decision_selected",
      expect.objectContaining({ decision: "book-discovery" }),
    );
  });

  it("navigates to /buildpath when Use BuildPath is chosen", async () => {
    const user = userEvent.setup();
    renderConversionExperience();

    await user.click(screen.getByRole("button", { name: "Start BuildPath" }));
    expect(mockPush).toHaveBeenCalledWith("/buildpath");
  });

  it("navigates to /knowledge when Explore Knowledge is chosen", async () => {
    const user = userEvent.setup();
    renderConversionExperience();

    await user.click(screen.getByRole("button", { name: "Browse guides" }));
    expect(mockPush).toHaveBeenCalledWith("/knowledge");
  });

  it("opens the AI companion when Talk to Byld is chosen", async () => {
    const user = userEvent.setup();

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <ConversionExperience />
          <p data-testid="ai-open-state">{isOpen ? "open" : "closed"}</p>
        </>
      );
    }

    render(
      <StoreProvider>
        <AiCompanionStoreProvider>
          <ToastProvider>
            <Harness />
          </ToastProvider>
        </AiCompanionStoreProvider>
      </StoreProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Open Byld" }));
    expect(screen.getByTestId("ai-open-state")).toHaveTextContent("open");
  });

  it("shows a toast explaining resources aren't published yet", async () => {
    const user = userEvent.setup();
    renderConversionExperience();

    await user.click(screen.getByRole("button", { name: "Get resources" }));
    expect(await screen.findByText(/resources are coming soon/i)).toBeInTheDocument();
  });

  it("expands an FAQ answer on click", async () => {
    const user = userEvent.setup();
    renderConversionExperience();

    await user.click(screen.getByRole("button", { name: "Can you sign an NDA?" }));
    expect(screen.getByText(/happy to sign one/i)).toBeInTheDocument();
  });

  it("submits the newsletter form and shows a success state", async () => {
    const user = userEvent.setup();
    renderConversionExperience();

    await user.type(screen.getByLabelText("Email address"), "founder@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(screen.getByText(/you're subscribed/i)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("conversion_newsletter_submitted", {});
  });
});
