import type { JourneyContentMap } from "@/features/homepage/shared";

export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroMetric {
  label: string;
  value: number;
  suffix?: string;
}

export interface HeroContent {
  headline: string;
  supportingCopy: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  /** Qualitative capability signals, not fabricated statistics — see CLAUDE.md Part 13's "never invent numbers" rule, which this new site's homepage has no client history to substantiate yet. */
  trustIndicators: string[];
  technologies: string[];
  /** Illustrative sample data for the preview panel's mock dashboard — fictional, like the Product Showcase's company data (Part 14), not a claim about Byld IQ itself. */
  metric: HeroMetric;
}

/**
 * CLAUDE.md Part 11's five journey variants, copy taken verbatim from the
 * spec, plus a `default` for visitors who haven't chosen a journey yet.
 */
export const HERO_CONTENT: JourneyContentMap<HeroContent> = {
  default: {
    headline: "Engineer products that create measurable value.",
    supportingCopy:
      "We partner with ambitious teams to turn ideas into scalable, reliable digital products.",
    primaryCta: { label: "Explore Our Process", href: "#product-thinking" },
    secondaryCta: { label: "See Our Work", href: "#proof-engine" },
    trustIndicators: ["Product Strategy", "Engineering Excellence", "Long-Term Partnership"],
    technologies: ["Next.js", "TypeScript", "Cloud Infrastructure"],
    metric: { label: "Lighthouse score", value: 98 },
  },
  startup: {
    headline: "Build products investors believe in.",
    supportingCopy:
      "Transform your idea into a scalable digital product through product strategy, engineering and thoughtful execution.",
    primaryCta: { label: "Build My Product Roadmap", href: "#buildpath-preview" },
    secondaryCta: { label: "Explore Startup Projects", href: "#proof-engine" },
    trustIndicators: ["MVP Engineering", "Fundraising-Ready Architecture", "Growth Foundations"],
    technologies: ["Next.js", "Supabase", "Stripe"],
    metric: { label: "Monthly active users", value: 12400 },
  },
  enterprise: {
    headline: "Modernize systems built for tomorrow.",
    supportingCopy:
      "Engineer secure, maintainable enterprise platforms without compromising scalability or reliability.",
    primaryCta: { label: "Plan Enterprise Transformation", href: "#buildpath-preview" },
    secondaryCta: { label: "Explore Enterprise Systems", href: "#proof-engine" },
    trustIndicators: ["Legacy Modernization", "Security & Compliance", "Governed Architecture"],
    technologies: ["Kubernetes", "PostgreSQL", "AWS"],
    metric: { label: "Platform uptime", value: 99.98, suffix: "%" },
  },
  commerce: {
    headline: "Commerce engineered for sustainable growth.",
    supportingCopy:
      "Create high-performance Shopify experiences that increase conversions while simplifying operations.",
    primaryCta: { label: "Explore Commerce Solutions", href: "#buildpath-preview" },
    secondaryCta: { label: "View Revenue Stories", href: "#proof-engine" },
    trustIndicators: ["Shopify Plus", "Checkout Optimization", "Operational Automation"],
    technologies: ["Shopify", "Hydrogen", "Klaviyo"],
    metric: { label: "Checkout conversion", value: 4.8, suffix: "%" },
  },
  ai: {
    headline: "Intelligence designed into every workflow.",
    supportingCopy:
      "Design AI-powered products that create measurable business value rather than chasing trends.",
    primaryCta: { label: "Design My AI Product", href: "#buildpath-preview" },
    secondaryCta: { label: "Explore AI Architecture", href: "#proof-engine" },
    trustIndicators: ["Agent Architecture", "RAG Systems", "Responsible AI"],
    technologies: ["OpenAI", "LangChain", "pgvector"],
    metric: { label: "Automated workflows / day", value: 8200 },
  },
  platform: {
    headline: "Platforms engineered to scale with confidence.",
    supportingCopy:
      "Build developer platforms, internal systems and cloud-native products designed for long-term growth.",
    primaryCta: { label: "Plan Platform Architecture", href: "#buildpath-preview" },
    secondaryCta: { label: "Explore Platform Engineering", href: "#proof-engine" },
    trustIndicators: ["API Design", "Cloud-Native Infrastructure", "Developer Experience"],
    technologies: ["Node.js", "GraphQL", "Terraform"],
    metric: { label: "API requests / sec", value: 3400 },
  },
};
