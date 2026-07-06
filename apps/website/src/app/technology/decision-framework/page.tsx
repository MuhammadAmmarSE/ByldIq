import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import { DecisionWizard } from "@/features/technology";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/json-ld";

const description =
  "Answer two questions about what you're building and what matters most, and see real technology candidates with their own honest trade-offs — not a generated score.";

export const metadata: Metadata = {
  title: "Technology Decision Framework",
  description,
  alternates: { canonical: "/technology/decision-framework" },
  openGraph: {
    title: "Technology Decision Framework",
    description,
    url: "/technology/decision-framework",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Decision Framework",
    description,
  },
};

/**
 * CLAUDE.md Part 22's Decision Framework required route.
 */
export default function DecisionFrameworkPage() {
  return (
    <Container size="wide" className="space-y-8 py-16">
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "Technology", url: `${siteConfig.url}/technology` },
            {
              name: "Decision Framework",
              url: `${siteConfig.url}/technology/decision-framework`,
            },
          ]),
        )}
      />
      <DecisionWizard />
    </Container>
  );
}
