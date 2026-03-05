"use client";

import { forwardRef } from "react";
import { ArrowUp } from "lucide-react";
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
  value?: string;
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
      value = "",
      ...inputProps
    },
    ref,
  ) => {
    const isEmpty = !value?.trim();
    const isDisabled = isEmpty || !!error;
    return (
      <div className="w-full max-w-(--content-max-width) mx-auto">
        <label
          htmlFor={id}
          className={
            hideLabel
              ? "sr-only"
              : "block text-sm font-medium text-(--foreground-muted) mb-2"
          }
        >
          {label}
        </label>
        <div className="relative flex items-center rounded-md border border-(--border-input) bg-(--input-bg) focus-within:border-(--accent-purple) focus-within:ring-2 focus-within:ring-(--accent-purple-soft)">
          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className="flex-1 min-w-0 h-14 pl-4 pr-14 bg-transparent text-foreground placeholder:text-(--input-placeholder) text-base rounded-s-md focus:rounded-md focus:outline-hidden focus:ring-0"
            {...inputProps}
          />
          <Button
            type="button"
            variant="icon"
            size="icon"
            onClick={onSubmit}
            aria-label={submitLabel}
            disabled={isDisabled}
            className="absolute right-2 top-1/2 -translate-y-1/2 shrink-0 size-8!"
          >
            <ArrowUp className="w-5 h-5" aria-hidden />
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
