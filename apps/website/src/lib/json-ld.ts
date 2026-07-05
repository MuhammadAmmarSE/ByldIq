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

/**
 * BreadcrumbList schema (CLAUDE.md Part 26: "Structured Data" is a
 * required metadata field). `items` should be given in root-to-leaf order,
 * with absolute URLs — schema.org's `item` expects a full URL, not a path.
 */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Article schema for long-form content pages (CLAUDE.md Part 21's case
 * studies). Schema.org has no dedicated "CaseStudy" type, so `Article` is
 * the closest valid type. `datePublished`/`dateModified` are deliberately
 * omitted — the content model has no real authored dates, and CLAUDE.md
 * Part 7's "never fabricate numbers" applies equally to fabricated dates.
 */
export function articleJsonLd(article: { headline: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    url: article.url,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

/**
 * FAQPage schema for any page whose FAQ accordion mirrors real, visible
 * page content (CLAUDE.md Part 20's solution pages) — never for FAQ
 * content that isn't actually rendered, which Google's guidelines treat as
 * spam.
 */
export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
