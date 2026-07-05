import { cookies } from "next/headers";

import { AdaptiveHero } from "@/features/homepage/adaptive-hero";
import { ArrivalExperience, INTRO_SEEN_COOKIE, ScrollIndicator } from "@/features/homepage/arrival";
import { BuildPathPreview } from "@/features/homepage/buildpath-preview";
import { ConversionExperience } from "@/features/homepage/conversion-experience";
import { EngineeringExcellenceEngine } from "@/features/homepage/engineering-excellence";
import { JourneySelector } from "@/features/homepage/journey-selection";
import { KnowledgeCenterPreview } from "@/features/homepage/knowledge-center-preview";
import { ProductShowcase } from "@/features/homepage/product-showcase";
import { ProductThinkingTimeline } from "@/features/homepage/product-thinking-timeline";
import { ProofEngine } from "@/features/homepage/proof-engine";
import { HomepageSection, ScrollDepthTracker } from "@/features/homepage/shared";

// Reading the intro-seen cookie makes this route request-dependent, which
// Next.js already infers from the `cookies()` call below — declared
// explicitly per CLAUDE.md Part 26: "Every route must explicitly choose
// [a rendering strategy]... no hidden defaults." The tradeoff (no static
// prerender for `/`) buys the zero-flash skip Part 9 requires for
// returning visitors ("Returning visitors: 0 seconds").
export const dynamic = "force-dynamic";

/**
 * The homepage — CLAUDE.md Part 9's eleven modules, in the order the spec
 * documents them. A Server Component (per Part 26: "Server Components
 * first") purely so it can read the intro-seen cookie for a zero-flash
 * skip on return visits; every module it composes is itself a client
 * component, since interaction is the point of each one.
 *
 * Module 8 (Byld AI Companion) isn't rendered here — it's a persistent
 * floating overlay mounted once in `AppProviders` and available on every
 * route, not a section of this page.
 */
export default async function HomePage() {
  const cookieStore = await cookies();
  const hasSeenIntro = cookieStore.get(INTRO_SEEN_COOKIE)?.value === "1";

  return (
    <>
      <ArrivalExperience initialHasSeenIntro={hasSeenIntro} />
      <ScrollDepthTracker page="home" />
      <ScrollIndicator className="fixed inset-x-0 bottom-6 z-10" />

      <HomepageSection id="journey-selection" containerSize="wide">
        <JourneySelector />
      </HomepageSection>

      <HomepageSection id="adaptive-hero" containerSize="wide">
        <AdaptiveHero />
      </HomepageSection>

      <HomepageSection id="product-thinking" containerSize="wide">
        <ProductThinkingTimeline />
      </HomepageSection>

      <HomepageSection id="proof-engine" containerSize="wide">
        <ProofEngine />
      </HomepageSection>

      <HomepageSection id="product-showcase" containerSize="wide">
        <ProductShowcase />
      </HomepageSection>

      <HomepageSection id="engineering-excellence" containerSize="wide">
        <EngineeringExcellenceEngine />
      </HomepageSection>

      <HomepageSection id="buildpath-preview">
        <BuildPathPreview />
      </HomepageSection>

      <HomepageSection id="knowledge-center" containerSize="wide">
        <KnowledgeCenterPreview />
      </HomepageSection>

      <HomepageSection id="conversion-experience">
        <ConversionExperience />
      </HomepageSection>
    </>
  );
}
