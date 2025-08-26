import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("border border-gray-200 rounded-lg shadow p-4 bg-white", className)}>
      {children}
    </div>
  );
}
