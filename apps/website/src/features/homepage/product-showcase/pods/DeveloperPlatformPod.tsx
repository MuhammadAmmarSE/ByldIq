"use client";

import { useState } from "react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { cn } from "@/utils/cn";

export interface DeveloperPlatformPodProps {
  onInteraction?: (action: string) => void;
}

interface ApiEndpoint {
  id: string;
  method: "GET" | "POST";
  path: string;
  response: string;
}

const ENDPOINTS: ApiEndpoint[] = [
  {
    id: "list-services",
    method: "GET",
    path: "/v1/services",
    response: `{\n  "services": [\n    { "id": "svc_01", "status": "healthy" },\n    { "id": "svc_02", "status": "healthy" }\n  ]\n}`,
  },
  {
    id: "deploy-service",
    method: "POST",
    path: "/v1/services/svc_01/deploy",
    response: `{\n  "deploymentId": "dep_884",\n  "status": "queued"\n}`,
  },
  {
    id: "get-logs",
    method: "GET",
    path: "/v1/services/svc_01/logs",
    response: `{\n  "lines": [\n    "[12:04:01] build succeeded",\n    "[12:04:03] deployed to production"\n  ]\n}`,
  },
];

const METHOD_VARIANT = { GET: "neutral", POST: "accent" } as const;

/** Harborline Cloud's API explorer — a real, clickable endpoint list with mock JSON responses (CLAUDE.md Part 14). */
export function DeveloperPlatformPod({ onInteraction }: DeveloperPlatformPodProps) {
  const [selectedId, setSelectedId] = useState(ENDPOINTS[0]?.id);
  const selected = ENDPOINTS.find((endpoint) => endpoint.id === selectedId) ?? ENDPOINTS[0];

  return (
    <Card>
      <Card.Header>
        <p className="text-foreground font-medium">Harborline Cloud — API Explorer</p>
      </Card.Header>
      <Card.Content className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <ul className="space-y-1.5" role="list">
          {ENDPOINTS.map((endpoint) => (
            <li key={endpoint.id}>
              <button
                type="button"
                onClick={() => {
                  setSelectedId(endpoint.id);
                  onInteraction?.("select_endpoint");
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                  selectedId === endpoint.id ? "bg-surface-raised" : "hover:bg-surface-raised/60",
                )}
                aria-pressed={selectedId === endpoint.id}
              >
                <Badge variant={METHOD_VARIANT[endpoint.method]}>{endpoint.method}</Badge>
                <span className="text-foreground font-mono text-xs">{endpoint.path}</span>
              </button>
            </li>
          ))}
        </ul>

        <pre className="bg-surface-raised text-foreground overflow-x-auto rounded-lg p-4 font-mono text-xs">
          {selected?.response}
        </pre>
      </Card.Content>
    </Card>
  );
}
