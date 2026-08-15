export interface PricingCardProps {
  tier: string;
  /** Pre-formatted — e.g. `"$4,500/mo"` or `"Custom"`. Kept as a string rather than a number since real pricing display doesn't fit one numeric shape. */
  price: string;
  description?: string;
  features: string[];
  ctaLabel: string;
  /** Renders the CTA as a link. Omit and use `onCtaClick` for a button instead. */
  ctaHref?: string;
  onCtaClick?: () => void;
  /** Highlights this tier as the recommended one. */
  featured?: boolean;
  className?: string;
}
