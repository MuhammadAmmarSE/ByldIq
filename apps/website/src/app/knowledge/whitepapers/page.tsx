import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { siteConfig } from "@/config/site";
import { KnowledgeContentTypePlaceholder } from "@/features/knowledge";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

const description =
  "In-depth whitepapers on product engineering and architecture — published once they exist, not before.";

export const metadata: Metadata = {
  title: "Whitepapers",
  description,
  alternates: { canonical: "/knowledge/whitepapers" },
};

/**
 * See `features/knowledge/KnowledgeContentTypePlaceholder.docs.md` for
 * why this route exists with no real whitepapers behind it yet. Excluded
 * from `sitemap.ts` for the same reason `/knowledge/search` is: no
 * content of its own worth indexing.
 */
export default function KnowledgeWhitepapersPage() {
  return (
    <Container size="content" className="space-y-8 py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Knowledge Center", url: `${siteConfig.url}/knowledge` },
            { name: "Whitepapers", url: `${siteConfig.url}/knowledge/whitepapers` },
          ]),
        )}
      />
      <div className="max-w-2xl space-y-3">
        <Heading variant="display">Whitepapers</Heading>
        <Text variant="subtitle">{description}</Text>
      </div>
      <KnowledgeContentTypePlaceholder
        contentTypeLabel="whitepapers"
        reason="No whitepapers have been authored yet."
      />
    </Container>
  );
}
