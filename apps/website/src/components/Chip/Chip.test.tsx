import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders its label", () => {
    render(<Chip>Frontend</Chip>);
    expect(screen.getByRole("button", { name: "Frontend" })).toBeInTheDocument();
  });

  it("toggles aria-pressed and calls onClick in selectable mode", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const { rerender } = render(
      <Chip selected={false} onClick={handleClick}>
        Databases
      </Chip>,
    );

    const chip = screen.getByRole("button", { name: "Databases" });
    expect(chip).toHaveAttribute("aria-pressed", "false");

    await user.click(chip);
    expect(handleClick).toHaveBeenCalledTimes(1);

    rerender(
      <Chip selected onClick={handleClick}>
        Databases
      </Chip>,
    );
    expect(screen.getByRole("button", { name: "Databases" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("renders a dismiss control and calls onDismiss without toggling selection semantics", async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();
    render(
      <Chip onDismiss={handleDismiss} dismissLabel="Remove Databases">
        Databases
      </Chip>,
    );

    expect(screen.queryByRole("button", { name: "Databases" })).not.toBeInTheDocument();
    const dismissButton = screen.getByRole("button", { name: "Remove Databases" });

    await user.click(dismissButton);
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });
});
