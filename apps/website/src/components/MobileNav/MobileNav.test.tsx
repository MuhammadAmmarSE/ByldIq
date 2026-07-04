import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CommandPaletteProvider } from "@/components/CommandPalette";
import type { NavItem } from "@/types/navigation";

import { MobileNav } from "./MobileNav";

const items: NavItem[] = [
  { label: "Work", href: "/work" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [{ label: "Startup", href: "/solutions/startup" }],
  },
];

function renderMobileNav(props: Partial<Parameters<typeof MobileNav>[0]> = {}) {
  const onOpenChange = vi.fn();
  const utils = render(
    <CommandPaletteProvider>
      <MobileNav open={false} onOpenChange={onOpenChange} {...props} />
    </CommandPaletteProvider>,
  );
  return { onOpenChange, ...utils };
}

describe("MobileNav", () => {
  it("opens the drawer from the dock's Menu button", async () => {
    const { onOpenChange } = renderMobileNav();
    await userEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("opens the command palette from the dock's Search button", async () => {
    renderMobileNav();
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(await screen.findByRole("dialog", { name: "Command Palette" })).toBeInTheDocument();
  });

  it("shows the nav items (including nested children) when the drawer is open", () => {
    renderMobileNav({ open: true, items });
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("link", { name: "Solutions" })).toHaveAttribute("href", "/solutions");
    expect(screen.getByRole("link", { name: "Startup" })).toHaveAttribute(
      "href",
      "/solutions/startup",
    );
  });

  it("explains the empty state when no items are provided", () => {
    renderMobileNav({ open: true });
    expect(screen.getByText("Navigation items aren't populated yet.")).toBeInTheDocument();
  });
});
