import { defineConfig } from "@content-collections/core";

/**
 * No collections are defined yet — the Knowledge Center's actual content
 * types (articles, guides, case studies, whitepapers) are product/content
 * decisions for a future Knowledge Center milestone, not this one. This
 * wires the build pipeline (content-collections -> Next.js) so those
 * collections can be added later without touching config plumbing.
 * Milestone 3's homepage Knowledge Center preview uses local typed data
 * (`features/homepage/knowledge-center-preview/data/articles.ts`) instead.
 */
export default defineConfig({
  content: [],
});
