import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DeveloperPlatformPod } from "./DeveloperPlatformPod";

describe("DeveloperPlatformPod", () => {
  it("shows the first endpoint's response by default and switches on selection", async () => {
    const user = userEvent.setup();
    const onInteraction = vi.fn();
    render(<DeveloperPlatformPod onInteraction={onInteraction} />);

    expect(screen.getByText(/"status": "healthy"/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /deploy/i }));

    expect(screen.getByText(/deploymentId/)).toBeInTheDocument();
    expect(onInteraction).toHaveBeenCalledWith("select_endpoint");
  });
});
