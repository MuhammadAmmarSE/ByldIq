export interface MetricCardProps {
  /** The final animated value, e.g. `98` for "98%" or `12000000` for "12M". */
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  /** Decimal places to animate to, e.g. `1` for "4.8". Defaults to `0` (whole numbers). */
  decimals?: number;
  /** Seconds. Passed through to `useCountUp` — defaults to its own 1.2s default. */
  duration?: number;
  className?: string;
}
