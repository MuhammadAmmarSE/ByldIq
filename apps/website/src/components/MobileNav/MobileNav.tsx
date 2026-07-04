"use client";

import { Home, Menu, Search } from "lucide-react";
import Link from "next/link";

import { useCommandPalette } from "@/components/CommandPalette";
import { Drawer } from "@/components/Drawer";
import { Icon } from "@/components/Icon";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { NavItem } from "@/types/navigation";

import type { MobileNavProps } from "./MobileNav.types";

function NavList({ items }: { items: NavItem[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="text-foreground hover:bg-surface-raised block rounded-md px-3 py-2 text-sm font-medium"
          >
            {item.label}
          </Link>
          {item.children && item.children.length > 0 && (
            <ul className="border-border ml-3 flex flex-col gap-1 border-l pl-3">
              {item.children.map((child) => (
                <li key={child.label}>
                  <Link
                    href={child.href}
                    className="text-muted hover:text-foreground block rounded-md px-3 py-2 text-sm"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * Per CLAUDE.md Part 8: a persistent bottom dock (Home, Search, Menu) plus
 * a full drawer for the rest of the IA + theme. Only Home/Search/Menu are
 * hardcoded in the dock — everything content-specific (Solutions, AI, ...)
 * is a later milestone's decision, populated via `items` in the drawer.
 */
export function MobileNav({ items = [], open, onOpenChange }: MobileNavProps) {
  const { open: openCommandPalette } = useCommandPalette();

  return (
    <>
      <nav
        aria-label="Mobile"
        className="bg-surface/95 border-border z-fixed fixed inset-x-0 bottom-0 flex items-center justify-around border-t py-2 backdrop-blur-md lg:hidden"
      >
        <Link
          href="/"
          className="text-muted hover:text-foreground flex flex-col items-center gap-1 px-4 py-1 text-xs"
        >
          <Icon icon={Home} />
          Home
        </Link>
        <button
          type="button"
          onClick={openCommandPalette}
          className="text-muted hover:text-foreground flex flex-col items-center gap-1 px-4 py-1 text-xs"
        >
          <Icon icon={Search} />
          Search
        </button>
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="text-muted hover:text-foreground flex flex-col items-center gap-1 px-4 py-1 text-xs"
        >
          <Icon icon={Menu} />
          Menu
        </button>
      </nav>

      <Drawer open={open} onOpenChange={onOpenChange} title="Menu" side="right">
        <div className="flex flex-col gap-4">
          {items.length > 0 ? (
            <NavList items={items} />
          ) : (
            <p className="text-muted text-sm">Navigation items aren&apos;t populated yet.</p>
          )}
          <div className="border-border flex items-center justify-between border-t pt-4">
            <span className="text-foreground text-sm font-medium">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </Drawer>
    </>
  );
}
