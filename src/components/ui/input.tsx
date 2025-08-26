import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={
        "w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 " +
        "text-sm text-white placeholder:text-gray-400 focus:outline-none " +
        "focus:ring-2 focus:ring-yellow-400/40 " +
        className
      }
      {...props}
    />
  )
);
Input.displayName = "Input";
