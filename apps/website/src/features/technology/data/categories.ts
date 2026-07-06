export interface TechnologyCategory {
  slug: string;
  label: string;
}

/**
 * The full category taxonomy named in CLAUDE.md Part 22 ("Categories:
 * Frontend, Backend, Mobile, AI, Cloud, Infrastructure, Commerce,
 * Databases, DevOps, Security, Performance, Monitoring, Search, Payments,
 * Storage, Authentication, Testing, Accessibility, Analytics, Automation
 * ... Expandable"). Declared in full so every future technology already
 * has a home to slot into — but only categories with at least one real
 * `TECHNOLOGIES` entry get a `/technology/category/[category]` page or
 * appear in the landing page's category grid. An empty category page
 * would be exactly the dead end CLAUDE.md Part 8 warns against; the
 * "expandable" instruction is about the taxonomy, not about pretending
 * populated categories exist before they do.
 */
export const TECHNOLOGY_CATEGORIES: TechnologyCategory[] = [
  { slug: "frontend", label: "Frontend" },
  { slug: "backend", label: "Backend" },
  { slug: "mobile", label: "Mobile" },
  { slug: "ai", label: "AI" },
  { slug: "cloud", label: "Cloud" },
  { slug: "infrastructure", label: "Infrastructure" },
  { slug: "commerce", label: "Commerce" },
  { slug: "databases", label: "Databases" },
  { slug: "devops", label: "DevOps" },
  { slug: "security", label: "Security" },
  { slug: "performance", label: "Performance" },
  { slug: "monitoring", label: "Monitoring" },
  { slug: "search", label: "Search" },
  { slug: "payments", label: "Payments" },
  { slug: "storage", label: "Storage" },
  { slug: "authentication", label: "Authentication" },
  { slug: "testing", label: "Testing" },
  { slug: "accessibility", label: "Accessibility" },
  { slug: "analytics", label: "Analytics" },
  { slug: "automation", label: "Automation" },
];
