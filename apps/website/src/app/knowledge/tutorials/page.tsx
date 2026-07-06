import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { siteConfig } from "@/config/site";
import { KnowledgeContentTypePlaceholder } from "@/features/knowledge";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

const description =
  "Hands-on, interactive tutorials for building and reasoning about real systems — published once they exist, not before.";

export const metadata: Metadata = {
  title: "Interactive Tutorials",
  description,
  alternates: { canonical: "/knowledge/tutorials" },
};

/**
 * See `features/knowledge/KnowledgeContentTypePlaceholder.docs.md` for
 * why this route exists with no real tutorials behind it yet. Excluded
 * from `sitemap.ts` for the same reason `/knowledge/search` is: no
 * content of its own worth indexing.
 */
export default function KnowledgeTutorialsPage() {
  return (
    <Container size="content" className="space-y-8 py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Knowledge Center", url: `${siteConfig.url}/knowledge` },
            { name: "Interactive Tutorials", url: `${siteConfig.url}/knowledge/tutorials` },
          ]),
        )}
      />
      <div className="max-w-2xl space-y-3">
        <Heading variant="display">Interactive Tutorials</Heading>
        <Text variant="subtitle">{description}</Text>
      </div>
      <KnowledgeContentTypePlaceholder
        contentTypeLabel="interactive tutorials"
        reason="There's no interactive tutorial engine yet — that's a larger build than a single page."
      />
    </Container>
  );
}
