export interface ParsedMetricValue {
  /** "+", "-", or "" — folded separately from `magnitude` so both render as one signed number. */
  sign: "" | "+" | "-";
  /** Always non-negative; combine with `sign` for the real value. */
  magnitude: number;
  /** Trailing unit text, e.g. "%", "x", "+", "s". */
  suffix: string;
  /** Decimal places present in the source, e.g. 2 for "99.97%". */
  decimals: number;
}

const METRIC_PATTERN = /^([+-]?)(\d[\d,]*(?:\.\d+)?)(\D*)$/;

/**
 * Extracts a countable number from a case study metric's free-text value
 * (`data/case-study.schema.ts`'s `metrics[].value` is authored prose, not
 * a structured number — e.g. "+17%", "99.97%", "1,200+", but also "Zero
 * unplanned" and "2 days -> 12 min"). Returns `null` for anything that
 * isn't cleanly "a number with a short unit," rather than guessing —
 * animating the "2" out of "2 days -> 12 min" would misrepresent it as a
 * countable metric it isn't. Callers should fall back to a static
 * (non-counting) reveal when this returns `null`.
 */
export function parseMetricValue(raw: string): ParsedMetricValue | null {
  const match = METRIC_PATTERN.exec(raw.trim());
  if (!match) return null;

  const [, signPart = "", numberPart = "", suffixPart = ""] = match;
  const decimalDigits = numberPart.split(".")[1] ?? "";
  const magnitude = Number.parseFloat(numberPart.replace(/,/g, ""));
  if (!Number.isFinite(magnitude)) return null;

  return {
    sign: signPart === "+" || signPart === "-" ? signPart : "",
    magnitude,
    suffix: suffixPart,
    decimals: decimalDigits.length,
  };
}
