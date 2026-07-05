import type { Journey } from "@/types/journey";

import type { Solution } from "./solution.schema";

/**
 * CLAUDE.md Part 20's nine solutions. Every page shares one template
 * (`SolutionPageTemplate`) driven entirely by this data — "all pages must
 * share the same architecture" is enforced structurally, not by
 * convention.
 *
 * `journey` maps each solution onto the closest of the five homepage
 * journeys (`@/types/journey`), since that's what drives AI Companion
 * context and BuildPath prefill (CLAUDE.md Part 20's "Journey" field in
 * BuildPath integration). Five solutions map 1:1 (startup, enterprise,
 * commerce, artificial-intelligence → ai, platform-engineering →
 * platform). The other four don't have a dedicated journey, so they use
 * the closest fit: cloud-infrastructure and platform-engineering are
 * both explicitly "developer platforms and cloud infrastructure" under
 * the platform journey; automation is explicitly listed as an "ai"
 * journey example; product-design and custom-engineering are judgment
 * calls (design work skews toward early-stage/startup engagements;
 * bespoke systems work skews toward enterprise-scale clients).
 *
 * `relatedCaseStudySlugs`/`relatedArticleSlugs` reference the Proof
 * Engine's and Knowledge Center's real (if fictional/local) content —
 * curated per solution rather than auto-matched by journey, since there
 * are only 5 case studies and 5 articles to work with and a naive journey
 * match would leave four solutions with nothing.
 */
export const SOLUTIONS: Solution[] = [
  {
    slug: "startup",
    journey: "startup",
    navLabel: "Startup",
    title: "Startup Product Engineering",
    heroHeadline: "Build products that investors and customers believe in.",
    heroSupportingCopy:
      "From validation to launch, we help startups reduce uncertainty and build scalable digital products.",
    primaryCtaLabel: "Plan My Product Roadmap",
    who: "Founders and early product teams turning an idea into something people will pay for.",
    typicalCompanies: [
      "Pre-seed and seed-stage startups",
      "Solo founders without a technical co-founder",
      "Small teams preparing to raise",
    ],
    exampleProducts: ["MVPs", "Investor demo products", "Waitlist-to-launch experiences"],
    businessProblem:
      "Most startups don't fail because they built the wrong technology. They fail because they built the wrong product, validated too late, or ran out of runway before finding product-market fit.",
    businessOutcomes: [
      "Faster time to a testable product",
      "Lower engineering risk in the first six months",
      "An architecture that doesn't need a rewrite after your first round of funding",
      "Evidence — not just a pitch deck — to support your next raise",
    ],
    engineeringPhilosophy:
      "We treat the first version of your product as a research tool, not a finished product. Architecture, scope, and technology choices all stay reversible until real usage data says otherwise — the goal is learning quickly and changing direction cheaply.",
    capabilities: [
      {
        id: "product-strategy",
        title: "Product Strategy & Validation",
        why: "Validating demand before writing code is cheaper than validating it after.",
        when: "Before any engineering work starts, or when an existing MVP hasn't found traction yet.",
        benefits: ["Reduces wasted engineering effort", "Sharpens the roadmap to what matters"],
        risks: ['Can feel slower than "just building it" in the first few weeks'],
        timeline: "1–3 weeks",
        relatedTechnologies: ["Figma", "Landing page tooling"],
      },
      {
        id: "mvp-engineering",
        title: "MVP Engineering",
        why: "A focused MVP gets real usage data faster than a feature-complete product.",
        when: "Once the core problem and target user are validated.",
        benefits: ["Ships in weeks, not months", "Instrumented from day one for real usage data"],
        risks: ["Scope discipline requires saying no to good ideas, not just bad ones"],
        timeline: "6–12 weeks",
        relatedTechnologies: ["Next.js", "Supabase", "Stripe"],
      },
      {
        id: "fundraising-architecture",
        title: "Fundraising-Ready Architecture",
        why: "Investors and technical due diligence both look for an architecture that can survive growth, not just a working demo.",
        when: "Ahead of a seed or Series A raise.",
        benefits: [
          "Passes technical due diligence without a rewrite",
          "Scales without re-architecting",
        ],
        risks: [
          "Over-engineering for scale you don't have yet is its own risk — this is scoped, not maximal",
        ],
        timeline: "Ongoing, alongside MVP engineering",
        relatedTechnologies: ["Vercel", "Postgres"],
      },
      {
        id: "growth-foundations",
        title: "Growth Foundations",
        why: "The systems that support 100 users rarely support 100,000 without deliberate groundwork.",
        when: "Once product-market fit signals are real.",
        benefits: [
          "Analytics and experimentation built in",
          "Onboarding that scales without more support headcount",
        ],
        risks: ["Premature scaling work is wasted effort if PMF isn't confirmed yet"],
        timeline: "4–8 weeks",
        relatedTechnologies: ["Analytics tooling", "Feature flags"],
      },
    ],
    architecture: [
      {
        id: "visitor",
        label: "Visitor",
        description: "Arrives via web or mobile browser — no native app required for most MVPs.",
      },
      {
        id: "web-app",
        label: "Web App (Next.js)",
        description:
          "Server-rendered for fast first load and SEO, with client interactivity where it matters.",
      },
      {
        id: "api",
        label: "API Layer",
        description:
          "A thin layer of server actions/routes — no separate backend service until traffic justifies one.",
      },
      {
        id: "database",
        label: "Database (Postgres)",
        description:
          "One relational database is almost always the right starting point; specialized stores come later, if ever.",
      },
      {
        id: "auth",
        label: "Authentication",
        description:
          "Handled by a managed provider rather than hand-rolled — session security shouldn't be a first-time implementation.",
      },
      {
        id: "payments",
        label: "Payments (Stripe)",
        description:
          "Subscription or one-time billing wired in from day one if the business model needs it.",
      },
      {
        id: "analytics",
        label: "Product Analytics",
        description:
          "Every core action is instrumented before launch, so the roadmap after launch is driven by data, not guesses.",
      },
    ],
    technologies: [
      {
        id: "nextjs",
        name: "Next.js",
        why: "One framework covers server rendering, API routes, and static content — fewer moving parts for a small team.",
        when: "The default choice for any startup web product unless there's a specific reason not to use it.",
        alternatives: ["Remix", "A plain SPA with a separate backend"],
        tradeoffs:
          "More opinionated than a bare React SPA, which is a feature for a small team without infrastructure specialists.",
        cost: "No licensing cost; hosting scales with usage on platforms like Vercel.",
        scalability:
          "Comfortably handles a startup's traffic through its first several growth stages without architectural changes.",
        teamRequirements: "One full-stack engineer can be productive immediately.",
      },
      {
        id: "supabase",
        name: "Supabase",
        why: "Postgres, auth, and storage in one managed service — removes weeks of infrastructure setup.",
        when: "When the team doesn't have (or doesn't want to dedicate) a backend infrastructure specialist yet.",
        alternatives: [
          "A self-managed Postgres instance",
          "Firebase (NoSQL, different trade-offs)",
        ],
        tradeoffs:
          "Less control than self-hosting Postgres directly; rarely matters before meaningful scale.",
        cost: "Free tier covers early development; usage-based pricing scales predictably after.",
        scalability:
          "Handles growth well past typical seed-stage traffic; migration paths exist if you outgrow it.",
        teamRequirements: "No dedicated database administrator needed early on.",
      },
      {
        id: "stripe",
        name: "Stripe",
        why: "The default for startup billing — well-documented, handles compliance burden most teams shouldn't build themselves.",
        when: "Any product with a payment or subscription component.",
        alternatives: [
          "Paddle (handles tax/compliance as merchant of record)",
          "A payment processor's own SDK",
        ],
        tradeoffs:
          "Standard transaction fees; Paddle can be cheaper for certain international tax situations.",
        cost: "Pay-per-transaction, no upfront cost.",
        scalability: "Scales from first dollar of revenue to significant volume without changes.",
        teamRequirements: "Minimal — well-documented SDKs and prebuilt checkout flows.",
      },
      {
        id: "vercel",
        name: "Vercel",
        why: "Zero-configuration deployment for Next.js, with preview environments for every pull request.",
        when: "Pairs naturally with a Next.js codebase.",
        alternatives: ["AWS/GCP directly", "Netlify"],
        tradeoffs: "Less granular infrastructure control than managing your own cloud account.",
        cost: "Free tier for early development; usage-based pricing after.",
        scalability:
          "Scales automatically; teams migrate to raw cloud infrastructure only once cost or control needs outgrow it.",
        teamRequirements: "No DevOps specialist required to ship.",
      },
    ],
    successMetrics: [
      { label: "Time to first testable version", value: "6–12 weeks" },
      { label: "Cost to reach product-market fit signal", value: "Reduced vs. full-scope build" },
      { label: "Architecture changes needed post-seed round", value: "Zero, by design" },
      { label: "Core actions instrumented at launch", value: "100%" },
    ],
    relatedCaseStudySlugs: ["fieldnote-mvp"],
    relatedArticleSlugs: ["validating-an-mvp"],
    faqs: [
      {
        question: "We don't have a technical co-founder. Can you still help?",
        answer:
          "Yes — this is one of the most common reasons startups come to us. We work directly with non-technical founders, translating business goals into engineering decisions rather than requiring you to already speak the language.",
      },
      {
        question: "How small can an MVP actually be?",
        answer:
          "As small as it takes to test your core assumption. We'd rather ship three workflows that answer a real question than ten that don't.",
      },
      {
        question: "What happens after the MVP validates?",
        answer:
          "We move into Growth Foundations — the same team, an architecture that already anticipated this stage, and no rewrite required.",
      },
    ],
  },
  {
    slug: "enterprise",
    journey: "enterprise",
    navLabel: "Enterprise",
    title: "Enterprise Modernization",
    heroHeadline: "Modernize what already works, without stopping the business to do it.",
    heroSupportingCopy:
      "We help enterprises replace legacy risk with secure, maintainable architecture — incrementally, not through a risky full rewrite.",
    primaryCtaLabel: "Plan Enterprise Transformation",
    who: "Engineering and product leaders modernizing systems that can't afford downtime.",
    typicalCompanies: [
      "Mid-size to large enterprises",
      "Regulated industries (finance, healthcare, logistics)",
      "Companies with decade-old core systems",
    ],
    exampleProducts: [
      "Legacy system replatforming",
      "Internal operations tools",
      "Compliance-driven system upgrades",
    ],
    businessProblem:
      "Legacy systems accumulate risk quietly: security gaps, single points of failure, and institutional knowledge that lives in one engineer's head. Replacing everything at once is usually more dangerous than the risk you're trying to fix.",
    businessOutcomes: [
      "Reduced security and compliance exposure",
      "Lower operational cost from retired legacy infrastructure",
      "Faster feature delivery once technical debt stops absorbing engineering capacity",
      "A migration with no unplanned downtime",
    ],
    engineeringPhilosophy:
      "We modernize incrementally — the strangler fig pattern, not a rewrite. New capability is built alongside the legacy system and traffic is migrated gradually, so the business keeps running throughout and rollback is always possible.",
    capabilities: [
      {
        id: "legacy-assessment",
        title: "Legacy System Assessment",
        why: "You can't safely modernize what you haven't accurately mapped — including the undocumented parts.",
        when: "Always the first step, before any migration work begins.",
        benefits: [
          "Surfaces hidden dependencies before they cause an outage",
          "Produces a realistic, sequenced migration plan",
        ],
        risks: ["Thorough assessment takes real calendar time before visible progress starts"],
        timeline: "2–4 weeks",
        relatedTechnologies: ["Dependency mapping tooling", "Static analysis"],
      },
      {
        id: "incremental-migration",
        title: "Incremental Migration",
        why: "Migrating service-by-service keeps the business operating and keeps rollback possible at every step.",
        when: "After assessment identifies a safe migration sequence.",
        benefits: ["No big-bang cutover risk", "Each migrated piece delivers value independently"],
        risks: ["Running two systems in parallel temporarily increases operational complexity"],
        timeline: "3–12 months, depending on scope",
        relatedTechnologies: ["API Gateway", "Message Queue"],
      },
      {
        id: "security-compliance",
        title: "Security & Compliance Hardening",
        why: "Legacy systems were often built before current compliance requirements existed.",
        when: "In parallel with migration, prioritized by risk.",
        benefits: ["Closes known vulnerabilities", "Produces audit-ready documentation"],
        risks: [
          "Some hardening work has no visible feature output, which can be a hard sell internally",
        ],
        timeline: "Ongoing",
        relatedTechnologies: ["Identity provider", "Secrets management"],
      },
      {
        id: "observability",
        title: "Observability & Monitoring",
        why: "You can't safely operate — or confidently modernize — a system you can't see into.",
        when: "Established early, before major migration work, so regressions are caught immediately.",
        benefits: [
          "Faster incident response",
          "Data-driven prioritization of what to modernize next",
        ],
        risks: ["Requires initial investment before any incident actually happens"],
        timeline: "2–3 weeks to establish baseline coverage",
        relatedTechnologies: ["Datadog", "Distributed tracing"],
      },
    ],
    architecture: [
      {
        id: "client",
        label: "Employee / Customer",
        description:
          "Internal staff and external customers, often served by the same underlying systems.",
      },
      {
        id: "api-gateway",
        label: "API Gateway",
        description:
          "A single, monitored entry point that lets legacy and modernized services sit behind one interface during migration.",
      },
      {
        id: "modern-service",
        label: "Modernized Service",
        description:
          "New functionality built independently and deployed alongside the legacy system, not inside it.",
      },
      {
        id: "legacy-system",
        label: "Legacy System (bridged)",
        description:
          "Kept running and gradually reduced in scope, rather than replaced all at once.",
      },
      {
        id: "message-queue",
        label: "Message Queue",
        description:
          "Decouples services so one system's slowdown doesn't cascade into an outage elsewhere.",
      },
      {
        id: "data-warehouse",
        label: "Data Warehouse",
        description:
          "Consolidates reporting that used to require direct, risky queries against production legacy databases.",
      },
      {
        id: "observability",
        label: "Observability",
        description:
          "Full-stack monitoring across both legacy and modernized components throughout the migration.",
      },
    ],
    technologies: [
      {
        id: "postgresql",
        name: "PostgreSQL",
        why: "Mature, well-understood, and handles both transactional and analytical workloads without a specialized database for every use case.",
        when: "The default relational store for modernized services.",
        alternatives: [
          "A managed cloud-native database (e.g. Aurora)",
          "Keeping the existing database engine if migration cost outweighs the benefit",
        ],
        tradeoffs:
          "Requires more operational ownership than a fully managed proprietary database, in exchange for no vendor lock-in.",
        cost: "Open source; cost is primarily hosting and operations.",
        scalability:
          "Scales to enterprise transaction volumes with proper indexing and read replicas.",
        teamRequirements:
          "Benefits from at least one engineer with database operations experience.",
      },
      {
        id: "kubernetes",
        name: "Kubernetes",
        why: "Lets modernized services and legacy bridges run side by side with consistent deployment, scaling, and rollback.",
        when: "Once the number of independently deployable services justifies orchestration.",
        alternatives: [
          "A simpler managed container platform (e.g. ECS)",
          "Serverless functions for lighter-weight services",
        ],
        tradeoffs: "Meaningful operational complexity — not worth adopting for a single service.",
        cost: "Infrastructure cost plus the operational overhead of running a cluster.",
        scalability: "Built for enterprise scale from the start.",
        teamRequirements: "Needs a platform/DevOps function, in-house or via us.",
      },
      {
        id: "message-queue-tech",
        name: "Message Queue (Kafka / RabbitMQ)",
        why: "Decouples the legacy system from new services during migration, so failures don't cascade.",
        when: "As soon as more than one service needs to react to the same event.",
        alternatives: [
          "Direct synchronous API calls (simpler, but tightly coupled)",
          "A managed cloud event bus",
        ],
        tradeoffs:
          "Adds infrastructure and a new failure mode (queue backlog) in exchange for resilience.",
        cost: "Self-hosted (ops cost) or managed (usage-based pricing).",
        scalability: "Handles enterprise event volumes well beyond typical migration needs.",
        teamRequirements: "Needs familiarity with asynchronous system design.",
      },
      {
        id: "datadog",
        name: "Datadog (or equivalent observability platform)",
        why: "Unified visibility across legacy and modernized systems during a migration where things can break in either one.",
        when: "Established before migration work begins, not after the first incident.",
        alternatives: [
          "Open-source stack (Prometheus + Grafana)",
          "Cloud-provider-native monitoring",
        ],
        tradeoffs:
          "Managed platforms cost more but need less operational investment than self-hosting.",
        cost: "Usage-based, scales with infrastructure footprint.",
        scalability: "Built for enterprise-scale systems.",
        teamRequirements: "Minimal setup burden; meaningful value from day one.",
      },
    ],
    successMetrics: [
      { label: "Unplanned downtime during migration", value: "Zero" },
      { label: "Security findings closed", value: "Tracked to zero critical/high" },
      { label: "Legacy infrastructure cost reduction", value: "Measured post-migration" },
      { label: "Mean time to detect an incident", value: "Reduced via observability" },
    ],
    relatedCaseStudySlugs: ["atlas-logistics-modernization"],
    relatedArticleSlugs: ["monolith-vs-microservices"],
    faqs: [
      {
        question: "Do we have to freeze feature development during modernization?",
        answer:
          "No. The incremental approach exists specifically so your team can keep shipping features on the legacy system while we migrate pieces of it in parallel.",
      },
      {
        question: "What if the legacy system has no documentation?",
        answer:
          "That's the norm, not the exception. Legacy System Assessment is built around reverse-engineering behavior from the running system and its data, not relying on documentation that doesn't exist.",
      },
      {
        question: "Can you work alongside our existing engineering team?",
        answer:
          "Yes — most enterprise engagements are staffed alongside an internal team, not as a replacement for one.",
      },
    ],
  },
  {
    slug: "commerce",
    journey: "commerce",
    navLabel: "Commerce",
    title: "Commerce Engineering",
    heroHeadline: "Commerce engineered for sustainable growth.",
    heroSupportingCopy:
      "Create high-performance Shopify experiences that increase conversions while simplifying operations.",
    primaryCtaLabel: "Explore Commerce Solutions",
    who: "Commerce teams whose growth is being limited by checkout performance or operational overhead.",
    typicalCompanies: [
      "High-growth D2C retailers",
      "Multi-brand commerce operators",
      "Wholesale/B2B commerce businesses",
    ],
    exampleProducts: ["Headless storefronts", "Checkout optimization", "Custom commerce apps"],
    businessProblem:
      "Commerce platforms are judged on conversion rate and reliability during peak traffic — but most stores accumulate app sprawl and technical debt that quietly erodes both over time.",
    businessOutcomes: [
      "Higher checkout conversion rate",
      "Faster storefront load times, especially on mobile",
      "Lower operational overhead from consolidated tooling",
      "Reliable performance during peak sales events",
    ],
    engineeringPhilosophy:
      "We engineer commerce platforms that balance performance, conversion optimization, maintainability, and operational efficiency.",
    capabilities: [
      {
        id: "headless-storefront",
        title: "Headless Storefront Engineering",
        why: "A headless frontend decouples storefront performance and design flexibility from backend commerce logic.",
        when: "When storefront customization needs are outgrowing theme-based limitations.",
        benefits: ["Faster page loads", "Full design control without fighting a theme framework"],
        risks: ["Higher upfront engineering investment than a themed storefront"],
        timeline: "8–14 weeks",
        relatedTechnologies: ["Hydrogen", "Shopify Storefront API"],
      },
      {
        id: "checkout-optimization",
        title: "Checkout Optimization",
        why: "Checkout is the single highest-leverage page for conversion rate on any commerce site.",
        when: "When checkout abandonment is a known problem, or as a standard part of any commerce build.",
        benefits: ["Directly increases revenue per visitor", "Reduces cart abandonment"],
        risks: [
          "Shopify Plus's checkout customization has real platform limits — some ideas aren't possible on Shopify",
        ],
        timeline: "3–6 weeks",
        relatedTechnologies: ["Shopify Plus Checkout Extensibility"],
      },
      {
        id: "app-consolidation",
        title: "App & Operations Consolidation",
        why: "Every additional third-party app is another dependency, performance cost, and monthly bill.",
        when: "When a store has accumulated more apps than it actively needs.",
        benefits: ["Improves page speed", "Reduces recurring app spend"],
        risks: [
          "Consolidation sometimes means custom-building functionality an app previously provided",
        ],
        timeline: "3–5 weeks",
        relatedTechnologies: ["Shopify Admin API", "Custom apps"],
      },
      {
        id: "peak-readiness",
        title: "Peak Traffic Readiness",
        why: "A sale event that crashes your storefront costs more in lost revenue and trust than the engineering investment to prevent it.",
        when: "Ahead of known high-traffic events (product launches, seasonal sales).",
        benefits: [
          "Confidence during your highest-revenue days",
          "Identifies bottlenecks before customers do",
        ],
        risks: ["Load testing takes real lead time — it can't be done the week of the event"],
        timeline: "2–4 weeks ahead of the event",
        relatedTechnologies: ["Cloudflare", "Load testing tooling"],
      },
    ],
    architecture: [
      {
        id: "shopper",
        label: "Shopper",
        description:
          "Arrives via web, mobile, or a marketing channel — expects sub-second page loads.",
      },
      {
        id: "storefront",
        label: "Storefront (Hydrogen)",
        description: "A custom-built, high-performance frontend, not a constrained theme.",
      },
      {
        id: "shopify-platform",
        label: "Shopify Platform",
        description:
          "Handles catalog, checkout, and order management — the parts Shopify already does well.",
      },
      {
        id: "custom-backend",
        label: "Custom App / Backend",
        description: "Business logic that doesn't fit a Shopify app, connected via Shopify's APIs.",
      },
      {
        id: "payments",
        label: "Payment Gateway",
        description:
          "Shopify Payments or a supported alternative, depending on region and business needs.",
      },
      {
        id: "inventory",
        label: "Inventory System",
        description: "Kept as the single source of truth to prevent overselling across channels.",
      },
      {
        id: "analytics",
        label: "Analytics",
        description:
          "Conversion and funnel tracking wired into every step, not just top-of-funnel traffic.",
      },
    ],
    technologies: [
      {
        id: "shopify-plus",
        name: "Shopify Plus",
        why: "Checkout reliability and speed to market matter more than pixel-level storefront customization for most high-growth commerce businesses.",
        when: "The default for commerce builds unless a specific requirement rules it out.",
        alternatives: ["A fully custom commerce stack", "BigCommerce or another SaaS platform"],
        tradeoffs:
          "Less checkout customization than a fully custom stack, in exchange for reliability and lower maintenance burden.",
        cost: "Platform subscription plus transaction fees; predictable at scale.",
        scalability: "Built to handle major sale-event traffic out of the box.",
        teamRequirements: "A commerce-focused engineer familiar with Shopify's ecosystem.",
      },
      {
        id: "hydrogen",
        name: "Hydrogen / Remix",
        why: "Shopify's own React framework for headless storefronts, purpose-built for commerce performance.",
        when: "When theme-based customization is no longer sufficient.",
        alternatives: [
          "Next.js with Shopify's Storefront API",
          "A themed Shopify storefront (Liquid)",
        ],
        tradeoffs: "Requires frontend engineering investment a themed store doesn't need.",
        cost: "No licensing cost beyond hosting.",
        scalability: "Designed for high-traffic commerce from the start.",
        teamRequirements: "A frontend engineer comfortable with React and commerce APIs.",
      },
      {
        id: "cloudflare",
        name: "Cloudflare",
        why: "CDN and edge caching are the difference between a fast and slow storefront under real traffic.",
        when: "Standard for any commerce build serving a geographically distributed audience.",
        alternatives: ["A cloud provider's native CDN"],
        tradeoffs: "Minimal — broadly the right default for commerce traffic patterns.",
        cost: "Usage-based, low relative to the performance benefit.",
        scalability: "Built for traffic spikes by design.",
        teamRequirements: "Minimal configuration burden.",
      },
      {
        id: "klaviyo",
        name: "Klaviyo",
        why: "Email/SMS marketing automation that integrates natively with Shopify's customer and order data.",
        when: "When marketing automation and segmentation are a growth priority.",
        alternatives: ["A general-purpose marketing platform with a Shopify connector"],
        tradeoffs:
          "Commerce-specific rather than general-purpose — a good trade for most Shopify stores.",
        cost: "Usage-based on contact list size.",
        scalability: "Scales with subscriber count.",
        teamRequirements: "Marketing-owned, minimal engineering involvement after setup.",
      },
    ],
    successMetrics: [
      { label: "Checkout conversion rate", value: "Improved vs. baseline" },
      { label: "Mobile page load time", value: "Sub-2-second target" },
      { label: "Uptime during peak events", value: "99.9%+" },
      { label: "Monthly app/tooling spend", value: "Reduced via consolidation" },
    ],
    relatedCaseStudySlugs: ["nova-commerce-checkout"],
    relatedArticleSlugs: ["why-shopify-plus-for-high-growth-commerce"],
    faqs: [
      {
        question: "Do we need to move off Shopify to get a custom storefront?",
        answer:
          "No — Hydrogen lets us build a fully custom frontend while Shopify continues to handle checkout, payments, and order management behind it.",
      },
      {
        question: "Can you work with our existing app stack?",
        answer:
          "Yes, though part of our first conversation is usually identifying which apps are earning their keep and which are adding cost and page weight without a clear return.",
      },
      {
        question: "How do you prepare for a specific sale event?",
        answer:
          "Peak Traffic Readiness includes load testing against realistic traffic patterns weeks in advance, so any bottleneck is found and fixed before it's customer-facing.",
      },
    ],
  },
  {
    slug: "artificial-intelligence",
    journey: "ai",
    navLabel: "Artificial Intelligence",
    title: "Artificial Intelligence",
    heroHeadline: "Intelligence designed into every workflow.",
    heroSupportingCopy:
      "Design AI-powered products that create measurable business value rather than chasing trends.",
    primaryCtaLabel: "Design My AI Product",
    who: "Product and engineering teams evaluating where AI genuinely improves their product, not just where it can be added.",
    typicalCompanies: [
      "SaaS products adding AI-assisted features",
      "Support/operations teams drowning in repetitive requests",
      "Teams with a large body of unstructured internal data",
    ],
    exampleProducts: [
      "AI support assistants",
      "Internal knowledge search",
      "Document processing pipelines",
    ],
    businessProblem:
      "Most AI features are added because AI is available, not because they solve a specific problem — which produces expensive novelty rather than business value.",
    businessOutcomes: [
      "AI features tied to a measurable business outcome, not a demo",
      "Lower cost per AI-assisted interaction through the right architecture choice",
      "A system that stays accurate as your underlying data changes",
      "Clear guardrails against the failure modes generative AI actually has",
    ],
    engineeringPhilosophy:
      "Every AI feature has to answer 'what problem does this solve?' before it answers 'which model should we use?' We default to the simplest architecture that solves the problem — often retrieval over your own data, not a fine-tuned model — and treat evaluation as part of the build, not an afterthought.",
    capabilities: [
      {
        id: "ai-opportunity-assessment",
        title: "AI Opportunity Assessment",
        why: "Identifying where AI creates real leverage — and where it doesn't — before committing engineering time.",
        when: "Before any AI feature is scoped.",
        benefits: [
          "Avoids building AI features nobody needed",
          "Prioritizes the highest-leverage opportunity first",
        ],
        risks: ["Can surface that AI isn't the right answer to the problem you brought us"],
        timeline: "1–2 weeks",
        relatedTechnologies: ["None — this is a strategy engagement"],
      },
      {
        id: "rag-implementation",
        title: "Retrieval-Augmented Generation",
        why: "Lets an AI system answer accurately from your own data without the cost and staleness of fine-tuning.",
        when: "When the product needs to reason over your specific knowledge base, documents, or data.",
        benefits: [
          "Answers stay current as your data changes",
          "Cheaper and faster to iterate on than fine-tuning",
        ],
        risks: [
          "Retrieval quality directly limits answer quality — this requires real engineering, not just an API call",
        ],
        timeline: "4–8 weeks",
        relatedTechnologies: ["Vector database", "Embedding models"],
      },
      {
        id: "agent-workflows",
        title: "Agent & Automation Workflows",
        why: "Some tasks benefit from an AI system that can take multi-step action, not just answer a question.",
        when: "When a workflow involves several dependent steps a human currently does manually.",
        benefits: [
          "Automates genuinely repetitive multi-step work",
          "Frees people for judgment-based work",
        ],
        risks: [
          "Autonomous action requires careful guardrails — this is the highest-risk AI pattern if done carelessly",
        ],
        timeline: "6–10 weeks",
        relatedTechnologies: ["Orchestration framework", "Tool-calling APIs"],
      },
      {
        id: "evaluation-guardrails",
        title: "Evaluation & Guardrails",
        why: "An AI feature without evaluation is a feature you can't tell is degrading until a customer complains.",
        when: "Built alongside every AI feature, not added after launch.",
        benefits: [
          "Catches regressions before customers do",
          "Provides evidence for AI feature quality, not just vibes",
        ],
        risks: ["Requires ongoing investment as the product and underlying models evolve"],
        timeline: "Ongoing",
        relatedTechnologies: ["Evaluation frameworks", "Human review tooling"],
      },
    ],
    architecture: [
      {
        id: "user",
        label: "User",
        description:
          "Interacts via a chat interface, a feature embedded in your product, or an automated trigger.",
      },
      {
        id: "app-interface",
        label: "App Interface",
        description:
          "Your product's existing frontend — the AI feature is embedded, not a separate experience.",
      },
      {
        id: "orchestration",
        label: "Orchestration Layer",
        description:
          "Routes requests, calls tools, and manages conversation state — kept model-agnostic so providers can change.",
      },
      {
        id: "model-provider",
        label: "LLM Provider",
        description:
          "OpenAI, Anthropic, or another provider, abstracted so switching doesn't require rearchitecting.",
      },
      {
        id: "knowledge-base",
        label: "Knowledge Base (Vector DB)",
        description:
          "Your own data, embedded and searchable — the source of truth the model retrieves from.",
      },
      {
        id: "guardrails",
        label: "Guardrails & Validation",
        description:
          "Checks output before it reaches a user or takes an action, catching hallucination and unsafe responses.",
      },
      {
        id: "analytics",
        label: "Analytics & Evaluation",
        description: "Tracks accuracy, cost, and user satisfaction per interaction.",
      },
    ],
    technologies: [
      {
        id: "model-abstraction",
        name: "Model-agnostic provider layer (OpenAI / Anthropic)",
        why: "Model quality and pricing shift quickly — coupling your product to one provider's SDK creates unnecessary lock-in.",
        when: "From the start of any AI feature, regardless of which provider you begin with.",
        alternatives: [
          "Directly integrating a single provider's SDK (faster to start, costlier to change later)",
        ],
        tradeoffs: "A small abstraction cost upfront in exchange for provider flexibility later.",
        cost: "Usage-based, billed per token by whichever provider is active.",
        scalability: "Scales with usage; cost is the main constraint to monitor, not throughput.",
        teamRequirements:
          "An engineer comfortable with LLM APIs; no ML research background required for most product use cases.",
      },
      {
        id: "vector-database",
        name: "Vector Database (pgvector or a dedicated vector store)",
        why: "Enables retrieval-augmented generation — the model answers from your actual data, not just its training data.",
        when: "Any feature where the product needs to reason over your specific content.",
        alternatives: [
          "A dedicated vector database (Pinecone, Weaviate) for very large-scale retrieval needs",
        ],
        tradeoffs:
          "pgvector keeps data in your existing Postgres instance; a dedicated store scales further but adds infrastructure.",
        cost: "pgvector: no additional infrastructure cost. Dedicated stores: usage-based.",
        scalability:
          "pgvector comfortably handles most product-scale knowledge bases; dedicated stores handle enterprise scale.",
        teamRequirements:
          "Standard backend engineering skills; no specialized ML infrastructure team needed.",
      },
      {
        id: "orchestration-framework",
        name: "Orchestration framework (e.g. LangChain, or a lighter custom layer)",
        why: "Manages multi-step reasoning, tool calls, and conversation state consistently.",
        when: "When a feature needs more than a single request/response call to a model.",
        alternatives: [
          "A custom-built orchestration layer (more control, more initial engineering time)",
        ],
        tradeoffs:
          "Frameworks accelerate common patterns but can add complexity for genuinely simple use cases — we default to a custom layer when the use case is simple.",
        cost: "Open source; engineering time is the real cost.",
        scalability: "Scales with the application, not the framework itself.",
        teamRequirements: "Standard software engineering skills.",
      },
      {
        id: "evaluation-tooling",
        name: "Evaluation tooling",
        why: "Turns 'does the AI feature still work well?' from a subjective question into a measured one.",
        when: "Built alongside the feature, before launch.",
        alternatives: ["Manual spot-checking (doesn't scale, misses regressions)"],
        tradeoffs: "Requires upfront investment in building a representative test set.",
        cost: "Primarily engineering time; some tools have usage-based pricing.",
        scalability: "Test suites grow with the product's feature surface.",
        teamRequirements:
          "Benefits from product input on what 'good' looks like, not just engineering.",
      },
    ],
    successMetrics: [
      { label: "Answer accuracy against evaluation set", value: "Tracked continuously" },
      { label: "Cost per AI-assisted interaction", value: "Optimized via architecture choice" },
      { label: "Time to update knowledge base", value: "Minutes, not a retraining cycle" },
      { label: "Flagged unsafe/incorrect responses", value: "Caught pre-release by guardrails" },
    ],
    relatedCaseStudySlugs: ["northwind-ai-support-assistant"],
    relatedArticleSlugs: ["rag-vs-fine-tuning"],
    faqs: [
      {
        question: "Should we fine-tune a model or use retrieval (RAG)?",
        answer:
          "For most product use cases, retrieval is the better starting point — it's faster to iterate on and keeps answers current as your data changes. Fine-tuning fits a narrower set of cases, like enforcing a very specific style or task. We'll tell you honestly which one fits.",
      },
      {
        question: "How do you prevent the AI from giving wrong answers confidently?",
        answer:
          "Guardrails and evaluation are built alongside the feature, not bolted on after. That includes retrieval grounding, output validation, and a real test set we measure against before and after every change.",
      },
      {
        question: "Do we need our own data science team?",
        answer:
          "Usually not, for product-focused AI features. Most of the work is software engineering — retrieval systems, orchestration, evaluation — not ML research.",
      },
    ],
  },
  {
    slug: "platform-engineering",
    journey: "platform",
    navLabel: "Platform Engineering",
    title: "Platform Engineering",
    heroHeadline: "Platforms engineered to scale with confidence.",
    heroSupportingCopy:
      "Build developer platforms, internal systems and cloud-native products designed for long-term growth.",
    primaryCtaLabel: "Plan Platform Architecture",
    who: "Engineering leaders building internal platforms, developer tools, or APIs that other teams depend on.",
    typicalCompanies: [
      "Scale-ups with multiple product engineering teams",
      "Companies building a public developer API",
      "Organizations standardizing deployment across teams",
    ],
    exampleProducts: [
      "Internal developer platforms",
      "Public/partner APIs",
      "Developer dashboards and tooling",
    ],
    businessProblem:
      "As a company grows, every team building its own infrastructure patterns creates duplicated effort and inconsistent reliability. A platform exists to fix that — but a badly built one becomes its own bottleneck.",
    businessOutcomes: [
      "Faster feature delivery for every team that depends on the platform",
      "Consistent reliability and security across services",
      "Reduced duplicated infrastructure work across teams",
      "A developer experience good enough that teams adopt it voluntarily",
    ],
    engineeringPhilosophy:
      "A platform succeeds when teams want to use it, not when they're required to. We prioritize developer experience — clear APIs, good documentation, fast feedback loops — as a first-class engineering concern, not an afterthought to the infrastructure itself.",
    capabilities: [
      {
        id: "api-design",
        title: "API & SDK Design",
        why: "A platform's API is its product — internal teams are its customers.",
        when: "Foundational, before any service implementation begins.",
        benefits: [
          "Clear contracts reduce integration friction",
          "Versioning strategy prevents breaking downstream teams",
        ],
        risks: ["API design mistakes are expensive to fix once teams depend on them"],
        timeline: "3–5 weeks",
        relatedTechnologies: ["OpenAPI", "GraphQL"],
      },
      {
        id: "internal-developer-platform",
        title: "Internal Developer Platform",
        why: "Removes repeated infrastructure setup so product teams focus on product work.",
        when: "When multiple teams are independently solving the same infrastructure problems.",
        benefits: [
          "Consistent deployment and observability across teams",
          "Faster onboarding for new engineers",
        ],
        risks: ["Needs a dedicated platform team to maintain it long-term, not just build it once"],
        timeline: "8–16 weeks for a first version",
        relatedTechnologies: ["Kubernetes", "Backstage or similar catalog tooling"],
      },
      {
        id: "cicd-pipelines",
        title: "CI/CD Pipeline Engineering",
        why: "Fast, reliable pipelines are the difference between shipping daily and shipping monthly.",
        when: "Early — pipeline friction compounds the longer it's left unaddressed.",
        benefits: [
          "Shorter feedback loops for every engineer",
          "Consistent quality gates across teams",
        ],
        risks: ["Over-engineering pipeline flexibility before there's a real second use case"],
        timeline: "2–4 weeks",
        relatedTechnologies: ["GitHub Actions", "Automated testing"],
      },
      {
        id: "platform-observability",
        title: "Platform Observability",
        why: "A platform that other teams depend on needs to be debuggable when something breaks — for the platform team and its users.",
        when: "Built in from the platform's first version.",
        benefits: [
          "Faster incident resolution",
          "Clear ownership when something fails across service boundaries",
        ],
        risks: ["Cross-service tracing has real setup cost that's easy to defer indefinitely"],
        timeline: "3–4 weeks",
        relatedTechnologies: ["Grafana", "Distributed tracing"],
      },
    ],
    architecture: [
      {
        id: "developer",
        label: "Developer",
        description:
          "The platform's actual customer — every design decision is evaluated against their experience.",
      },
      {
        id: "api-sdk",
        label: "API / SDK",
        description:
          "The primary interface teams interact with; versioned deliberately to avoid breaking changes.",
      },
      {
        id: "internal-platform",
        label: "Internal Platform",
        description:
          "Shared services (deployment, secrets, observability) so no team rebuilds them independently.",
      },
      {
        id: "service-mesh",
        label: "Service Mesh",
        description:
          "Handles service-to-service communication, retries, and security consistently across every team's services.",
      },
      {
        id: "cloud-infra",
        label: "Cloud Infrastructure",
        description: "The underlying compute, storage, and networking the platform is built on.",
      },
      {
        id: "cicd",
        label: "CI/CD Pipeline",
        description:
          "Consistent build, test, and deploy process available to every team using the platform.",
      },
      {
        id: "monitoring",
        label: "Monitoring",
        description: "Unified visibility across every service running on the platform.",
      },
    ],
    technologies: [
      {
        id: "kubernetes-platform",
        name: "Kubernetes",
        why: "The standard foundation for a multi-team internal platform — consistent deployment and scaling primitives for every service.",
        when: "Once more than a couple of teams need a shared deployment target.",
        alternatives: [
          "A managed container platform (simpler, less flexible)",
          "Serverless-first (works for some, not all, platform workloads)",
        ],
        tradeoffs:
          "Real operational complexity — needs a dedicated platform team, not a side responsibility.",
        cost: "Infrastructure plus the ongoing cost of a platform team.",
        scalability: "Built for this exact use case at scale.",
        teamRequirements: "A dedicated platform/infrastructure function.",
      },
      {
        id: "terraform",
        name: "Terraform",
        why: "Infrastructure as code makes the platform's infrastructure reviewable, versioned, and reproducible.",
        when: "From the platform's first environment — retrofitting infrastructure-as-code later is much harder.",
        alternatives: ["Cloud-provider-native IaC tools (Pulumi, CloudFormation)"],
        tradeoffs: "Learning curve for teams unfamiliar with declarative infrastructure.",
        cost: "Open source; state management may have a small hosting cost.",
        scalability: "Scales to very large infrastructure footprints with proper module structure.",
        teamRequirements: "At least one engineer with infrastructure-as-code experience.",
      },
      {
        id: "github-actions",
        name: "GitHub Actions",
        why: "Integrates directly with the source repository, minimizing pipeline configuration overhead across teams.",
        when: "The default CI/CD choice if the platform's code already lives on GitHub.",
        alternatives: ["A dedicated CI/CD platform (Jenkins, CircleCI, GitLab CI)"],
        tradeoffs: "Less mature than some dedicated CI platforms for very complex pipeline needs.",
        cost: "Usage-based, generous free tier for most team sizes.",
        scalability: "Scales well; very high-volume orgs sometimes need self-hosted runners.",
        teamRequirements: "Minimal — most engineers already know the syntax from open source.",
      },
      {
        id: "grafana-prometheus",
        name: "Grafana / Prometheus",
        why: "Open, widely adopted observability stack that avoids per-service vendor lock-in.",
        when: "Established alongside the platform's first services, not after an incident.",
        alternatives: ["A managed observability platform (Datadog) for less operational overhead"],
        tradeoffs:
          "Self-hosting requires more operational investment than a managed platform, in exchange for cost control at scale.",
        cost: "Open source; hosting and storage costs scale with metric volume.",
        scalability: "Proven at very large scale across the industry.",
        teamRequirements:
          "Benefits from platform team ownership of the observability stack itself.",
      },
    ],
    successMetrics: [
      { label: "Time for a new team to onboard onto the platform", value: "Days, not weeks" },
      { label: "Deployment frequency across platform teams", value: "Increased" },
      { label: "Cross-team infrastructure duplication", value: "Reduced" },
      { label: "Platform incident mean time to resolution", value: "Reduced via observability" },
    ],
    relatedCaseStudySlugs: ["harborline-developer-platform"],
    relatedArticleSlugs: ["monolith-vs-microservices"],
    faqs: [
      {
        question: "How do you get internal teams to actually adopt the platform?",
        answer:
          "By treating developer experience as a real requirement, not a nice-to-have — clear documentation, fast feedback loops, and an API that's easier to use than the alternative of building it themselves.",
      },
      {
        question: "Do we need a dedicated platform team to maintain this?",
        answer:
          "Yes, long-term — a platform without an owner degrades quickly. We help you build the first version and can help staff or train the team that runs it going forward.",
      },
      {
        question: "How is this different from Cloud & Infrastructure?",
        answer:
          "Platform Engineering focuses on the developer-facing layer — APIs, SDKs, deployment experience. Cloud & Infrastructure focuses on what's underneath it. Most engagements touch both.",
      },
    ],
  },
  {
    slug: "cloud-infrastructure",
    journey: "platform",
    navLabel: "Cloud & Infrastructure",
    title: "Cloud & Infrastructure",
    heroHeadline: "Infrastructure that scales before you need it to.",
    heroSupportingCopy:
      "Cloud architecture, sized and secured for where your product is going, not just where it is today.",
    primaryCtaLabel: "Plan My Cloud Architecture",
    who: "Teams whose infrastructure costs, reliability, or scalability have become a genuine business constraint.",
    typicalCompanies: [
      "Growth-stage companies outgrowing early infrastructure choices",
      "Teams facing unpredictable cloud costs",
      "Businesses preparing for a known high-traffic event",
    ],
    exampleProducts: [
      "Cloud architecture redesigns",
      "Cost optimization audits",
      "Load and reliability testing",
    ],
    businessProblem:
      "Infrastructure decisions made for an early-stage product often don't hold up under real growth — and by the time it's a visible problem, it's usually an expensive one to fix under pressure.",
    businessOutcomes: [
      "Predictable infrastructure cost as usage grows",
      "Reliability that holds during traffic spikes, not just average load",
      "Reduced operational burden on the engineering team",
      "A security posture that meets real compliance requirements",
    ],
    engineeringPhilosophy:
      "We size infrastructure for the traffic you actually have plus a reasonable growth buffer — not for hypothetical future scale. Over-provisioning wastes money quietly; under-provisioning fails loudly. Both are avoidable with the right sizing discipline.",
    capabilities: [
      {
        id: "cloud-architecture-design",
        title: "Cloud Architecture Design",
        why: "The right architecture depends on your actual traffic patterns, not a generic best-practices template.",
        when: "Before infrastructure is provisioned, or when re-architecting an existing setup.",
        benefits: [
          "Right-sized for real usage patterns",
          "Avoids both over- and under-provisioning",
        ],
        risks: [
          "Architecture decisions made too early, before traffic patterns are known, may need revisiting",
        ],
        timeline: "2–4 weeks",
        relatedTechnologies: ["Terraform", "Cloud provider of choice"],
      },
      {
        id: "cost-optimization",
        title: "Cost Optimization",
        why: "Cloud spend grows quietly through unused resources and unnecessary redundancy.",
        when: "When infrastructure cost is growing faster than usage justifies.",
        benefits: [
          "Directly reduces monthly cloud spend",
          "Identifies waste without sacrificing reliability",
        ],
        risks: ["Cutting cost without care can remove capacity you actually need during peak load"],
        timeline: "2–3 weeks",
        relatedTechnologies: ["Cloud cost monitoring tooling"],
      },
      {
        id: "reliability-engineering",
        title: "Reliability Engineering",
        why: "Uptime during normal traffic tells you little about what happens under real load or partial failure.",
        when: "Ahead of known high-traffic periods, or after a reliability incident.",
        benefits: [
          "Reduces customer-facing outages",
          "Builds confidence for high-stakes traffic events",
        ],
        risks: [
          "Chaos/load testing requires careful scoping to avoid causing the outage it's meant to prevent",
        ],
        timeline: "3–5 weeks",
        relatedTechnologies: ["Load testing tools", "Auto-scaling configuration"],
      },
      {
        id: "security-hardening",
        title: "Infrastructure Security Hardening",
        why: "Cloud misconfiguration is one of the most common sources of real security incidents.",
        when: "Standard for any infrastructure handling customer data.",
        benefits: [
          "Closes common misconfiguration vulnerabilities",
          "Supports compliance requirements (SOC 2, HIPAA, etc.)",
        ],
        risks: [
          "Hardening work is invisible until it prevents an incident, making it easy to deprioritize",
        ],
        timeline: "2–4 weeks",
        relatedTechnologies: ["IAM policy review", "Network segmentation"],
      },
    ],
    architecture: [
      {
        id: "traffic",
        label: "Traffic",
        description:
          "Real user and API traffic, plus automated/bot traffic that infrastructure needs to absorb gracefully.",
      },
      {
        id: "cdn-edge",
        label: "CDN / Edge",
        description:
          "Serves static content and caches responses close to the user, reducing origin load.",
      },
      {
        id: "load-balancer",
        label: "Load Balancer",
        description:
          "Distributes traffic across compute instances and enables zero-downtime deploys.",
      },
      {
        id: "compute",
        label: "Compute (Containers / Serverless)",
        description:
          "Sized and chosen based on actual workload shape — steady traffic favors containers, spiky traffic often favors serverless.",
      },
      {
        id: "managed-database",
        label: "Managed Database",
        description:
          "Offloads backup, patching, and failover to the cloud provider rather than the engineering team.",
      },
      {
        id: "object-storage",
        label: "Object Storage",
        description: "Durable, cheap storage for files and backups, decoupled from compute.",
      },
      {
        id: "monitoring-alerting",
        label: "Monitoring & Alerting",
        description:
          "Surfaces problems before customers report them, with alerts tuned to avoid fatigue.",
      },
    ],
    technologies: [
      {
        id: "cloud-provider",
        name: "AWS / GCP (provider chosen per constraint)",
        why: "The right cloud provider depends on your team's existing expertise, compliance needs, and specific service requirements — not a universal default.",
        when: "Decided early, since migrating providers later is a significant undertaking.",
        alternatives: [
          "Azure (common in enterprises with existing Microsoft agreements)",
          "A smaller/regional provider for specific compliance needs",
        ],
        tradeoffs:
          "Multi-cloud adds resilience but meaningfully more operational complexity — we default to single-cloud unless there's a specific reason not to.",
        cost: "Usage-based, varies significantly by provider and workload shape.",
        scalability: "All major providers scale to enterprise workloads.",
        teamRequirements:
          "Benefits from at least one engineer with hands-on experience on the chosen provider.",
      },
      {
        id: "terraform-cloud",
        name: "Terraform",
        why: "Codifies infrastructure so changes are reviewed, versioned, and reproducible across environments.",
        when: "From the first environment onward.",
        alternatives: ["Provider-native IaC (CloudFormation, Deployment Manager)"],
        tradeoffs:
          "Cloud-agnostic syntax in exchange for occasionally lagging brand-new provider features.",
        cost: "Open source; minimal additional cost.",
        scalability: "Scales to very large infrastructure footprints.",
        teamRequirements:
          "One engineer with infrastructure-as-code experience can maintain a meaningful footprint.",
      },
      {
        id: "containers",
        name: "Docker / Kubernetes",
        why: "Consistent packaging and deployment across environments, from a developer's laptop to production.",
        when: "When workloads are numerous or complex enough to benefit from orchestration; simpler setups may not need Kubernetes specifically.",
        alternatives: [
          "Serverless functions for simpler, event-driven workloads",
          "A managed container platform (ECS, Cloud Run) for less operational overhead",
        ],
        tradeoffs:
          "Kubernetes adds real operational complexity — we only recommend it once the workload genuinely justifies it.",
        cost: "Infrastructure cost plus operational overhead.",
        scalability: "Handles very large workloads by design.",
        teamRequirements: "Meaningful — this is where a platform/DevOps function pays for itself.",
      },
      {
        id: "cloud-monitoring",
        name: "CloudWatch / Datadog",
        why: "Visibility into infrastructure health is what turns an outage into a fast fix instead of a long incident.",
        when: "Established from the first production deployment.",
        alternatives: [
          "Open-source stack (Prometheus + Grafana) for cost-sensitive teams willing to self-host",
        ],
        tradeoffs: "Managed platforms cost more but require far less setup and maintenance.",
        cost: "Usage-based, scales with infrastructure footprint and log volume.",
        scalability: "Built for enterprise-scale infrastructure.",
        teamRequirements: "Minimal setup burden; immediate value.",
      },
    ],
    successMetrics: [
      { label: "Infrastructure cost per unit of traffic", value: "Optimized, tracked monthly" },
      { label: "Uptime during peak traffic events", value: "99.9%+" },
      { label: "Mean time to detect an infrastructure issue", value: "Minutes, via alerting" },
      { label: "Critical security misconfigurations", value: "Zero, verified via audit" },
    ],
    relatedCaseStudySlugs: ["harborline-developer-platform", "atlas-logistics-modernization"],
    relatedArticleSlugs: ["monolith-vs-microservices"],
    faqs: [
      {
        question: "How do you decide between containers and serverless?",
        answer:
          "Mostly by traffic shape. Steady, predictable load usually favors containers for cost efficiency; spiky or infrequent workloads often favor serverless. We size this against your actual usage data, not a general preference.",
      },
      {
        question: "Can you help reduce our current cloud bill without a full re-architecture?",
        answer:
          "Often, yes — Cost Optimization frequently finds meaningful savings (unused resources, oversized instances, redundant services) without touching the core architecture.",
      },
      {
        question: "Do you support multi-cloud setups?",
        answer:
          "We can, but we default to single-cloud unless there's a specific compliance, redundancy, or negotiating requirement — multi-cloud adds real operational cost that isn't worth it for most teams.",
      },
    ],
  },
  {
    slug: "automation",
    journey: "ai",
    navLabel: "Automation",
    title: "Automation",
    heroHeadline: "Automate the work that shouldn't need a person.",
    heroSupportingCopy:
      "We design automation that removes repetitive operational work, without hiding failures behind a black box.",
    primaryCtaLabel: "Find What to Automate",
    who: "Operations and engineering teams spending real hours on repetitive, rules-based, or data-entry work.",
    typicalCompanies: [
      "Operations-heavy businesses (logistics, healthcare, financial services)",
      "Teams manually bridging disconnected internal tools",
      "Companies scaling headcount to match manual process volume",
    ],
    exampleProducts: [
      "Workflow automation",
      "Document/data extraction pipelines",
      "Internal process tooling",
    ],
    businessProblem:
      "Manual processes don't just cost time — they introduce inconsistency and don't scale with growth. But automation built without visibility into failure states just moves the problem, rather than solving it.",
    businessOutcomes: [
      "Hours of manual work removed per week, redirected to higher-value tasks",
      "Fewer errors from manual data entry or repetitive steps",
      "Processes that scale with volume without proportional headcount",
      "Visibility into automated workflows when something needs human attention",
    ],
    engineeringPhilosophy:
      "Automation should fail loudly and visibly, not silently. Every workflow we build includes monitoring and a clear escalation path for the cases it can't handle — the goal is removing repetitive work, not removing accountability.",
    capabilities: [
      {
        id: "process-audit",
        title: "Process Audit",
        why: "Not every manual process is worth automating — some are rare, some are already efficient, and some need to be fixed before they're automated.",
        when: "Before any automation work begins.",
        benefits: [
          "Prioritizes automation by actual time/cost saved",
          "Avoids automating a broken process",
        ],
        risks: ["Can reveal the real fix is a process change, not automation"],
        timeline: "1–2 weeks",
        relatedTechnologies: ["None — this is a discovery engagement"],
      },
      {
        id: "workflow-automation",
        title: "Workflow Automation",
        why: "Connects the systems and steps a manual process currently requires a person to bridge.",
        when: "Once a high-value, well-understood process is identified.",
        benefits: ["Removes repetitive manual steps", "Consistent execution every time"],
        risks: ["Edge cases the original manual process handled implicitly need explicit handling"],
        timeline: "3–8 weeks depending on complexity",
        relatedTechnologies: ["Workflow orchestration engine", "Webhooks"],
      },
      {
        id: "ai-assisted-automation",
        title: "AI-Assisted Automation",
        why: "Some steps in a process involve unstructured input (documents, emails, images) that rules-based automation can't handle alone.",
        when: "When a workflow includes a step that currently requires human judgment on unstructured data.",
        benefits: [
          'Automates previously "unautomatable" steps',
          "Reduces the judgment work that's genuinely repetitive",
        ],
        risks: [
          "Needs a human review path for low-confidence cases, not full autonomy from day one",
        ],
        timeline: "4–8 weeks",
        relatedTechnologies: ["LLM APIs", "Document processing"],
      },
      {
        id: "monitoring-escalation",
        title: "Monitoring & Escalation",
        why: "An automated process that fails silently is worse than the manual process it replaced.",
        when: "Built into every automation from day one, not added after a failure.",
        benefits: [
          "Failures are caught and routed to a human immediately",
          "Builds trust in the automated system over time",
        ],
        risks: ["Under-monitoring recreates the original visibility problem in a new form"],
        timeline: "Included in every workflow build",
        relatedTechnologies: ["Alerting", "Dashboards"],
      },
    ],
    architecture: [
      {
        id: "trigger",
        label: "Trigger Event",
        description: "A schedule, a webhook, or a new record — whatever starts the workflow.",
      },
      {
        id: "workflow-engine",
        label: "Workflow Engine",
        description:
          "Orchestrates each step, retries failures, and preserves state if a step fails partway through.",
      },
      {
        id: "business-logic",
        label: "Business Logic / Rules",
        description:
          "The decision logic that used to live in a person's head, made explicit and testable.",
      },
      {
        id: "integrations",
        label: "Third-Party Integrations",
        description: "Connects to the systems the manual process previously bridged by hand.",
      },
      {
        id: "data-store",
        label: "Data Store",
        description:
          "Records what happened, for both auditing and debugging when something goes wrong.",
      },
      {
        id: "notification",
        label: "Notification / Output",
        description:
          "Delivers the result, or escalates to a human when the workflow hits a case it can't resolve.",
      },
    ],
    technologies: [
      {
        id: "workflow-orchestration",
        name: "Workflow orchestration (Temporal / n8n)",
        why: "Handles retries, state, and failure recovery for multi-step processes — the parts that make hand-rolled automation fragile.",
        when: "Any workflow with more than one or two sequential steps, or steps that can fail independently.",
        alternatives: ["Simple scheduled scripts for genuinely simple, single-step automations"],
        tradeoffs:
          "Adds infrastructure for a real gain in reliability and observability once workflows get non-trivial.",
        cost: "Open source (self-hosted) or usage-based (managed).",
        scalability: "Scales to high-volume, complex workflow needs.",
        teamRequirements: "Standard backend engineering skills.",
      },
      {
        id: "webhooks-event-bus",
        name: "Webhooks / Event Bus",
        why: "Lets systems react to events in near real-time instead of polling on a schedule.",
        when: "When a workflow should start immediately in response to something happening elsewhere.",
        alternatives: ["Scheduled polling (simpler, but adds latency and unnecessary load)"],
        tradeoffs:
          "Requires the source system to support outbound webhooks; not all legacy systems do.",
        cost: "Minimal — mostly engineering time.",
        scalability: "Scales well; very high event volume may need a dedicated event bus.",
        teamRequirements: "Standard backend engineering skills.",
      },
      {
        id: "llm-for-automation",
        name: "LLM APIs (for unstructured input)",
        why: "Extracts structured information from documents, emails, or free text that rules-based logic can't parse reliably.",
        when: "When a workflow step currently requires a human to read and interpret unstructured content.",
        alternatives: ["Traditional OCR/regex parsing for well-structured, consistent input"],
        tradeoffs:
          "More flexible than rules-based parsing, but needs a confidence threshold and human review path for low-confidence extractions.",
        cost: "Usage-based, billed per token.",
        scalability: "Scales with volume; cost is the main constraint to monitor.",
        teamRequirements: "Standard backend engineering skills; no ML background required.",
      },
      {
        id: "native-integrations",
        name: "Native integrations / lightweight tools (Zapier-class, for simple cases)",
        why: "For genuinely simple, low-volume automations, a no-code tool can be faster and cheaper than a custom build.",
        when: "Low-complexity, low-volume workflows where custom engineering isn't justified.",
        alternatives: [
          "Custom-built automation for anything with real volume, complexity, or reliability requirements",
        ],
        tradeoffs:
          "Fast to set up, but limited flexibility and higher per-task cost at real volume — we're upfront when a workflow has outgrown this approach.",
        cost: "Subscription-based, scales with task volume.",
        scalability: "Not built for high-volume, mission-critical workflows.",
        teamRequirements: "Minimal — often operations-owned, not engineering-owned.",
      },
    ],
    successMetrics: [
      { label: "Hours of manual work removed per week", value: "Tracked per workflow" },
      { label: "Error rate vs. manual process", value: "Reduced" },
      { label: "Workflow failures caught before customer impact", value: "100%, via monitoring" },
      {
        label: "Time to add a new automated workflow",
        value: "Reduced after platform is established",
      },
    ],
    relatedCaseStudySlugs: ["northwind-ai-support-assistant", "nova-commerce-checkout"],
    relatedArticleSlugs: ["rag-vs-fine-tuning"],
    faqs: [
      {
        question: "How do you decide what's worth automating?",
        answer:
          "Process Audit looks at frequency, time cost, and error rate for each candidate process. High-frequency, high-error, low-judgment work is usually the best starting point.",
      },
      {
        question: "What happens when the automation hits a case it can't handle?",
        answer:
          "It escalates to a human with the relevant context, rather than guessing or failing silently. Monitoring & Escalation is built into every workflow, not treated as optional.",
      },
      {
        question: "Is this the same as the AI solution?",
        answer:
          "They overlap where automation needs to handle unstructured input, but Automation is broader — plenty of valuable automation is straightforward rules-based logic with no AI involved at all.",
      },
    ],
  },
  {
    slug: "product-design",
    journey: "startup",
    navLabel: "Product Design",
    title: "Product Design",
    heroHeadline: "Design that explains itself.",
    heroSupportingCopy:
      "Interfaces and design systems built so users — and the engineers who build on them — never have to guess.",
    primaryCtaLabel: "Start With Design",
    who: "Teams whose product works but is hard to use, or whose design and engineering are out of sync.",
    typicalCompanies: [
      "Products with declining activation or retention",
      "Teams whose design and engineering have drifted apart",
      "Companies without a formal design system yet",
    ],
    exampleProducts: [
      "Design systems",
      "UX research and usability testing",
      "Accessibility remediation",
    ],
    businessProblem:
      "Confusing interfaces cost conversions, support tickets, and trust — but design work that isn't systemized creates inconsistency that compounds as a product grows.",
    businessOutcomes: [
      "Higher task completion rates for core user flows",
      "Fewer support tickets caused by confusing UI",
      "Faster feature delivery once design and engineering share a system",
      "A product that feels coherent as it grows, not stitched together",
    ],
    engineeringPhilosophy:
      "Design and engineering share one source of truth: a design system, not a set of static mockups. Every component is designed with its real states — loading, empty, error — not just its ideal case, because that's where most products actually feel unfinished.",
    capabilities: [
      {
        id: "ux-research",
        title: "UX Research",
        why: "Design decisions based on how users actually behave outperform decisions based on assumptions.",
        when: "Before major design work, or when a product's usage data doesn't match expectations.",
        benefits: [
          "Surfaces real usability problems before they ship",
          "Prioritizes design effort on what actually confuses users",
        ],
        risks: ["Requires access to real users or usage data — thin data leads to thin insights"],
        timeline: "2–3 weeks",
        relatedTechnologies: ["User interview tooling", "Session recording/analytics"],
      },
      {
        id: "design-systems",
        title: "Design System Engineering",
        why: "A shared design system is what keeps a growing product visually and behaviorally consistent without constant re-litigation.",
        when: "As soon as a product has more than a handful of screens, or when design/engineering are drifting apart.",
        benefits: [
          "Consistent experience across the whole product",
          "Faster design and engineering handoff",
        ],
        risks: [
          "Requires ongoing maintenance as the product evolves — a design system left unmaintained decays quickly",
        ],
        timeline: "6–10 weeks for a first version",
        relatedTechnologies: ["Figma", "Storybook", "Design tokens"],
      },
      {
        id: "interaction-design",
        title: "Interaction & Motion Design",
        why: "Motion communicates state changes and hierarchy — done well, it reduces cognitive load rather than adding decoration.",
        when: "Once core flows and the design system are established.",
        benefits: [
          "Clearer feedback for user actions",
          "A product that feels considered, not just functional",
        ],
        risks: ["Overused motion competes with content instead of clarifying it"],
        timeline: "2–4 weeks",
        relatedTechnologies: ["Motion/animation libraries"],
      },
      {
        id: "accessibility-design",
        title: "Accessibility-First Design",
        why: "Accessibility is cheapest when it's a design decision from the start, not a remediation project later.",
        when: "From the first design system component onward.",
        benefits: ["Usable by significantly more people", "Avoids expensive retrofits later"],
        risks: [
          "Retrofitting an existing inaccessible product takes longer than building it in from the start",
        ],
        timeline: "Ongoing, built into every component",
        relatedTechnologies: ["axe", "Screen reader testing"],
      },
    ],
    architecture: [
      {
        id: "design-tokens",
        label: "Design Tokens",
        description:
          "Color, spacing, and typography values defined once, consumed everywhere — the single source of truth for visual decisions.",
      },
      {
        id: "component-library",
        label: "Component Library",
        description:
          "Reusable, accessible components built from tokens, shared between design and engineering.",
      },
      {
        id: "documentation",
        label: "Design System Documentation",
        description:
          "Explains not just what each component looks like, but when and why to use it.",
      },
      {
        id: "prototype",
        label: "Prototype",
        description:
          "Interactive prototypes validate flows with real users before engineering investment begins.",
      },
      {
        id: "usability-testing",
        label: "Usability Testing",
        description:
          "Real users attempt real tasks — the fastest way to find what's actually confusing.",
      },
      {
        id: "engineering-handoff",
        label: "Engineering Handoff",
        description:
          "Components ship as code, not just design files, so there's one implementation to maintain.",
      },
    ],
    technologies: [
      {
        id: "figma",
        name: "Figma",
        why: "Industry-standard design tooling with strong developer handoff features (inspect, tokens export).",
        when: "The default design tool for any engagement.",
        alternatives: ["Sketch (less common now for collaborative work)"],
        tradeoffs: "Minimal — broadly the right default for collaborative product design.",
        cost: "Per-seat subscription.",
        scalability: "Scales to large design teams and complex files.",
        teamRequirements: "Standard for any product designer.",
      },
      {
        id: "storybook-design",
        name: "Storybook",
        why: "Documents components in isolation with every state (loading, error, empty) visible and testable — not just the happy path.",
        when: "Alongside any real design system build.",
        alternatives: ["A custom-built component documentation site"],
        tradeoffs:
          "Some setup investment, paid back quickly once more than a few components exist.",
        cost: "Open source; engineering time to set up and maintain.",
        scalability: "Scales to very large component libraries.",
        teamRequirements: "Front-end engineering familiarity.",
      },
      {
        id: "design-tokens-tech",
        name: "Design Tokens (Style Dictionary or platform-native)",
        why: "Keeps design and code in sync — a color or spacing change updates everywhere at once instead of drifting.",
        when: "From the first version of the design system.",
        alternatives: ["Hardcoded values per component (fast initially, drifts quickly)"],
        tradeoffs:
          "Upfront setup cost, in exchange for long-term consistency and easier theming (e.g. dark mode).",
        cost: "Open source; primarily engineering time.",
        scalability: "Scales with the design system itself.",
        teamRequirements: "Front-end engineering familiarity.",
      },
      {
        id: "axe-tooling",
        name: "axe (accessibility testing)",
        why: "Catches a meaningful class of accessibility issues automatically, as part of the normal build process.",
        when: "Wired into every component's tests from the start.",
        alternatives: [
          "Manual accessibility audits only (necessary too, but not sufficient alone)",
        ],
        tradeoffs:
          "Automated tools catch real issues but not everything — manual testing with real assistive technology still matters.",
        cost: "Open source.",
        scalability: "Scales automatically with the component library.",
        teamRequirements: "Standard front-end engineering skills.",
      },
    ],
    successMetrics: [
      { label: "Task completion rate on core flows", value: "Improved via usability testing" },
      { label: "Support tickets citing UI confusion", value: "Reduced" },
      {
        label: "Design-to-engineering handoff time",
        value: "Reduced via shared component library",
      },
      { label: "Components passing automated accessibility checks", value: "100%" },
    ],
    relatedCaseStudySlugs: ["fieldnote-mvp", "nova-commerce-checkout"],
    relatedArticleSlugs: ["validating-an-mvp", "accessibility-checklist-for-product-teams"],
    faqs: [
      {
        question: "Do you redesign the whole product, or work incrementally?",
        answer:
          "Almost always incrementally — starting with the design system and the highest-impact flows, rather than a full redesign that pauses feature work for months.",
      },
      {
        question: "We already have a design team. How does this fit?",
        answer:
          "We often work alongside an existing design team, particularly on design system engineering and the design-to-code handoff, which is where design and engineering most commonly drift apart.",
      },
      {
        question: "Is accessibility going to slow down our design process?",
        answer:
          "Building it in from the start is faster than retrofitting it later — the checklist becomes part of how a component is designed, not a separate audit at the end.",
      },
    ],
  },
  {
    slug: "custom-engineering",
    journey: "enterprise",
    navLabel: "Custom Engineering",
    title: "Custom Engineering",
    heroHeadline: "For problems that don't fit an off-the-shelf answer.",
    heroSupportingCopy:
      "When the right solution requires building something specific to your business, not configuring something generic.",
    primaryCtaLabel: "Discuss My Project",
    who: "Teams with a genuinely specific engineering problem that off-the-shelf software can't solve.",
    typicalCompanies: [
      "Enterprises with domain-specific workflows",
      "Companies whose competitive advantage is a proprietary process",
      "Organizations bridging several legacy systems no off-the-shelf tool connects",
    ],
    exampleProducts: [
      "Bespoke internal systems",
      "Cross-system integrations",
      "Domain-specific business logic engines",
    ],
    businessProblem:
      "Some business problems are specific enough that no off-the-shelf tool — or combination of them — actually fits, and forcing one to work becomes its own ongoing cost.",
    businessOutcomes: [
      "A system built for your exact constraints, not a generic approximation",
      "Lower long-term cost than maintaining workarounds around ill-fitting tools",
      "Ownership of the resulting system and its data",
      "Integration with the systems you already depend on",
    ],
    engineeringPhilosophy:
      "Custom engineering is the right answer only when it's genuinely the right answer — the first conversation is always about whether an existing tool, possibly with some integration work, would actually serve you better. When custom is right, we build for maintainability by whoever owns the system after us, not just for our own convenience while we're building it.",
    capabilities: [
      {
        id: "requirements-engineering",
        title: "Requirements Engineering",
        why: "Custom systems are expensive to redirect midway — getting the requirements right upfront matters more here than in most engagements.",
        when: "Always the first phase.",
        benefits: [
          "Reduces expensive scope changes mid-build",
          "Surfaces constraints that change the recommended approach",
        ],
        risks: ["Takes real time before any visible engineering progress begins"],
        timeline: "2–4 weeks",
        relatedTechnologies: ["Domain modeling", "Stakeholder interviews"],
      },
      {
        id: "custom-integration",
        title: "Custom Integration Engineering",
        why: "Most custom systems need to talk to existing tools — CRMs, ERPs, internal databases — that weren't designed to be integrated with.",
        when: "When a solution requires connecting systems that don't have a native integration.",
        benefits: [
          "Preserves your existing tool investments",
          "Avoids forcing a wholesale replacement of working systems",
        ],
        risks: [
          "Integrating with poorly documented legacy systems can take longer than initial estimates",
        ],
        timeline: "Varies significantly by system complexity",
        relatedTechnologies: ["API gateways", "ETL/data pipelines"],
      },
      {
        id: "domain-specific-systems",
        title: "Domain-Specific System Design",
        why: "Some business logic is specific enough to your industry or company that a generic tool structurally can't represent it.",
        when: "When the core value of the system is the business logic itself, not the UI around it.",
        benefits: [
          "Models your business accurately, not approximately",
          "A genuine competitive asset rather than a shared commodity tool",
        ],
        risks: [
          "Highest-complexity category of work — timelines require real diligence to estimate accurately",
        ],
        timeline: "3–9 months depending on scope",
        relatedTechnologies: ["Domain-driven design", "Event sourcing (where appropriate)"],
      },
      {
        id: "long-term-ownership",
        title: "Long-Term Ownership Support",
        why: "A custom system is only valuable if your team (or ours, ongoing) can maintain and extend it after the initial build.",
        when: "Planned from the start, not negotiated after handover.",
        benefits: [
          "System remains maintainable as requirements evolve",
          "No single-point-of-failure knowledge risk",
        ],
        risks: [
          "Requires deliberate documentation and knowledge transfer, which takes real effort to do well",
        ],
        timeline: "Ongoing",
        relatedTechnologies: ["Documentation", "Architecture Decision Records"],
      },
    ],
    architecture: [
      {
        id: "client-systems",
        label: "Client Systems",
        description:
          "The tools and databases you already run — the custom system integrates with these, rather than replacing them wholesale.",
      },
      {
        id: "integration-layer",
        label: "Custom Integration Layer",
        description: "Bridges systems that were never designed to talk to each other.",
      },
      {
        id: "business-logic-engine",
        label: "Business Logic Engine",
        description:
          "The core of the system — models your specific rules and processes accurately.",
      },
      {
        id: "data-layer",
        label: "Data Layer",
        description:
          "Structured around your actual domain model, not a generic schema forced to fit.",
      },
      {
        id: "external-apis",
        label: "External Systems / APIs",
        description: "Third-party services the custom system depends on or feeds data to.",
      },
      {
        id: "reporting",
        label: "Reporting",
        description:
          "Surfaces the business logic's output in a form stakeholders can actually use.",
      },
    ],
    technologies: [
      {
        id: "case-by-case-stack",
        name: "Stack chosen per project constraints",
        why: "Custom engineering, by definition, doesn't have a default stack — the right technology depends entirely on your existing systems, team, and constraints.",
        when: "Decided during Requirements Engineering, not before.",
        alternatives: [
          "A default stack applied regardless of fit (the mistake this category of work exists to avoid)",
        ],
        tradeoffs:
          "Every real technology choice has a documented reason specific to your project — we won't give you a generic answer here.",
        cost: "Varies by project.",
        scalability: "Evaluated against your actual growth trajectory, not a generic assumption.",
        teamRequirements: "Varies by project.",
      },
      {
        id: "postgresql-custom",
        name: "PostgreSQL",
        why: "A flexible, reliable default for custom domain modeling unless a project has a specific reason to need something else.",
        when: "The default data layer choice absent a specific requirement otherwise.",
        alternatives: [
          "A specialized database (graph, time-series) when the domain model genuinely calls for it",
        ],
        tradeoffs:
          "Extremely capable generalist; specialized databases outperform it only for specific access patterns.",
        cost: "Open source; hosting and operations cost.",
        scalability: "Scales to significant custom-system workloads.",
        teamRequirements: "Standard backend engineering skills.",
      },
      {
        id: "message-queue-custom",
        name: "Message Queue (Kafka / RabbitMQ)",
        why: "Decouples custom system components so integration failures don't cascade across the whole system.",
        when: "When the custom system integrates with multiple external systems that can fail independently.",
        alternatives: ["Direct synchronous integration for simpler, lower-stakes connections"],
        tradeoffs: "Added infrastructure and complexity, justified by integration resilience.",
        cost: "Self-hosted (ops cost) or managed (usage-based).",
        scalability: "Scales well beyond typical custom-system integration volume.",
        teamRequirements: "Familiarity with asynchronous system design.",
      },
      {
        id: "custom-api-gateway",
        name: "Custom API Gateway",
        why: "Provides one consistent, monitored interface into a system that may bridge several legacy or third-party systems underneath.",
        when: "When multiple consumers need controlled, monitored access to the custom system.",
        alternatives: [
          "Direct access to individual services (simpler, but harder to monitor and secure consistently)",
        ],
        tradeoffs:
          "Additional component to maintain, in exchange for consistent access control and observability.",
        cost: "Primarily engineering time; infrastructure cost is typically small.",
        scalability: "Scales with the rest of the system.",
        teamRequirements: "Standard backend engineering skills.",
      },
    ],
    successMetrics: [
      {
        label: "Requirements changes after build starts",
        value: "Minimized via upfront engineering",
      },
      { label: "Integration reliability with existing systems", value: "Measured post-launch" },
      { label: "Total cost vs. maintaining ill-fitting workarounds", value: "Lower, long-term" },
      { label: "Documentation coverage at handover", value: "100% of core system logic" },
    ],
    relatedCaseStudySlugs: ["atlas-logistics-modernization", "harborline-developer-platform"],
    relatedArticleSlugs: ["monolith-vs-microservices"],
    faqs: [
      {
        question: "How do you know when custom engineering is actually the right call?",
        answer:
          "Requirements Engineering starts by testing whether an existing tool — possibly with integration work — would genuinely serve you better. We'd rather tell you that upfront than sell you a custom build you didn't need.",
      },
      {
        question: "What happens after the project ships — who maintains it?",
        answer:
          "That's planned from the start, not an afterthought. Depending on your preference, that's your internal team (with full documentation and handover) or an ongoing relationship with us.",
      },
      {
        question: "How do you estimate timelines for genuinely novel systems?",
        answer:
          "Honestly, and with appropriate ranges rather than false precision — Requirements Engineering exists partly to reduce that uncertainty before we commit to a timeline.",
      },
    ],
  },
];

/**
 * The single canonical solution to highlight for a given journey, for the
 * Solutions landing page's adaptive hero/CTA (CLAUDE.md Part 20: "adaptive
 * hero, journey-aware messaging... context-aware CTA"). An explicit map
 * rather than deriving from `Solution.journey`, since several solutions
 * share a journey (e.g. both `platform-engineering` and
 * `cloud-infrastructure` map to "platform") — this map picks the one
 * whose name most directly matches the journey itself.
 */
const RECOMMENDED_SOLUTION_BY_JOURNEY: Record<Journey, string> = {
  startup: "startup",
  enterprise: "enterprise",
  commerce: "commerce",
  ai: "artificial-intelligence",
  platform: "platform-engineering",
};

export function getRecommendedSolution(journey: Journey | null): Solution | undefined {
  if (!journey) return undefined;
  const slug = RECOMMENDED_SOLUTION_BY_JOURNEY[journey];
  return SOLUTIONS.find((solution) => solution.slug === slug);
}
