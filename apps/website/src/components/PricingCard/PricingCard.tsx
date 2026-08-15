import { Check } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { PricingCardProps } from "./PricingCard.types";

/**
 * A pricing tier card. `featured` uses the `--gradient-accent` token
 * (Milestone 8 Phase A) as a 1px border treatment — the only place in the
 * design system that token is consumed so far, per its own doc comment.
 */
export function PricingCard({
  tier,
  price,
  description,
  features,
  ctaLabel,
  ctaHref,
  onCtaClick,
  featured = false,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        featured && "rounded-lg p-px",
        featured && "bg-[image:var(--gradient-accent)]",
        className,
      )}
    >
      <Card className={cn("flex h-full flex-col gap-6 p-6", featured && "border-0")}>
        <div className="space-y-2">
          {featured && <Badge variant="accent">Recommended</Badge>}
          <Heading variant="h4" as="h3">
            {tier}
          </Heading>
          <p className="text-foreground text-3xl font-semibold">{price}</p>
          {description && (
            <Text variant="body" className="text-muted">
              {description}
            </Text>
          )}
        </div>

        <ul className="flex-1 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span className="bg-accent/10 text-accent mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                <Icon icon={Check} size="xs" />
              </span>
              <Text variant="body">{feature}</Text>
            </li>
          ))}
        </ul>

        <Button
          variant={featured ? "primary" : "outline"}
          size="lg"
          className="w-full"
          onClick={ctaHref ? undefined : onCtaClick}
          asChild={Boolean(ctaHref)}
        >
          {ctaHref ? <Link href={ctaHref}>{ctaLabel}</Link> : ctaLabel}
        </Button>
      </Card>
    </div>
  );
}
