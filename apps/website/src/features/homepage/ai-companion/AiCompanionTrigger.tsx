"use client";

import { Sparkles } from "lucide-react";

import { FloatingActionButton } from "@/components/FloatingActionButton";

import { useAiCompanion } from "./useAiCompanion";

/**
 * The Byld AI Companion's entry point — the concrete implementation of the
 * generic `FloatingActionButton` seam described in its own doc comment.
 */
export function AiCompanionTrigger() {
  const { toggle } = useAiCompanion();
  return <FloatingActionButton icon={Sparkles} label="Ask Byld" onClick={toggle} />;
}
