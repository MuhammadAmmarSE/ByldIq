import { FEATURE_LIBRARY, GENERAL_FEATURE_TEMPLATES } from "../data/feature-library";
import type {
  AiFeatureSuggestion,
  AiOpportunities,
  ArchitectureNode,
  BuildPathAnswers,
  BuildPathSummary,
  DiscoveryAnswers,
  EffortEstimate,
  ProblemStatement,
  Risk,
  RoadmapPhase,
  TeamRoleRecommendation,
  TechnologyRecommendation,
} from "../types";
import type { AIProvider } from "./ai-provider";
import { deriveSignals, type ProjectSignals } from "./signals";

// ---------------------------------------------------------------------------
// Discovery conversation
// ---------------------------------------------------------------------------

type DiscoveryField = keyof DiscoveryAnswers;

const DISCOVERY_FLOW: { field: DiscoveryField; ask: (answers: BuildPathAnswers) => string }[] = [
  {
    field: "accomplish",
    ask: () => "In a sentence or two — what are you trying to build or accomplish?",
  },
  {
    field: "problem",
    ask: (answers) =>
      answers.projectTypes.length > 0
        ? `Got it. What problem does this ${answers.projectTypes[0]?.toLowerCase()} actually solve for the people who'll use it?`
        : "What problem does this solve for the people who'll use it?",
  },
  {
    field: "whoExperiencesIt",
    ask: () =>
      'Who runs into this problem today, specifically? Not "everyone" — the actual people.',
  },
  {
    field: "whyNow",
    ask: () => "Why is now the right time to solve it, rather than six months from now?",
  },
  {
    field: "successLooksLike",
    ask: () => "If this works, what does success look like six months after launch?",
  },
];

function findNextDiscoveryStep(answers: BuildPathAnswers) {
  return DISCOVERY_FLOW.find((step) => answers.discovery[step.field].trim() === "");
}

function generateFollowUpQuestion(answers: BuildPathAnswers): string {
  const next = findNextDiscoveryStep(answers);
  if (next) return next.ask(answers);
  return "That gives me a solid picture. Ready to turn this into a structured problem definition?";
}

function nextDiscoveryField(answers: BuildPathAnswers): DiscoveryField | null {
  return findNextDiscoveryStep(answers)?.field ?? null;
}

// ---------------------------------------------------------------------------
// Problem Definition draft
// ---------------------------------------------------------------------------

/**
 * Turns the free-text Discovery conversation into a structured draft —
 * mostly a direct restatement of what the visitor already said, not an
 * invention. The visitor reviews and edits every field before confirming
 * (`confirmProblemStatement`); this function never runs against the store
 * directly.
 */
function draftProblemStatement(answers: BuildPathAnswers): Omit<ProblemStatement, "confirmed"> {
  const { discovery } = answers;
  return {
    problem: discovery.problem || discovery.accomplish,
    targetUsers: discovery.whoExperiencesIt,
    currentSituation: discovery.whoExperiencesIt
      ? `Today, ${discovery.whoExperiencesIt.toLowerCase()} handle this without a dedicated solution — often manually, or with tools that weren't built for it.`
      : "",
    desiredOutcome: discovery.successLooksLike,
    businessMotivation: discovery.whyNow,
    constraints: "",
  };
}

// ---------------------------------------------------------------------------
// Feature suggestions
// ---------------------------------------------------------------------------

function suggestFeatures(answers: BuildPathAnswers): AiFeatureSuggestion[] {
  const existingNames = new Set(
    [
      ...answers.features.map((feature) => feature.name),
      ...answers.aiSuggestions.map((s) => s.name),
    ].map((name) => name.toLowerCase()),
  );

  const templates = answers.projectTypes.flatMap((type) => FEATURE_LIBRARY[type] ?? []);
  const pool = templates.length > 0 ? templates : GENERAL_FEATURE_TEMPLATES;

  const seen = new Set<string>();
  const candidates = pool.filter((template) => {
    const key = template.name.toLowerCase();
    if (existingNames.has(key) || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return candidates.slice(0, 6).map((template) => ({
    id: crypto.randomUUID(),
    name: template.name,
    description: template.description,
    reason: template.reason,
    status: "pending" as const,
  }));
}

// ---------------------------------------------------------------------------
// Architecture
// ---------------------------------------------------------------------------

function node(partial: Omit<ArchitectureNode, "id">): ArchitectureNode {
  return { id: partial.label.toLowerCase().replace(/[^a-z0-9]+/g, "-"), ...partial };
}

function generateArchitecture(answers: BuildPathAnswers): ArchitectureNode[] {
  const s = deriveSignals(answers);
  const nodes: ArchitectureNode[] = [];

  nodes.push(
    node({
      label: "Web App",
      category: "Client",
      what: "The web interface visitors and users interact with directly.",
      why: "Every product in this plan needs at least one interface, and the web reaches every device from a single codebase.",
      alternative: "A native-only experience that skips a web app entirely.",
      tradeOff:
        "A web app reaches every device instantly, but can't match a native app's offline behavior or platform-specific gestures.",
      costConsideration:
        "Lower than maintaining separate native apps — one codebase, one deployment pipeline.",
      scalingConsideration:
        "Scales by serving static assets from a CDN and rendering pages at the edge as traffic grows.",
      technologySlug: "next-js",
    }),
  );

  if (s.isMobile) {
    nodes.push(
      node({
        label: "Mobile App",
        category: "Client",
        what: "A native-feeling mobile app for iOS and Android.",
        why: "This product was flagged as needing a dedicated mobile experience, not just a responsive website.",
        alternative:
          "Two fully separate native codebases (Swift + Kotlin) instead of one cross-platform codebase.",
        tradeOff:
          "Cross-platform reaches both app stores from one codebase, at the cost of occasionally needing native modules for platform-specific features.",
        costConsideration:
          "Meaningfully higher than web-only — app store review cycles and device testing both add ongoing cost.",
        scalingConsideration:
          "Scaling here is mostly about release cadence and device coverage, not server capacity.",
        technologySlug: "react-native",
      }),
    );
  }

  nodes.push(
    node({
      label: "API Layer",
      category: "Application",
      what: "The service that enforces business rules, checks authentication, and talks to the database on behalf of the client.",
      why: "Keeps business logic and data access out of the client, where it could be bypassed or tampered with.",
      alternative: "A serverless function per endpoint instead of one cohesive API service.",
      tradeOff:
        "One API service is simpler to reason about early on; serverless functions scale to zero but add cold-start latency and more moving parts to monitor.",
      costConsideration:
        "Usage-based at low volume; predictable once traffic patterns are understood.",
      scalingConsideration:
        "Add horizontal scaling behind a load balancer, and read replicas for the database, as request volume grows.",
    }),
  );

  nodes.push(
    node({
      label: "Database",
      category: "Data",
      what: "The system of record for the product's data.",
      why: "Most product data — accounts, records, permissions — is naturally relational, and a relational database gives strong consistency guarantees without giving up flexibility.",
      alternative: "MongoDB or another document database.",
      tradeOff:
        "A relational database enforces structure up front, which pays off once multiple parts of the product depend on the same data being consistent; a document database is more forgiving of a schema that's still changing.",
      costConsideration:
        "Managed Postgres hosting scales cost roughly with storage and connections, not raw usage.",
      scalingConsideration:
        "Read replicas, connection pooling, and (later) partitioning handle most growth without a rewrite.",
      technologySlug: "postgresql",
    }),
  );

  if (s.needsAuth) {
    nodes.push(
      node({
        label: "Authentication",
        category: "Identity",
        what: "Handles sign-up, sign-in, and session management.",
        why: "This product needs to know who's using it — whether for personalization, permissions, or billing.",
        alternative:
          "A hand-rolled auth service with sessions and OAuth providers wired up manually.",
        tradeOff:
          "A managed auth provider ships faster and offloads security-sensitive code; a hand-rolled service offers full control at the cost of owning every edge case yourself.",
        costConsideration:
          "Usually priced per monthly active user — cheap early, worth revisiting once usage is high.",
        scalingConsideration:
          "Managed providers scale transparently; the main scaling concern is session storage under high concurrency.",
        technologySlug: "supabase",
      }),
    );
  }

  if (s.needsPayments) {
    nodes.push(
      node({
        label: "Payments",
        category: "Commerce",
        what: "Processes payments and keeps billing state in sync.",
        why: "This product involves money changing hands, directly or via subscriptions.",
        alternative: "Handling card data directly instead of delegating to a payment processor.",
        tradeOff:
          "Delegating to a processor (e.g. Stripe) keeps PCI compliance scope small; handling cards directly gives more control but brings serious compliance obligations most teams shouldn't take on.",
        costConsideration:
          "Per-transaction fees, but effectively zero fixed cost until revenue exists.",
        scalingConsideration:
          "Payment processors scale with you — the harder scaling problem is usually reconciliation and refund handling in your own systems.",
      }),
    );
  }

  if (s.isCommerce) {
    nodes.push(
      node({
        label: "Commerce Platform",
        category: "Commerce",
        what: "Product catalog, cart, checkout, and order management.",
        why: "Purpose-built commerce platforms handle a long list of edge cases (tax, inventory, discounts) that are expensive to rebuild from scratch.",
        alternative: "A fully custom headless commerce build.",
        tradeOff:
          "A platform like Shopify gets you to a reliable checkout fast; a fully custom build offers unlimited flexibility at a much higher build and maintenance cost.",
        costConsideration:
          "Platform + transaction fees, but far less engineering time than building checkout, tax, and inventory from scratch.",
        scalingConsideration:
          "Commerce platforms are built to handle traffic spikes (sales, launches) that a custom build would need to be specifically engineered for.",
        technologySlug: "shopify-plus",
      }),
    );
  }

  if (s.needsStorage) {
    nodes.push(
      node({
        label: "File Storage",
        category: "Data",
        what: "Stores and serves user-uploaded or generated files (images, documents, exports).",
        why: "Files don't belong in the primary database — they need their own storage and delivery path.",
        alternative: "Storing files directly in the database as binary blobs.",
        tradeOff:
          "Object storage is built for this and serves files efficiently via a CDN; storing files in the database bloats it and slows down unrelated queries.",
        costConsideration:
          "Priced per GB stored and served — low until file volume or traffic gets large.",
        scalingConsideration:
          "Object storage scales natively; the main lever is CDN caching for frequently accessed files.",
        technologySlug: "supabase",
      }),
    );
  }

  if (s.needsSearch) {
    nodes.push(
      node({
        label: "Search Index",
        category: "Data",
        what: "A dedicated index that powers fast, relevant search across the product's content.",
        why: "Database queries with `LIKE` clauses degrade quickly and don't rank results by relevance.",
        alternative:
          "Querying the primary database directly instead of maintaining a separate index.",
        tradeOff:
          "A dedicated search index (e.g. a hosted search service) stays fast as content grows, at the cost of keeping it in sync with the primary database.",
        costConsideration:
          "Usually priced by index size and query volume — a real but modest line item.",
        scalingConsideration:
          "Purpose-built search indexes are designed to scale with content volume; the primary database usually isn't.",
      }),
    );
  }

  if (s.isAutomation) {
    nodes.push(
      node({
        label: "Background Jobs",
        category: "Application",
        what: "Runs automated workflows and scheduled tasks outside the request/response cycle.",
        why: "This product is built around automation, which by definition happens without a user waiting on a page.",
        alternative: "Cron-triggered batch jobs instead of an event-driven queue.",
        tradeOff:
          "An event-driven queue reacts immediately and handles failures with retries; scheduled batch jobs are simpler to build but introduce delay and are harder to reason about when something fails mid-batch.",
        costConsideration:
          "Usage-based on job volume — negligible early, worth monitoring as automation volume grows.",
        scalingConsideration:
          "Queue-based systems scale by adding workers; the constraint is usually the downstream systems the jobs call, not the queue itself.",
      }),
    );
  }

  if (s.isAiProduct || s.featuresSuggestAi) {
    nodes.push(
      node({
        label: "AI / LLM Layer",
        category: "AI",
        what: "Handles calls to a language model, including prompt construction and response handling.",
        why: "This product's value depends on generating, understanding, or classifying content that no fixed set of rules can cover.",
        alternative:
          "Training and hosting a custom model instead of calling a hosted provider's API.",
        tradeOff:
          "A hosted model ships faster and improves as the provider improves it; a custom model offers more control and can be cheaper at very high volume, but demands ML expertise most teams don't have yet.",
        costConsideration:
          "Usage-based on tokens processed — can grow quickly with usage, so cost monitoring from day one matters.",
        scalingConsideration:
          "Add caching for repeated queries and rate limiting per user before scaling raw request volume.",
        technologySlug: "openai",
      }),
    );
  }

  if (s.isEnterprise) {
    nodes.push(
      node({
        label: "Infrastructure as Code",
        category: "Infrastructure",
        what: "Cloud infrastructure defined in version-controlled configuration rather than clicked together manually.",
        why: "Enterprise systems need reproducible, auditable environments — especially once compliance requirements enter the picture.",
        alternative: "Manually configuring cloud resources through a provider's console.",
        tradeOff:
          "Infrastructure as code is slower to set up initially but makes environments reproducible, reviewable, and far easier to recover if something breaks.",
        costConsideration:
          "No direct cost — the investment is engineering time, repaid the first time an environment needs to be rebuilt.",
        scalingConsideration:
          "Makes it straightforward to stand up identical staging/production environments as the system grows.",
        technologySlug: "terraform",
      }),
    );
  }

  nodes.push(
    node({
      label: s.isEnterprise ? "Container Orchestration" : "Hosting Platform",
      category: "Infrastructure",
      what: s.isEnterprise
        ? "Runs and coordinates the application's services across a cluster of machines."
        : "Runs, deploys, and serves the application without managing servers directly.",
      why: s.isEnterprise
        ? "At enterprise scale, running multiple coordinated services benefits from an orchestration layer that handles failover and rolling deploys."
        : "A managed hosting platform removes most operational overhead, which matters most before the team has dedicated infrastructure engineers.",
      alternative: s.isEnterprise
        ? "A managed platform instead of self-managed orchestration."
        : "Self-managed servers or container orchestration.",
      tradeOff: s.isEnterprise
        ? "Full orchestration gives complete control over scaling and deployment, at the cost of real operational overhead and specialized expertise."
        : "A managed platform trades some control for a much smaller operational burden — usually the right trade early on.",
      costConsideration: s.isEnterprise
        ? "Higher fixed operational cost, offset by control over resource usage at scale."
        : "Usage-based and predictable at low-to-moderate traffic; can become more expensive than self-managed infrastructure at very high scale.",
      scalingConsideration: s.isEnterprise
        ? "Designed for horizontal scaling and zero-downtime deploys across many services."
        : "Scales automatically for most workloads; revisit only once traffic patterns justify the added complexity of managing it yourself.",
      technologySlug: s.isEnterprise ? "kubernetes" : undefined,
    }),
  );

  nodes.push(
    node({
      label: "Monitoring & Observability",
      category: "Infrastructure",
      what: "Tracks errors, performance, and system health in production.",
      why: "Problems that aren't monitored are problems your users find before you do.",
      alternative: "Relying on user reports instead of proactive monitoring.",
      tradeOff:
        "Proactive monitoring costs a small amount of setup time and a monthly fee; the alternative is finding out about outages from support tickets.",
      costConsideration: "Typically a fixed, modest monthly cost regardless of project size.",
      scalingConsideration:
        "Monitoring needs grow with system complexity, not directly with traffic — add tracing once multiple services are involved.",
    }),
  );

  return nodes;
}

// ---------------------------------------------------------------------------
// Technology stack
// ---------------------------------------------------------------------------

function generateTechnologyStack(answers: BuildPathAnswers): TechnologyRecommendation[] {
  const s = deriveSignals(answers);
  const stack: TechnologyRecommendation[] = [
    {
      category: "Frontend",
      recommended: "Next.js",
      recommendedSlug: "next-js",
      alternative: "Remix",
      why: "Server-rendered by default, which keeps the product fast and discoverable without extra work, and a large enough ecosystem that hiring for it later isn't a bottleneck.",
    },
    {
      category: "Database",
      recommended: "PostgreSQL",
      recommendedSlug: "postgresql",
      alternative: "MongoDB",
      why: "Most product data here — accounts, records, relationships — is naturally relational, and PostgreSQL gives strong consistency without giving up flexibility (JSONB columns cover document-style needs too).",
    },
  ];

  stack.push(
    s.isEnterprise
      ? {
          category: "Backend",
          recommended: "A dedicated backend service (Node.js)",
          alternative: "Supabase",
          why: "Enterprise systems usually need custom authorization rules, audit trails, and integration with an existing identity provider — a dedicated service gives that control. Supabase remains a fast way to prototype before committing.",
        }
      : {
          category: "Backend",
          recommended: "Supabase",
          recommendedSlug: "supabase",
          alternative: "A custom Node.js service",
          why: "Bundles authentication, storage, and a Postgres database behind one API, which meaningfully shortens the path to a working backend for a first version.",
        },
  );

  if (s.isMobile) {
    stack.push({
      category: "Mobile",
      recommended: "React Native",
      recommendedSlug: "react-native",
      alternative: "Two native codebases (Swift + Kotlin)",
      why: "Reaches iOS and Android from one codebase, sharing logic with the web app where useful — worth the occasional native module for platform-specific features.",
    });
  }

  if (s.isCommerce) {
    stack.push({
      category: "Commerce",
      recommended: "Shopify Plus",
      recommendedSlug: "shopify-plus",
      alternative: "A fully custom headless commerce build",
      why: "Handles checkout, tax, and inventory edge cases that are expensive to rebuild from scratch, while still allowing a fully custom storefront on top.",
    });
  }

  if (s.isAiProduct || s.featuresSuggestAi) {
    stack.push({
      category: "AI",
      recommended: "OpenAI",
      recommendedSlug: "openai",
      alternative: "A self-hosted open-source model",
      why: "Ships fastest and improves as the provider improves it — worth revisiting only if cost at very high volume or data residency requirements make self-hosting necessary.",
    });
    if (s.isAiProduct) {
      stack.push({
        category: "AI Orchestration",
        recommended: "LangChain",
        recommendedSlug: "langchain",
        alternative: "Hand-rolled prompt orchestration",
        why: "Useful once a product needs multiple chained AI calls, retrieval, or tool use — for a single simple prompt, hand-rolled orchestration can be simpler.",
      });
    }
  }

  stack.push(
    s.isEnterprise
      ? {
          category: "Infrastructure",
          recommended: "Kubernetes",
          recommendedSlug: "kubernetes",
          alternative: "A managed platform (Vercel/Render)",
          why: "Enterprise-scale systems benefit from the control Kubernetes gives over scaling and deployment, at the cost of real operational overhead.",
        }
      : {
          category: "Infrastructure",
          recommended: "A managed platform (Vercel)",
          alternative: "Kubernetes",
          why: "Removes most operational overhead, which matters most before the team has dedicated infrastructure engineers — worth revisiting once scale or compliance needs grow.",
        },
  );

  if (s.isEnterprise) {
    stack.push({
      category: "DevOps",
      recommended: "Terraform",
      recommendedSlug: "terraform",
      alternative: "Manually configured cloud consoles",
      why: "Makes environments reproducible and auditable — a real requirement once compliance and multiple environments enter the picture.",
    });
  }

  return stack;
}

// ---------------------------------------------------------------------------
// AI opportunities
// ---------------------------------------------------------------------------

function generateAiOpportunities(answers: BuildPathAnswers): AiOpportunities {
  const s = deriveSignals(answers);
  const aiRelatedFeatures = answers.features.filter((feature) =>
    /search|recommend|chat|summar|classif|predict|assist|generat/i.test(
      `${feature.name} ${feature.description}`,
    ),
  );

  if (!s.isAiProduct && !s.featuresSuggestAi && !s.isAutomation) {
    return {
      relevant: false,
      summary:
        "Nothing described so far points to a genuine AI opportunity, and adding one here would mean solving a problem this product doesn't have yet. That's fine — plenty of strong products ship without it.",
      useCases: [],
      modelRequirements: "",
      needsRag: false,
      needsAgents: false,
      needsToolCalling: false,
      needsVectorSearch: false,
      evaluation: "Not applicable — no AI component is currently planned.",
      guardrails: "Not applicable.",
      dataPrivacy: "Not applicable.",
      humanReview: "Not applicable.",
    };
  }

  const useCases =
    aiRelatedFeatures.length > 0
      ? aiRelatedFeatures.map((feature) => feature.name)
      : s.isCommerce
        ? ["Personalized product recommendations"]
        : s.isAutomation
          ? ["Intelligent routing of automated workflow decisions"]
          : ["Assisting users with a task the product already performs manually"];

  const needsRag = /search|knowledge|document|chat/i.test(
    useCases.join(" ") + " " + answers.discovery.accomplish,
  );
  const needsAgents = s.isAutomation || /agent|workflow|automat/i.test(useCases.join(" "));

  return {
    relevant: true,
    summary: s.isAiProduct
      ? "AI is central to this product, not an add-on — the plan below treats it as a first-class part of the architecture, not a feature bolted on afterward."
      : "There's a real, if smaller, AI opportunity here — worth building deliberately rather than skipping or overbuilding.",
    useCases,
    modelRequirements: needsRag
      ? "A general-purpose language model plus a retrieval layer over the product's own content."
      : "A general-purpose language model is sufficient — no fine-tuning needed to start.",
    needsRag,
    needsAgents,
    needsToolCalling: needsAgents,
    needsVectorSearch: needsRag,
    evaluation:
      "Every AI feature ships with a small evaluation set of real (or realistic) inputs and expected outcomes before it reaches users, re-run whenever the prompt or model changes.",
    guardrails:
      "Rate limits, content boundaries, and a fallback path for when the model is unavailable or returns something unusable.",
    dataPrivacy:
      "Only the minimum data needed reaches the model — nothing sensitive is sent to a third-party provider without an explicit data processing agreement.",
    humanReview:
      "A person reviews a sample of AI outputs regularly, especially early on, rather than assuming accuracy holds indefinitely.",
  };
}

// ---------------------------------------------------------------------------
// Roadmap
// ---------------------------------------------------------------------------

function coreBuildTimeline(mustHaveCount: number): string {
  if (mustHaveCount <= 3) return "3–5 weeks";
  if (mustHaveCount <= 6) return "5–8 weeks";
  return "8–12 weeks";
}

function generateRoadmap(answers: BuildPathAnswers): RoadmapPhase[] {
  const mustHave = answers.features.filter((f) => f.priority === "must").map((f) => f.name);
  const shouldHave = answers.features.filter((f) => f.priority === "should").map((f) => f.name);

  return [
    {
      phase: 1,
      name: "Discovery & Planning",
      goals: ["Validate the problem with real users or data", "Finalize scope for Version 1"],
      features: [],
      engineeringWork: [
        "Technical spike on the riskiest architecture assumption",
        "Environment and CI/CD setup",
      ],
      dependencies: [],
      deliverables: ["Confirmed problem definition", "Prioritized feature list"],
      timelineRangeLabel: "1–2 weeks",
    },
    {
      phase: 2,
      name: "Foundation & Architecture",
      goals: ["Stand up the core technical foundation"],
      features: [],
      engineeringWork: [
        "Authentication",
        "Database schema",
        "Base API structure",
        "CI/CD pipeline",
      ],
      dependencies: ["Phase 1 scope sign-off"],
      deliverables: ["A deployable skeleton application"],
      timelineRangeLabel: "2–3 weeks",
    },
    {
      phase: 3,
      name: "Core Build (MVP)",
      goals: ["Ship every must-have feature"],
      features: mustHave,
      engineeringWork: ["Feature implementation", "Unit and integration tests as features land"],
      dependencies: ["Phase 2 foundation"],
      deliverables: ["A working, testable Version 1"],
      timelineRangeLabel: coreBuildTimeline(mustHave.length),
    },
    {
      phase: 4,
      name: "Testing & Hardening",
      goals: ["Validate against real usage patterns", "Close accessibility and security gaps"],
      features: [],
      engineeringWork: [
        "End-to-end testing",
        "Accessibility audit",
        "Performance pass",
        "Security review",
      ],
      dependencies: ["Phase 3 feature-complete build"],
      deliverables: ["A release-candidate build"],
      timelineRangeLabel: "1–2 weeks",
    },
    {
      phase: 5,
      name: "Launch",
      goals: ["Ship Version 1 to real users"],
      features: [],
      engineeringWork: [
        "Production deployment",
        "Monitoring and alerting in place",
        "Rollback plan confirmed",
      ],
      dependencies: ["Phase 4 release-candidate sign-off"],
      deliverables: ["A live product"],
      timelineRangeLabel: "About 1 week",
    },
    {
      phase: 6,
      name: "Growth & Iteration",
      goals: ["Learn from real usage", "Prioritize what's next"],
      features: shouldHave,
      engineeringWork: ["Usage analytics review", "Iteration based on real feedback"],
      dependencies: ["Phase 5 launch"],
      deliverables: ["A prioritized backlog for the next phase"],
      timelineRangeLabel: "Ongoing",
    },
  ];
}

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

function generateTeamRecommendation(answers: BuildPathAnswers): TeamRoleRecommendation[] {
  const s = deriveSignals(answers);
  const team: TeamRoleRecommendation[] = [
    {
      role: "Product Manager / Strategist",
      responsibility: "Shapes scope and keeps the roadmap honest against real constraints.",
      involvement: "Part-time throughout, more involved during Discovery and Planning.",
    },
    {
      role: "Product Designer",
      responsibility: "Interaction and visual design, usability across the core flows.",
      involvement: "Full-time through Discovery and Foundation, part-time after.",
    },
    {
      role: "Frontend Engineer",
      responsibility: "Builds the client experience and integrates with the API.",
      involvement: "Full-time from Foundation through Launch.",
    },
    {
      role: "Backend Engineer",
      responsibility: "Builds the API, data layer, and third-party integrations.",
      involvement: "Full-time from Foundation through Launch.",
    },
    {
      role: "QA / Test Engineer",
      responsibility: "Owns test coverage and the release-readiness bar.",
      involvement: "Part-time throughout, full-time ahead of Launch.",
    },
  ];

  if (s.isMobile) {
    team.push({
      role: "Mobile Engineer",
      responsibility: "Builds and maintains the iOS/Android app.",
      involvement: "Full-time from Foundation through Launch.",
    });
  }

  if (s.isAiProduct || s.featuresSuggestAi) {
    team.push({
      role: "AI Engineer",
      responsibility: "Designs prompts, evaluates model outputs, and builds guardrails.",
      involvement: "Full-time once AI features begin implementation.",
    });
  }

  if (s.isEnterprise) {
    team.push({
      role: "DevOps / Platform Engineer",
      responsibility: "Infrastructure, security posture, and compliance requirements.",
      involvement: "Part-time throughout, full-time during Foundation.",
    });
  }

  return team;
}

// ---------------------------------------------------------------------------
// Effort estimate
// ---------------------------------------------------------------------------

const EFFORT_BY_COMPLEXITY: Record<
  EffortEstimate["complexity"],
  Omit<EffortEstimate, "complexity">
> = {
  Low: {
    teamSizeRange: "2–3 people",
    durationRange: "6–10 weeks",
    effortRangeLabel:
      "This sits in our smallest engagement range — a focused scope, one integrated team.",
  },
  Medium: {
    teamSizeRange: "3–5 people",
    durationRange: "10–16 weeks",
    effortRangeLabel:
      "A mid-sized build — enough moving parts to need dedicated frontend and backend ownership.",
  },
  High: {
    teamSizeRange: "5–8 people",
    durationRange: "4–7 months",
    effortRangeLabel:
      "A substantial build — expect dedicated specialists (AI, mobile, and/or platform) alongside the core team.",
  },
  "Very High": {
    teamSizeRange: "8+ people, multiple workstreams",
    durationRange: "7–12+ months",
    effortRangeLabel:
      "Enterprise-scale — this typically runs as several coordinated workstreams rather than one team.",
  },
};

function complexityScore(s: ProjectSignals): number {
  let score = 0;
  if (s.isEnterprise) score += 1;
  if (s.isAiProduct) score += 1;
  if (s.isMobile) score += 1;
  if (s.isCommerce) score += 1;
  if (s.integrations.length >= 3) score += 1;
  score += Math.floor(s.mustHaveFeatureCount / 3);
  return score;
}

function generateEffortEstimate(answers: BuildPathAnswers): EffortEstimate {
  const score = complexityScore(deriveSignals(answers));
  const complexity: EffortEstimate["complexity"] =
    score >= 6 ? "Very High" : score >= 4 ? "High" : score >= 2 ? "Medium" : "Low";
  return { complexity, ...EFFORT_BY_COMPLEXITY[complexity] };
}

// ---------------------------------------------------------------------------
// Risks
// ---------------------------------------------------------------------------

function generateRisks(answers: BuildPathAnswers): Risk[] {
  const s = deriveSignals(answers);
  const risks: Risk[] = [
    {
      id: crypto.randomUUID(),
      category: "Technical",
      risk: "Nothing has been built yet, so every estimate in this plan is directional, not a commitment.",
      probability: "Medium",
      impact: "Medium",
      mitigation:
        "Revisit estimates after Phase 1 (Discovery & Planning) once real technical spikes are done.",
    },
    {
      id: crypto.randomUUID(),
      category: "Product",
      risk: answers.discovery.successLooksLike
        ? "Success criteria exist but haven't been validated with real users or data yet."
        : "Success metrics aren't defined yet, making it hard to tell whether Version 1 actually worked.",
      probability: answers.discovery.successLooksLike ? "Low" : "Medium",
      impact: "Medium",
      mitigation: "Agree on two or three measurable success signals before development starts.",
    },
    {
      id: crypto.randomUUID(),
      category: "Scalability",
      risk: "Actual usage at scale is unknown until the product is live.",
      probability: "Low",
      impact: "Medium",
      mitigation:
        "The architecture in this plan keeps scaling options open without over-engineering for traffic that may not materialize.",
    },
  ];

  if (s.mustHaveFeatureCount > 8) {
    risks.push({
      id: crypto.randomUUID(),
      category: "Timeline",
      risk: "The must-have feature list is large enough that it will likely slip if nothing gets cut.",
      probability: "High",
      impact: "High",
      mitigation:
        "Re-sort features into must/should/could before locking the roadmap — a Version 1 with 6–8 must-haves ships faster and still validates the core idea.",
    });
  }

  if (s.isEnterprise) {
    risks.push({
      id: crypto.randomUUID(),
      category: "Security",
      risk: "Compliance and data-handling requirements common to enterprise systems (audit trails, access control, data residency) aren't specified yet.",
      probability: "Medium",
      impact: "High",
      mitigation:
        "Confirm specific compliance requirements (SOC 2, GDPR, HIPAA, or similar) before finalizing the architecture.",
    });
  }

  if (s.integrations.length >= 3) {
    risks.push({
      id: crypto.randomUUID(),
      category: "Integration",
      risk: "Multiple third-party integrations each add a dependency the team doesn't fully control.",
      probability: "Medium",
      impact: "Medium",
      mitigation:
        "Build and test against sandbox environments for each integration early, and design for graceful degradation if one goes down.",
    });
  }

  if (s.isAiProduct || s.featuresSuggestAi) {
    risks.push({
      id: crypto.randomUUID(),
      category: "AI",
      risk: "Model outputs can be inconsistent or wrong in ways that are hard to catch automatically.",
      probability: "Medium",
      impact: "Medium",
      mitigation:
        "Ship with a small evaluation set, human review of a sample of outputs, and a clear fallback for when the model is unavailable or low-confidence.",
    });
  }

  if (s.needsPayments) {
    risks.push({
      id: crypto.randomUUID(),
      category: "Security",
      risk: "Handling payments increases compliance scope (PCI) even when using a processor.",
      probability: "Low",
      impact: "High",
      mitigation:
        "Use a PCI-compliant processor rather than handling card data directly, and keep card data out of your own systems entirely.",
    });
  }

  return risks;
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

function generateSummary(answers: BuildPathAnswers): BuildPathSummary {
  return {
    vision:
      answers.discovery.accomplish ||
      answers.problemStatement.desiredOutcome ||
      "A product plan is taking shape — the more you share, the sharper this gets.",
    problem: answers.problemStatement.problem || answers.discovery.problem || "Not defined yet.",
    mvpFeatureNames: answers.features.filter((f) => f.priority === "must").map((f) => f.name),
    nextSteps: [
      "Review this plan with your team.",
      "Ask Byld about anything that doesn't look right — recommendations here are a starting point, not a final answer.",
      "Book a discovery call to pressure-test the roadmap with an engineer.",
      "Export this plan to share it with stakeholders.",
    ],
  };
}

// ---------------------------------------------------------------------------

/**
 * Deterministic, rule-based implementation of `AIProvider`. Every method
 * reasons from `deriveSignals` and the visitor's actual answers — no
 * network calls, no randomness beyond `crypto.randomUUID()` for IDs. A
 * real LLM-backed provider implements the same interface later.
 */
export const mockAIProvider: AIProvider = {
  generateFollowUpQuestion,
  nextDiscoveryField,
  draftProblemStatement,
  suggestFeatures,
  generateArchitecture,
  generateTechnologyStack,
  generateAiOpportunities,
  generateRoadmap,
  generateTeamRecommendation,
  generateEffortEstimate,
  generateRisks,
  generateSummary,
};
