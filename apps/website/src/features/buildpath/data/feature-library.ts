import type { ProjectType } from "../types";

export interface SuggestedFeatureTemplate {
  name: string;
  description: string;
  forUser: string;
  reason: string;
}

/**
 * Candidate features `MockAIProvider.suggestFeatures` draws from, keyed by
 * project type. Deliberately a small, curated set per type rather than an
 * exhaustive catalog — CLAUDE.md §11 wants suggestions the visitor can
 * genuinely evaluate one at a time (Add / Ignore / Ask Why), not a wall of
 * options.
 */
export const FEATURE_LIBRARY: Partial<Record<ProjectType, SuggestedFeatureTemplate[]>> = {
  "E-commerce": [
    {
      name: "Cart Abandonment Recovery",
      description: "Automatically follow up when a shopper leaves items in their cart unpurchased.",
      forUser: "Shoppers who almost bought something",
      reason:
        "Abandoned-cart recovery is one of the highest-return features in commerce — it recovers revenue you've already earned the customer's attention for.",
    },
    {
      name: "Product Recommendations",
      description:
        "Surface related or frequently-bought-together products on product and cart pages.",
      forUser: "Shoppers browsing the catalog",
      reason:
        "Increases average order value without requiring the shopper to do any extra searching.",
    },
    {
      name: "Inventory Sync",
      description:
        "Keep stock levels accurate across your storefront and any other sales channels.",
      forUser: "Operations team",
      reason:
        "Selling something you're actually out of stock of is one of the fastest ways to erode customer trust.",
    },
  ],
  SaaS: [
    {
      name: "Usage-Based Billing",
      description: "Meter feature usage and bill accordingly, rather than a single flat plan.",
      forUser: "Customers with variable usage",
      reason:
        "Usage-based pricing usually converts better for products where value scales with how much someone uses them.",
    },
    {
      name: "Team Roles & Permissions",
      description: "Let account owners invite teammates with different access levels.",
      forUser: "Account owners and their teams",
      reason:
        "Most SaaS products are used by teams, not individuals — permissions become necessary the moment a second person joins an account.",
    },
    {
      name: "Admin Analytics Dashboard",
      description: "A dashboard showing how customers are actually using the product.",
      forUser: "Your own team, not end customers",
      reason: "Without this, decisions about what to build next are guesses instead of evidence.",
    },
  ],
  "AI Product": [
    {
      name: "Conversation History",
      description: "Let users revisit and continue previous AI interactions.",
      forUser: "Returning users",
      reason:
        "AI features that forget everything between sessions feel disposable rather than genuinely useful.",
    },
    {
      name: "Feedback on AI Outputs",
      description: "A lightweight thumbs up/down (or similar) on AI-generated results.",
      forUser: "End users",
      reason:
        "This is your cheapest source of real-world evaluation data once the feature is live — CLAUDE.md's 'no black-box AI' principle applies after launch too.",
    },
    {
      name: "Usage Guardrails",
      description: "Rate limits and content boundaries on what the AI feature will do.",
      forUser: "You, protecting cost and reputation",
      reason:
        "AI features without guardrails have a way of becoming expensive or embarrassing at exactly the wrong moment.",
    },
  ],
  "Mobile App": [
    {
      name: "Push Notifications",
      description: "Timely, relevant notifications for the moments that matter in your product.",
      forUser: "Mobile users",
      reason:
        "One of the few channels that reliably brings people back to a mobile app without relying on email.",
    },
    {
      name: "Offline Mode",
      description: "Core functionality keeps working without a network connection.",
      forUser: "Mobile users with unreliable connectivity",
      reason: "Mobile users expect an app to at least not break the moment they lose signal.",
    },
    {
      name: "Biometric Login",
      description: "Face ID / fingerprint sign-in instead of re-typing a password.",
      forUser: "Returning mobile users",
      reason: "Removes friction from the single most common action in a mobile app — opening it.",
    },
  ],
  "Enterprise Platform": [
    {
      name: "Audit Log",
      description: "A record of who did what, and when, across the system.",
      forUser: "Compliance and security teams",
      reason:
        "Enterprise buyers frequently ask for this in procurement — building it in from the start is far cheaper than retrofitting it.",
    },
    {
      name: "Role-Based Access Control",
      description: "Granular permissions tied to a user's role in the organization.",
      forUser: "Admins managing internal access",
      reason:
        "Enterprise systems rarely have one flat user type — access needs almost always vary by role.",
    },
    {
      name: "Single Sign-On (SSO)",
      description:
        "Let users authenticate through their organization's existing identity provider.",
      forUser: "Enterprise IT and end users",
      reason: "Often a hard requirement in enterprise procurement, not a nice-to-have.",
    },
  ],
  Modernization: [
    {
      name: "Audit Log",
      description: "A record of who did what, and when, across the system.",
      forUser: "Compliance and security teams",
      reason: "Legacy systems being replaced often lack this entirely — a good moment to add it.",
    },
    {
      name: "Data Migration Verification",
      description: "Tooling to confirm migrated data matches the legacy system before cutover.",
      forUser: "Your own team during migration",
      reason:
        "The riskiest moment in any modernization project is the cutover — verifying data integrity beforehand is what makes that moment boring instead of terrifying.",
    },
  ],
  Automation: [
    {
      name: "Workflow Builder",
      description:
        "Let users configure or adjust automation rules without engineering involvement.",
      forUser: "Operations or business users",
      reason:
        "Automation that only engineers can change tends to calcify — a builder keeps it adaptable.",
    },
    {
      name: "Error Alerting & Retry Queue",
      description:
        "Surface failed automation runs and retry them instead of silently dropping them.",
      forUser: "Operations team",
      reason:
        "Automations fail quietly by default; without this, you find out about a broken workflow from a customer instead of a dashboard.",
    },
  ],
};

/** Offered whenever the project type doesn't have a dedicated set above, or as a supplement to it. */
export const GENERAL_FEATURE_TEMPLATES: SuggestedFeatureTemplate[] = [
  {
    name: "User Onboarding Checklist",
    description:
      "A short, guided first-run experience that gets a new user to their first success moment.",
    forUser: "First-time users",
    reason:
      "Most products lose more users in the first session than at any other point — a guided first run measurably reduces that drop-off.",
  },
  {
    name: "In-App Notifications",
    description:
      "A notification center for updates relevant to the user, inside the product itself.",
    forUser: "Active users",
    reason: "Keeps important updates visible without depending entirely on email open rates.",
  },
];
