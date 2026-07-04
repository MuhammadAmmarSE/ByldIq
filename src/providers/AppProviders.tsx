import type { ReactNode } from "react";

import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
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
      <QueryProvider>
        <StoreProvider>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </StoreProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
