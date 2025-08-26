"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

// tiny class combiner so we don't depend on "@/lib/utils"
const cx = (...c: Array<string | undefined | false>) =>
  c.filter(Boolean).join(" ");

export const ToastProvider = ToastPrimitives.Provider;

// Minimal viewport — no external hooks required
export function ToastViewport(
  props: React.ComponentProps<typeof ToastPrimitives.Viewport>
) {
  return (
    <ToastPrimitives.Viewport
      {...props}
      className={cx(
        "fixed bottom-4 right-4 z-[100]",
        "w-96 max-w-[100vw] outline-none"
      )}
    />
  );
}
