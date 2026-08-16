"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { KnowledgeNewsletterSignupProps } from "./KnowledgeNewsletterSignup.types";

/**
 * CLAUDE.md Part 18's Knowledge Center newsletter (Milestone 15,
 * Part 22): "Position it around: Engineering insights, Product thinking,
 * Architecture, AI, Technology decisions... Avoid making the Knowledge
 * Center feel like a lead-generation funnel." A distinct component from
 * the homepage Conversion Experience's generic `NewsletterSignup` —
 * scoped copy, its own `knowledge_newsletter_signup` event — a stub
 * signup with no real email backend, the same honest scope as the
 * homepage version.
 */
export function KnowledgeNewsletterSignup({ className }: KnowledgeNewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const analytics = useAnalytics();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    analytics.track("knowledge_newsletter_signup", {});
  }

  return (
    <div className={cn("border-border max-w-md space-y-3 rounded-lg border p-6", className)}>
      <Heading variant="h5" as="h2">
        Engineering insights, not a sales list
      </Heading>
      <Text variant="body" className="text-muted">
        Architecture decisions, product thinking, and technology trade-offs — the same things we
        write in the Knowledge Center, sent when there&apos;s something worth reading. No discounts,
        no pitch.
      </Text>

      {submitted ? (
        <div className="flex items-center gap-2">
          <Icon icon={CheckCircle2} className="text-success" />
          <Text variant="body">You&apos;re subscribed.</Text>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
          <Label htmlFor="knowledge-newsletter-email" className="sr-only">
            Email address
          </Label>
          <Input
            id="knowledge-newsletter-email"
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button type="submit">Subscribe</Button>
        </form>
      )}
    </div>
  );
}
