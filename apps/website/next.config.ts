import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `/case-studies/[slug]` moved to `/work/[slug]` (CLAUDE.md Part 21's
   * required routes) — permanent redirect rather than a dead link, even
   * though this is a pre-launch site with no real backlinks yet.
   */
  async redirects() {
    return [
      {
        source: "/case-studies/:slug",
        destination: "/work/:slug",
        permanent: true,
      },
    ];
  },
};

export default withContentCollections(nextConfig);
