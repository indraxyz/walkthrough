"use client";

import { forwardRef } from "react";
import { ChevronUp } from "lucide-react";
import Button from "../ui/Button";

interface InputWithSubmitProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  id: string;
  label: string;
  error?: string;
  hideLabel?: boolean;
  onSubmit: () => void;
  submitLabel?: string;
}

const InputWithSubmit = forwardRef<HTMLInputElement, InputWithSubmitProps>(
  (
    {
      id,
      label,
      error,
      hideLabel = true,
      onSubmit,
      submitLabel = "Continue",
      ...inputProps
    },
    ref,
  ) => {
    return (
      <div className="w-full max-w-[var(--content-max-width)] mx-auto">
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
            className="flex-1 min-w-0 h-14 pl-4 pr-14 bg-transparent text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] text-base rounded-l-[var(--radius-md)] focus:rounded-md focus:outline-none focus:ring-0"
            {...inputProps}
          />
          <Button
            type="button"
            variant="icon"
            size="icon"
            onClick={onSubmit}
            aria-label={submitLabel}
            className="absolute right-2 top-1/2 -translate-y-1/2 shrink-0 size-8!"
          >
            <ChevronUp className="w-5 h-5" aria-hidden />
          </Button>
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
  },
);

InputWithSubmit.displayName = "InputWithSubmit";

export default InputWithSubmit;
