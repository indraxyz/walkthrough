"use client";

import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  hideLabel?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, error, hideLabel, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className={
            hideLabel
              ? "sr-only"
              : "block text-sm font-medium text-[var(--foreground-muted)] mb-2"
          }
        >
          {label}
        </label>
        <div className="relative flex items-center rounded-[var(--radius-md)] border border-[var(--border-input)] bg-[var(--input-bg)] focus-within:border-[var(--accent-purple)] focus-within:ring-2 focus-within:ring-[var(--accent-purple-soft)]">
          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`flex-1 min-w-0 h-14 px-4 pr-14 bg-transparent text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] text-base rounded-[var(--radius-md)] focus:outline-none focus:ring-0 ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="mt-2 text-sm text-[#f87171]"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
