"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";

export interface EnterpriseOperationsPodProps {
  onInteraction?: (action: string) => void;
}

interface ApprovalRequest {
  id: string;
  title: string;
  department: string;
  status: "pending" | "approved" | "rejected";
}

const INITIAL_REQUESTS: ApprovalRequest[] = [
  {
    id: "req-1",
    title: "New carrier onboarding — Meridian Freight",
    department: "Procurement",
    status: "pending",
  },
  {
    id: "req-2",
    title: "Route change — Northeast corridor",
    department: "Operations",
    status: "pending",
  },
  {
    id: "req-3",
    title: "Warehouse access — Q3 contractors",
    department: "Security",
    status: "pending",
  },
];

/** Atlas Logistics' approvals queue — real, stateful approve/reject actions over mock data (CLAUDE.md Part 14). */
export function EnterpriseOperationsPod({ onInteraction }: EnterpriseOperationsPodProps) {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  function resolve(id: string, status: "approved" | "rejected") {
    setRequests((current) =>
      current.map((request) => (request.id === id ? { ...request, status } : request)),
    );
    onInteraction?.(status === "approved" ? "approve_request" : "reject_request");
  }

  return (
    <Card>
      <Card.Header>
        <p className="text-foreground font-medium">Atlas Logistics — Approvals</p>
      </Card.Header>
      <Card.Content className="space-y-3">
        {requests.map((request) => (
          <div
            key={request.id}
            className="border-border flex items-center justify-between gap-4 rounded-lg border p-3"
          >
            <div>
              <Text variant="body">{request.title}</Text>
              <Text variant="caption">{request.department}</Text>
            </div>

            {request.status === "pending" ? (
              <div className="flex shrink-0 gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={`Reject ${request.title}`}
                  onClick={() => resolve(request.id, "rejected")}
                >
                  <Icon icon={X} size="sm" />
                </Button>
                <Button
                  size="icon"
                  aria-label={`Approve ${request.title}`}
                  onClick={() => resolve(request.id, "approved")}
                >
                  <Icon icon={Check} size="sm" />
                </Button>
              </div>
            ) : (
              <Badge variant={request.status === "approved" ? "success" : "danger"}>
                {request.status}
              </Badge>
            )}
          </div>
        ))}
      </Card.Content>
    </Card>
  );
}
