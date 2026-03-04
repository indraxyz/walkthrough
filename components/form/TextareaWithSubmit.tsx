"use client";

import { forwardRef } from "react";
import { ArrowUp } from "lucide-react";
import Button from "../ui/Button";

interface TextareaWithSubmitProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "size" | "value"
  > {
  id: string;
  label: string;
  error?: string;
  hideLabel?: boolean;
  onSubmit: () => void;
  submitLabel?: string;
  value?: string;
}

const TextareaWithSubmit = forwardRef<
  HTMLTextAreaElement,
  TextareaWithSubmitProps
>(
  (
    {
      id,
      label,
      error,
      hideLabel = true,
      onSubmit,
      submitLabel = "Continue",
      value = "",
      className = "",
      ...textareaProps
    },
    ref,
  ) => {
    const isEmpty = !value?.trim();
    const isDisabled = isEmpty || !!error;
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
        <div className="relative flex flex-col rounded-[var(--radius-md)] border border-[var(--border-input)] bg-[var(--input-bg)] focus-within:border-[var(--accent-purple)] focus-within:ring-2 focus-within:ring-[var(--accent-purple-soft)]">
          <textarea
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`flex-1 min-h-[6rem] py-3 pl-4 pr-14 pb-14 bg-transparent text-[var(--foreground)] placeholder:text-[var(--input-placeholder)] text-base rounded-[var(--radius-md)] focus:outline-none focus:ring-0 resize-y ${className}`}
            value={value}
            {...textareaProps}
          />
          <div className="absolute right-2 bottom-2">
            <Button
              type="button"
              variant="icon"
              size="icon"
              onClick={onSubmit}
              aria-label={submitLabel}
              disabled={isDisabled}
              className="shrink-0 size-8!"
            >
              <ArrowUp className="w-5 h-5" aria-hidden />
            </Button>
          </div>
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

TextareaWithSubmit.displayName = "TextareaWithSubmit";

export default TextareaWithSubmit;
