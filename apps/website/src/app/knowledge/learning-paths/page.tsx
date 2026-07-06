import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { siteConfig } from "@/config/site";
import { KnowledgeLearningPaths } from "@/features/knowledge";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

const description =
  "Structured, ordered reading journeys through the Knowledge Center, organized by who you are and what you're building.";

export const metadata: Metadata = {
  title: "Learning Paths",
  description,
  alternates: { canonical: "/knowledge/learning-paths" },
  openGraph: {
    title: "Learning Paths",
    description,
    url: "/knowledge/learning-paths",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Paths",
    description,
  },
};

/**
 * CLAUDE.md Part 18's Learning Paths landing page. See
 * `features/knowledge/data/learning-paths.ts` for why only one real path
 * ships rather than the spec's eight named audiences.
 */
export default function KnowledgeLearningPathsPage() {
  return (
    <Container size="content" className="space-y-8 py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Knowledge Center", url: `${siteConfig.url}/knowledge` },
            { name: "Learning Paths", url: `${siteConfig.url}/knowledge/learning-paths` },
          ]),
        )}
      />
      <div className="max-w-2xl space-y-3">
        <Heading variant="display">Learning Paths</Heading>
        <Text variant="subtitle">{description}</Text>
      </div>
      <KnowledgeLearningPaths />
    </Container>
  );
}
