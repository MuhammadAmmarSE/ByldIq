"use client";

import { useState } from "react";

import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Navbar } from "@/components/Navbar";
import { primaryNav } from "@/config/site";

import type { PageShellProps } from "./PageShell.types";

/**
 * The global layout: Navbar + page content + Footer + MobileNav, wired
 * into `app/layout.tsx`. Owns the mobile drawer's open state since it's
 * shared between Navbar's trigger and MobileNav's own dock trigger.
 * `primaryNav` is empty until a later milestone defines real IA (see
 * `config/site.ts`) — every nav component here handles that gracefully.
 */
export function PageShell({ children }: PageShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <Navbar items={primaryNav} onMobileMenuToggle={() => setMobileNavOpen(true)} />
      <main className="flex flex-1 flex-col pb-20 lg:pb-0">{children}</main>
      <Footer />
      <MobileNav items={primaryNav} open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </>
  );
}
