"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { Select } from "@/components/Select";

export interface CommerceDashboardPodProps {
  onInteraction?: (action: string) => void;
}

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: "fulfilled" | "processing" | "refunded";
}

const ORDERS: Order[] = [
  { id: "#3021", customer: "J. Alvarez", amount: 128.5, status: "fulfilled" },
  { id: "#3022", customer: "M. Chen", amount: 64.0, status: "processing" },
  { id: "#3023", customer: "R. Patel", amount: 342.75, status: "fulfilled" },
  { id: "#3024", customer: "S. Novak", amount: 19.99, status: "refunded" },
  { id: "#3025", customer: "D. Osei", amount: 210.0, status: "processing" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "processing", label: "Processing" },
  { value: "refunded", label: "Refunded" },
];

const STATUS_VARIANT = {
  fulfilled: "success",
  processing: "warning",
  refunded: "neutral",
} as const;

/** Nova Commerce's order dashboard — a real, sortable and filterable table over mock data (CLAUDE.md Part 14). */
export function CommerceDashboardPod({ onInteraction }: CommerceDashboardPodProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortDescending, setSortDescending] = useState(true);

  const orders = useMemo(() => {
    const filtered = ORDERS.filter(
      (order) => statusFilter === "all" || order.status === statusFilter,
    );
    return [...filtered].sort((a, b) =>
      sortDescending ? b.amount - a.amount : a.amount - b.amount,
    );
  }, [statusFilter, sortDescending]);

  return (
    <Card>
      <Card.Header className="flex-row items-center justify-between">
        <p className="text-foreground font-medium">Nova Commerce — Orders</p>
        <Select
          aria-label="Filter by status"
          options={STATUS_OPTIONS}
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            onInteraction?.("filter_status");
          }}
        />
      </Card.Header>
      <Card.Content>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-border border-b">
              <th className="text-muted py-2 font-medium">Order</th>
              <th className="text-muted py-2 font-medium">Customer</th>
              <th className="py-2 font-medium">
                <button
                  type="button"
                  className="text-muted hover:text-foreground flex items-center gap-1"
                  onClick={() => {
                    setSortDescending((current) => !current);
                    onInteraction?.("sort_amount");
                  }}
                >
                  Amount
                  <Icon icon={ArrowUpDown} size="xs" />
                </button>
              </th>
              <th className="text-muted py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-border border-b last:border-0">
                <td className="text-foreground py-2">{order.id}</td>
                <td className="text-foreground py-2">{order.customer}</td>
                <td className="text-foreground py-2">${order.amount.toFixed(2)}</td>
                <td className="py-2">
                  <Badge variant={STATUS_VARIANT[order.status]}>{order.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <Button variant="ghost" size="sm" className="mt-4" onClick={() => setStatusFilter("all")}>
            Clear filter — no orders match
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}
