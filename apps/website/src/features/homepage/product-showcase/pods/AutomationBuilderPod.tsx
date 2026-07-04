"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { Switch } from "@/components/Switch";
import { Text } from "@/components/Text";

export interface AutomationBuilderPodProps {
  onInteraction?: (action: string) => void;
}

interface WorkflowStep {
  id: string;
  label: string;
  enabled: boolean;
}

const INITIAL_STEPS: WorkflowStep[] = [
  { id: "step-1", label: "New order received", enabled: true },
  { id: "step-2", label: "Verify inventory", enabled: true },
  { id: "step-3", label: "Charge payment method", enabled: true },
  { id: "step-4", label: "Notify fulfillment partner", enabled: false },
];

type RunState = "idle" | "running" | "done";

/** A workflow automation builder — real step toggles and a run simulation over mock steps (CLAUDE.md Part 14). */
export function AutomationBuilderPod({ onInteraction }: AutomationBuilderPodProps) {
  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [runState, setRunState] = useState<RunState>("idle");
  const [activeStepIndex, setActiveStepIndex] = useState(-1);

  function toggleStep(id: string) {
    setSteps((current) =>
      current.map((step) => (step.id === id ? { ...step, enabled: !step.enabled } : step)),
    );
    onInteraction?.("toggle_step");
  }

  function runWorkflow() {
    const enabledSteps = steps.filter((step) => step.enabled);
    if (enabledSteps.length === 0 || runState === "running") return;

    onInteraction?.("run_workflow");
    setRunState("running");
    setActiveStepIndex(0);

    enabledSteps.forEach((_, index) => {
      setTimeout(() => setActiveStepIndex(index), index * 500);
    });
    setTimeout(
      () => {
        setRunState("done");
        setActiveStepIndex(-1);
      },
      enabledSteps.length * 500 + 300,
    );
  }

  const enabledStepIds = steps.filter((step) => step.enabled).map((step) => step.id);

  return (
    <Card>
      <Card.Header className="flex-row items-center justify-between">
        <p className="text-foreground font-medium">Automation Builder</p>
        <Button size="sm" onClick={runWorkflow} disabled={runState === "running"}>
          {runState === "running" ? "Running…" : "Run workflow"}
        </Button>
      </Card.Header>
      <Card.Content className="space-y-3">
        {steps.map((step) => {
          const runningIndex = enabledStepIds.indexOf(step.id);
          const isActive = runState === "running" && runningIndex === activeStepIndex;
          const isComplete =
            runState === "running" && runningIndex < activeStepIndex && runningIndex !== -1;

          return (
            <div
              key={step.id}
              className="border-border flex items-center justify-between gap-4 rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                {isActive ? (
                  <Icon icon={Loader2} size="sm" className="text-accent animate-spin" />
                ) : isComplete || (runState === "done" && step.enabled) ? (
                  <Icon icon={CheckCircle2} size="sm" className="text-success" />
                ) : (
                  <span className="border-border size-4 rounded-full border" aria-hidden="true" />
                )}
                <Text variant="body">{step.label}</Text>
              </div>
              <Switch
                checked={step.enabled}
                onCheckedChange={() => toggleStep(step.id)}
                aria-label={`Toggle ${step.label}`}
              />
            </div>
          );
        })}
      </Card.Content>
    </Card>
  );
}
