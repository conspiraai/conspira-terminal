import * as React from "react";

export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{
        padding: "8px 16px",
        background: "#111",
        color: "#fff",
        border: "1px solid #333",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {children || "System Mutating…"}
    </button>
  );
}
