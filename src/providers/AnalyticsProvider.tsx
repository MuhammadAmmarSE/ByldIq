"use client";

import Script from "next/script";
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";

import { env } from "@/lib/env";
import type { AnalyticsClient, AnalyticsEventMap, AnalyticsEventName } from "@/types/analytics";

const AnalyticsContext = createContext<AnalyticsClient | null>(null);

/**
 * Fans events out to whichever vendors are configured via env vars.
 * With none configured, `track` is a dev-only console no-op — the app
 * behaves identically with or without analytics wired up.
 */
function createAnalyticsClient(): AnalyticsClient {
  return {
    track<K extends AnalyticsEventName>(event: K, payload: AnalyticsEventMap[K]) {
      if (env.NEXT_PUBLIC_POSTHOG_KEY) {
        void import("posthog-js").then(({ default: posthog }) => {
          if (!posthog.__loaded) return;
          posthog.capture(String(event), payload as Record<string, unknown>);
        });
      }

      if (typeof window !== "undefined" && env.NEXT_PUBLIC_GA_ID && "gtag" in window) {
        (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag(
          "event",
          String(event),
          payload,
        );
      }

      if (process.env.NODE_ENV === "development" && !env.NEXT_PUBLIC_POSTHOG_KEY) {
        console.debug("[analytics:noop]", event, payload);
      }
    },
  };
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const clientRef = useRef<AnalyticsClient | null>(null);
  clientRef.current ??= createAnalyticsClient();

  useEffect(() => {
    const posthogKey = env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!posthogKey) return;

    void import("posthog-js").then(({ default: posthog }) => {
      if (posthog.__loaded) return;
      posthog.init(posthogKey, {
        api_host: env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
        capture_pageview: false,
        person_profiles: "identified_only",
      });
    });
  }, []);

  return (
    <AnalyticsContext.Provider value={clientRef.current}>
      {children}
      {env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${env.NEXT_PUBLIC_GA_ID}');`}
          </Script>
        </>
      )}
      {env.NEXT_PUBLIC_CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${env.NEXT_PUBLIC_CLARITY_ID}");`}
        </Script>
      )}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics(): AnalyticsClient {
  const client = useContext(AnalyticsContext);
  if (!client) {
    throw new Error("useAnalytics must be used within AnalyticsProvider");
  }
  return client;
}
