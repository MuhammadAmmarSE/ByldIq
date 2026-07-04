import { defineConfig } from "@content-collections/core";

/**
 * No collections are defined yet — the Knowledge Center's actual content
 * types (articles, guides, case studies, whitepapers) are product/content
 * decisions for Milestone 5, not this architecture milestone. This wires
 * the build pipeline (content-collections -> Next.js) so those collections
 * can be added later without touching config plumbing.
 */
export default defineConfig({
  content: [],
});
