import Link from "next/link";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { KnowledgeContentTypePlaceholderProps } from "./KnowledgeContentTypePlaceholder.types";

/**
 * CLAUDE.md Part 4: "Every empty state should educate... explain why,
 * what happened, and what to do next" and Part 8's "Empty Navigation":
 * a category with no content should never render a blank page — it
 * should recommend what's real instead.
 *
 * Backs the honest `/knowledge/whitepapers`, `/knowledge/videos`, and
 * `/knowledge/tutorials` routes: three content types CLAUDE.md Part 18
 * names, but that don't exist as real content yet (no whitepapers have
 * been authored, no video pipeline exists, no interactive tutorial
 * engine has been built). Rather than fabricate entries to fill the
 * page, or silently 404, the page says so and points to what's real
 * right now — the same principle `KnowledgeGrid`'s empty search state
 * and `KnowledgePlaybooks`' single-entry scope note already follow.
 */
export function KnowledgeContentTypePlaceholder({
  contentTypeLabel,
  reason,
  className,
}: KnowledgeContentTypePlaceholderProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="border-border rounded-lg border border-dashed p-8">
        <Text variant="body">
          The Knowledge Center doesn&apos;t have any {contentTypeLabel} yet.
        </Text>
        <Text variant="body" className="mt-2">
          {reason}
        </Text>
        <Text variant="caption" className="mt-2">
          This page will fill in as real {contentTypeLabel} are published — never with placeholder
          content in the meantime.
        </Text>
      </div>

      <div className="space-y-3">
        <Heading variant="h4" as="h2">
          What&apos;s available right now
        </Heading>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/knowledge">Browse all articles</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/knowledge/playbooks">Explore Playbooks</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/knowledge/learning-paths">Explore Learning Paths</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
