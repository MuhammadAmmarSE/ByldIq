import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Switch } from "./Switch";

describe("Switch", () => {
  it("toggles on click", async () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Enable notifications" onCheckedChange={onCheckedChange} />);
    const toggle = screen.getByRole("switch", { name: "Enable notifications" });
    expect(toggle).toHaveAttribute("aria-checked", "false");
    await userEvent.click(toggle);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("is keyboard operable via Space", async () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Enable notifications" onCheckedChange={onCheckedChange} />);
    await userEvent.tab();
    await userEvent.keyboard(" ");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("respects disabled state", () => {
    render(<Switch aria-label="Enable notifications" disabled />);
    expect(screen.getByRole("switch", { name: "Enable notifications" })).toBeDisabled();
  });
});
