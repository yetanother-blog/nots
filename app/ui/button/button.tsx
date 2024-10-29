import { ButtonHTMLAttributes, FC } from "react";
import { clsx } from "clsx/lite";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  const classes = clsx("rounded bg-blue-500 text-white px-4 py-3", className);

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
