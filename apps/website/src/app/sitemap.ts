import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * Grows as real routes land (Milestone 4+). Only the root is known to
 * exist right now — inventing entries for pages that don't exist yet
 * would just produce 404s in search results.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
