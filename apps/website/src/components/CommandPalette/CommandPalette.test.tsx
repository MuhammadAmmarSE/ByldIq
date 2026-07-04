import { FileText, Home } from "lucide-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CommandPalette } from "./CommandPalette";
import type { CommandPaletteGroup } from "./CommandPalette.types";

function buildGroups(onSelectHome: () => void, onSelectArticle: () => void): CommandPaletteGroup[] {
  return [
    {
      heading: "Pages",
      items: [{ id: "home", label: "Homepage", icon: Home, onSelect: onSelectHome }],
    },
    {
      heading: "Articles",
      items: [
        {
          id: "article-1",
          label: "Choosing a database",
          icon: FileText,
          onSelect: onSelectArticle,
        },
      ],
    },
  ];
}

describe("CommandPalette", () => {
  it("lists every group and item when open", () => {
    render(<CommandPalette open onOpenChange={() => {}} groups={buildGroups(vi.fn(), vi.fn())} />);
    expect(screen.getByText("Pages")).toBeInTheDocument();
    expect(screen.getByText("Homepage")).toBeInTheDocument();
    expect(screen.getByText("Articles")).toBeInTheDocument();
    expect(screen.getByText("Choosing a database")).toBeInTheDocument();
  });

  it("filters items as the user types", async () => {
    render(<CommandPalette open onOpenChange={() => {}} groups={buildGroups(vi.fn(), vi.fn())} />);
    await userEvent.type(screen.getByRole("combobox"), "database");
    expect(screen.getByText("Choosing a database")).toBeInTheDocument();
    expect(screen.queryByText("Homepage")).not.toBeInTheDocument();
  });

  it("calls the item's onSelect and closes when chosen", async () => {
    const onSelectHome = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <CommandPalette
        open
        onOpenChange={onOpenChange}
        groups={buildGroups(onSelectHome, vi.fn())}
      />,
    );
    await userEvent.click(screen.getByText("Homepage"));
    expect(onSelectHome).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes on Escape", async () => {
    const onOpenChange = vi.fn();
    render(
      <CommandPalette open onOpenChange={onOpenChange} groups={buildGroups(vi.fn(), vi.fn())} />,
    );
    await userEvent.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
