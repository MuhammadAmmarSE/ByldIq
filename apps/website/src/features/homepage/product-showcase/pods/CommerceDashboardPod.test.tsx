import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CommerceDashboardPod } from "./CommerceDashboardPod";

describe("CommerceDashboardPod", () => {
  it("filters orders by status and reports the interaction", async () => {
    const user = userEvent.setup();
    const onInteraction = vi.fn();
    render(<CommerceDashboardPod onInteraction={onInteraction} />);

    expect(screen.getByText("#3024")).toBeInTheDocument();

    await user.click(screen.getByRole("combobox", { name: "Filter by status" }));
    await user.click(screen.getByRole("option", { name: "Fulfilled" }));

    expect(screen.queryByText("#3024")).not.toBeInTheDocument();
    expect(onInteraction).toHaveBeenCalledWith("filter_status");
  });

  it("toggles sort order when the Amount header is clicked", async () => {
    const user = userEvent.setup();
    const onInteraction = vi.fn();
    render(<CommerceDashboardPod onInteraction={onInteraction} />);

    await user.click(screen.getByRole("button", { name: /amount/i }));
    expect(onInteraction).toHaveBeenCalledWith("sort_amount");
  });
});
