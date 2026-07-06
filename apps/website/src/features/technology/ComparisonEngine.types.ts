export interface ComparisonEngineProps {
  /** Preselects the left-hand technology — used by `/technology/compare?a=`. */
  initialSlugA?: string;
  /** Preselects the right-hand technology — used by `/technology/compare?b=`. */
  initialSlugB?: string;
  className?: string;
}
