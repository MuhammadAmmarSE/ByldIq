"use client";

import { Share2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { useToast } from "@/components/Toast";

import type { ShareButtonProps } from "./ShareButton.types";

/**
 * CLAUDE.md Part 23's Reading Experience: share. Uses the native Web
 * Share API when the browser supports it (mobile browsers, most
 * desktop browsers behind a user gesture); falls back to copying the
 * URL to the clipboard with a toast confirmation otherwise — never a
 * broken or silent no-op either way.
 */
export function ShareButton({ title, url, onShare, className }: ShareButtonProps) {
  const { toast } = useToast();

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        onShare?.();
      } catch {
        // The user cancelled the native share sheet, or it failed silently — not an error to surface.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied", description: "Share it however you like." });
      onShare?.();
    } catch {
      toast({ title: "Couldn't copy the link", variant: "danger" });
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleShare} className={className}>
      <Icon icon={Share2} size="sm" />
      Share
    </Button>
  );
}
