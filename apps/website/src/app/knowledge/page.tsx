import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { KnowledgeExplorer } from "@/features/knowledge";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

const description =
  "Practical guides on product strategy, architecture, AI, accessibility, and commerce — an engineering learning platform, not a blog.";

export const metadata: Metadata = {
  title: "Knowledge Center",
  description,
  alternates: { canonical: "/knowledge" },
  openGraph: {
    title: "Knowledge Center",
    description,
    url: "/knowledge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Center",
    description,
  },
};

/**
 * The Knowledge Center landing page (CLAUDE.md Part 18): search, category
 * filtering, a featured guide, and the full article grid.
 */
export default function KnowledgePage() {
  return (
    <Container size="wide" className="space-y-12 py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Knowledge Center", url: `${siteConfig.url}/knowledge` },
          ]),
        )}
      />
      <KnowledgeExplorer />
    </Container>
  );
}
