"use client";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAppStore } from "@/providers/StoreProvider";
import { cn } from "@/utils/cn";

import { DECISION_CARDS, getRecommendedCardId } from "./data/decision-cards";
import type { DecisionCardsProps } from "./DecisionCards.types";

/**
 * CLAUDE.md Part 19's decision engine: multiple next steps, one
 * highlighted per journey, never forced ("the recommendation is
 * highlighted. Never forced.").
 */
export function DecisionCards({ onSelect, className }: DecisionCardsProps) {
  const journey = useAppStore((state) => state.journey);
  const recommendedId = getRecommendedCardId(journey);

  return (
    <div
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
      role="list"
      aria-label="What would you like to do next?"
    >
      {DECISION_CARDS.map((card) => {
        const isRecommended = card.id === recommendedId;
        return (
          <Card
            key={card.id}
            role="listitem"
            className={cn("flex flex-col p-5", isRecommended && "border-accent shadow-md")}
          >
            {isRecommended && (
              <Badge variant="accent" className="mb-3 self-start">
                Recommended for you
              </Badge>
            )}
            <Heading variant="h5" as="h3">
              {card.title}
            </Heading>
            <Text variant="body" className="mt-1 flex-1">
              {card.description}
            </Text>
            <Button
              variant={isRecommended ? "primary" : "outline"}
              className="mt-4 self-start"
              onClick={() => onSelect(card)}
            >
              {card.cta}
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
