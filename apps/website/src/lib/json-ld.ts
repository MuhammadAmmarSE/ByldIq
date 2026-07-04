import { siteConfig } from "@/config/site";

/**
 * Serializes structured data for a `<script type="application/ld+json">`
 * tag. Escapes `<` so a value can't accidentally close the script tag early
 * — defense in depth even though today's callers only pass our own config,
 * not user input.
 */
export function jsonLdScriptProps(data: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  } as const;
}

/**
 * Minimal Organization schema from structural site config only — no
 * marketing copy (logo, description, sameAs social links) is invented here;
 * add those fields when the brand assets/content exist to back them.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}
