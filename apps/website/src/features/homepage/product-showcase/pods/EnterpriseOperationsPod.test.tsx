import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EnterpriseOperationsPod } from "./EnterpriseOperationsPod";

describe("EnterpriseOperationsPod", () => {
  it("approves a request, replacing its actions with a status badge", async () => {
    const user = userEvent.setup();
    const onInteraction = vi.fn();
    render(<EnterpriseOperationsPod onInteraction={onInteraction} />);

    const approveButton = screen.getByRole("button", { name: /^Approve New carrier onboarding/i });
    await user.click(approveButton);

    expect(screen.getByText("approved")).toBeInTheDocument();
    expect(onInteraction).toHaveBeenCalledWith("approve_request");
  });

  it("rejects a request", async () => {
    const user = userEvent.setup();
    const onInteraction = vi.fn();
    render(<EnterpriseOperationsPod onInteraction={onInteraction} />);

    await user.click(screen.getByRole("button", { name: /^Reject Route change/i }));

    expect(screen.getByText("rejected")).toBeInTheDocument();
    expect(onInteraction).toHaveBeenCalledWith("reject_request");
  });
});
