/**
 * The five visitor journeys from Chapter 1 ("What are you building?").
 * Selecting one personalizes messaging, case studies, and recommendations
 * across the site (see website/website-vision.md). `null` means the visitor
 * hasn't chosen yet.
 */
export const JOURNEYS = ["startup", "enterprise", "commerce", "ai", "platform"] as const;

export type Journey = (typeof JOURNEYS)[number];
