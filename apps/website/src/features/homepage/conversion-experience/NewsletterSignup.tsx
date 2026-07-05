"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

export interface NewsletterSignupProps {
  className?: string;
}

/**
 * A stub signup — CLAUDE.md Part 19's newsletter, with no real email
 * backend yet. Submitting transitions to a genuine success state (it's
 * not a dead button), but doesn't send the address anywhere.
 */
export function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const analytics = useAnalytics();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    analytics.track("conversion_newsletter_submitted", {});
  }

  if (submitted) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Icon icon={CheckCircle2} className="text-success" />
        <Text variant="body">
          You&apos;re subscribed. Weekly engineering insights, no discounts.
        </Text>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-2 sm:flex-row", className)}>
      <Label htmlFor="newsletter-email" className="sr-only">
        Email address
      </Label>
      <Input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
