import * as React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        padding: "8px",
        border: "1px solid #333",
        borderRadius: "4px",
        background: "#000",
        color: "#fff",
      }}
      placeholder={props.placeholder || "System Mutating…"}
    />
  );
}
