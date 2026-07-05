import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";

export const metadata: Metadata = {
  title: "BuildPath",
  description:
    "BuildPath turns a conversation about your product into a roadmap, technology recommendations, and next steps.",
};

/**
 * A real page, not a "coming soon" modal — CLAUDE.md Part 17's full
 * BuildPath wizard (11-stage questionnaire, AI recommendation engine, PDF
 * export) is out of scope for this milestone; this explains the vision
 * honestly rather than dead-ending the homepage preview's CTA.
 */
export default function BuildPathPage() {
  return (
    <Container size="content" className="py-16">
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <Badge variant="accent">Coming soon</Badge>
        <Heading variant="display">Let&apos;s plan your product together.</Heading>
        <Text variant="subtitle">
          BuildPath will turn a short conversation about your product into a phased roadmap,
          technology recommendations with reasoning, a suggested team, and the risks worth planning
          for — the full experience previewed on the homepage.
        </Text>
        <Text variant="body">
          The full BuildPath questionnaire isn&apos;t live yet. In the meantime, talk to Byld or
          explore how we think about product engineering.
        </Text>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button asChild>
            <Link href="/#product-thinking">Explore our process</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
