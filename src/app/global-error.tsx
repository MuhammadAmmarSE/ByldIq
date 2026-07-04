"use client";

import { useEffect } from "react";

import "./globals.css";

/**
 * Catches errors thrown by the root layout itself, which is why it has to
 * render its own <html>/<body> — there's no outer layout left to rely on.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-start justify-center gap-4 px-6 py-16">
        <h1 className="text-foreground text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted">The app failed to load. Please try again.</p>
        <button
          type="button"
          onClick={reset}
          className="border-border text-foreground rounded-md border px-4 py-2 text-sm"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
