"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Icon } from "@/components/Icon";
import { backdrop, modalPanel } from "@/lib/motion-variants";

import type { ModalProps } from "./Modal.types";

/**
 * `forceMount` + external `{open && ...}` + `AnimatePresence` is Radix's
 * documented pattern for pairing Dialog with an animation library: Radix
 * stops managing its own mount/unmount, so Framer Motion can play the exit
 * transition before the content actually leaves the DOM.
 */
export function Modal({ open, onOpenChange, title, description, children, footer }: ModalProps) {
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
                className="bg-surface border-border z-modal fixed top-1/2 left-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border p-6 shadow-xl focus:outline-none"
                variants={modalPanel}
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
                {children && <div className="mt-4">{children}</div>}
                {footer && <div className="mt-6 flex items-center justify-end gap-3">{footer}</div>}
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
