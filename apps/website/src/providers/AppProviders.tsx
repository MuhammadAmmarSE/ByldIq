import type { ReactNode } from "react";

import { CommandPaletteProvider } from "@/components/CommandPalette";
import { ToastProvider } from "@/components/Toast";
import { AiCompanionProvider } from "@/features/homepage/ai-companion";
import { AiCompanionStoreProvider } from "@/providers/AiCompanionStoreProvider";
import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
import { MotionProvider } from "@/providers/MotionProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { StoreProvider } from "@/providers/StoreProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

/**
 * Single composition point for every app-wide provider. Order matters only
 * where a provider consumes another's context; none currently do, so this
 * list is otherwise alphabetical-by-concern for readability.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <QueryProvider>
          <StoreProvider>
            <AiCompanionStoreProvider>
              <AnalyticsProvider>
                <ToastProvider>
                  <CommandPaletteProvider>
                    <AiCompanionProvider>{children}</AiCompanionProvider>
                  </CommandPaletteProvider>
                </ToastProvider>
              </AnalyticsProvider>
            </AiCompanionStoreProvider>
          </StoreProvider>
        </QueryProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}
