import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { siteConfig } from "@/config/site";
import { KnowledgeContentTypePlaceholder } from "@/features/knowledge";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

const description =
  "Video walkthroughs of architecture decisions and engineering practice — published once they exist, not before.";

export const metadata: Metadata = {
  title: "Videos",
  description,
  alternates: { canonical: "/knowledge/videos" },
};

/**
 * See `features/knowledge/KnowledgeContentTypePlaceholder.docs.md` for
 * why this route exists with no real videos behind it yet. Excluded
 * from `sitemap.ts` for the same reason `/knowledge/search` is: no
 * content of its own worth indexing.
 */
export default function KnowledgeVideosPage() {
  return (
    <Container size="content" className="space-y-8 py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Knowledge Center", url: `${siteConfig.url}/knowledge` },
            { name: "Videos", url: `${siteConfig.url}/knowledge/videos` },
          ]),
        )}
      />
      <div className="max-w-2xl space-y-3">
        <Heading variant="display">Videos</Heading>
        <Text variant="subtitle">{description}</Text>
      </div>
      <KnowledgeContentTypePlaceholder
        contentTypeLabel="videos"
        reason="There's no video production pipeline yet."
      />
    </Container>
  );
}
