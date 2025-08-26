"use client";

import { ToastProvider, ToastViewport } from "./toast";

// Minimal Toaster that only provides a viewport.
// (If you later add a hook/state for toasts, this still works.)
export default function Toaster() {
  return (
    <ToastProvider swipeDirection="right">
      <ToastViewport />
    </ToastProvider>
  );
}
