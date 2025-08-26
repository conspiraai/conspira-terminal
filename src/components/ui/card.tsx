import * as React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #333",
        borderRadius: "8px",
        background: "#111",
        color: "#fff",
        margin: "8px 0",
      }}
    >
      {children || "System Mutating…"}
    </div>
  );
}
