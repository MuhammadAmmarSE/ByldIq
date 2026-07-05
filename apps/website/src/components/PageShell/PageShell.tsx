"use client";

import { useState } from "react";

import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Navbar } from "@/components/Navbar";

import type { PageShellProps } from "./PageShell.types";

/**
 * The global layout: Navbar + page content + Footer + MobileNav, wired
 * into `app/layout.tsx`. Owns the mobile drawer's open state since it's
 * shared between Navbar's trigger and MobileNav's own dock trigger.
 * `navItems` is assembled by `app/layout.tsx`, not read from `config/site`
 * directly here — see `PageShell.types.ts`.
 */
export function PageShell({ children, navItems = [] }: PageShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <Navbar items={navItems} onMobileMenuToggle={() => setMobileNavOpen(true)} />
      <main className="flex flex-1 flex-col pb-20 lg:pb-0">{children}</main>
      <Footer />
      <MobileNav items={navItems} open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </>
  );
}
