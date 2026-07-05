import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";

import { breadcrumbJsonLd, faqPageJsonLd, jsonLdScriptProps, organizationJsonLd } from "./json-ld";

describe("jsonLdScriptProps", () => {
  it("serializes data as an application/ld+json script prop", () => {
    const props = jsonLdScriptProps({ "@type": "Thing", name: "Test" });
    expect(props.type).toBe("application/ld+json");
    expect(JSON.parse(props.dangerouslySetInnerHTML.__html)).toEqual({
      "@type": "Thing",
      name: "Test",
    });
  });

  it("escapes '<' so a value can't close the script tag early", () => {
    const props = jsonLdScriptProps({ name: "</script><script>alert(1)</script>" });
    expect(props.dangerouslySetInnerHTML.__html).not.toContain("</script>");
    expect(props.dangerouslySetInnerHTML.__html).not.toMatch(/</);
    expect(JSON.parse(props.dangerouslySetInnerHTML.__html)).toEqual({
      name: "</script><script>alert(1)</script>",
    });
  });
});

describe("organizationJsonLd", () => {
  it("builds an Organization schema from site config", () => {
    expect(organizationJsonLd()).toEqual({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    });
  });
});

describe("breadcrumbJsonLd", () => {
  it("builds a BreadcrumbList with 1-indexed positions in the given order", () => {
    const result = breadcrumbJsonLd([
      { name: "Home", url: "https://example.com" },
      { name: "Solutions", url: "https://example.com/solutions" },
      { name: "Startup", url: "https://example.com/solutions/startup" },
    ]);

    expect(result).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://example.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Solutions",
          item: "https://example.com/solutions",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Startup",
          item: "https://example.com/solutions/startup",
        },
      ],
    });
  });
});

describe("faqPageJsonLd", () => {
  it("builds a FAQPage schema with one Question per entry", () => {
    const result = faqPageJsonLd([
      { question: "What is BuildPath?", answer: "A guided product discovery process." },
    ]);

    expect(result).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is BuildPath?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A guided product discovery process.",
          },
        },
      ],
    });
  });
});
