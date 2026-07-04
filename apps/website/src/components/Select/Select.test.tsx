import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Select } from "./Select";

const options = [
  { value: "startup", label: "Startup" },
  { value: "enterprise", label: "Enterprise" },
  { value: "commerce", label: "Commerce", disabled: true },
];

describe("Select", () => {
  it("shows the placeholder until a value is chosen", () => {
    render(<Select options={options} aria-label="Journey" placeholder="Choose a journey" />);
    expect(screen.getByText("Choose a journey")).toBeInTheDocument();
  });

  it("opens the listbox and selects an option", async () => {
    const onValueChange = vi.fn();
    render(<Select options={options} aria-label="Journey" onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("combobox", { name: "Journey" }));
    const option = await screen.findByRole("option", { name: "Enterprise" });
    await userEvent.click(option);
    expect(onValueChange).toHaveBeenCalledWith("enterprise");
  });

  it("is keyboard operable", async () => {
    const onValueChange = vi.fn();
    render(<Select options={options} aria-label="Journey" onValueChange={onValueChange} />);
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await screen.findByRole("option", { name: "Startup" });
    await userEvent.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("startup");
  });
});
