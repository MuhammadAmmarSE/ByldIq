import { cn } from "@/utils/cn";

import type { CardContentProps, CardFooterProps, CardHeaderProps, CardProps } from "./Card.types";

function CardRoot({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("bg-surface border-border rounded-lg border shadow-sm", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />;
}

function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("border-border flex items-center gap-3 border-t p-6", className)}
      {...props}
    />
  );
}

/**
 * Compound component: `Card.Header` / `Card.Content` / `Card.Footer` are
 * meant to be composed in that order (`Content`'s `pt-0` assumes a
 * preceding `Header` already contributed top padding).
 */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});
