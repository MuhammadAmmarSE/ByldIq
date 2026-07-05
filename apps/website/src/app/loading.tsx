import { Skeleton } from "@/components/Skeleton";

/**
 * Shown by the App Router while a route segment streams in — mainly the
 * brief gap during client-side navigation back to `/` (e.g. from the
 * not-found page), since the homepage itself has no suspending data
 * fetches. A generic skeleton shape rather than one that mirrors the
 * homepage's own layout, since it can't know which route it's covering.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading"
      className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-16"
    >
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
