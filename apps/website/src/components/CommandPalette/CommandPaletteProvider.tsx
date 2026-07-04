"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

import type { CommandPaletteGroup } from "./CommandPalette.types";

const CommandPalette = dynamic(() => import("./CommandPalette").then((mod) => mod.CommandPalette), {
  ssr: false,
});

export interface CommandPaletteProviderProps {
  children: ReactNode;
  /** Empty by default (no pages/content to search yet — see CommandPalette's doc comment). Pages wire real groups in once those platforms exist. */
  groups?: CommandPaletteGroup[];
}

interface CommandPaletteContextValue {
  open: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

/** Lets UI outside the shortcut itself (e.g. Navbar's search button) open the palette. */
export function useCommandPalette(): CommandPaletteContextValue {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error("useCommandPalette must be used within a CommandPaletteProvider");
  }
  return context;
}

/**
 * Mounts the global `Cmd`/`Ctrl`+`K` shortcut and lazy-loads the palette
 * itself (a global overlay, not needed for first paint). Lives at the app
 * root (`AppProviders`) rather than `PageShell` — `PageShell` composes
 * layout, not global keyboard behavior, and this needs to be available
 * everywhere `PageShell` is, including error/loading boundaries outside it.
 */
export function CommandPaletteProvider({ children, groups = [] }: CommandPaletteProviderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const contextValue = useMemo<CommandPaletteContextValue>(
    () => ({ open: () => setOpen(true) }),
    [],
  );

  return (
    <CommandPaletteContext.Provider value={contextValue}>
      {children}
      {open && <CommandPalette open={open} onOpenChange={setOpen} groups={groups} />}
    </CommandPaletteContext.Provider>
  );
}
