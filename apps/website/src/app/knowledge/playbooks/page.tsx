import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { siteConfig } from "@/config/site";
import { KnowledgePlaybooks } from "@/features/knowledge";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

const description =
  "Practical, checklist-style guides product teams can put into practice immediately — not theory, a sequence of steps.";

export const metadata: Metadata = {
  title: "Playbooks",
  description,
  alternates: { canonical: "/knowledge/playbooks" },
  openGraph: {
    title: "Playbooks",
    description,
    url: "/knowledge/playbooks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Playbooks",
    description,
  },
};

/**
 * CLAUDE.md Part 18/19's Playbooks landing page. See
 * `features/knowledge/KnowledgePlaybooks.docs.md` for the real playbook
 * count and how playbook cards link to their dedicated checklist view.
 */
export default function KnowledgePlaybooksPage() {
  return (
    <Container size="content" className="space-y-8 py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Knowledge Center", url: `${siteConfig.url}/knowledge` },
            { name: "Playbooks", url: `${siteConfig.url}/knowledge/playbooks` },
          ]),
        )}
      />
      <div className="max-w-2xl space-y-3">
        <Heading variant="display">Playbooks</Heading>
        <Text variant="subtitle">{description}</Text>
      </div>
      <KnowledgePlaybooks />
    </Container>
  );
}
