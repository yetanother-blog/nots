import React from "react";
import { clsx } from "clsx/lite";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const classes = clsx("rounded bg-blue-500 text-white px-4 py-3", className);

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
