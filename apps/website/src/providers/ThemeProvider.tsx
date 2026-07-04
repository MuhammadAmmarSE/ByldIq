"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

/**
 * Class-based light/dark/system theming. `next-themes` injects a
 * pre-hydration script so the correct class is set before paint, avoiding a
 * flash of the wrong theme on load. `disableTransitionOnChange` is
 * deliberately omitted — globals.css defines a coordinated color transition
 * (reduced-motion-aware) so a manual toggle crossfades smoothly instead of
 * snapping instantly.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem {...props}>
      {children}
    </NextThemesProvider>
  );
}
