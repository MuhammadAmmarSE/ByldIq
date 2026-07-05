import type { Journey } from "@/types/journey";

/** Byld AI Companion analytics events (CLAUDE.md Part 16). */
declare module "@/types/analytics" {
  interface AnalyticsEventMap {
    ai_companion_opened: { journey: Journey | null };
    ai_companion_closed: Record<string, never>;
    ai_message_sent: { journey: Journey | null; viaQuickReply: boolean };
    ai_conversation_cleared: Record<string, never>;
  }
}

export {};
