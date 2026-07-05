import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { CASE_STUDIES } from "@/features/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Engineering stories, not portfolios — how nine real business problems became working products, with the architecture, trade-offs, and results behind each one.",
};

/**
 * The Case Studies Platform landing page (CLAUDE.md Part 21) — routing
 * skeleton only. The real hero, search, and filtering land in the next
 * phase; for now this lists every case study so `/work/[slug]` has a real
 * entry point.
 */
export default function WorkPage() {
  return (
    <Container size="content" className="space-y-8 py-16">
      <Heading variant="display">Engineering Stories, Not Portfolios.</Heading>

      <ul className="grid gap-6 sm:grid-cols-2">
        {CASE_STUDIES.map((caseStudy) => (
          <li key={caseStudy.slug} className="border-border rounded-lg border p-6">
            <Link href={`/work/${caseStudy.slug}`} className="hover:text-accent">
              <Text variant="body" className="font-medium">
                {caseStudy.headline}
              </Text>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
