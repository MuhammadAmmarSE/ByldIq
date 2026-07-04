import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { TIMELINE_STAGES } from "./data/stages";
import { ProductThinkingTimeline } from "./ProductThinkingTimeline";

function requireStage(id: string) {
  const stage = TIMELINE_STAGES.find((candidate) => candidate.id === id);
  if (!stage) throw new Error(`Missing stage fixture: ${id}`);
  return stage;
}

describe("ProductThinkingTimeline", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders a tab per stage and shows the first stage's panel by default", () => {
    render(<ProductThinkingTimeline />);

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(TIMELINE_STAGES.length);
    expect(screen.getByRole("tab", { name: /idea/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(requireStage("idea").headline)).toBeInTheDocument();
  });

  it("switches to another stage's panel on click and tracks it", async () => {
    const user = userEvent.setup();
    render(<ProductThinkingTimeline />);

    await user.click(screen.getByRole("tab", { name: /architecture/i }));

    expect(screen.getByText(requireStage("architecture").headline)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("timeline_stage_viewed", { stage: "architecture" });
  });

  it("moves between stages with arrow keys (Radix Tabs roving focus)", async () => {
    const user = userEvent.setup();
    render(<ProductThinkingTimeline />);

    screen.getByRole("tab", { name: /idea/i }).focus();
    await user.keyboard("[ArrowRight]");

    expect(screen.getByRole("tab", { name: /discovery/i })).toHaveFocus();
  });
});
