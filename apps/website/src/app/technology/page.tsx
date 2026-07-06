import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { TECHNOLOGIES } from "@/features/technology";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Technology decisions explained, not a stack list — strengths, weaknesses, trade-offs, and the reasoning behind choosing one technology over another.",
};

/**
 * The Technology Explorer landing page (CLAUDE.md Part 22) — routing
 * skeleton only. The real hero, search, and category grid land in the next
 * phase; for now this lists every technology so `/technology/[slug]` has a
 * real entry point.
 */
export default function TechnologyPage() {
  return (
    <Container size="content" className="space-y-8 py-16">
      <Heading variant="display">Technology Decisions, Explained.</Heading>

      <ul className="grid gap-6 sm:grid-cols-2">
        {TECHNOLOGIES.map((technology) => (
          <li key={technology.slug} className="border-border rounded-lg border p-6">
            <Link href={`/technology/${technology.slug}`} className="hover:text-accent">
              <Text variant="body" className="font-medium">
                {technology.name}
              </Text>
            </Link>
            <Text variant="caption" className="text-muted">
              {technology.tagline}
            </Text>
          </li>
        ))}
      </ul>
    </Container>
  );
}
