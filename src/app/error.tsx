"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // No error reporting service wired up yet (Milestone 7 / production
    // readiness) — console.error keeps this visible in the meantime.
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-start justify-center gap-4 px-6 py-16">
      <h1 className="text-foreground text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted">
        An unexpected error occurred. You can try again, or come back later.
      </p>
      <button
        type="button"
        onClick={reset}
        className="border-border text-foreground hover:bg-surface-raised rounded-md border px-4 py-2 text-sm transition-[background-color] duration-[var(--duration-fast)]"
      >
        Try again
      </button>
    </main>
  );
}
