"use client";

import { useState } from "react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

const DAYS = ["Mon", "Tue", "Wed"] as const;
const TIMES = ["10:00 AM", "1:00 PM", "3:30 PM"] as const;

export interface CalendarPreviewProps {
  className?: string;
}

/**
 * An illustrative availability grid (CLAUDE.md Part 19) — there's no real
 * booking backend, so selecting a slot doesn't schedule anything; it
 * confirms the choice and explains what happens next, honestly.
 */
export function CalendarPreview({ className }: CalendarPreviewProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const analytics = useAnalytics();
  const { toast } = useToast();

  function handleSelectSlot(day: string, time: string) {
    const slot = `${day} ${time}`;
    setSelectedSlot(slot);
    analytics.track("conversion_calendar_slot_selected", { slot });
    toast({
      title: "Noted",
      description: `We'll follow up by email to confirm ${slot}.`,
      variant: "success",
    });
  }

  return (
    <Card className={cn("p-5", className)}>
      <Text variant="caption" className="font-medium">
        Discovery call — 30 minutes
      </Text>
      <div
        className="mt-3 grid grid-cols-3 gap-2"
        role="group"
        aria-label="Available discovery call times"
      >
        {DAYS.map((day) =>
          TIMES.map((time) => {
            const slot = `${day} ${time}`;
            return (
              <Button
                key={slot}
                size="sm"
                variant={selectedSlot === slot ? "primary" : "outline"}
                aria-pressed={selectedSlot === slot}
                onClick={() => handleSelectSlot(day, time)}
              >
                {day} {time}
              </Button>
            );
          }),
        )}
      </div>
      <Text variant="caption" className="mt-3">
        Illustrative availability — we&apos;ll confirm the exact time by email.
      </Text>
    </Card>
  );
}
