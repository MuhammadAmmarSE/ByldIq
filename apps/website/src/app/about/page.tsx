import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { siteConfig } from "@/config/site";
import {
  AboutFinalCta,
  AboutHero,
  AboutSidebar,
  AiPhilosophySection,
  ApproachTimeline,
  CultureSection,
  DesignEngineeringFlow,
  EcosystemSection,
  EngineeringStandards,
  HowWeWorkSection,
  PhilosophyPrinciples,
  TeamSection,
  TechnologyPhilosophyFlow,
  WhatsNextSection,
} from "@/features/about";
import { ScrollIndicator } from "@/features/homepage/arrival";
import { ScrollDepthTracker } from "@/features/homepage/shared";
import { breadcrumbJsonLd, jsonLdScriptProps, organizationJsonLd } from "@/lib/json-ld";

const description =
  "Byld IQ combines product thinking, design, engineering, and technology strategy to build " +
  "software that creates measurable business value. Here's who we are, how we think, and " +
  "what we believe.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Byld IQ",
    description,
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Byld IQ",
    description,
  },
};

/**
 * CLAUDE.md's Milestone 13 About / Company Experience: a single long page
 * (not a `/about/*` route family — CLAUDE.md's own instruction: "Don't
 * create separate routes unless they contain meaningful content," and
 * nothing here has enough independent depth yet to warrant one) built up
 * across several phases. Structurally mirrors the Case Studies/Solutions
 * detail template: full-width Hero, then a sidebar + content grid,
 * finishing with a full-width final CTA. See `docs/about.md` for the
 * complete section list and the scope decisions behind each one (Team,
 * Leadership, Growth/Evolution, and Careers are deliberately honest empty
 * or reduced-scope states — CLAUDE.md's own instruction: never fabricate
 * team members, milestones, or job openings).
 */
export default function AboutPage() {
  return (
    <Container size="content" className="space-y-16 py-16">
      <ScrollDepthTracker page="about" />
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: siteConfig.url },
            { name: "About", url: `${siteConfig.url}/about` },
          ]),
        )}
      />
      <script {...jsonLdScriptProps(organizationJsonLd())} />
      <ScrollIndicator className="fixed inset-x-0 bottom-6 z-10" />

      <AboutHero />

      <div className="lg:grid lg:grid-cols-[14rem_1fr] lg:gap-12">
        <AboutSidebar className="hidden lg:block" />
        <div className="max-w-3xl space-y-16">
          <PhilosophyPrinciples />
          <ApproachTimeline />
          <EngineeringStandards />
          <DesignEngineeringFlow />
          <TeamSection />
          <CultureSection />
          <HowWeWorkSection />
          <TechnologyPhilosophyFlow />
          <AiPhilosophySection />
          <WhatsNextSection />
          <EcosystemSection />
        </div>
      </div>

      <AboutFinalCta />
    </Container>
  );
}
