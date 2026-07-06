import type { Technology } from "./technology.schema";

/**
 * CLAUDE.md Part 22's Technology Explorer: general engineering education,
 * not a record of Byld IQ's own work. Unlike Solutions and Case Studies,
 * this content isn't scoped to "technologies we've used" — it's scoped to
 * "honest, accurate engineering knowledge a visitor can act on." Eleven
 * technologies, chosen because every one of them is already named
 * somewhere real on this site (a Solution's stack, a Case Study's
 * technology decisions, or both) — nothing here is a brand-new mention
 * invented for this platform alone. Two genuine comparison pairs exist in
 * this roster (Next.js vs Remix, PostgreSQL vs MongoDB) for the
 * Comparison Engine; more technologies can be added as real projects
 * warrant them, per each category's own "expandable" note in
 * `categories.ts`.
 */
export const TECHNOLOGIES: Technology[] = [
  {
    slug: "next-js",
    name: "Next.js",
    category: "frontend",
    tagline:
      "A React framework for production — server rendering, routing, and data fetching in one toolchain.",
    maturity:
      "Mature — in production use since 2016, with the App Router (Server Components, streaming) stable since 2023.",
    learningCurve:
      "Moderate for teams already comfortable with React; the rendering model (Server vs Client Components, streaming, caching) takes real time to internalize correctly.",
    typicalProjects: [
      "Marketing sites and SaaS products that need strong SEO",
      "Full-stack products where Server Actions replace a separate backend for simple needs",
      "Products that mix static, server-rendered, and client-rendered pages",
    ],
    businessFit:
      "Fits organizations that need fast initial page loads and search visibility without standing up a separate backend team.",
    engineeringFit:
      "Fits teams already comfortable with React who want server rendering, file-based routing, and built-in optimization without assembling those pieces themselves.",
    businessProblem:
      "Client-side-only React apps are slow to first paint and largely invisible to search engines until JavaScript executes — a real cost for products that depend on organic discovery or fast perceived load.",
    whyOrganizationsAdopt:
      "Next.js renders pages on the server (or at build time), so content is visible and indexable immediately, while still giving developers the full React component model for interactivity.",
    whoBenefits:
      "Marketing and content teams get real SEO; product teams get one framework instead of assembling a router, a bundler, and a rendering layer themselves.",
    strengths: [
      {
        label: "Server Components by default",
        description:
          "Data fetching and rendering happen on the server, shipping less JavaScript to the browser than a client-only React app.",
      },
      {
        label: "File-based routing",
        description:
          "Routes, layouts, loading, and error states map directly onto the file system — no separate router configuration to maintain.",
      },
      {
        label: "Built-in optimization",
        description:
          "Image, font, and script optimization ship out of the box — work most teams would otherwise hand-roll or skip entirely.",
      },
      {
        label: "First-class deployment story",
        description:
          "Edge and serverless deployment targets are treated as primary, not bolted on after the fact.",
      },
    ],
    weaknesses: [
      {
        label: "Rendering model complexity",
        description:
          "Server vs Client Component boundaries, streaming, and caching semantics take real time to learn — getting them wrong silently ships more JavaScript than necessary.",
      },
      {
        label: "Framework-specific conventions",
        description:
          "App Router file naming and special exports are Next.js-specific; migrating away later means rewriting routing and data fetching, not swapping a library.",
      },
      {
        label: "Evolving conventions between versions",
        description:
          "The App Router's caching and revalidation behavior has changed across major versions, requiring teams to re-read release notes rather than assume stability.",
      },
    ],
    tradeOff: {
      bestFor: [
        "Products where SEO or fast first paint materially affects the business",
        "Teams who want one framework instead of assembling routing, bundling, and rendering separately",
        "Products that benefit from mixing static, server-rendered, and client-rendered pages",
      ],
      avoidWhen: [
        "Building a pure internal tool behind auth where SEO is irrelevant and a client-only SPA is simpler",
        "The team has no React experience and a simpler server-rendered framework would have a shorter ramp-up",
        "The project needs build-pipeline customization that Next.js's conventions don't accommodate",
      ],
      alternatives: [
        "Remix",
        "A plain Vite + React SPA",
        "Astro (for content-heavy, mostly-static sites)",
      ],
      cost: "Open source; hosting is usage-based on most platforms, with free tiers for early-stage traffic.",
      complexity:
        "Low for simple pages, moderate to high once Server Components, streaming, and caching enter the picture.",
      teamSize:
        "Scales from a solo developer to large teams — route groups and layouts hold up as the app grows.",
      scalability:
        "Scales well for both traffic (edge/serverless deployment) and codebase size (route groups, layouts).",
    },
    architecture: [
      {
        id: "client",
        label: "Client",
        description:
          "Browser requests a page, receives server-rendered HTML immediately, then hydrates for interactivity.",
      },
      {
        id: "nextjs",
        label: "Next.js",
        description: "Handles routing, rendering strategy, and Server Actions in one process.",
      },
      {
        id: "server-actions",
        label: "Server Actions",
        description:
          "Perform mutations and server-side data fetching without a separate backend service.",
      },
      {
        id: "database",
        label: "Database",
        description:
          "Typically PostgreSQL or a managed Postgres platform, queried from Server Components or Server Actions.",
      },
      {
        id: "cdn",
        label: "CDN / Edge",
        description:
          "Static assets and cached pages are served from the edge, close to the visitor.",
      },
    ],
    performance:
      "Server Components reduce client JavaScript by default; streaming lets slow, data-dependent sections render after the fast parts of a page. Real-world latency depends more on where data is fetched from relative to the deployment region than on the framework itself — colocating the database and the rendering region matters.",
    security:
      "Server Actions and Route Handlers run genuinely server-side, so secrets and direct database access never reach the client bundle. Standard web risks (XSS, CSRF) still apply — Next.js gives secrets a safer place to live, it doesn't remove the need for input validation and output encoding.",
    accessibility:
      "Next.js doesn't enforce accessibility — semantic HTML, focus management on navigation, and ARIA usage remain the team's responsibility. `next/link` preserves normal anchor semantics, which helps keyboard and screen reader navigation more than a client router that intercepts every navigation.",
    scalability:
      "Scales horizontally via serverless/edge deployment for traffic, and via route groups and layouts for codebase size as more routes and teams are added. The main scaling risk is uncontrolled client-side JavaScript growth if Client Component boundaries aren't kept deliberate.",
    costAnalysis:
      "Development cost is comparable to any React app for a team already familiar with React. Infrastructure cost is usage-based on most hosting platforms. No licensing cost — it's open source. Long-term maintenance cost is tied to keeping up with the still-evolving App Router conventions across major versions.",
    relatedSolutionSlugs: ["startup"],
    relatedCaseStudySlugs: ["fieldnote-mvp"],
    relatedArticleSlugs: ["validating-an-mvp", "accessibility-checklist-for-product-teams"],
    faqs: [
      {
        question: "Do we need Next.js if we're not worried about SEO?",
        answer:
          "Not necessarily. If the product is behind authentication and SEO doesn't matter, a plain client-side SPA can be simpler to reason about — Next.js's server-rendering strengths matter most when content needs to be publicly indexable or load fast on the first visit.",
      },
      {
        question: "How hard is it to migrate an existing React app to Next.js?",
        answer:
          "It depends on how the app fetches data and routes today. Routing usually maps over reasonably cleanly; the harder work is deciding which components can become Server Components versus which need to stay client-side for interactivity.",
      },
    ],
  },
  {
    slug: "remix",
    name: "Remix",
    category: "frontend",
    tagline:
      "A React framework built around web standards — nested routing and data loading tied directly to HTTP.",
    maturity:
      "Established — public since 2021, acquired by Shopify in 2022 and now the foundation of Shopify's Hydrogen commerce framework.",
    learningCurve:
      "Moderate — the nested-route data loading model is a genuine mental shift for teams used to client-side fetching, but leans on standard web APIs (fetch, FormData) rather than framework-specific abstractions.",
    typicalProjects: [
      "Commerce storefronts, especially via Shopify's Hydrogen",
      "Content-driven products where progressive enhancement and fast navigation matter",
      "Teams who want server rendering without adopting a larger, more opinionated framework surface",
    ],
    businessFit:
      "Fits commerce and content businesses that want fast, resilient page loads and are comfortable with a smaller, more standards-based framework ecosystem than Next.js's.",
    engineeringFit:
      "Fits teams that value working close to web platform primitives (forms, HTTP caching) over framework-specific data-fetching abstractions.",
    businessProblem:
      "Client-heavy storefronts and content sites can feel slow and fragile on real-world networks — every interaction round-trips through client-side JavaScript before anything happens.",
    whyOrganizationsAdopt:
      "Remix ties data loading and mutations directly to routes and standard HTTP semantics, so pages work (and degrade gracefully) closer to how the web platform already behaves, with less custom client-state management.",
    whoBenefits:
      "Commerce teams building on Shopify get a first-party, actively maintained storefront framework; any team wanting less client-side state management benefits from the nested-route loader model.",
    strengths: [
      {
        label: "Nested route data loading",
        description:
          "Each route segment loads its own data in parallel, avoiding the waterfalls common in client-fetched single-page apps.",
      },
      {
        label: "Progressive enhancement by default",
        description:
          "Forms and mutations are built on standard HTML forms first, then enhanced with JavaScript — pages remain functional even before hydration completes.",
      },
      {
        label: "Close to web standards",
        description:
          "Built on `fetch`, `Request`/`Response`, and HTTP caching headers rather than framework-specific data primitives, which lowers the cost of reasoning about caching and easing framework migration.",
      },
      {
        label: "First-party commerce path",
        description:
          "Shopify's Hydrogen builds directly on Remix, giving commerce teams an actively maintained, opinionated storefront starting point.",
      },
    ],
    weaknesses: [
      {
        label: "Smaller ecosystem than Next.js",
        description:
          "Fewer third-party integrations and community examples exist compared to Next.js's larger, longer-running ecosystem.",
      },
      {
        label: "Less flexible static generation",
        description:
          "Remix's data model is oriented around server rendering per request; fully static-site generation is less of a first-class feature than in Next.js.",
      },
      {
        label: "Smaller hosting-provider surface",
        description:
          "While it deploys to several platforms, the range of turnkey hosting options is narrower than Next.js's.",
      },
    ],
    tradeOff: {
      bestFor: [
        "Shopify commerce storefronts via Hydrogen",
        "Teams who want data loading tied to HTTP semantics rather than a framework-specific fetching layer",
        "Products where progressive enhancement (working before JavaScript loads) is a real requirement",
      ],
      avoidWhen: [
        "The project needs extensive static-site generation as a primary rendering mode",
        "The team needs the largest possible pool of examples, integrations, and hiring candidates",
        "Deep App Router-specific features (like Next.js's parallel/intercepting routes) are required",
      ],
      alternatives: ["Next.js", "Astro", "SvelteKit"],
      cost: "Open source; hosting cost is usage-based, comparable to Next.js on similar infrastructure.",
      complexity:
        "Moderate — simpler client-state model, but the nested-loader mental model takes adjustment.",
      teamSize:
        "Works well for small to mid-size teams; large-team support exists but has a smaller track record than Next.js at very large scale.",
      scalability:
        "Scales well for traffic via standard HTTP caching; codebase scalability depends on route nesting discipline as the app grows.",
    },
    architecture: [
      {
        id: "client",
        label: "Client",
        description:
          "Browser requests a route; receives server-rendered HTML that works before JavaScript hydrates.",
      },
      {
        id: "remix",
        label: "Remix",
        description:
          "Resolves nested route loaders in parallel and renders the matched route tree.",
      },
      {
        id: "actions",
        label: "Actions",
        description:
          "Handle form submissions and mutations as server-side route exports tied to standard HTTP methods.",
      },
      {
        id: "commerce-api",
        label: "Commerce API",
        description:
          "For storefronts, Hydrogen queries Shopify's Storefront API directly from loaders.",
      },
      {
        id: "cdn",
        label: "CDN / Edge",
        description:
          "Static assets and cacheable responses are served from the edge using standard HTTP cache headers.",
      },
    ],
    performance:
      "Parallel nested-route loading avoids client-side data waterfalls. Because caching is expressed through standard HTTP headers, performance tuning transfers to any CDN or edge platform that understands HTTP caching, rather than being tied to framework-specific cache APIs.",
    security:
      "Actions run server-side, keeping secrets and direct data access off the client. Because forms work without JavaScript first, CSRF and input-validation discipline still matter exactly as much as in any server-rendered application — the framework doesn't remove that responsibility.",
    accessibility:
      "Progressive enhancement is itself an accessibility win: pages remain operable via standard form submissions if JavaScript fails to load or a user has scripting constrained. Semantic HTML and focus management on navigation are still the team's responsibility.",
    scalability:
      "Scales well for traffic through standard HTTP caching, which most CDNs already understand. Codebase scalability depends on keeping nested routes and their loaders organized as more sections are added.",
    costAnalysis:
      "Development cost is similar to Next.js for a React-familiar team, with a smaller pool of existing examples to draw from. Infrastructure cost is usage-based and comparable to other server-rendered React frameworks. No licensing cost.",
    relatedSolutionSlugs: ["commerce"],
    relatedCaseStudySlugs: [],
    relatedArticleSlugs: ["why-shopify-plus-for-high-growth-commerce"],
    faqs: [
      {
        question: "Is Remix only useful for Shopify commerce?",
        answer:
          "No — Hydrogen (built on Remix) is Shopify's storefront framework, but Remix itself is a general-purpose React framework usable for any server-rendered product.",
      },
      {
        question: "How does Remix compare to Next.js for a new product?",
        answer:
          "Both solve similar problems. Next.js has a larger ecosystem and more flexible static generation; Remix leans more directly on HTTP and form semantics. For most products either is a reasonable choice — the decision usually comes down to team familiarity and whether commerce/Hydrogen is in scope.",
      },
    ],
  },
  {
    slug: "postgresql",
    name: "PostgreSQL",
    category: "databases",
    tagline:
      "An open-source relational database known for correctness, extensibility, and a long track record in production.",
    maturity:
      "Mature — in continuous development since 1996, with a large ecosystem of managed hosting and extensions.",
    learningCurve:
      "Moderate — standard SQL is broadly transferable, but getting real value from indexing, query planning, and extensions (like pgvector) takes deliberate learning.",
    typicalProjects: [
      "Products with genuinely relational data — orders, customers, inventory, permissions",
      "Systems that need strong consistency guarantees, not eventual consistency",
      "Products that later need vector search, geospatial queries, or other extensions without adopting a second database",
    ],
    businessFit:
      "Fits almost any product whose data has real relationships (a customer has orders, an order has line items) rather than being naturally document-shaped.",
    engineeringFit:
      "Fits teams that want one dependable, well-understood database rather than choosing a specialized store per use case prematurely.",
    businessProblem:
      "Businesses need their data to stay correct under concurrent writes — double-booked appointments, incorrect inventory counts, and lost updates are expensive mistakes, not edge cases.",
    whyOrganizationsAdopt:
      "PostgreSQL provides strong transactional guarantees (ACID compliance) and a mature query planner, so correctness under concurrency is the database's job, not something the application has to re-implement.",
    whoBenefits:
      "Engineering teams get fewer data-integrity bugs to chase; the business gets fewer support tickets caused by inconsistent records.",
    strengths: [
      {
        label: "Strong consistency",
        description:
          "ACID transactions mean concurrent writes don't silently corrupt related records — a real cost saver compared to reconciling eventual-consistency bugs later.",
      },
      {
        label: "Extensibility",
        description:
          "Extensions like pgvector (vector search) or PostGIS (geospatial) let one database serve new use cases instead of adopting a second specialized store.",
      },
      {
        label: "Mature tooling and hosting",
        description:
          "Every major cloud provider and platforms like Supabase offer managed Postgres, reducing the operational burden of running it yourself.",
      },
      {
        label: "Rich query capability",
        description:
          "Complex joins, window functions, and full-text search are built in, reducing how often application code has to compensate for database limitations.",
      },
    ],
    weaknesses: [
      {
        label: "Vertical scaling limits",
        description:
          "A single Postgres instance scales up (bigger hardware) more easily than out (sharding across many instances), which eventually becomes a real constraint at very large scale.",
      },
      {
        label: "Schema rigidity",
        description:
          "Structured schemas mean genuinely unstructured or highly variable data requires more upfront modeling work than a document database.",
      },
      {
        label: "Operational overhead if self-hosted",
        description:
          "Running Postgres well (backups, replication, connection pooling) is real operational work — most teams should use a managed provider rather than self-host from day one.",
      },
    ],
    tradeOff: {
      bestFor: [
        "Data with real relationships that need to stay consistent under concurrent writes",
        "Teams that want one database to grow into new needs (search, geospatial) rather than adopting a new store per feature",
        "Products where correctness matters more than flexible, schema-less storage",
      ],
      avoidWhen: [
        "Data is genuinely document-shaped and rarely queried by relationships between records",
        "The team needs to shard writes across many regions from day one at a scale a single Postgres instance can't serve",
        "A vendor-managed NoSQL store already fits the team's operational model better",
      ],
      alternatives: ["MongoDB", "MySQL", "A managed cloud-native database (e.g. Amazon Aurora)"],
      cost: "Open source; hosting cost scales with usage on managed platforms (Supabase, RDS, Cloud SQL), with free tiers for early-stage projects.",
      complexity:
        "Low to moderate for standard use; higher once replication, sharding, or advanced extensions are involved.",
      teamSize:
        "Suitable from a solo project to large engineering organizations — the constraint is usually data volume, not team size.",
      scalability:
        "Scales vertically very well and horizontally with more effort (read replicas, partitioning, or managed sharding solutions).",
    },
    architecture: [
      {
        id: "app",
        label: "Application",
        description:
          "Server-side code (API routes, Server Actions) issues queries through a connection pool.",
      },
      {
        id: "connection-pooler",
        label: "Connection pooler",
        description:
          "Manages concurrent connections efficiently — important for serverless environments that open many short-lived connections.",
      },
      {
        id: "postgres",
        label: "PostgreSQL",
        description: "Executes queries, enforces constraints, and maintains indexes.",
      },
      {
        id: "replica",
        label: "Read replica",
        description:
          "Handles read-heavy traffic separately from the primary, reducing load on the writable instance.",
      },
      {
        id: "backups",
        label: "Backups / WAL archiving",
        description: "Continuous write-ahead-log archiving enables point-in-time recovery.",
      },
    ],
    performance:
      "Query performance depends heavily on indexing and query planning — a well-indexed Postgres database comfortably serves most application workloads. Connection management matters especially in serverless environments, where a pooler (like PgBouncer or a managed equivalent) prevents connection exhaustion under bursty traffic.",
    security:
      "Row-level security policies can enforce data-access rules at the database layer, not just in application code — a meaningful defense-in-depth layer. Standard practices (least-privilege database roles, encrypted connections, secrets never in source control) apply as with any database.",
    accessibility:
      "Not directly applicable — PostgreSQL is a data layer with no user interface. Its consistency guarantees do reduce a category of user-facing bugs (stale or contradictory data shown to users) that indirectly affects experience quality.",
    scalability:
      "Scales vertically to substantial workloads before horizontal strategies (read replicas, partitioning, or a managed sharding layer) become necessary — most products never outgrow a well-tuned single-instance setup.",
    costAnalysis:
      "Open source with no licensing cost. Managed hosting is usage-based, with free tiers suitable for early-stage products. Long-term cost is largely operational: query and index tuning as data grows, and eventually replication or partitioning at real scale.",
    relatedSolutionSlugs: ["enterprise", "custom-engineering"],
    relatedCaseStudySlugs: ["atlas-logistics-modernization"],
    relatedArticleSlugs: ["monolith-vs-microservices"],
    faqs: [
      {
        question: "When would PostgreSQL be the wrong choice?",
        answer:
          "When data is genuinely document-shaped with little relational structure, or when a team needs to shard writes globally from day one at a scale beyond what a single well-tuned instance can serve.",
      },
      {
        question: "Does PostgreSQL work for AI/vector search use cases?",
        answer:
          "Yes, via the pgvector extension — many teams use Postgres for both relational data and vector similarity search rather than adopting a separate dedicated vector database, especially at moderate scale.",
      },
    ],
  },
  {
    slug: "mongodb",
    name: "MongoDB",
    category: "databases",
    tagline:
      "A document database built for flexible, evolving schemas at the cost of relational guarantees.",
    maturity:
      "Mature — widely used in production since the early 2010s, with a large managed-hosting ecosystem (MongoDB Atlas).",
    learningCurve:
      "Low to start (documents map naturally onto JSON objects most developers already think in), moderate to master once schema design and indexing strategy matter at scale.",
    typicalProjects: [
      "Products with genuinely variable, semi-structured data (content models, catalogs with differing attributes per item)",
      "Early-stage products iterating quickly on data shape before a schema stabilizes",
      "Systems where documents are read and written as whole units more often than joined across collections",
    ],
    businessFit:
      "Fits products where the data model changes frequently in early stages, or where content naturally varies in shape (different product types with different attributes, for example).",
    engineeringFit:
      "Fits teams that want to iterate on data structure without running schema migrations for every change, and whose access patterns favor whole-document reads over complex joins.",
    businessProblem:
      "Early-stage products often don't know their final data shape — rigid schemas can slow iteration when the product itself is still being figured out.",
    whyOrganizationsAdopt:
      "MongoDB lets teams store documents with varying structure without a migration for every shape change, which suits products still discovering their data model.",
    whoBenefits:
      "Product teams iterating quickly benefit most; the trade-off is pushed toward the engineering team, which takes on responsibility for consistency the database no longer enforces as strictly.",
    strengths: [
      {
        label: "Flexible schema",
        description:
          "Documents in the same collection can have different shapes, which suits rapidly evolving or genuinely variable data without a migration for every change.",
      },
      {
        label: "Natural JSON mapping",
        description:
          "Documents map directly onto the JSON objects most application code already works with, reducing translation between the database and the application layer.",
      },
      {
        label: "Horizontal scaling built in",
        description:
          "Native sharding support makes distributing data across multiple servers more of a first-class feature than in most relational databases.",
      },
      {
        label: "Mature managed hosting",
        description:
          "MongoDB Atlas provides a well-established managed experience across every major cloud provider.",
      },
    ],
    weaknesses: [
      {
        label: "Weaker relational guarantees",
        description:
          "Multi-document transactions exist but are more expensive and less central to the model than in a relational database — joining across collections is less natural than in SQL.",
      },
      {
        label: "Schema flexibility cuts both ways",
        description:
          "Without discipline, inconsistent document shapes accumulate and become a real data-quality problem the application has to compensate for.",
      },
      {
        label: "Less mature analytical tooling",
        description:
          "Complex aggregations are possible but generally more verbose to express than equivalent SQL, and the broader BI-tool ecosystem assumes SQL more often than not.",
      },
    ],
    tradeOff: {
      bestFor: [
        "Genuinely variable or evolving data shapes, especially early in a product's life",
        "Workloads dominated by whole-document reads and writes rather than complex cross-entity joins",
        "Teams that want native horizontal sharding without adopting a separate scaling layer",
      ],
      avoidWhen: [
        "Data is fundamentally relational and needs to stay consistent under concurrent writes across entities",
        "The team relies on SQL-based BI or reporting tools as a primary workflow",
        "Strict schema validation at the database layer is a requirement, not a nice-to-have",
      ],
      alternatives: [
        "PostgreSQL",
        "A managed cloud-native database (e.g. Amazon Aurora)",
        "Firebase (for smaller-scale, real-time-first products)",
      ],
      cost: "Open source (self-hosted) or usage-based via MongoDB Atlas; comparable in practice to managed Postgres pricing.",
      complexity:
        "Low to start; complexity grows with the need for schema discipline and careful indexing as the collection grows.",
      teamSize:
        "Works for teams of any size; larger teams benefit from establishing schema conventions early since the database won't enforce them.",
      scalability:
        "Scales horizontally via built-in sharding, which suits very large, distributed datasets well when access patterns are document-oriented.",
    },
    architecture: [
      {
        id: "app",
        label: "Application",
        description: "Server-side code reads and writes documents via a MongoDB driver.",
      },
      {
        id: "mongodb",
        label: "MongoDB",
        description:
          "Stores documents in collections, applying whatever validation rules the team chooses to define.",
      },
      {
        id: "shard",
        label: "Shard cluster",
        description: "Distributes data across multiple servers by shard key for horizontal scale.",
      },
      {
        id: "replica-set",
        label: "Replica set",
        description:
          "Provides redundancy and read scaling through automatic failover and secondary reads.",
      },
    ],
    performance:
      "Whole-document reads are fast when the access pattern matches how data is stored. Performance degrades when the application effectively re-implements joins in code across multiple queries — a sign the data might be more relational than the schema assumes.",
    security:
      "Field-level and role-based access controls exist, but schema-level enforcement is looser than a relational database by design — validation rules have to be deliberately defined and maintained rather than falling out of a rigid schema automatically.",
    accessibility:
      "Not directly applicable — MongoDB is a data layer with no user interface. Flexible schemas can indirectly increase the risk of inconsistent data reaching the UI if validation discipline lapses.",
    scalability:
      "Scales horizontally well via native sharding, which is a genuine strength for very large, distributed datasets — the trade-off is that achieving strong consistency across shards takes more deliberate design than in a single relational instance.",
    costAnalysis:
      "Open source with no licensing cost for self-hosting; MongoDB Atlas pricing is usage-based and broadly comparable to managed relational hosting. Long-term maintenance cost centers on schema governance, since the database won't enforce consistency on its own.",
    relatedSolutionSlugs: [],
    relatedCaseStudySlugs: [],
    relatedArticleSlugs: [],
    faqs: [
      {
        question: "Is MongoDB a good default choice for a new product?",
        answer:
          "Only if the data is genuinely document-shaped or still actively evolving. For most business applications with real relationships between entities (customers, orders, inventory), a relational database like PostgreSQL is the safer default.",
      },
      {
        question: "Can MongoDB and PostgreSQL be used together?",
        answer:
          "Yes, though it adds operational complexity — some teams use MongoDB for a specific variable-shape use case (like a content catalog) alongside PostgreSQL for the rest of the system, but this should be a deliberate decision, not a default.",
      },
    ],
  },
  {
    slug: "supabase",
    name: "Supabase",
    category: "backend",
    tagline:
      "A managed Postgres platform bundling authentication, storage, and realtime — a backend without building one from scratch.",
    maturity:
      "Established — in production use since 2020, positioned as an open-source alternative to Firebase built on Postgres.",
    learningCurve:
      "Low — mostly configuration over a real Postgres database, with SQL knowledge transferring directly instead of learning a proprietary query language.",
    typicalProjects: [
      "Early-stage products that need auth, a database, and file storage without a dedicated backend team",
      "MVPs where speed to a working product matters more than infrastructure control",
      "Products that expect to grow into needing raw Postgres access later, not a proprietary database",
    ],
    businessFit:
      "Fits founders and small teams who need a working backend quickly and don't yet have the budget or need for a dedicated backend engineering function.",
    engineeringFit:
      "Fits teams that want real Postgres (not a proprietary abstraction) with authentication, storage, and row-level security handled for them.",
    businessProblem:
      "Early-stage teams often can't justify building and operating authentication, a database, and file storage separately before they've validated the product is worth investing in.",
    whyOrganizationsAdopt:
      "Supabase bundles the backend primitives most products need (auth, database, storage, realtime subscriptions) on top of standard Postgres, so a small team can ship a working backend without first becoming infrastructure specialists.",
    whoBenefits:
      "Founders and small engineering teams benefit most — the time saved on backend plumbing goes directly into building the actual product.",
    strengths: [
      {
        label: "Real Postgres underneath",
        description:
          "Unlike some backend-as-a-service platforms, the database is standard PostgreSQL — existing SQL knowledge transfers directly, and there's a clear exit path if the team outgrows the platform.",
      },
      {
        label: "Row-level security for authorization",
        description:
          "Access control can be enforced at the database layer using Postgres's native row-level security, not only in application code.",
      },
      {
        label: "Bundled primitives",
        description:
          "Authentication, file storage, and realtime subscriptions are included, removing several separate services a team would otherwise integrate individually.",
      },
      {
        label: "Open source",
        description:
          "The platform can be self-hosted if a team later needs more control, reducing the risk of being fully locked into a vendor.",
      },
    ],
    weaknesses: [
      {
        label: "Smaller platform ecosystem than Firebase",
        description:
          "Fewer third-party integrations and community resources exist compared to Google's longer-running Firebase platform.",
      },
      {
        label: "Row-level security has a learning curve",
        description:
          "Getting authorization policies right requires understanding Postgres RLS specifically, which is a real (if worthwhile) thing to learn.",
      },
      {
        label: "Managed-platform limits still apply",
        description:
          "Extremely custom infrastructure needs may eventually outgrow what a managed platform comfortably supports, requiring a migration to self-hosted or fully custom infrastructure.",
      },
    ],
    tradeOff: {
      bestFor: [
        "Early-stage products that need a working backend quickly without a dedicated backend team",
        "Teams that want standard Postgres, not a proprietary database, underneath their backend-as-a-service",
        "Products where row-level security can meaningfully simplify authorization logic",
      ],
      avoidWhen: [
        "The product has non-relational data needs that don't fit Postgres well",
        "Infrastructure requirements are already known to need full custom control from day one",
        "The team already has backend engineering capacity and would rather own every piece directly",
      ],
      alternatives: ["Firebase", "A custom Node.js + Postgres backend", "AWS Amplify"],
      cost: "Free tier for early development; usage-based pricing after, generally lower than assembling equivalent managed services separately.",
      complexity:
        "Low to start; row-level security policies add moderate complexity once authorization rules get nuanced.",
      teamSize:
        "Ideal for solo founders through small teams; larger teams may eventually want more infrastructure control.",
      scalability:
        "Scales with Postgres's own scaling characteristics — comfortable for most products well into meaningful growth.",
    },
    architecture: [
      {
        id: "client",
        label: "Client",
        description:
          "Web or mobile app calls Supabase's client libraries for auth, data, and storage.",
      },
      { id: "auth", label: "Auth", description: "Manages sign-up, sign-in, and session tokens." },
      {
        id: "postgres",
        label: "PostgreSQL",
        description: "Stores application data, with row-level security enforcing access rules.",
      },
      {
        id: "storage",
        label: "Storage",
        description:
          "Handles file uploads (images, documents) with access rules tied to the same auth system.",
      },
      {
        id: "realtime",
        label: "Realtime",
        description: "Streams database changes to subscribed clients for live-updating UI.",
      },
    ],
    performance:
      "Performance characteristics follow standard Postgres — well-indexed queries perform well. Realtime subscriptions add some overhead per active connection, which is worth monitoring as the number of concurrent users with live subscriptions grows.",
    security:
      "Row-level security policies enforce authorization directly in the database, reducing the chance of an authorization bug in application code exposing data. Standard practices (rotating service-role keys, never exposing them client-side) still apply.",
    accessibility:
      "Not directly applicable — Supabase is backend infrastructure with no user interface of its own; accessibility remains entirely the responsibility of the client application built on top of it.",
    scalability:
      "Scales with the underlying Postgres instance; teams outgrowing the managed tier can migrate to a larger instance or, since it's open source, self-host without a full data-model rewrite.",
    costAnalysis:
      "Free tier covers early development and small-scale production use. Paid tiers are usage-based (database size, bandwidth, active users) and generally cost less than assembling equivalent managed auth, database, and storage services separately. Primary long-term cost is engineering time as authorization policies and data volume grow.",
    relatedSolutionSlugs: ["startup"],
    relatedCaseStudySlugs: ["fieldnote-mvp"],
    relatedArticleSlugs: ["validating-an-mvp"],
    faqs: [
      {
        question: "Is Supabase just Firebase for Postgres?",
        answer:
          "The pitch is similar (bundled backend primitives), but the underlying database is real, standard PostgreSQL rather than a proprietary NoSQL store — that matters if a team later wants direct SQL access or wants to self-host.",
      },
      {
        question: "Can we outgrow Supabase?",
        answer:
          "Eventually, for very custom infrastructure needs — but because the database is standard Postgres and the platform is open source, outgrowing it means migrating hosting, not rewriting the data model.",
      },
    ],
  },
  {
    slug: "kubernetes",
    name: "Kubernetes",
    category: "infrastructure",
    tagline:
      "A container orchestration platform for running, scaling, and healing distributed applications automatically.",
    maturity:
      "Mature — a Cloud Native Computing Foundation graduated project, the de facto standard for container orchestration since the late 2010s.",
    learningCurve:
      "Steep — genuinely one of the more complex pieces of infrastructure a team can adopt, with a large vocabulary (pods, services, deployments, ingress) before it becomes productive.",
    typicalProjects: [
      "Systems with multiple services that need independent scaling and deployment",
      "Organizations standardizing deployment across many teams on shared infrastructure conventions",
      "Products with real, variable traffic that benefit from automated scaling and self-healing",
    ],
    businessFit:
      "Fits organizations running enough distinct services that manual deployment and scaling has become a real operational cost, not a hypothetical one.",
    engineeringFit:
      "Fits teams with dedicated platform or DevOps capacity — Kubernetes rewards investment in golden-path tooling and punishes teams who adopt it without that investment.",
    businessProblem:
      "As organizations grow past a handful of services, manually deploying, scaling, and recovering from failures becomes slow and error-prone — outages take longer to resolve and deployments become risky events instead of routine ones.",
    whyOrganizationsAdopt:
      "Kubernetes automates deployment, scaling, and recovery from failure across many services, turning what would be manual operational toil into declarative configuration the platform enforces continuously.",
    whoBenefits:
      "Platform and DevOps teams get a consistent deployment model across services; product teams get more reliable, faster deployments once the platform is set up well.",
    strengths: [
      {
        label: "Self-healing",
        description:
          "Automatically restarts failed containers and reschedules workloads away from unhealthy nodes without manual intervention.",
      },
      {
        label: "Declarative scaling",
        description:
          "Horizontal pod autoscaling adjusts capacity to real traffic automatically, rather than requiring manual capacity planning for every service.",
      },
      {
        label: "Consistent deployment model",
        description:
          "The same deployment conventions apply across every service and team, which pays off as an organization grows past a handful of services.",
      },
      {
        label: "Portable across cloud providers",
        description:
          "Workloads defined in Kubernetes manifests aren't tied to a single cloud provider's proprietary orchestration layer.",
      },
    ],
    weaknesses: [
      {
        label: "Genuine operational complexity",
        description:
          "Running Kubernetes well requires real expertise — networking, storage, and security models are all more involved than simpler deployment approaches.",
      },
      {
        label: "Overkill for small systems",
        description:
          "A handful of services or a single application rarely needs Kubernetes's scaling and orchestration model — the complexity cost isn't justified by the problem being solved.",
      },
      {
        label: "Configuration surface area",
        description:
          "YAML manifests for even moderately complex deployments can become extensive and hard to reason about without additional tooling (Helm, Kustomize) layered on top.",
      },
    ],
    tradeOff: {
      bestFor: [
        "Organizations running many services that need independent, automated scaling and recovery",
        "Teams with dedicated platform capacity to build golden-path tooling on top of Kubernetes",
        "Multi-cloud or cloud-agnostic infrastructure strategies",
      ],
      avoidWhen: [
        "The system is a single application or a small number of services that a simpler platform (managed containers, serverless) already serves well",
        "There's no dedicated platform or DevOps capacity to operate it properly",
        "The team's actual bottleneck isn't deployment/scaling — Kubernetes won't fix an unrelated engineering problem",
      ],
      alternatives: [
        "A simpler managed container platform (e.g. AWS ECS)",
        "Serverless functions for lighter-weight services",
        "A single managed VM for genuinely small systems",
      ],
      cost: "Open source; hosting cost comes from the underlying compute plus, on managed offerings, a control-plane fee.",
      complexity:
        "High — genuinely one of the more complex platforms a team can adopt, requiring dedicated expertise to run well.",
      teamSize:
        "Best suited to organizations with dedicated platform or DevOps capacity, not solo developers or very small teams.",
      scalability:
        "Scales to very large infrastructure footprints — this is precisely the problem it's designed to solve.",
    },
    architecture: [
      {
        id: "ingress",
        label: "Ingress",
        description: "Routes external traffic to the correct service based on host and path rules.",
      },
      {
        id: "service",
        label: "Service",
        description:
          "Provides a stable network identity for a set of pods, load balancing between them.",
      },
      {
        id: "deployment",
        label: "Deployment",
        description: "Manages the desired number of pod replicas and handles rolling updates.",
      },
      {
        id: "pod",
        label: "Pod",
        description: "Runs one or more containers as the smallest deployable unit.",
      },
      {
        id: "node",
        label: "Node",
        description: "The underlying machine (VM or bare metal) where pods actually run.",
      },
    ],
    performance:
      "Kubernetes itself doesn't make applications faster — it makes scaling and recovery more automatic. Real performance depends on resource requests/limits being set correctly; misconfigured resource limits are a common cause of throttling or unexpected pod evictions.",
    security:
      "Network policies can restrict which services can talk to each other, secrets management (ideally via an external secrets manager, not raw Kubernetes Secrets) protects credentials, and role-based access control governs who can change what. Each of these has to be deliberately configured — Kubernetes is secure-capable, not secure-by-default.",
    accessibility:
      "Not directly applicable — Kubernetes is infrastructure with no user interface of its own; it has no bearing on the accessibility of applications running on it.",
    scalability:
      "This is Kubernetes's core strength — horizontal pod autoscaling and cluster autoscaling handle both traffic spikes and long-term growth, provided the underlying architecture (stateless services, externalized state) supports horizontal scaling in the first place.",
    costAnalysis:
      "Open source with no licensing cost. Infrastructure cost is the underlying compute plus a control-plane fee on most managed offerings (EKS, GKE, AKS). The larger cost is usually engineering time — both initial setup and the ongoing platform expertise required to operate it well.",
    relatedSolutionSlugs: ["enterprise", "platform-engineering", "cloud-infrastructure"],
    relatedCaseStudySlugs: ["atlas-logistics-modernization", "harborline-developer-platform"],
    relatedArticleSlugs: ["monolith-vs-microservices"],
    faqs: [
      {
        question: "Do we need Kubernetes if we only have a few services?",
        answer:
          "Probably not. A simpler managed container platform or even serverless functions usually serve a handful of services well without Kubernetes's operational overhead — adopt it when the number of services and the need for automated scaling genuinely justify it.",
      },
      {
        question: "What's the biggest mistake teams make adopting Kubernetes?",
        answer:
          "Adopting it before there's dedicated platform capacity to run it well. Kubernetes rewards investment in golden-path tooling that hides its complexity from application developers — without that investment, every team ends up fighting the platform directly.",
      },
    ],
  },
  {
    slug: "terraform",
    name: "Terraform",
    category: "devops",
    tagline:
      "Infrastructure as code — cloud resources defined declaratively and provisioned consistently across environments.",
    maturity:
      "Mature — widely adopted as the standard infrastructure-as-code tool since the mid-2010s, with broad provider support.",
    learningCurve:
      "Moderate — the declarative model and HCL syntax are approachable, but state management and module design take real experience to get right.",
    typicalProjects: [
      "Organizations provisioning cloud infrastructure across multiple environments (dev, staging, production)",
      "Teams standardizing infrastructure patterns across many projects or teams",
      "Multi-cloud or hybrid-cloud infrastructure that needs one consistent provisioning workflow",
    ],
    businessFit:
      "Fits organizations where manually clicking through cloud consoles has become a source of inconsistency, untracked changes, or slow environment setup.",
    engineeringFit:
      "Fits teams that want infrastructure changes reviewed like code (via pull requests) rather than made ad hoc through a cloud provider's console.",
    businessProblem:
      "Manually configured cloud infrastructure drifts over time — nobody can say with confidence what's actually running or why, and recreating an environment (for disaster recovery or a new region) becomes a manual, error-prone project.",
    whyOrganizationsAdopt:
      "Terraform defines infrastructure declaratively in version-controlled code, so environments can be recreated reliably, changes go through the same review process as application code, and drift becomes visible instead of invisible.",
    whoBenefits:
      "Platform and DevOps teams get reproducible environments and auditable change history; the business gets fewer infrastructure-caused outages from undocumented manual changes.",
    strengths: [
      {
        label: "Declarative and provider-agnostic",
        description:
          "The same workflow applies across AWS, GCP, Azure, and hundreds of other providers, reducing the need to learn a new provisioning tool per cloud.",
      },
      {
        label: "Plan before apply",
        description:
          "Terraform shows exactly what will change before it changes anything, catching unintended modifications before they happen.",
      },
      {
        label: "Infrastructure as version-controlled code",
        description:
          "Changes go through the same pull-request review process as application code, creating an audit trail that manual console changes never have.",
      },
      {
        label: "Large module ecosystem",
        description:
          "A large public registry of reusable modules means common infrastructure patterns rarely need to be built from scratch.",
      },
    ],
    weaknesses: [
      {
        label: "State management complexity",
        description:
          "Terraform's state file has to be stored and locked correctly (typically in a remote backend) — mismanaged state is a common source of real incidents.",
      },
      {
        label: "Learning curve for teams unfamiliar with declarative infrastructure",
        description:
          "Thinking in terms of desired end-state rather than a sequence of imperative steps takes adjustment for teams used to scripting infrastructure changes directly.",
      },
      {
        label: "Drift can still occur",
        description:
          "If anyone changes infrastructure manually outside of Terraform, the state file falls out of sync with reality, requiring careful reconciliation.",
      },
    ],
    tradeOff: {
      bestFor: [
        "Organizations provisioning infrastructure across multiple environments or regions",
        "Teams that want infrastructure changes reviewed and audited like application code",
        "Multi-cloud or hybrid-cloud environments needing one consistent workflow",
      ],
      avoidWhen: [
        "Infrastructure is genuinely small and static enough that manual management carries little real risk",
        "The team would rather use a cloud provider's own native IaC tool (CloudFormation, ARM templates) for tighter provider-specific integration",
        "There's no discipline in place to manage remote state carefully — mismanaged state can cause real outages",
      ],
      alternatives: [
        "Cloud-provider-native IaC tools (CloudFormation, ARM templates)",
        "Pulumi",
        "AWS CDK",
      ],
      cost: "Open source (Terraform CLI); Terraform Cloud/Enterprise adds usage-based or per-seat pricing for collaboration features.",
      complexity:
        "Moderate — approachable syntax, but state management and module design require real experience to get right.",
      teamSize:
        "Scales from a single infrastructure engineer to large platform teams managing infrastructure for many product teams.",
      scalability:
        "Scales to very large infrastructure footprints with proper module structure and remote state management.",
    },
    architecture: [
      {
        id: "config",
        label: "Terraform config",
        description: "HCL files declaring the desired infrastructure state.",
      },
      {
        id: "state",
        label: "State backend",
        description:
          "A remote backend (e.g. an object store with locking) tracks what Terraform believes is currently deployed.",
      },
      {
        id: "plan",
        label: "Plan",
        description:
          "Terraform diffs the desired config against the current state and shows exactly what will change.",
      },
      {
        id: "provider-api",
        label: "Cloud provider API",
        description:
          "Terraform applies the plan by calling the relevant cloud provider's API to create, update, or destroy resources.",
      },
    ],
    performance:
      "Not directly applicable in the traditional sense — Terraform provisions infrastructure rather than serving traffic. Plan/apply speed for large infrastructure footprints benefits from splitting configuration into smaller, independently applied modules rather than one monolithic state file.",
    security:
      "Secrets referenced in Terraform configuration should come from a secrets manager, never hardcoded in version-controlled files — state files themselves can contain sensitive values and need to be stored securely with restricted access, exactly like any other sensitive data store.",
    accessibility:
      "Not applicable — Terraform is an infrastructure provisioning tool with no end-user interface.",
    scalability:
      "Scales to very large infrastructure footprints when configuration is organized into well-structured, reusable modules; a single unstructured configuration file becomes unwieldy well before the infrastructure itself becomes a real scaling bottleneck.",
    costAnalysis:
      "The CLI itself is open source and free. Terraform Cloud/Enterprise adds cost for team collaboration features (remote state management, policy enforcement) at usage-based or per-seat pricing. The larger cost is engineering time spent designing maintainable modules and managing state carefully.",
    relatedSolutionSlugs: ["platform-engineering", "cloud-infrastructure"],
    relatedCaseStudySlugs: ["harborline-developer-platform"],
    relatedArticleSlugs: ["monolith-vs-microservices"],
    faqs: [
      {
        question: "Do small teams need Terraform?",
        answer:
          "Only if manually managed infrastructure has already become a source of real risk or slowdown. For a genuinely small, stable setup, the overhead of learning and maintaining Terraform may not yet be worth it.",
      },
      {
        question: "What's the most common Terraform mistake?",
        answer:
          "Mismanaging state — either not using a remote backend with locking, or letting manual changes drift infrastructure away from what the state file records. Both lead to real incidents when the next `apply` doesn't behave as expected.",
      },
    ],
  },
  {
    slug: "shopify-plus",
    name: "Shopify Plus",
    category: "commerce",
    tagline:
      "Shopify's enterprise commerce platform — managed infrastructure and checkout for high-growth commerce businesses.",
    maturity:
      "Mature — Shopify Plus has served large commerce merchants since 2014, handling significant peak-traffic events reliably.",
    learningCurve:
      "Low to moderate for standard storefronts using Shopify's theme system; higher when building fully custom storefronts via Hydrogen or the Storefront API.",
    typicalProjects: [
      "High-growth direct-to-consumer and B2B commerce businesses",
      "Merchants who need Shopify's managed infrastructure but want more customization than standard Shopify plans allow",
      "Commerce businesses integrating many third-party tools (ERP, marketing, fulfillment) around a stable platform core",
    ],
    businessFit:
      "Fits commerce businesses at a scale where checkout reliability during peak traffic (sales events, product launches) is a genuine business risk, not a hypothetical one.",
    engineeringFit:
      "Fits teams that want to build commerce experiences without owning payment processing, PCI compliance, and checkout infrastructure themselves.",
    businessProblem:
      "High-growth commerce businesses can't afford checkout downtime or slow performance during peak traffic — a failed checkout during a major sale is directly, immediately lost revenue.",
    whyOrganizationsAdopt:
      "Shopify Plus provides managed, battle-tested checkout and commerce infrastructure with the reliability and scale-tested performance most individual engineering teams couldn't cost-effectively build and operate themselves.",
    whoBenefits:
      "The business gets checkout reliability during its highest-stakes traffic moments; engineering teams get to focus on differentiation (custom storefront experience, integrations) instead of commerce plumbing.",
    strengths: [
      {
        label: "Managed, scale-tested checkout",
        description:
          "Checkout infrastructure is built and operated by Shopify at a scale far beyond what most individual commerce businesses could justify building themselves.",
      },
      {
        label: "Large app and integration ecosystem",
        description:
          "A mature marketplace of apps covers most common commerce needs (reviews, loyalty, subscriptions) without custom development.",
      },
      {
        label: "Headless flexibility via Hydrogen/Storefront API",
        description:
          "Businesses that need a fully custom frontend can build one on Remix-based Hydrogen while keeping Shopify's commerce backend.",
      },
      {
        label: "PCI compliance handled",
        description:
          "Payment processing compliance is Shopify's responsibility, not something the merchant's engineering team has to build and maintain.",
      },
    ],
    weaknesses: [
      {
        label: "Less checkout customization than a fully custom stack",
        description:
          "Even with Shopify Plus's checkout extensibility, there are limits compared to owning checkout entirely — some highly specific checkout flows aren't achievable.",
      },
      {
        label: "Platform subscription and transaction fees",
        description:
          "Cost is predictable at scale but includes both a platform subscription and transaction-based fees, which compounds as revenue grows.",
      },
      {
        label: "Dependency on Shopify's roadmap",
        description:
          "Feature availability and API changes are on Shopify's timeline, not the merchant's — a real constraint compared to fully owned infrastructure.",
      },
    ],
    tradeOff: {
      bestFor: [
        "High-growth commerce businesses where checkout reliability during peak traffic is a real business risk",
        "Teams that want to avoid owning payment processing and PCI compliance directly",
        "Merchants needing a large ecosystem of ready-made commerce apps and integrations",
      ],
      avoidWhen: [
        "The commerce experience requires checkout customization beyond what Shopify's extensibility model allows",
        "Transaction volume is low enough that platform and transaction fees outweigh the operational savings",
        "The business needs full ownership of every part of the commerce stack for strategic reasons",
      ],
      alternatives: [
        "A fully custom commerce stack",
        "BigCommerce Enterprise",
        "A headless commerce platform paired with a different frontend",
      ],
      cost: "Platform subscription plus transaction fees; predictable and scale-tested, but compounds as revenue grows.",
      complexity:
        "Low for standard theme-based storefronts; moderate to high for fully custom Hydrogen storefronts.",
      teamSize:
        "Works for teams from a single commerce manager to large engineering organizations building custom storefronts.",
      scalability:
        "Built for traffic spikes by design — this is precisely the scenario Shopify Plus is engineered to handle reliably.",
    },
    architecture: [
      {
        id: "storefront",
        label: "Storefront",
        description: "A theme-based storefront or a custom Hydrogen (Remix) frontend.",
      },
      {
        id: "storefront-api",
        label: "Storefront API",
        description: "Queries products, collections, and cart state for custom frontends.",
      },
      {
        id: "checkout",
        label: "Managed checkout",
        description:
          "Shopify's own checkout infrastructure handles payment processing and PCI compliance.",
      },
      {
        id: "admin-api",
        label: "Admin API",
        description: "Powers integrations with ERP, fulfillment, and marketing systems.",
      },
      {
        id: "apps",
        label: "App ecosystem",
        description:
          "Third-party apps extend functionality (reviews, loyalty, subscriptions) without custom development.",
      },
    ],
    performance:
      "Checkout performance is Shopify's responsibility and is engineered for genuine peak-traffic events. Storefront performance for custom frontends depends on the same rendering considerations as any web application — Hydrogen storefronts benefit from the same server-rendering performance characteristics as Remix generally.",
    security:
      "PCI DSS compliance for payment processing is Shopify's responsibility, removing a significant compliance burden from the merchant. Admin API access should follow least-privilege principles for any integrations built on top of it.",
    accessibility:
      "Standard Shopify themes vary in accessibility quality — teams should audit theme accessibility rather than assume it. Custom Hydrogen storefronts carry the same accessibility responsibilities as any custom-built frontend.",
    scalability:
      "Built specifically for traffic spikes — flash sales, product drops, and other high-variance commerce traffic patterns are the scenario Shopify Plus's infrastructure is designed and tested against.",
    costAnalysis:
      "Platform subscription is a fixed enterprise-tier cost, with transaction fees layered on top (reduced with Shopify Payments). Predictable at scale, but the combined cost grows with revenue — worth modeling against a fully custom stack's infrastructure and engineering cost at the business's specific transaction volume.",
    relatedSolutionSlugs: ["commerce"],
    relatedCaseStudySlugs: ["nova-commerce-checkout"],
    relatedArticleSlugs: ["why-shopify-plus-for-high-growth-commerce"],
    faqs: [
      {
        question: "When does a custom commerce stack make more sense than Shopify Plus?",
        answer:
          "When checkout customization needs go beyond Shopify's extensibility model, or when transaction volume is high enough that platform and transaction fees materially exceed what a custom stack's infrastructure and engineering cost would be.",
      },
      {
        question: "Can we have a fully custom storefront on Shopify Plus?",
        answer:
          "Yes — via Hydrogen (built on Remix) and the Storefront API, teams can build a completely custom frontend while keeping Shopify's managed checkout and backend.",
      },
    ],
  },
  {
    slug: "openai",
    name: "OpenAI",
    category: "ai",
    tagline:
      "A model provider offering general-purpose large language models via API, without operating infrastructure yourself.",
    maturity:
      "Established — GPT-series models have been available via API since 2020, with rapid iteration and broad production adoption since.",
    learningCurve:
      "Low to start (a single API call returns a useful result); moderate to build reliably (prompt design, handling failures, cost management take real iteration).",
    typicalProjects: [
      "Products adding natural-language understanding or generation without training a model from scratch",
      "Support and knowledge-retrieval assistants built on top of a company's own content",
      "Prototypes validating whether an AI feature is worth building before investing in more custom infrastructure",
    ],
    businessFit:
      "Fits organizations that want to add genuinely useful AI capability without hiring a dedicated machine-learning team to train and operate models.",
    engineeringFit:
      "Fits teams that want a general-purpose model accessible via a stable API, with the option to swap providers later if the abstraction layer is built with that in mind.",
    businessProblem:
      "Building and operating a competitive large language model from scratch is far beyond what almost any individual company can justify — the problem most businesses actually have is applying existing model capability to their specific data and workflows.",
    whyOrganizationsAdopt:
      "OpenAI's API gives teams access to a capable general-purpose model without operating any model infrastructure themselves, letting engineering effort go toward the specific product problem instead of model training and serving.",
    whoBenefits:
      "Product teams get a fast path to validating AI features; the business avoids the cost and risk of training and hosting its own model before knowing whether the feature is worth it.",
    strengths: [
      {
        label: "Strong general-purpose capability",
        description:
          "Broad language understanding and generation work well out of the box for a wide range of tasks without task-specific fine-tuning.",
      },
      {
        label: "Stable, well-documented API",
        description:
          "A consistent API surface makes it straightforward to integrate and iterate quickly, with a large body of community knowledge to draw from.",
      },
      {
        label: "No model infrastructure to operate",
        description:
          "Serving, scaling, and updating the underlying model is entirely the provider's responsibility, not the team's.",
      },
      {
        label: "Rapid capability improvement",
        description:
          "Model updates often bring meaningful capability gains without requiring the integrating application to change.",
      },
    ],
    weaknesses: [
      {
        label: "Dependency on a third-party API",
        description:
          "Availability, pricing, and model behavior are outside the team's direct control — a real risk for features core to the product's value.",
      },
      {
        label: "Usage-based cost at scale",
        description:
          "Cost scales with usage volume and can become significant for high-traffic features if not deliberately managed (caching, prompt efficiency, model tier selection).",
      },
      {
        label: "Non-deterministic outputs",
        description:
          "The same input can produce different outputs across calls, which requires deliberate handling for use cases that need consistency or verifiability.",
      },
    ],
    tradeOff: {
      bestFor: [
        "Validating whether an AI feature provides real value before investing in custom model infrastructure",
        "General-purpose language tasks (summarization, drafting, classification, conversational support)",
        "Teams without dedicated ML infrastructure capacity who still want production-grade model capability",
      ],
      avoidWhen: [
        "The use case requires guaranteed data residency or full control over model weights and training data",
        "Extremely high request volume makes usage-based API pricing more expensive than self-hosting an open model long-term",
        "Deterministic, fully explainable outputs are a hard requirement",
      ],
      alternatives: [
        "Anthropic's Claude",
        "A self-hosted open-source model",
        "A smaller, task-specific fine-tuned model",
      ],
      cost: "Usage-based, billed per token; cost scales directly with request volume and model tier chosen.",
      complexity:
        "Low to integrate initially; moderate to operate well (prompt reliability, cost control, handling failures gracefully).",
      teamSize:
        "Accessible to a solo developer through large product teams — no dedicated ML team required to get started.",
      scalability:
        "Scales with usage-based pricing; very high-volume use cases eventually warrant evaluating self-hosted alternatives on cost grounds.",
    },
    architecture: [
      {
        id: "client",
        label: "Application",
        description:
          "Sends prompts (often assembled from retrieved context) to the API and handles the response.",
      },
      {
        id: "orchestration",
        label: "Orchestration layer",
        description:
          "Assembles prompts, manages conversation state, and handles retries or fallbacks — often via a framework like LangChain.",
      },
      {
        id: "vector-store",
        label: "Vector store",
        description:
          "For retrieval-augmented use cases, stores embeddings of relevant content to retrieve before generating a response.",
      },
      {
        id: "openai-api",
        label: "OpenAI API",
        description: "Receives the assembled prompt and returns a generated response.",
      },
    ],
    performance:
      "Latency depends on model size and response length — larger, more capable models are slower. Streaming responses improve perceived performance for conversational interfaces by showing output as it's generated rather than waiting for the full response.",
    security:
      "Data sent to the API should be reviewed against the provider's data-usage policy, especially for sensitive or regulated data. API keys must be kept server-side and never exposed to the client, exactly like any other credential.",
    accessibility:
      "AI-generated content should still meet the same accessibility standards as any other content (proper heading structure, alt text for any generated visuals) — the model doesn't guarantee accessible output on its own.",
    scalability:
      "Scales via usage-based pricing without infrastructure the team has to operate — the practical scaling question becomes cost management (caching repeated queries, choosing an appropriately sized model tier) rather than infrastructure capacity.",
    costAnalysis:
      "No infrastructure or licensing cost — pricing is entirely usage-based per token. Cost predictability requires deliberate engineering (caching, prompt length management, model tier selection); unmanaged usage can scale unpredictably with traffic.",
    relatedSolutionSlugs: ["artificial-intelligence"],
    relatedCaseStudySlugs: ["northwind-ai-support-assistant"],
    relatedArticleSlugs: ["rag-vs-fine-tuning"],
    faqs: [
      {
        question: "Should we fine-tune a model or use retrieval-augmented generation?",
        answer:
          "For most business use cases involving a company's own knowledge base, retrieval-augmented generation (retrieving relevant content and including it in the prompt) is simpler to maintain and update than fine-tuning, which is better suited to teaching a model a specific style or format.",
      },
      {
        question: "How do we control cost as usage grows?",
        answer:
          "Cache repeated or predictable queries, choose the smallest model tier that meets quality requirements for a given task, and keep prompts as concise as the task allows — cost scales directly with tokens processed.",
      },
    ],
  },
  {
    slug: "langchain",
    name: "LangChain",
    category: "ai",
    tagline:
      "An orchestration framework for chaining prompts, retrieval, and tools into a coherent AI application.",
    maturity:
      "Established — widely adopted since 2022 as one of the standard orchestration layers for LLM-based applications, though the ecosystem still evolves quickly.",
    learningCurve:
      "Moderate — the core concepts (chains, retrievers, agents) are approachable, but the framework's surface area is large and changes fairly often.",
    typicalProjects: [
      "Retrieval-augmented generation systems built on a company's own knowledge base",
      "Multi-step AI workflows that combine several model calls and external tools",
      "Prototypes that need to move quickly across several model providers or retrieval strategies",
    ],
    businessFit:
      "Fits organizations building AI features that need more than a single prompt-response call — multi-step reasoning, retrieval from internal knowledge, or coordinating several tools.",
    engineeringFit:
      "Fits teams that want common AI-application patterns (retrieval, memory, tool use) pre-built rather than assembled from scratch, and who accept some framework overhead in exchange.",
    businessProblem:
      "Building a genuinely useful AI feature (like a support assistant that answers from a company's real documentation) requires more than one API call — retrieving the right context, assembling a prompt, and handling multi-step reasoning is real engineering work that's easy to get wrong.",
    whyOrganizationsAdopt:
      "LangChain provides pre-built patterns for retrieval, prompt assembly, memory, and tool use, so teams building multi-step AI applications aren't reinventing common infrastructure from scratch.",
    whoBenefits:
      "Engineering teams building AI features benefit from not re-implementing retrieval and orchestration patterns that are already common and well-understood problems.",
    strengths: [
      {
        label: "Pre-built retrieval and orchestration patterns",
        description:
          "Common patterns (retrieval-augmented generation, conversational memory, tool-calling agents) are available without building them from scratch.",
      },
      {
        label: "Provider-agnostic abstractions",
        description:
          "Swapping between model providers or vector stores is generally more contained than rewriting integration code directly against each provider's API.",
      },
      {
        label: "Active ecosystem",
        description:
          "A large community and frequent updates mean new model capabilities and integrations tend to appear in the framework relatively quickly.",
      },
      {
        label: "Composable building blocks",
        description:
          "Chains, retrievers, and tools can be combined in different ways for different use cases without starting from zero each time.",
      },
    ],
    weaknesses: [
      {
        label: "Framework overhead",
        description:
          "For a genuinely simple use case (a single prompt-response call), LangChain's abstractions add complexity without a corresponding benefit.",
      },
      {
        label: "Rapid API changes",
        description:
          "The framework's fast iteration pace has historically meant breaking changes between versions, requiring teams to budget time for upgrades.",
      },
      {
        label: "Abstraction can obscure what's actually happening",
        description:
          "Debugging can be harder when a chain hides several underlying model calls and retrieval steps behind one abstraction.",
      },
    ],
    tradeOff: {
      bestFor: [
        "Multi-step AI workflows involving retrieval, memory, or coordinating several tools",
        "Teams that want common AI-application patterns pre-built rather than assembled from scratch",
        "Projects that may need to swap model providers or retrieval strategies during development",
      ],
      avoidWhen: [
        "The use case is a single, simple prompt-response call where a direct API call is clearer and easier to maintain",
        "The team needs full, transparent control over every step for debugging or compliance reasons",
        "Stability of the framework's API surface matters more than access to its latest features",
      ],
      alternatives: [
        "LlamaIndex",
        "A custom-built orchestration layer (more control, more code to maintain)",
        "Direct API calls for simpler, single-step use cases",
      ],
      cost: "Open source; the framework itself is free, with cost driven by the underlying model API and vector store usage.",
      complexity:
        "Moderate — approachable for common patterns, but the framework's full surface area is large.",
      teamSize:
        "Works for a solo developer prototyping quickly through larger teams building production AI features.",
      scalability:
        "Scales with the underlying model provider and vector store choices — LangChain itself is an orchestration layer, not the scaling bottleneck.",
    },
    architecture: [
      {
        id: "query",
        label: "User query",
        description: "A question or request enters the system, often through a chat interface.",
      },
      {
        id: "retriever",
        label: "Retriever",
        description: "Fetches relevant context from a vector store based on the query.",
      },
      {
        id: "chain",
        label: "Chain",
        description:
          "Assembles the retrieved context and query into a prompt, potentially across multiple steps.",
      },
      {
        id: "llm",
        label: "LLM provider",
        description: "Generates a response based on the assembled prompt.",
      },
      {
        id: "memory",
        label: "Memory",
        description: "Optionally persists conversation history for multi-turn interactions.",
      },
    ],
    performance:
      "Overall latency is typically dominated by the underlying model API calls, not the orchestration layer itself — but chains that make multiple sequential model calls compound that latency, so minimizing unnecessary steps in a chain matters for responsiveness.",
    security:
      "The same data-handling considerations as the underlying model provider apply — LangChain doesn't add its own security model, so credentials and data sent through it need the same care as calling the provider API directly.",
    accessibility:
      "Not directly applicable — LangChain is an orchestration layer with no user interface; accessibility depends entirely on the application built on top of it.",
    scalability:
      "Scaling is governed by the underlying model provider and vector store, not by LangChain itself — the orchestration layer adds negligible overhead relative to the model calls it coordinates.",
    costAnalysis:
      "The framework itself is free and open source. Real cost comes from the underlying model API usage and vector store hosting it orchestrates — LangChain doesn't add its own billing, but doesn't reduce the cost of what it calls either.",
    relatedSolutionSlugs: ["artificial-intelligence"],
    relatedCaseStudySlugs: ["northwind-ai-support-assistant"],
    relatedArticleSlugs: ["rag-vs-fine-tuning"],
    faqs: [
      {
        question: "Do we need LangChain for a simple AI feature?",
        answer:
          "Probably not — if the feature is a single prompt-response call, calling the model API directly is simpler to build, debug, and maintain than introducing a framework's abstractions.",
      },
      {
        question: "Does LangChain lock us into a specific model provider?",
        answer:
          "No — one of its explicit goals is provider-agnostic abstractions, so swapping between model providers or vector stores is generally more contained than rewriting integration code against each provider's API directly.",
      },
    ],
  },
  {
    slug: "react-native",
    name: "React Native",
    category: "mobile",
    tagline:
      "A framework for building native iOS and Android apps using React, sharing code and concepts with web.",
    maturity:
      "Mature — in production since 2015, powering apps at significant scale (including Meta's own apps) with a large ecosystem.",
    learningCurve:
      "Moderate for teams already using React — the component model transfers directly, but native platform concepts (navigation, permissions, platform-specific APIs) still need to be learned.",
    typicalProjects: [
      "Products that need both iOS and Android apps without maintaining two fully separate native codebases",
      "Teams with existing React/web expertise extending into mobile",
      "Products where near-native performance matters more than 100% platform-native polish on every screen",
    ],
    businessFit:
      "Fits organizations that need mobile apps on both platforms but don't have the budget or team size to build and maintain fully separate native iOS and Android codebases.",
    engineeringFit:
      "Fits teams with existing React expertise who want to extend into mobile without hiring separate Swift and Kotlin teams from scratch.",
    businessProblem:
      "Building and maintaining fully separate native iOS and Android apps roughly doubles engineering cost for most product teams — a real constraint for organizations that need to be on both platforms but can't justify two full native teams.",
    whyOrganizationsAdopt:
      "React Native lets one codebase (with some platform-specific code where needed) produce apps for both iOS and Android, sharing logic and, for teams already using React on web, sharing real engineering expertise too.",
    whoBenefits:
      "Product teams get to ship on both platforms with one engineering team; the business avoids the cost of building and maintaining fully separate native codebases before knowing whether that investment is justified.",
    strengths: [
      {
        label: "Shared codebase across platforms",
        description:
          "Most application logic and UI code is shared between iOS and Android, reducing duplicate implementation work.",
      },
      {
        label: "React component model",
        description:
          "Teams with existing React experience (including web teams) transfer that knowledge directly rather than learning two new languages and platform SDKs from scratch.",
      },
      {
        label: "Native performance for most UI work",
        description:
          "UI renders through native platform components rather than a webview, giving meaningfully better performance and feel than hybrid webview-based approaches.",
      },
      {
        label: "Large ecosystem and community",
        description:
          "A mature library ecosystem covers most common mobile needs (navigation, camera, push notifications) without custom native module development.",
      },
    ],
    weaknesses: [
      {
        label: "Native modules still needed sometimes",
        description:
          "Some platform-specific capabilities require writing native code directly, meaning the team can't fully avoid native development expertise.",
      },
      {
        label: "Some platform-specific polish gaps",
        description:
          "Achieving pixel-perfect, fully platform-idiomatic feel on both iOS and Android simultaneously takes more deliberate design attention than a single native app.",
      },
      {
        label: "Performance ceiling for the most demanding use cases",
        description:
          "Extremely performance-sensitive apps (high-end games, heavy real-time graphics) are still better served by fully native development.",
      },
    ],
    tradeOff: {
      bestFor: [
        "Products needing both iOS and Android apps without maintaining two separate native codebases",
        "Teams with existing React expertise extending into mobile",
        "Apps where shared logic and faster iteration matter more than platform-specific pixel-perfect polish everywhere",
      ],
      avoidWhen: [
        "The app has extreme performance requirements (high-end gaming, heavy real-time graphics) better served by fully native development",
        "Deep, frequent use of platform-specific native APIs would require constant native-module development anyway",
        "The team has strong existing native iOS/Android expertise and no particular reason to consolidate onto one codebase",
      ],
      alternatives: [
        "Flutter",
        "Native iOS + Android (separate codebases)",
        "A mobile-optimized web app (for lighter needs)",
      ],
      cost: "Open source; primary cost is engineering time, generally less than maintaining two fully separate native codebases.",
      complexity:
        "Moderate — approachable for React-experienced teams, with added complexity where native modules are required.",
      teamSize:
        "Works for small teams shipping to both platforms through larger teams maintaining a shared component library across iOS and Android.",
      scalability:
        "Scales well for most consumer and business apps; the ecosystem and community support hold up as the app and team grow.",
    },
    architecture: [
      {
        id: "js-layer",
        label: "JavaScript/React layer",
        description: "Application logic and component tree, shared across iOS and Android.",
      },
      {
        id: "bridge",
        label: "Native bridge",
        description: "Communicates between JavaScript and native platform APIs.",
      },
      {
        id: "native-modules",
        label: "Native modules",
        description: "Platform-specific code for capabilities not covered by the shared layer.",
      },
      {
        id: "native-ui",
        label: "Native UI components",
        description:
          "Renders actual native platform views rather than a webview, for native look and performance.",
      },
    ],
    performance:
      "Rendering through native components gives meaningfully better performance than webview-based hybrid approaches. The JavaScript-to-native bridge can become a bottleneck for very high-frequency updates (like complex animations or real-time graphics), where a fully native implementation may be warranted.",
    security:
      "Standard mobile security practices apply — secure storage for tokens (not plain AsyncStorage for sensitive data), certificate pinning where appropriate, and the same API security considerations as any client calling a backend.",
    accessibility:
      "React Native supports platform accessibility APIs (VoiceOver on iOS, TalkBack on Android) through its accessibility props, but — as with any framework — correct usage (labels, roles, focus order) remains the team's responsibility, not something the framework guarantees automatically.",
    scalability:
      "Scales well for most consumer and business app needs, both in team size (shared component libraries across platforms) and user base — the ecosystem's maturity means common scaling patterns (code splitting, lazy loading) are well-documented.",
    costAnalysis:
      "Open source with no licensing cost. The primary cost is engineering time, which is typically lower than maintaining two fully separate native codebases for equivalent functionality — the trade-off is occasional native-module work that requires platform-specific expertise anyway.",
    relatedSolutionSlugs: [],
    relatedCaseStudySlugs: ["fieldnote-mvp"],
    relatedArticleSlugs: ["accessibility-checklist-for-product-teams"],
    faqs: [
      {
        question: "Is React Native good enough for a production consumer app?",
        answer:
          "Yes — it powers apps at very large scale in production, including at Meta itself. It's a well-established choice, not an experimental one, for the large majority of consumer and business app needs.",
      },
      {
        question: "When would native development still be the better choice?",
        answer:
          "When the app has extreme performance requirements (high-end gaming, heavy real-time graphics) or needs to lean heavily and constantly on platform-specific native APIs — in those cases, the overhead of bridging to native code repeatedly can outweigh React Native's productivity benefits.",
      },
    ],
  },
];
