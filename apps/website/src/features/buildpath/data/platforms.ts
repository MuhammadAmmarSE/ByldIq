/** CLAUDE.md Milestone 14/17's Platform selection: Web, iOS, Android, Desktop, API, Admin, Customer Portal, Partner Portal. */
export const PLATFORM_OPTIONS = [
  "Web",
  "iOS",
  "Android",
  "Desktop",
  "API",
  "Admin Portal",
  "Customer Portal",
  "Partner Portal",
] as const;

export type PlatformOption = (typeof PLATFORM_OPTIONS)[number];
