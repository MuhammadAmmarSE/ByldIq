import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AiWorkspacePod } from "./AiWorkspacePod";

describe("AiWorkspacePod", () => {
  it("sends a message, shows it immediately, and reports the interaction", async () => {
    const user = userEvent.setup();
    const onInteraction = vi.fn();

    render(<AiWorkspacePod onInteraction={onInteraction} />);

    await user.type(screen.getByLabelText("Ask the assistant"), "How do refunds work?");
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getByText("How do refunds work?")).toBeInTheDocument();
    expect(onInteraction).toHaveBeenCalledWith("message_sent");
  });
});
