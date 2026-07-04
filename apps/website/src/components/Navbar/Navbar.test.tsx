import { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CommandPaletteProvider } from "@/components/CommandPalette";
import type { NavItem } from "@/types/navigation";

import { Navbar } from "./Navbar";

const items: NavItem[] = [
  { label: "Work", href: "/work" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [{ label: "Startup", href: "/solutions/startup" }],
  },
];

function renderNavbar(props: Parameters<typeof Navbar>[0] = {}) {
  return render(
    <CommandPaletteProvider>
      <Navbar {...props} />
    </CommandPaletteProvider>,
  );
}

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true, writable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("Navbar", () => {
  it("renders leaf items as links and items with children as a MegaMenu trigger", () => {
    renderNavbar({ items });
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("button", { name: "Solutions" })).toBeInTheDocument();
  });

  it("renders with no items when none are provided", () => {
    renderNavbar();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeEmptyDOMElement();
  });

  it("opens the command palette from the search button", async () => {
    renderNavbar();
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("calls onMobileMenuToggle when the menu button is pressed", async () => {
    const onMobileMenuToggle = vi.fn();
    renderNavbar({ onMobileMenuToggle });
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(onMobileMenuToggle).toHaveBeenCalledTimes(1);
  });

  it("switches to a glass background once scrolled", () => {
    renderNavbar();
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("bg-transparent");
    scrollTo(100);
    expect(header).toHaveClass("bg-surface/80");
  });
});
