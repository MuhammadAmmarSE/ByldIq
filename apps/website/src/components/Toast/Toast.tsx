"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Icon } from "@/components/Icon";
import { slideInFromRight } from "@/lib/motion-variants";
import { cn } from "@/utils/cn";

import type { ToastContextValue, ToastOptions, ToastVariant } from "./Toast.types";

interface ToastItem extends ToastOptions {
  id: string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT_ICON: Record<ToastVariant, LucideIcon> = {
  default: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
};

const VARIANT_ICON_COLOR: Record<ToastVariant, string> = {
  default: "text-muted",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

/**
 * Global toast host — mount once at the app root (already wired into
 * `AppProviders`/`StorybookProviders`). Consumers call `useToast().toast(...)`
 * from anywhere in the tree; there's no `<Toast>` component to render
 * directly.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, ...options }]);
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        <AnimatePresence>
          {toasts.map(({ id, title, description, variant = "default", duration = 5000 }) => (
            <ToastPrimitive.Root
              key={id}
              duration={duration}
              onOpenChange={(open) => {
                if (!open) dismiss(id);
              }}
              asChild
            >
              <motion.li
                layout
                variants={slideInFromRight}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="border-border bg-surface flex items-start gap-3 rounded-lg border p-4 shadow-lg"
              >
                <Icon
                  icon={VARIANT_ICON[variant]}
                  className={cn("mt-0.5", VARIANT_ICON_COLOR[variant])}
                />
                <div className="grid flex-1 gap-1">
                  <ToastPrimitive.Title className="text-foreground text-sm font-medium">
                    {title}
                  </ToastPrimitive.Title>
                  {description && (
                    <ToastPrimitive.Description className="text-muted text-sm">
                      {description}
                    </ToastPrimitive.Description>
                  )}
                </div>
                <ToastPrimitive.Close
                  aria-label="Dismiss"
                  className="text-muted hover:text-foreground shrink-0"
                >
                  <Icon icon={X} label="Dismiss" />
                </ToastPrimitive.Close>
              </motion.li>
            </ToastPrimitive.Root>
          ))}
        </AnimatePresence>
        <ToastPrimitive.Viewport className="z-toast fixed right-4 bottom-4 m-0 flex w-96 max-w-[calc(100vw-2rem)] list-none flex-col gap-2 p-0 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
