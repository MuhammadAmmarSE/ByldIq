"use client";

import { Bookmark } from "lucide-react";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useAppStore } from "@/providers/StoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { KnowledgeBookmarkButtonProps } from "./KnowledgeBookmarkButton.types";

/**
 * CLAUDE.md Part 18's Reading Experience: bookmarking, persisted the same
 * way `journey`/`hasSeenIntro` already are — the app store's
 * `bookmarkedArticleSlugs`, safe-storage-backed so it survives a reload
 * (Part 10: "Preference should persist across visits until changed") and
 * degrades to session-only memory when storage is blocked.
 */
export function KnowledgeBookmarkButton({ slug, className }: KnowledgeBookmarkButtonProps) {
  const analytics = useAnalytics();
  const isBookmarked = useAppStore((state) => state.bookmarkedArticleSlugs.includes(slug));
  const toggleBookmark = useAppStore((state) => state.toggleBookmark);

  function handleClick() {
    toggleBookmark(slug);
    analytics.track("knowledge_bookmark_toggled", { slug, bookmarked: !isBookmarked });
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      aria-pressed={isBookmarked}
      className={cn(className)}
    >
      <Icon icon={Bookmark} size="sm" className={isBookmarked ? "fill-current" : undefined} />
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </Button>
  );
}
