import type { ReactNode } from "react";

import { CommandPaletteProvider } from "@/components/CommandPalette";
import { ToastProvider } from "@/components/Toast";
import { AiCompanionStoreProvider } from "@/providers/AiCompanionStoreProvider";
import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
import { MotionProvider } from "@/providers/MotionProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { StoreProvider } from "@/providers/StoreProvider";

/**
 * Same provider stack as AppProviders, minus ThemeProvider: Storybook's
 * dark/light toggle is driven by the addon-themes toolbar (see
 * .storybook/preview.tsx), which would otherwise fight with next-themes for
 * control of the `.dark` class.
 */
export function StorybookProviders({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <QueryProvider>
        <StoreProvider>
          <AiCompanionStoreProvider>
            <AnalyticsProvider>
              <ToastProvider>
                <CommandPaletteProvider>{children}</CommandPaletteProvider>
              </ToastProvider>
            </AnalyticsProvider>
          </AiCompanionStoreProvider>
        </StoreProvider>
      </QueryProvider>
    </MotionProvider>
  );
}
