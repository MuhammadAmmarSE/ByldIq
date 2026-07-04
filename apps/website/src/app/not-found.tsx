import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-start justify-center gap-4 px-6 py-16">
      <h1 className="text-foreground text-2xl font-semibold">Page not found</h1>
      <p className="text-muted">The page you requested does not exist or has moved.</p>
      <Link
        href="/"
        className="border-border text-foreground hover:bg-surface-raised rounded-md border px-4 py-2 text-sm transition-[background-color] duration-[var(--duration-fast)]"
      >
        Back home
      </Link>
    </main>
  );
}
