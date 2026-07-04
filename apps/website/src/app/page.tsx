"use client";

import { useTheme } from "next-themes";

import { useAppStore } from "@/providers/StoreProvider";
import { JOURNEYS } from "@/types/journey";
import { THEMES } from "@/types/theme";

/**
 * Milestone 1 placeholder — verifies the foundation (design tokens, theme
 * engine, providers, store) boots end to end. Not the marketing homepage;
 * replaced entirely in Milestone 4.
 */
export default function FoundationCheckPage() {
  const { theme, setTheme } = useTheme();
  const journey = useAppStore((state) => state.journey);
  const setJourney = useAppStore((state) => state.setJourney);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="space-y-2">
        <p className="text-muted font-mono text-sm">Milestone 1</p>
        <h1 className="text-foreground text-3xl font-semibold">Engineering foundation</h1>
        <p className="text-muted">
          This placeholder confirms the design tokens, theme engine, and providers are wired
          correctly. It is replaced by the real homepage in Milestone 4.
        </p>
      </div>

      <section className="border-border bg-surface-raised rounded-lg border p-6">
        <h2 className="text-foreground text-lg font-medium">Theme</h2>
        <p className="text-muted mt-1 text-sm">Current: {theme ?? "loading"}</p>
        <div className="mt-4 flex gap-2">
          {THEMES.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTheme(option)}
              className="border-border text-foreground hover:bg-surface rounded-md border px-3 py-1.5 text-sm transition-[background-color] duration-[var(--duration-fast)]"
              aria-pressed={theme === option}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="border-border bg-surface-raised rounded-lg border p-6">
        <h2 className="text-foreground text-lg font-medium">Journey store (Zustand)</h2>
        <p className="text-muted mt-1 text-sm">Selected: {journey ?? "none"}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {JOURNEYS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setJourney(option)}
              className="border-border text-foreground hover:bg-surface rounded-md border px-3 py-1.5 text-sm transition-[background-color] duration-[var(--duration-fast)]"
              aria-pressed={journey === option}
            >
              {option}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
