import type { KnowledgeArticle } from "./knowledge-article.schema";

/**
 * CLAUDE.md Part 18's Knowledge Center, local typed data rather than a
 * real CMS/MDX content model (deferred to a future milestone, matching
 * `content-collections.ts`'s own deferred-content note). These are the
 * same five articles the homepage's Knowledge Center Preview introduced
 * in Milestone 3, deepened to Milestone 7's full eleven-section article
 * template rather than replaced with new invented articles — the same
 * "deepen, don't invent" approach Milestone 5 took with the five
 * fictional case studies.
 */
export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    slug: "monolith-vs-microservices",
    title: "Monolith vs. Microservices: Choosing the Right Architecture",
    category: "architecture",
    type: "comparison",
    difficulty: "Intermediate",
    readingTime: "9 min read",
    summary:
      "Microservices solve a scaling problem most early products don't have yet. Here's how to tell which one you actually need.",
    aiSummary:
      "Start with a monolith unless you already have the team size and operational maturity to run distributed services — the article argues most 'microservices' rewrites are solving an organizational problem, not a technical one.",
    featured: true,

    problem:
      "Most engineering teams eventually ask whether they should split a growing monolith into microservices — usually right when the codebase feels painful to work in, which is exactly the wrong signal to decide on.",
    importance:
      "Choosing prematurely in either direction creates years of expensive rework: microservices too early trade a slow-but-simple system for a fast-but-fragile distributed one; staying monolithic past the point of real need eventually creates a codebase no team can safely deploy independently.",
    audience: [
      "Engineering leads evaluating a rewrite",
      "CTOs assessing scaling readiness",
      "Product teams hitting deployment bottlenecks",
    ],
    learningOutcomes: [
      "Recognize the actual signals that justify splitting a monolith, as opposed to symptoms of unrelated problems",
      "Understand what microservices cost operationally before adopting them",
      "Apply a decision framework instead of following industry trend",
    ],

    businessContext:
      "Slow deployments and coordination overhead show up as missed roadmap dates and frustrated stakeholders long before anyone frames it as an architecture problem — leadership often hears 'we need microservices' as a proposed fix without understanding what it actually costs to operate.",
    engineeringContext:
      "A monolith's core weakness is coupling: teams start blocking each other during deploys and code reviews as headcount grows. Microservices solve coordination overhead by giving each team an independently deployable unit — but they introduce network calls, distributed data consistency, and operational surface area that a single well-organized codebase never has to deal with.",
    realWorldRelevance:
      "Most companies that successfully use microservices — the ones referenced in nearly every conference talk on the topic — adopted them after outgrowing a monolith with real operational data proving the need, not before writing their first line of code.",

    coreConcepts: [
      {
        term: "Coupling vs. cohesion",
        explanation:
          "A monolith keeps related code physically close (high cohesion) but makes it easy for unrelated parts to depend on each other (high coupling). Microservices force a hard boundary that prevents unrelated coupling, at the cost of making legitimately related operations span a network call.",
      },
      {
        term: "Independent deployability",
        explanation:
          "The real technical benefit of microservices isn't performance — it's that one team can ship changes to their service without waiting for, or breaking, another team's service. A monolith can approximate this with strict module boundaries and feature flags, just with more social discipline required.",
      },
      {
        term: "Distributed data consistency",
        explanation:
          "A monolith typically has one database and can rely on transactions to keep data consistent. Splitting services usually means splitting data too, which trades transactional guarantees for eventual consistency, retries, and idempotency — genuine complexity that has to be designed for explicitly.",
      },
    ],

    walkthrough: [
      {
        id: "symptom",
        label: "Notice the real symptom",
        description:
          "Deploys are slow, one team's bug blocks another team's release, or the codebase has grown past what a new engineer can hold in their head. These are the legitimate signals — team-size friction, not raw traffic.",
      },
      {
        id: "measure",
        label: "Measure before deciding",
        description:
          "Quantify how often deploy conflicts or cross-team blocking actually happen. Teams frequently overestimate this because a handful of incidents feel disproportionately painful.",
      },
      {
        id: "try-modular-monolith",
        label: "Try a modular monolith first",
        description:
          "Enforce module boundaries and independent internal APIs inside the existing deployable. This captures most of microservices' organizational benefit without the network and data-consistency cost.",
      },
      {
        id: "split-the-bottleneck",
        label: "Split only the actual bottleneck",
        description:
          "If a modular monolith isn't enough, extract the single service causing the most cross-team friction — not the whole system at once. This bounds the operational cost to where the benefit is proven.",
      },
      {
        id: "invest-in-platform",
        label: "Invest in the operational platform",
        description:
          "Once services are split, service discovery, distributed tracing, and consistent deployment tooling become mandatory, not optional — underinvesting here is the most common cause of microservices projects failing.",
      },
    ],

    realExamples: [
      {
        title: "A single-team startup rewriting too early",
        description:
          "A 6-person engineering team splits their product into eight services before reaching product-market fit. Every feature now requires coordinating changes across three services and a shared event bus, and the team spends more time on deployment tooling than on the product.",
      },
      {
        title: "A scaling company extracting one real bottleneck",
        description:
          "A 40-engineer company keeps their core product as a modular monolith but extracts their billing system into its own service after repeated incidents where a billing bug took down unrelated parts of the product. The extraction is scoped to the one component actually causing cross-team pain.",
      },
    ],

    commonMistakes: [
      {
        mistake: "Splitting services along technical layers instead of business capabilities",
        consequence:
          "A 'database service' or 'API layer service' still requires every feature change to touch multiple services, recreating the exact coordination problem microservices were meant to solve.",
      },
      {
        mistake: "Adopting distributed tracing and service mesh tooling after the fact",
        consequence:
          "Debugging a production incident across five services with no tracing turns a 20-minute investigation into a multi-hour one, and teams often only discover this gap during their first real outage.",
      },
      {
        mistake: "Ignoring data ownership boundaries",
        consequence:
          "Multiple services directly reading each other's databases recreates monolith-style coupling without any of the monolith's transactional safety — the worst of both models.",
      },
    ],

    relatedTechnologySlugs: ["postgresql", "kubernetes", "terraform"],
    relatedCaseStudySlugs: ["atlas-logistics-modernization", "harborline-developer-platform"],
    relatedArticleSlugs: [],
  },
  {
    slug: "validating-an-mvp",
    title: "How to Validate an MVP Before Writing Code",
    category: "mvp",
    type: "guide",
    difficulty: "Beginner",
    readingTime: "6 min read",
    summary:
      "The cheapest way to test a product idea rarely involves an engineer. A practical framework for validating demand first.",
    aiSummary:
      "Validate demand with landing pages, concierge tests, or manual processes before committing engineering time — the article's core argument is that most MVPs fail from being un-validated, not under-built.",

    problem:
      "Founders often equate 'building an MVP' with writing the smallest version of the final product, then discover after months of work that nobody wanted it in the first place.",
    importance:
      "Engineering time is the most expensive resource in an early-stage company. Validating demand before writing code turns an expensive bet into a cheap experiment, and prevents a technically well-built product from failing for a non-technical reason.",
    audience: [
      "First-time founders",
      "Product managers scoping a new initiative",
      "Engineering leads asked to build 'just an MVP'",
    ],
    learningOutcomes: [
      "Separate validating demand from validating feasibility",
      "Choose the cheapest experiment that would genuinely change your decision",
      "Recognize when 'more validation' is actually procrastination",
    ],

    businessContext:
      "Investors and early customers rarely fund or adopt a product because it's technically impressive — they respond to evidence that a real problem is being solved for people who will actually pay or switch.",
    engineeringContext:
      "Most early 'MVP' failures aren't caused by bad code — they're caused by building the wrong thing well. Validation exists to catch this before engineering time is spent, since fixing a wrong product assumption after launch costs far more than testing it before writing any code.",
    realWorldRelevance:
      "The founders who move fastest after validation are usually the ones who ran the cheapest possible test first — a landing page, a concierge process, or a handful of customer conversations — rather than the ones who built the most polished prototype.",

    coreConcepts: [
      {
        term: "Demand validation vs. feasibility validation",
        explanation:
          "Demand validation asks whether anyone wants this; feasibility validation asks whether it can be built. Teams often validate feasibility first because it's the comfortable, familiar work — but demand is usually the riskier unknown and should be tested first.",
      },
      {
        term: "The concierge test",
        explanation:
          "Manually deliver the product's outcome to a handful of real customers without building any software — a person doing the work a system would eventually automate. It's slow and doesn't scale, but it proves demand and reveals requirements no one could have guessed upfront.",
      },
      {
        term: "Signal vs. noise in early feedback",
        explanation:
          "Polite interest ('this is cool') is noise; a customer paying money, changing their workflow, or introducing you to someone else is signal. Validation frameworks fail when they only collect the former.",
      },
    ],

    walkthrough: [
      {
        id: "define-assumption",
        label: "Define the riskiest assumption",
        description:
          "Identify the single belief that, if wrong, would make the whole product idea pointless — usually about who has the problem and how badly they want it solved, not about a specific feature.",
      },
      {
        id: "design-cheapest-test",
        label: "Design the cheapest real test",
        description:
          "Choose the least expensive experiment that would still produce a genuine yes/no answer — a landing page with a real payment button, a concierge process, or direct outreach to ten potential customers.",
      },
      {
        id: "run-and-measure",
        label: "Run it and measure real behavior",
        description:
          "Track what people actually do (sign up, pay, refer someone) rather than what they say. Stated intent is a weak predictor of real behavior.",
      },
      {
        id: "decide",
        label: "Decide: build, pivot, or kill",
        description:
          "Use the result to make an explicit decision rather than treating validation as a formality on the way to building what was already planned.",
      },
    ],

    realExamples: [
      {
        title: "A landing page before a platform",
        description:
          "A team planning a two-sided marketplace publishes a landing page describing the product and collects paid deposits from early customers before writing any matching logic — proving willingness to pay before building the harder engineering problem.",
      },
      {
        title: "A concierge process before automation",
        description:
          "A founder manually matches customers to service providers over email for the first twenty transactions, refining the exact matching criteria that later gets encoded into software — because the criteria weren't knowable until real transactions happened.",
      },
    ],

    commonMistakes: [
      {
        mistake: "Asking people if they would use the product instead of watching what they do",
        consequence:
          "Hypothetical interest is nearly free to express and a poor predictor of real adoption, leading teams to build for demand that never materializes.",
      },
      {
        mistake:
          "Validating with friends, family, or existing users instead of the actual target customer",
        consequence:
          "Feedback from people who already like you or the company is systematically more positive than feedback from a stranger with the actual problem.",
      },
      {
        mistake: "Treating validation as a one-time gate instead of an ongoing practice",
        consequence:
          "Assumptions that were true at initial validation can stop being true as the product and market evolve, and teams that stop validating after launch miss the moment their fit degrades.",
      },
    ],

    relatedTechnologySlugs: ["next-js", "supabase"],
    relatedCaseStudySlugs: ["fieldnote-mvp"],
    relatedArticleSlugs: ["accessibility-checklist-for-product-teams"],
  },
  {
    slug: "rag-vs-fine-tuning",
    title: "RAG vs Fine-Tuning: A Practical Comparison",
    category: "ai",
    type: "comparison",
    difficulty: "Intermediate",
    readingTime: "8 min read",
    summary:
      "Two very different ways to make an AI product 'know' your data — and why most teams should start with the cheaper one.",
    aiSummary:
      "RAG is faster to iterate on and keeps your knowledge current without retraining; fine-tuning is better suited to a fixed style or task. The article recommends RAG as the default starting point.",

    problem:
      "Teams building an AI feature that needs to 'know' their own data often default to fine-tuning a model, without realizing retrieval-augmented generation solves the same problem with far less operational cost for most use cases.",
    importance:
      "Choosing the wrong approach means either overpaying in training infrastructure and iteration time (unnecessary fine-tuning) or building a system that can't reliably ground its answers in real information (skipping retrieval entirely).",
    audience: [
      "Engineering leads scoping an AI feature",
      "Product managers evaluating AI vendors",
      "Founders deciding where to invest AI engineering time",
    ],
    learningOutcomes: [
      "Understand what problem each approach actually solves",
      "Recognize when fine-tuning is genuinely necessary",
      "Estimate the operational cost difference between the two approaches",
    ],

    businessContext:
      "AI features are often sold internally as a fast differentiator, but the underlying technical approach determines both time to first working version and ongoing cost to keep the system accurate as information changes.",
    engineeringContext:
      "Retrieval-augmented generation retrieves relevant content at query time and includes it in the prompt, so the model always sees current information without retraining. Fine-tuning bakes patterns into the model's weights through additional training, which is better suited to teaching a consistent style or specialized task than to keeping up with a constantly updated knowledge base.",
    realWorldRelevance:
      "Most production AI products that answer questions about a company's own documentation, policies, or codebase use retrieval as the primary mechanism, reserving fine-tuning for narrower jobs like enforcing a specific output format or tone.",

    coreConcepts: [
      {
        term: "Retrieval-augmented generation (RAG)",
        explanation:
          "A pipeline that searches a knowledge base for content relevant to a query, then includes that content in the prompt sent to the model — grounding the response in real, current information rather than relying on what the model memorized during training.",
      },
      {
        term: "Fine-tuning",
        explanation:
          "Continuing to train a pretrained model on a smaller, task-specific dataset so its weights shift toward that task's patterns — useful for teaching a consistent voice, format, or narrow skill, not for injecting large amounts of frequently changing factual knowledge.",
      },
      {
        term: "Context window limits",
        explanation:
          "Every model has a maximum amount of text it can consider at once. RAG has to fit retrieved content within this limit, which is why retrieval quality (finding the right chunks, not just any chunks) matters as much as the model itself.",
      },
    ],

    walkthrough: [
      {
        id: "define-need",
        label: "Define what the AI actually needs to know",
        description:
          "Separate 'facts that change' (product docs, policies, support tickets) from 'behavior that should stay consistent' (tone, output format, a narrow specialized task).",
      },
      {
        id: "start-with-rag",
        label: "Start with retrieval for changing knowledge",
        description:
          "Build a retrieval pipeline over the knowledge base first — it's faster to iterate on and doesn't require retraining every time the underlying information changes.",
      },
      {
        id: "evaluate-quality",
        label: "Evaluate retrieval quality before blaming the model",
        description:
          "Most disappointing RAG results trace back to poor retrieval (wrong or incomplete chunks returned), not the underlying model — this is the highest-leverage place to invest first.",
      },
      {
        id: "consider-fine-tuning",
        label: "Consider fine-tuning only for a specific, stable gap",
        description:
          "If the model still can't produce the right format, tone, or handle a narrow specialized task after retrieval is solid, fine-tuning becomes the appropriate remaining tool.",
      },
    ],

    realExamples: [
      {
        title: "A support assistant grounded in a live knowledge base",
        description:
          "A customer support AI retrieves the most relevant help-center articles and past resolved tickets for each incoming question, so answers stay accurate as the product and policies change without any retraining.",
      },
      {
        title: "A fine-tuned classifier for a narrow, stable task",
        description:
          "A team fine-tunes a small model specifically to classify support tickets into a fixed set of categories — a narrow, stable task where the categories rarely change, making fine-tuning's upfront cost worthwhile.",
      },
    ],

    commonMistakes: [
      {
        mistake: "Fine-tuning to 'teach' the model facts that change frequently",
        consequence:
          "Every update to the underlying information requires a new training run, making the system expensive to keep current and prone to serving stale answers between updates.",
      },
      {
        mistake: "Treating retrieval as a solved problem instead of tuning it",
        consequence:
          "Poor chunking or irrelevant search results silently degrade answer quality, and teams often mistake this for a model limitation and pursue fine-tuning as an unnecessary fix.",
      },
      {
        mistake: "Skipping evaluation entirely and shipping on first impression",
        consequence:
          "AI responses that look plausible on a handful of manual tests can still fail systematically on realistic query variety, which only shows up with structured evaluation against real questions.",
      },
    ],

    relatedTechnologySlugs: ["openai", "langchain"],
    relatedCaseStudySlugs: ["northwind-ai-support-assistant"],
    relatedArticleSlugs: [],
  },
  {
    slug: "accessibility-checklist-for-product-teams",
    title: "A Practical Accessibility Checklist for Product Teams",
    category: "accessibility",
    type: "playbook",
    difficulty: "Beginner",
    readingTime: "7 min read",
    summary:
      "Accessibility is cheapest when it's built in from the start. A checklist product teams can actually use before shipping.",
    aiSummary:
      "The checklist covers keyboard navigation, color contrast, semantic HTML, and screen-reader testing — framed as a pre-launch gate, not a post-launch audit.",

    problem:
      "Accessibility is frequently treated as a post-launch audit item, which makes every issue found more expensive to fix than if it had been caught during design or development.",
    importance:
      "Inaccessible products exclude real users, expose the business to legal risk, and are measurably more expensive to retrofit than to build correctly from the start.",
    audience: [
      "Product teams shipping a new feature",
      "Designers creating new UI patterns",
      "Engineers implementing frontend components",
    ],
    learningOutcomes: [
      "Apply accessibility checks before a feature ships, not after",
      "Recognize the highest-impact, lowest-effort fixes",
      "Understand why automated tools alone aren't sufficient",
    ],

    businessContext:
      "Accessibility issues found in production require re-opening already-shipped features, re-testing, and re-deploying — work that competes directly with new feature development and is far more disruptive than the same fix made pre-launch.",
    engineeringContext:
      "Most accessibility issues come from a small set of recurring patterns: missing semantic HTML, insufficient color contrast, keyboard traps, and unlabeled interactive elements. A pre-launch checklist targeting these patterns catches the majority of real-world issues without requiring a full specialist audit for every feature.",
    realWorldRelevance:
      "Teams that build accessibility checks into their existing code review and QA process, rather than as a separate audit phase, consistently ship more accessible products with less total effort than teams relying on periodic audits alone.",

    coreConcepts: [
      {
        term: "Semantic HTML as the foundation",
        explanation:
          "Using the correct native HTML element (a real button, a real heading, a real list) gives keyboard navigation, screen reader support, and focus management for free — recreating this behavior manually with generic elements and ARIA attributes is more work and more error-prone.",
      },
      {
        term: "Keyboard operability",
        explanation:
          "Every interactive element must be reachable and operable using only a keyboard, in a logical order, with a visible focus indicator — this is the single check that catches the largest number of real usability failures for many types of disabilities, not only screen reader users.",
      },
      {
        term: "Automated tools catch roughly a third of real issues",
        explanation:
          "Tools like axe-core reliably catch missing labels, contrast failures, and invalid ARIA usage, but cannot evaluate whether an interaction actually makes sense to a screen reader user or whether a visual layout still communicates correctly without color alone — manual testing remains necessary.",
      },
    ],

    walkthrough: [
      {
        id: "semantic-markup",
        label: "Check semantic markup",
        description:
          "Verify headings are in a logical, non-skipping order, buttons are real <button> elements, and content structure matches its visual hierarchy.",
      },
      {
        id: "keyboard-pass",
        label: "Do a full keyboard-only pass",
        description:
          "Tab through the entire feature without a mouse — every interactive element should be reachable, operable, and show a visible focus state.",
      },
      {
        id: "contrast-check",
        label: "Verify color contrast and non-color signaling",
        description:
          "Check text and interactive elements against WCAG AA contrast ratios, and confirm no information is conveyed by color alone (e.g. error states also use an icon or text label).",
      },
      {
        id: "screen-reader-pass",
        label: "Run a real screen reader pass",
        description:
          "Test the feature with a real screen reader (VoiceOver, NVDA) rather than relying solely on automated tooling — this catches issues around announcement order and interaction sense-making that automation can't evaluate.",
      },
      {
        id: "automated-gate",
        label: "Add an automated gate to CI",
        description:
          "Run an automated accessibility scan (like axe) in the existing test suite so basic regressions are caught before merge, not after a manual audit finds them later.",
      },
    ],

    realExamples: [
      {
        title: "A form with real-time validation",
        description:
          "A signup form announces validation errors to screen reader users via an ARIA live region as soon as they occur, rather than only displaying them visually — so keyboard and screen reader users get the same real-time feedback as sighted mouse users.",
      },
      {
        title: "A custom dropdown built on native select",
        description:
          "A team building a styled dropdown component starts from the native <select> element and layers custom styling on top, rather than building a fully custom widget from generic <div> elements — preserving built-in keyboard and screen reader behavior for free.",
      },
    ],

    commonMistakes: [
      {
        mistake: "Relying only on an automated scanner and treating a clean report as 'accessible'",
        consequence:
          "Automated tools miss issues like illogical reading order, unclear interaction patterns, and content that only makes sense visually — a clean automated report is necessary but not sufficient.",
      },
      {
        mistake: "Adding accessibility fixes only after a feature is already in production",
        consequence:
          "Retrofitting semantic structure or keyboard support into an already-built component is significantly more effort than building it correctly the first time, since the underlying markup often needs to change.",
      },
      {
        mistake: "Using color as the only way to convey state or meaning",
        consequence:
          "Users with color vision deficiencies, and anyone in bright sunlight or a low-contrast display, lose access to information that has no non-color signal.",
      },
    ],

    relatedTechnologySlugs: ["next-js", "react-native"],
    relatedCaseStudySlugs: [],
    relatedArticleSlugs: ["validating-an-mvp"],
  },
  {
    slug: "why-shopify-plus-for-high-growth-commerce",
    title: "Why We Choose Shopify Plus for High-Growth Commerce",
    category: "shopify",
    type: "guide",
    difficulty: "Intermediate",
    readingTime: "7 min read",
    summary:
      "Shopify Plus isn't the right fit for every commerce product — here's the decision framework we actually use.",
    aiSummary:
      "Shopify Plus wins when checkout reliability and time-to-market matter more than pixel-level storefront customization; the article outlines when a fully custom stack is worth the added cost instead.",

    problem:
      "Commerce teams often default to either a fully custom stack or basic Shopify without evaluating whether Shopify Plus's specific trade-offs actually fit their growth stage and technical needs.",
    importance:
      "Choosing a commerce platform is expensive to reverse — migrating checkout and catalog systems mid-growth risks revenue during the highest-traffic periods a business will ever depend on.",
    audience: [
      "Commerce founders scaling past initial launch",
      "Engineering leads evaluating platform migrations",
      "Product teams planning a storefront rebuild",
    ],
    learningOutcomes: [
      "Understand what Shopify Plus specifically adds over standard Shopify",
      "Recognize when a fully custom stack is actually justified",
      "Evaluate the real trade-off between customization and operational reliability",
    ],

    businessContext:
      "Checkout reliability during peak traffic (product launches, sales events) directly determines revenue — a platform choice that trades some storefront customization for proven checkout reliability at scale is often the financially correct decision, even though it feels like a limitation.",
    engineeringContext:
      "Shopify Plus provides a managed, battle-tested checkout and a Storefront API that supports fully custom frontends via Hydrogen (built on Remix) — meaning teams no longer have to choose between full design control and platform reliability the way older commerce platforms forced them to.",
    realWorldRelevance:
      "High-growth commerce businesses frequently choose Shopify Plus specifically because engineering time is better spent on differentiated product and merchandising experiences than on rebuilding commodity infrastructure like checkout and payment processing.",

    coreConcepts: [
      {
        term: "Managed checkout vs. custom checkout",
        explanation:
          "Shopify Plus's checkout is managed, PCI-compliant, and built to handle extreme traffic spikes reliably — customizing it is more limited than a fully custom checkout, but that limitation is exactly what removes an entire category of scaling and compliance risk from the team's responsibility.",
      },
      {
        term: "Headless commerce via Hydrogen and the Storefront API",
        explanation:
          "Teams that need full frontend design control aren't limited to Shopify's theme system — Hydrogen (a Remix-based framework) and the Storefront API allow a completely custom storefront while still relying on Shopify's backend and checkout.",
      },
      {
        term: "Total cost of ownership vs. platform fees",
        explanation:
          "Shopify Plus's platform and transaction fees are a real, visible cost — but the comparison should include the engineering cost of building and maintaining equivalent checkout reliability, PCI compliance, and peak-traffic infrastructure independently.",
      },
    ],

    walkthrough: [
      {
        id: "assess-scale",
        label: "Assess real traffic and growth stage",
        description:
          "Estimate peak traffic events (launches, sales) realistically — the value of managed checkout reliability scales directly with how costly downtime during those events would be.",
      },
      {
        id: "assess-customization",
        label: "Assess actual customization needs",
        description:
          "Distinguish between storefront design customization (well supported via Hydrogen/theme system) and checkout customization (deliberately limited on Shopify Plus) — many teams overestimate how much checkout customization they actually need.",
      },
      {
        id: "model-total-cost",
        label: "Model total cost, not just platform fees",
        description:
          "Compare Shopify Plus's fees against the fully-loaded cost of building and maintaining equivalent infrastructure independently, including the ongoing engineering time to keep it reliable.",
      },
      {
        id: "decide-architecture",
        label: "Decide on headless vs. themed storefront",
        description:
          "Choose a themed storefront for faster time-to-market with less engineering investment, or a headless Hydrogen storefront when full design control justifies the added engineering effort.",
      },
    ],

    realExamples: [
      {
        title: "A high-traffic flash-sale retailer",
        description:
          "A retailer running frequent flash sales adopts Shopify Plus specifically for checkout reliability during traffic spikes that would otherwise require a dedicated infrastructure team to handle safely.",
      },
      {
        title: "A brand-led storefront on Hydrogen",
        description:
          "A commerce brand with strong design requirements builds a fully custom storefront using Hydrogen and the Storefront API, keeping Shopify Plus's checkout and backend while controlling every pixel of the shopping experience.",
      },
    ],

    commonMistakes: [
      {
        mistake:
          "Choosing a fully custom stack before checkout reliability has ever been tested at real peak load",
        consequence:
          "Building and validating custom checkout infrastructure under genuine peak traffic is a significant undertaking that many teams underestimate until their first real high-traffic event exposes the gap.",
      },
      {
        mistake: "Assuming Shopify Plus means giving up all frontend control",
        consequence:
          "Teams sometimes rule out Shopify Plus based on outdated assumptions about theme limitations, without evaluating Hydrogen and the Storefront API's actual headless capabilities.",
      },
      {
        mistake: "Ignoring transaction fee structure at scale when comparing total cost",
        consequence:
          "Per-transaction fees that look negligible at low volume can become a material cost line at high volume, and should be modeled against realistic growth projections, not current revenue.",
      },
    ],

    relatedTechnologySlugs: ["remix", "shopify-plus"],
    relatedCaseStudySlugs: ["nova-commerce-checkout"],
    relatedArticleSlugs: [],
  },
];
