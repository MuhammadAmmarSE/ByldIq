import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { FeatureCardProps } from "./FeatureCard.types";

const cardBaseStyles = "bg-surface border-border rounded-lg border shadow-sm";
const contentStyles = "flex h-full flex-col items-start gap-4 p-6";
const interactiveStyles =
  "transition hover:border-accent/50 hover:-translate-y-1 hover:shadow-md focus-visible:ring-focus-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none";

/**
 * Icon + title + description card — the shape repeated ad hoc across
 * homepage sections (e.g. `JourneyCard`'s icon-in-circle treatment) for
 * general "here's a capability" content, extracted as a reusable
 * primitive per Milestone 8's design system audit. `JourneyCard` itself
 * isn't rebuilt on top of this — its Radix `RadioGroup.Item` selection
 * semantics are a genuinely different interaction, not this component's
 * "static or single-link" card.
 */
export function FeatureCard({
  icon,
  title,
  description,
  href,
  ctaLabel,
  onClick,
  className,
}: FeatureCardProps) {
  const content = (
    <>
      <span className="bg-accent/10 text-accent flex size-12 items-center justify-center rounded-full">
        <Icon icon={icon} size="lg" />
      </span>
      <div className="space-y-1.5">
        <Heading variant="h5" as="h3">
          {title}
        </Heading>
        <Text variant="body" className="text-muted">
          {description}
        </Text>
      </div>
      {href && ctaLabel && (
        <span className="text-accent mt-auto flex items-center gap-1 text-sm font-medium">
          {ctaLabel}
          <Icon icon={ArrowRight} size="sm" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(cardBaseStyles, contentStyles, interactiveStyles, className)}
      >
        {content}
      </Link>
    );
  }

  return <Card className={cn(contentStyles, className)}>{content}</Card>;
}
