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
      "inline-flex items-center justify-center  transition-colors rounded-[var(--radius-lg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-purple)] disabled:opacity-50 disabled:pointer-events-none hover:cursor-pointer";

    const variants = {
      primary:
        "bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] hover:opacity-95",
      secondary:
        "bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] border border-[var(--border)] hover:bg-[var(--surface-elevated)]",
      ghost:
        "bg-transparent text-[var(--foreground)] hover:bg-[var(--accent-purple-soft)]",
      icon: "bg-[var(--nav-btn-bg)] text-[var(--foreground)] border border-[var(--nav-btn-border)] hover:bg-[var(--surface-elevated)]",
      purple: "bg-[var(--accent-purple)] text-[#1a1a1e] hover:opacity-90",
    };

    const sizes = {
      md: "h-12 px-6 text-base min-w-[120px]",
      lg: "h-14 px-8 text-base w-full  rounded-[var(--radius-xl)]",
      icon: "h-10 w-10 rounded-full p-0",
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
