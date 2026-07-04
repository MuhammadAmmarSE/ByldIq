import type { ReactNode } from "react";

import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
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
    <QueryProvider>
      <StoreProvider>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </StoreProvider>
    </QueryProvider>
  );
}
