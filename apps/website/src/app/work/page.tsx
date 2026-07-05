import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { WorkExplorer } from "@/features/case-studies";
import { ScrollDepthTracker } from "@/features/homepage/shared";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

const description =
  "Engineering stories, not portfolios — how five real business problems became working products, with the architecture, trade-offs, and results behind each one.";

export const metadata: Metadata = {
  title: "Work",
  description,
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work",
    description,
    url: "/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work",
    description,
  },
};

/**
 * The Case Studies Platform landing page (CLAUDE.md Part 21): an adaptive
 * hero with search and quick filters, featured work, multi-facet
 * filtering, and the full project grid — all composed in `WorkExplorer`.
 */
export default function WorkPage() {
  return (
    <Container size="wide" className="py-16">
      <ScrollDepthTracker page="work" />
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Work", url: `${siteConfig.url}/work` },
          ]),
        )}
      />
      <WorkExplorer />
    </Container>
  );
}
