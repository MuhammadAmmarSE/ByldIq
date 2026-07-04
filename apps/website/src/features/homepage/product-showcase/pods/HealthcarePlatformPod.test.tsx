import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { HealthcarePlatformPod } from "./HealthcarePlatformPod";

describe("HealthcarePlatformPod", () => {
  it("filters appointments by status and reports the interaction", async () => {
    const user = userEvent.setup();
    const onInteraction = vi.fn();
    render(<HealthcarePlatformPod onInteraction={onInteraction} />);

    expect(screen.getByText(/Priya Kapoor/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Upcoming" }));

    expect(screen.queryByText(/Priya Kapoor/)).not.toBeInTheDocument();
    expect(onInteraction).toHaveBeenCalledWith("filter_appointments");
  });

  it("uses only clearly fictional patient data", () => {
    render(<HealthcarePlatformPod />);
    for (const name of screen.getAllByText(/\(fictional\)/)) {
      expect(name).toBeInTheDocument();
    }
  });
});
