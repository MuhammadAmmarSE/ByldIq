import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MobileProductPod } from "./MobileProductPod";

describe("MobileProductPod", () => {
  it("switches content when tapping a bottom nav tab", async () => {
    const user = userEvent.setup();
    const onInteraction = vi.fn();
    render(<MobileProductPod onInteraction={onInteraction} />);

    expect(screen.getByText(/recent activity/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.getByText(/search across every project/i)).toBeInTheDocument();
    expect(onInteraction).toHaveBeenCalledWith("switch_tab");
  });
});
