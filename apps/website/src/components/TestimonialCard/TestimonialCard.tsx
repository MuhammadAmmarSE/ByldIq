import { Avatar } from "@/components/Avatar";
import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { TestimonialCardProps } from "./TestimonialCard.types";

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

/**
 * A quote + attribution card. Initials are derived from `authorName`
 * (first + last word) rather than requiring a separate prop — `Avatar`
 * itself still requires an explicit `fallback`, so this is the one place
 * that derivation happens rather than every future caller repeating it.
 */
export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  authorAvatarSrc,
  className,
}: TestimonialCardProps) {
  return (
    <Card className={cn("flex flex-col gap-6 p-6", className)}>
      <Text variant="body" as="blockquote" className="text-foreground">
        &ldquo;{quote}&rdquo;
      </Text>
      <div className="flex items-center gap-3">
        <Avatar src={authorAvatarSrc} alt={authorName} fallback={getInitials(authorName)} />
        <div>
          <Text variant="body" className="font-medium">
            {authorName}
          </Text>
          <Text variant="caption" className="text-muted">
            {authorRole}
          </Text>
        </div>
      </div>
    </Card>
  );
}
