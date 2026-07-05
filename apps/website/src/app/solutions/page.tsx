import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { SOLUTIONS } from "@/features/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore how Byld IQ approaches product engineering across nine solution areas — from startup MVPs to enterprise modernization.",
};

/**
 * The Solutions landing page (CLAUDE.md Part 20). Routing/data-wiring
 * skeleton for now — the full adaptive hero and interactive selector land
 * in Milestone 4's next phase.
 */
export default function SolutionsPage() {
  return (
    <Container size="content" className="py-16">
      <div className="mx-auto max-w-2xl space-y-2 text-center">
        <Heading variant="display">
          Solutions engineered around your problem, not our services.
        </Heading>
        <Text variant="subtitle">
          Every solution starts with the business outcome you need, not the technology we&apos;d
          like to use.
        </Text>
      </div>

      <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
        {SOLUTIONS.map((solution) => (
          <li key={solution.slug}>
            <Link
              href={`/solutions/${solution.slug}`}
              className="border-border bg-surface hover:border-accent/50 block rounded-lg border p-4 transition-colors"
            >
              <Text variant="body" className="font-medium">
                {solution.navLabel}
              </Text>
              <Text variant="caption">{solution.heroHeadline}</Text>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
