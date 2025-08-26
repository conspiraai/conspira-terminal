import * as React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<CardProps> = ({ className = "", ...props }) => (
  <div
    className={
      "rounded-lg border border-white/15 bg-black/50 p-4 shadow-sm " + className
    }
    {...props}
  />
);
