import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("accepts typed input", async () => {
    render(<Input aria-label="Company name" />);
    const input = screen.getByRole("textbox", { name: "Company name" });
    await userEvent.type(input, "Byld IQ");
    expect(input).toHaveValue("Byld IQ");
  });

  it("marks itself invalid via aria-invalid", () => {
    render(<Input aria-label="Email" invalid />);
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "true");
  });

  it("respects disabled state", () => {
    render(<Input aria-label="Email" disabled />);
    expect(screen.getByRole("textbox", { name: "Email" })).toBeDisabled();
  });
});
