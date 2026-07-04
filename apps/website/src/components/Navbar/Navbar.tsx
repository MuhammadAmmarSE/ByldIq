"use client";

import { Menu, Search } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { useCommandPalette } from "@/components/CommandPalette";
import { Icon } from "@/components/Icon";
import { MegaMenu } from "@/components/MegaMenu";
import { Button } from "@/components/Button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/utils/cn";

import type { NavbarProps } from "./Navbar.types";

/**
 * Scroll-aware per CLAUDE.md Part 6: transparent at the top, a glass
 * background once scrolled, and hides on scroll-down / reappears on
 * scroll-up (the standard "reduce visual weight down, prominent up"
 * pattern) — animates only `transform`/background color, never layout.
 */
export function Navbar({ items = [], className, onMobileMenuToggle }: NavbarProps) {
  const { scrolled, direction } = useScrollDirection();
  const { open: openCommandPalette } = useCommandPalette();
  const hidden = scrolled && direction === "down";

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: duration.base, ease: ease.standard }}
      className={cn(
        "z-fixed sticky top-0 border-b transition-colors",
        scrolled
          ? "border-border bg-surface/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
        className,
      )}
    >
      <div className="max-w-wide mx-auto flex h-16 items-center justify-between gap-4 px-6">
        <Link href="/" className="text-foreground shrink-0 text-lg font-semibold">
          Byld IQ
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 items-center gap-1 lg:flex">
          {items.map((item) =>
            item.children && item.children.length > 0 ? (
              <MegaMenu key={item.label} item={item} />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search" onClick={openCommandPalette}>
            <Icon icon={Search} />
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="lg:hidden"
            onClick={onMobileMenuToggle}
          >
            <Icon icon={Menu} />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
