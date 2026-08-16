import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { siteConfig } from "@/config/site";
import { KnowledgeTutorials } from "@/features/knowledge";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

const description =
  "Hands-on, step-by-step tutorials for building and reasoning about real systems.";

export const metadata: Metadata = {
  title: "Tutorials",
  description,
  alternates: { canonical: "/knowledge/tutorials" },
  openGraph: {
    title: "Tutorials",
    description,
    url: "/knowledge/tutorials",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tutorials",
    description,
  },
};

/**
 * CLAUDE.md Part 18/19's Tutorials landing page. See
 * `features/knowledge/KnowledgeTutorials.docs.md` for the real tutorial
 * count.
 */
export default function KnowledgeTutorialsPage() {
  return (
    <Container size="content" className="space-y-8 py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Knowledge Center", url: `${siteConfig.url}/knowledge` },
            { name: "Tutorials", url: `${siteConfig.url}/knowledge/tutorials` },
          ]),
        )}
      />
      <div className="max-w-2xl space-y-3">
        <Heading variant="display">Tutorials</Heading>
        <Text variant="subtitle">{description}</Text>
      </div>
      <KnowledgeTutorials />
    </Container>
  );
}
