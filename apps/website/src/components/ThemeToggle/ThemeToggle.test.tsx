import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ThemeProvider } from "@/providers/ThemeProvider";

import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("toggles between light and dark", async () => {
    render(
      <ThemeProvider defaultTheme="light" enableSystem={false}>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const button = await waitFor(() => {
      const el = screen.getByRole("button", { name: "Switch to dark theme" });
      expect(el).toBeEnabled();
      return el;
    });

    await userEvent.click(button);
    expect(
      await screen.findByRole("button", { name: "Switch to light theme" }),
    ).toBeInTheDocument();
  });
});
