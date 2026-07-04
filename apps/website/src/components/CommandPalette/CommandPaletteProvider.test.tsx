import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/Button";

import { CommandPaletteProvider, useCommandPalette } from "./CommandPaletteProvider";

function SearchTrigger() {
  const { open } = useCommandPalette();
  return <Button onClick={open}>Search</Button>;
}

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

  it("opens via useCommandPalette().open() from anywhere in the tree", async () => {
    render(
      <CommandPaletteProvider>
        <SearchTrigger />
      </CommandPaletteProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("throws when useCommandPalette is called outside a CommandPaletteProvider", () => {
    function Broken() {
      useCommandPalette();
      return null;
    }
    expect(() => render(<Broken />)).toThrow(
      "useCommandPalette must be used within a CommandPaletteProvider",
    );
  });
});
