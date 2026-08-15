export interface BeforeAfterPair {
  before: string;
  after: string;
}

const ARROW_PATTERN = /\s*(?:->|→)\s*/;

/**
 * Extracts a before/after pair from a metric value that already encodes
 * one (e.g. "2 days -> 12 min") — CLAUDE.md Part 12's Before/After
 * section, sourced from data already in `metrics[].value` rather than a
 * new field, since "never invent measurements" applies equally to
 * inventing a "before" baseline that isn't already part of the recorded
 * metric. Returns `null` for a value with no such pair (most metrics —
 * e.g. "+17%" is a delta, not a before/after transition).
 */
export function parseBeforeAfter(value: string): BeforeAfterPair | null {
  const parts = value.split(ARROW_PATTERN);
  if (parts.length !== 2) return null;

  const [before, after] = parts;
  if (!before || !after) return null;

  return { before, after };
}
