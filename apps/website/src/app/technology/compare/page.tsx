import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { ComparisonEngine } from "@/features/technology";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

interface CompareTechnologyPageProps {
  searchParams: Promise<{ a?: string; b?: string }>;
}

const description =
  "Compare two technologies side by side across cost, complexity, team size, and scalability — never a declared winner, only trade-offs.";

/**
 * Canonicalizes to the bare `/technology/compare` path — the comparison
 * varies by `?a=`/`?b=`, and treating every pair as a distinct indexable
 * page would be duplicate content with no independent SEO value, the same
 * reasoning as `/work/search`.
 */
export const metadata: Metadata = {
  title: "Compare Technologies",
  description,
  alternates: { canonical: "/technology/compare" },
};

/**
 * CLAUDE.md Part 22's Comparison Engine required route: `?a=`/`?b=` deep-
 * link a specific pair, so the landing page's "Popular comparisons" and
 * any external link can point straight at a comparison already selected.
 */
export default async function CompareTechnologyPage({ searchParams }: CompareTechnologyPageProps) {
  const { a, b } = await searchParams;

  return (
    <Container size="wide" className="space-y-8 py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Technology", url: `${siteConfig.url}/technology` },
            { name: "Compare", url: `${siteConfig.url}/technology/compare` },
          ]),
        )}
      />
      <ComparisonEngine initialSlugA={a} initialSlugB={b} />
    </Container>
  );
}
