"use client";

import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon" | "purple";
  size?: "md" | "lg" | "icon";
  children: React.ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", children, className = "", ...props },
    ref,
  ) => {
    const base =
      "inline-flex items-center justify-center  transition-colors rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent-purple) disabled:opacity-50 disabled:pointer-events-none hover:cursor-pointer";

    const variants = {
      primary:
        "bg-(--button-primary-bg) text-(--button-primary-text) hover:opacity-95",
      secondary:
        "bg-(--button-secondary-bg) text-(--button-secondary-text) border border-(--border) hover:bg-(--surface-elevated)",
      ghost: "bg-transparent text-foreground hover:bg-(--accent-purple-soft)",
      icon: "bg-(--nav-btn-bg) text-foreground border border-(--nav-btn-border) hover:bg-(--surface-elevated)",
      purple: "bg-(--accent-purple) text-[#1a1a1e] hover:opacity-90",
    };

    const sizes = {
      md: "h-12 px-6 text-base min-w-[120px]",
      lg: "h-14 px-8 text-base w-full rounded-xl",
      icon: "h-10 w-10 rounded-full! p-0",
    };

    return (
      <button
        style={{ fontFamily: "var(--font-graphik-medium)" }}
        ref={ref}
        type="button"
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
