/**
 * Structural contract for nav entries. No items are populated yet — the
 * actual information architecture (Solutions, Work, Process, ...) is a
 * content/UX decision for the navigation component in Milestone 2 and the
 * sitemap in later milestones, not this foundation milestone.
 */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
