"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Text } from "@/components/Text";

export interface HealthcarePlatformPodProps {
  onInteraction?: (action: string) => void;
}

type AppointmentStatus = "upcoming" | "completed" | "cancelled";

interface Appointment {
  id: string;
  /** Fictional patient name — CLAUDE.md Part 14: "Patient data must always be fictional." */
  patient: string;
  time: string;
  status: AppointmentStatus;
}

const APPOINTMENTS: Appointment[] = [
  { id: "apt-1", patient: "Jordan Reyes (fictional)", time: "9:00 AM", status: "upcoming" },
  { id: "apt-2", patient: "Priya Kapoor (fictional)", time: "10:30 AM", status: "completed" },
  { id: "apt-3", patient: "Sam Whitfield (fictional)", time: "1:00 PM", status: "upcoming" },
  { id: "apt-4", patient: "Lena Brown (fictional)", time: "2:15 PM", status: "cancelled" },
];

const FILTERS: { value: AppointmentStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_VARIANT = { upcoming: "accent", completed: "success", cancelled: "neutral" } as const;

/** Acme Health's appointment schedule — real filtering over clearly fictional patient data (CLAUDE.md Part 14). */
export function HealthcarePlatformPod({ onInteraction }: HealthcarePlatformPodProps) {
  const [filter, setFilter] = useState<AppointmentStatus | "all">("all");

  const appointments = useMemo(
    () => APPOINTMENTS.filter((appointment) => filter === "all" || appointment.status === filter),
    [filter],
  );

  return (
    <Card>
      <Card.Header className="flex-row items-center justify-between">
        <p className="text-foreground font-medium">Acme Health — Today&apos;s Schedule</p>
      </Card.Header>
      <Card.Content className="space-y-4">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter appointments by status"
        >
          {FILTERS.map((option) => (
            <Button
              key={option.value}
              size="sm"
              variant={filter === option.value ? "primary" : "outline"}
              onClick={() => {
                setFilter(option.value);
                onInteraction?.("filter_appointments");
              }}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <ul className="space-y-2" role="list">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="border-border flex items-center justify-between gap-4 rounded-lg border p-3"
            >
              <div>
                <Text variant="body">{appointment.patient}</Text>
                <Text variant="caption">{appointment.time}</Text>
              </div>
              <Badge variant={STATUS_VARIANT[appointment.status]}>{appointment.status}</Badge>
            </li>
          ))}
        </ul>
      </Card.Content>
    </Card>
  );
}
