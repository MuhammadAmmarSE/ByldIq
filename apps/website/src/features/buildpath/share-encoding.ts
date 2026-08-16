import type { ProjectType } from "./types";

/**
 * A shareable link needs an opaque ID to point at, but there's no backend
 * in this codebase to assign one against a database row. Rather than fake
 * persistence, the ID itself *is* the (compact, URL-safe) payload —
 * genuinely working, but scoped by URL length, so this intentionally
 * carries only the Final Plan's summary, not the full session or
 * conversation transcript.
 */
export interface SharePayload {
  projectTypes: ProjectType[];
  vision: string;
  problem: string;
  mvpFeatureNames: string[];
  nextSteps: string[];
}

function toBase64Url(input: string): string {
  const base64 =
    typeof Buffer !== "undefined"
      ? Buffer.from(input, "utf-8").toString("base64")
      : btoa(unescape(encodeURIComponent(input)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): string {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const base64 = padded + "=".repeat((4 - (padded.length % 4)) % 4);
  return typeof Buffer !== "undefined"
    ? Buffer.from(base64, "base64").toString("utf-8")
    : decodeURIComponent(escape(atob(base64)));
}

export function encodeSharePayload(payload: SharePayload): string {
  return toBase64Url(JSON.stringify(payload));
}

export function decodeSharePayload(id: string): SharePayload | null {
  try {
    const decoded: unknown = JSON.parse(fromBase64Url(id));
    if (
      decoded &&
      typeof decoded === "object" &&
      "vision" in decoded &&
      "problem" in decoded &&
      "mvpFeatureNames" in decoded &&
      "nextSteps" in decoded &&
      "projectTypes" in decoded
    ) {
      return decoded as SharePayload;
    }
    return null;
  } catch {
    return null;
  }
}
