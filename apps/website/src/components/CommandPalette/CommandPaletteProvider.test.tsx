import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CommandPaletteProvider } from "./CommandPaletteProvider";

describe("CommandPaletteProvider", () => {
  it("opens on Cmd/Ctrl+K and closes on a second press", async () => {
    render(
      <CommandPaletteProvider>
        <p>Page content</p>
      </CommandPaletteProvider>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.keyboard("{Control>}k{/Control}");
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await userEvent.keyboard("{Control>}k{/Control}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    render(
      <CommandPaletteProvider>
        <p>Page content</p>
      </CommandPaletteProvider>,
    );
    await userEvent.keyboard("{Control>}k{/Control}");
    await screen.findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
