"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

import type { ThemeToggleProps } from "./ThemeToggle.types";

/**
 * A quick light/dark toggle (not the full light/dark/system choice) for
 * the navbar and mobile menu. `resolvedTheme` is `undefined` until mounted
 * on the client (the server can't know the OS/stored preference), so the
 * button stays disabled with a neutral label until then to avoid a
 * hydration mismatch.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      disabled={!mounted}
      aria-label={
        mounted ? (isDark ? "Switch to light theme" : "Switch to dark theme") : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Icon icon={isDark ? Sun : Moon} />
    </Button>
  );
}
