export interface BusinessProblemCategory {
  slug: string;
  label: string;
}

/**
 * Display labels for each case study's `businessProblem` slug — the same
 * slug doubles as the `/work/business-problem/[problem]` route param
 * (Milestone 5, a later phase), so it stays URL-safe rather than being a
 * free-text label.
 */
export const BUSINESS_PROBLEMS: BusinessProblemCategory[] = [
  { slug: "mvp-validation", label: "MVP Validation" },
  { slug: "legacy-modernization", label: "Legacy Modernization" },
  { slug: "checkout-conversion", label: "Checkout Conversion" },
  { slug: "support-automation", label: "Support Automation" },
  { slug: "developer-experience", label: "Developer Experience" },
];
