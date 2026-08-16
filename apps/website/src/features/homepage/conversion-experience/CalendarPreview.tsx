"use client";

import { useState } from "react";
import { CalendarCheck, Clock, Users } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

const DAYS = ["Mon", "Tue", "Wed"] as const;
const TIMES = ["10:00 AM", "1:00 PM", "3:30 PM"] as const;

const EXPECTATIONS = [
  { icon: Clock, label: "30 minutes, over video" },
  { icon: Users, label: "You and a Byld IQ product engineer" },
  { icon: CalendarCheck, label: "We send a short agenda beforehand" },
];

export interface CalendarPreviewProps {
  className?: string;
}

/**
 * An illustrative availability grid (CLAUDE.md Part 19) — there's no real
 * booking backend, so selecting a slot doesn't schedule anything; it
 * confirms the choice and explains what happens next, honestly.
 *
 * Day and time are chosen in two short steps rather than one grid of
 * "Mon 10:00 AM"-style buttons: at mobile widths that combined label
 * wrapped inside the button, which read as broken rather than premium.
 * Splitting the label in two keeps every button's text short (a day
 * abbreviation, or a time), and the time step stacks to a single column
 * below `sm` so touch targets stay full-width and comfortable.
 */
export function CalendarPreview({ className }: CalendarPreviewProps) {
  const [selectedDay, setSelectedDay] = useState<(typeof DAYS)[number]>(DAYS[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const analytics = useAnalytics();
  const { toast } = useToast();

  function handleSelectSlot(time: string) {
    const slot = `${selectedDay} ${time}`;
    setSelectedSlot(slot);
    analytics.track("conversion_calendar_slot_selected", { slot });
    toast({
      title: "Noted",
      description: `We'll follow up by email to confirm ${slot}.`,
      variant: "success",
    });
  }

  return (
    <div className={cn("rounded-lg p-px", "bg-[image:var(--gradient-accent)]", className)}>
      <Card className="space-y-5 border-0 p-5 sm:p-6">
        <div className="space-y-1">
          <Heading variant="h5" as="h3">
            Discovery call — 30 minutes
          </Heading>
          <Text variant="caption">Pick a day and time — we&apos;ll confirm by email.</Text>
        </div>

        <ul className="space-y-2.5">
          {EXPECTATIONS.map(({ icon, label }) => (
            <li key={label} className="flex items-center gap-2.5">
              <span className="bg-accent/10 text-accent flex size-6 shrink-0 items-center justify-center rounded-full">
                <Icon icon={icon} size="xs" />
              </span>
              <Text variant="caption">{label}</Text>
            </li>
          ))}
        </ul>

        <div className="space-y-4">
          <div>
            <Text variant="caption" className="font-medium">
              Day
            </Text>
            <div className="mt-2 grid grid-cols-3 gap-2" role="group" aria-label="Choose a day">
              {DAYS.map((day) => (
                <Button
                  key={day}
                  size="sm"
                  variant={selectedDay === day ? "primary" : "outline"}
                  aria-pressed={selectedDay === day}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Text variant="caption" className="font-medium">
              Time
            </Text>
            <div
              className="mt-2 flex flex-col gap-2 sm:grid sm:grid-cols-3"
              role="group"
              aria-label={`Available times, ${selectedDay}`}
            >
              {TIMES.map((time) => {
                const slot = `${selectedDay} ${time}`;
                return (
                  <Button
                    key={time}
                    size="sm"
                    variant={selectedSlot === slot ? "primary" : "outline"}
                    aria-pressed={selectedSlot === slot}
                    onClick={() => handleSelectSlot(time)}
                    className="w-full"
                  >
                    {time}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <Text variant="caption">
          Illustrative availability — we&apos;ll confirm the exact time by email.
        </Text>
      </Card>
    </div>
  );
}
