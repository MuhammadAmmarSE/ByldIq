"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { AiCompanionTrigger } from "./AiCompanionTrigger";

const AiCompanionPanel = dynamic(
  () => import("./AiCompanionPanel").then((mod) => mod.AiCompanionPanel),
  { ssr: false },
);

/**
 * Mounts the AI Companion's floating trigger and lazy-loads its panel —
 * a global overlay not needed for first paint, same reasoning as
 * `CommandPaletteProvider`. Lives at the app root (`AppProviders`) so it's
 * available on every page, not just the homepage.
 */
export function AiCompanionProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <AiCompanionTrigger />
      <AiCompanionPanel />
    </>
  );
}
