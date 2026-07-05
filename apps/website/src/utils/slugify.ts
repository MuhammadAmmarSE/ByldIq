/**
 * Converts a display string (an industry name, a technology name) into a
 * URL-safe slug — e.g. "Next.js" -> "next-js", "Developer Tools" ->
 * "developer-tools". Used by the Case Studies platform's
 * `/work/industry/[industry]` and `/work/technology/[technology]` filter
 * routes, which key off these slugs rather than a separately authored
 * slug field per technology/industry.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
