import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { AiCompanionStoreProvider } from "@/providers/AiCompanionStoreProvider";
import { StoreProvider } from "@/providers/StoreProvider";

import { AI_ASSISTED_AREAS } from "./data/ai-assisted-areas";
import { AiPhilosophySection } from "./AiPhilosophySection";

function renderSection() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <AiPhilosophySection />
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("AiPhilosophySection", () => {
  it("renders every AI-assisted area with what stays human", () => {
    renderSection();

    for (const area of AI_ASSISTED_AREAS) {
      expect(screen.getByText(area.title)).toBeInTheDocument();
      expect(screen.getByText(area.description)).toBeInTheDocument();
    }
  });

  it("gives the section a stable id for the sidebar", () => {
    const { container } = renderSection();
    expect(container.querySelector("#ai-philosophy")).toBeInTheDocument();
  });

  it("embeds the real AI Companion highlight, not a separate mascot interaction", () => {
    renderSection();
    expect(screen.getByRole("button", { name: /ask byld a question/i })).toBeInTheDocument();
  });
});
