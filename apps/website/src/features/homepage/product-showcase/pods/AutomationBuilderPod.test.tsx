import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AutomationBuilderPod } from "./AutomationBuilderPod";

describe("AutomationBuilderPod", () => {
  it("toggles a step and reports the interaction", async () => {
    const user = userEvent.setup();
    const onInteraction = vi.fn();
    render(<AutomationBuilderPod onInteraction={onInteraction} />);

    const toggle = screen.getByRole("switch", { name: "Toggle Notify fulfillment partner" });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(onInteraction).toHaveBeenCalledWith("toggle_step");
  });

  it("starts a run when clicking Run workflow", async () => {
    const user = userEvent.setup();
    const onInteraction = vi.fn();
    render(<AutomationBuilderPod onInteraction={onInteraction} />);

    await user.click(screen.getByRole("button", { name: /run workflow/i }));
    expect(onInteraction).toHaveBeenCalledWith("run_workflow");
    expect(screen.getByRole("button", { name: /running/i })).toBeDisabled();
  });
});
