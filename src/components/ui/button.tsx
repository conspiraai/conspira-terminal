import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={
        "inline-flex items-center justify-center rounded-md border border-white/20 " +
        "bg-black/70 px-4 py-2 text-sm font-medium text-white hover:bg-black/60 " +
        "transition-colors " +
        className
      }
      {...props}
    />
  )
);
Button.displayName = "Button";
