"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Icon } from "@/components/Icon";
import { backdrop, drawerPanel } from "@/lib/motion-variants";
import { cn } from "@/utils/cn";

import type { DrawerProps } from "./Drawer.types";

/** Side-sheet variant of `Modal` — same Dialog foundation, docked to an edge instead of centered. */
export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  side = "right",
}: DrawerProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="bg-foreground/[var(--opacity-overlay)] z-modal fixed inset-0"
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="hidden"
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                className={cn(
                  "bg-surface border-border z-modal fixed inset-y-0 flex w-full max-w-sm flex-col border p-6 shadow-xl focus:outline-none",
                  side === "right" ? "right-0" : "left-0",
                )}
                variants={drawerPanel[side]}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  <DialogPrimitive.Title className="text-foreground text-lg font-semibold">
                    {title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Close className="text-muted hover:text-foreground shrink-0 rounded-sm">
                    <Icon icon={X} label="Close" />
                  </DialogPrimitive.Close>
                </div>
                {description && (
                  <DialogPrimitive.Description className="text-muted mt-1 text-sm">
                    {description}
                  </DialogPrimitive.Description>
                )}
                {children && <div className="mt-4 flex-1 overflow-y-auto">{children}</div>}
                {footer && <div className="mt-6 flex items-center justify-end gap-3">{footer}</div>}
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
