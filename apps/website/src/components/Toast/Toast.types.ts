import type { ReactNode } from "react";

export const TOAST_VARIANTS = ["default", "success", "warning", "danger"] as const;

export type ToastVariant = (typeof TOAST_VARIANTS)[number];

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  /** Milliseconds before auto-dismiss. */
  duration?: number;
}

export interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}
