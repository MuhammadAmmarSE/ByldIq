/**
 * Minimal client-side cookie helpers. Only used for flags a Server
 * Component needs to read before first paint (e.g. "has this visitor
 * already seen the Arrival Experience?") — anything that only matters on
 * the client belongs in the persisted Zustand store instead.
 */
export function setCookie(name: string, value: string, maxAgeDays: number): void {
  if (typeof document === "undefined") return;
  const maxAgeSeconds = maxAgeDays * 24 * 60 * 60;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}
