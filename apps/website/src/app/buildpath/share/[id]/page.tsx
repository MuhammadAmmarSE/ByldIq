import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { decodeSharePayload } from "@/features/buildpath/share-encoding";

interface SharePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "A shared BuildPath plan",
  description: "A product plan built with BuildPath.",
};

/**
 * CLAUDE.md Milestone 14 §27's shareable link — read-only, and honestly
 * scoped: the `[id]` segment is the whole payload (see
 * `share-encoding.ts`'s doc comment on why), so this only ever shows the
 * Final Plan summary, not the visitor's full session.
 */
export default async function BuildPathSharePage({ params }: SharePageProps) {
  const { id } = await params;
  const payload = decodeSharePayload(id);

  if (!payload) {
    return (
      <Container size="content" className="py-16">
        <div className="mx-auto max-w-md space-y-4 text-center">
          <Heading variant="h3" as="h1">
            This link looks broken.
          </Heading>
          <Text variant="body" className="text-muted">
            It may have been shortened, edited, or copied incompletely. Start a new plan instead.
          </Text>
          <Button asChild>
            <Link href="/buildpath">Start BuildPath</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container size="content" className="py-16">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <Badge variant="accent">Shared plan</Badge>
          <Heading variant="h2" as="h1">
            A BuildPath plan
          </Heading>
          <Text variant="body" className="text-muted">
            Someone used BuildPath to turn a conversation about their product into this plan.
          </Text>
        </div>

        {payload.projectTypes.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {payload.projectTypes.map((type) => (
              <Badge key={type} variant="outline">
                {type}
              </Badge>
            ))}
          </div>
        )}

        <Card className="space-y-4 p-6">
          <div>
            <Text variant="caption" className="text-muted font-medium">
              Vision
            </Text>
            <Text variant="body">{payload.vision}</Text>
          </div>
          <div>
            <Text variant="caption" className="text-muted font-medium">
              Problem
            </Text>
            <Text variant="body">{payload.problem}</Text>
          </div>
          {payload.mvpFeatureNames.length > 0 && (
            <div>
              <Text variant="caption" className="text-muted font-medium">
                MVP features
              </Text>
              <ul className="list-inside list-disc space-y-0.5">
                {payload.mvpFeatureNames.map((name) => (
                  <li key={name}>
                    <Text variant="body" as="span">
                      {name}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {payload.nextSteps.length > 0 && (
            <div>
              <Text variant="caption" className="text-muted font-medium">
                Next steps
              </Text>
              <ul className="list-inside list-disc space-y-0.5">
                {payload.nextSteps.map((step) => (
                  <li key={step}>
                    <Text variant="body" as="span">
                      {step}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        <div className="text-center">
          <Button asChild>
            <Link href="/buildpath">Start your own BuildPath plan</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
