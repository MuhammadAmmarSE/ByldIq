import { Skeleton } from "@/components/Skeleton";

/**
 * Shown by the App Router while a route segment streams in. Mirrors the
 * current placeholder page's shape loosely — revisit once Milestone 4
 * replaces it with the real homepage.
 */
export default function Loading() {
  return (
    <main
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
    </main>
  );
}
