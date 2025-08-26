import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  // basic styles for variants
  const variantClasses =
    variant === "outline"
      ? "border border-white/40 text-white hover:bg-white/10"
      : "bg-black/80 text-white hover:bg-black/60";

  // basic styles for sizes
  const sizeClasses =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2";

  return (
    <button
      {...props}
      className={`rounded transition-colors ${variantClasses} ${sizeClasses} ${className}`}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
        else alert("⚡ System Mutating…");
      }}
    >
      {children}
    </button>
  );
};
