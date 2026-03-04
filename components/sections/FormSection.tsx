"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  walkthroughFormSchema,
  type WalkthroughFormData,
} from "@/lib/form-schema";
import InputWithSubmit from "../form/InputWithSubmit";
import TextareaWithSubmit from "../form/TextareaWithSubmit";
import Button from "../ui/Button";

export interface FormSectionRef {
  resetThanks: () => void;
}

interface FormSectionProps {
  stepIndex: number;
  onStepChange: (index: number) => void;
  onSubmitSuccess: (data: WalkthroughFormData) => void;
  onThanksChange?: (showing: boolean) => void;
  isActive: boolean;
}

const steps = [
  {
    id: "firstName",
    prompt: "Let's start with the basics. Type in your first name.",
    placeholder: "First name",
    field: "firstName" as const,
  },
  {
    id: "email",
    prompt: "How should we contact you? Type in your email address.",
    placeholder: "Email address",
    field: "email" as const,
  },
  {
    id: "message",
    prompt: "Anything you'd like to share?.",
    placeholder: "Your message",
    field: "message" as const,
  },
];

const FormSection = forwardRef<FormSectionRef, FormSectionProps>(
  function FormSection(
    { stepIndex, onStepChange, onSubmitSuccess, onThanksChange, isActive },
    ref,
  ) {
    const [showThanks, setShowThanks] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        resetThanks: () => setShowThanks(false),
      }),
      [],
    );

    useEffect(() => {
      onThanksChange?.(showThanks);
    }, [showThanks, onThanksChange]);
    const currentStep = steps[stepIndex];
    const isLastStep = stepIndex === steps.length - 1;
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
      null,
    );

    const {
      register,
      handleSubmit,
      watch,
      trigger,
      formState: { errors },
      getValues,
    } = useForm<WalkthroughFormData>({
      resolver: zodResolver(walkthroughFormSchema),
      defaultValues: { firstName: "", email: "", message: "" },
      mode: "onChange",
    });

    const watchedValue = watch(currentStep?.field ?? "firstName") ?? "";

    useEffect(() => {
      if (!isActive) return;
      const id = setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 600);
      return () => clearTimeout(id);
    }, [isActive, stepIndex]);

    const handleStepSubmit = useCallback(async () => {
      const field = currentStep.field;
      const valid = await trigger(field);
      if (valid) {
        if (isLastStep) {
          handleSubmit(
            () => setShowThanks(true),
            () => {},
          )();
        } else {
          onStepChange(stepIndex + 1);
        }
      }
    }, [
      currentStep.field,
      isLastStep,
      trigger,
      handleSubmit,
      onSubmitSuccess,
      onStepChange,
      stepIndex,
    ]);

    if (showThanks) {
      const values = getValues();
      return (
        <section
          id="form"
          className="h-full min-h-0 flex flex-col items-center w-full"
        >
          <div className="flex-1 min-h-0 flex flex-col items-center justify-center w-full max-w-[var(--content-max-width)] mx-auto text-center">
            {values.message?.trim() && (
              <blockquote className=" text-center w-full max-w-md mx-auto  py-3 text-lg sm:text-xl mt-12 ">
                &ldquo;{values.message}&rdquo;
              </blockquote>
            )}
            <p className="text-[var(--foreground)] text-lg sm:text-xl mb-2 mt-4">
              Thanks, {values.firstName}! Now, it&apos;s time to get a reality
              check.
            </p>
            <p className="text-[var(--foreground-muted)] text-lg sm:text-xl">
              This will take 2-3 minutes.
            </p>
          </div>
          <div className="w-full max-w-[var(--content-max-width)] mx-auto pt-4 pb-2 flex justify-center shrink-0">
            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                onSubmitSuccess(getValues() as WalkthroughFormData)
              }
              aria-label="Continue"
              className="rounded-[var(--radius-xl)] w-full! mx-auto"
            >
              Continue
            </Button>
          </div>
        </section>
      );
    }

    return (
      <section
        id="form"
        className="h-full min-h-0 flex flex-col items-center w-full"
        aria-labelledby="form-heading"
      >
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center w-full max-w-[var(--content-max-width)] mx-auto">
          <div className="w-24 h-24 shrink-0 mb-6" aria-hidden />
          <h2 id="form-heading" className="sr-only">
            Form step {stepIndex + 1}: {currentStep.field}
          </h2>
          <p className="text-[var(--foreground)] text-center text-lg sm:text-xl mb-6 max-w-[var(--content-max-width)]">
            {currentStep.prompt}
          </p>
        </div>
        <div className="w-full mx-auto pt-4 pb-2 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStepSubmit();
            }}
            className="w-full flex flex-col items-center gap-4"
            noValidate
          >
            {currentStep.field === "firstName" &&
              (() => {
                const { ref: registerRef, ...rest } = register("firstName");
                return (
                  <InputWithSubmit
                    id="firstName"
                    label="First name"
                    placeholder={currentStep.placeholder}
                    value={watchedValue}
                    error={errors.firstName?.message}
                    onSubmit={handleStepSubmit}
                    submitLabel="Continue"
                    ref={(el) => {
                      registerRef(el);
                      inputRef.current = el;
                    }}
                    {...rest}
                    autoComplete="given-name"
                  />
                );
              })()}
            {currentStep.field === "email" &&
              (() => {
                const { ref: registerRef, ...rest } = register("email");
                return (
                  <InputWithSubmit
                    id="email"
                    label="Email address"
                    placeholder={currentStep.placeholder}
                    type="email"
                    value={watchedValue}
                    error={errors.email?.message}
                    onSubmit={handleStepSubmit}
                    submitLabel="Continue"
                    ref={(el) => {
                      registerRef(el);
                      inputRef.current = el;
                    }}
                    {...rest}
                    autoComplete="email"
                  />
                );
              })()}
            {currentStep.field === "message" &&
              (() => {
                const { ref: registerRef, ...rest } = register("message");
                return (
                  <TextareaWithSubmit
                    id="message"
                    label="Message"
                    placeholder={currentStep.placeholder}
                    value={watchedValue}
                    error={errors.message?.message}
                    onSubmit={handleStepSubmit}
                    submitLabel="Continue"
                    ref={(el) => {
                      registerRef(el);
                      inputRef.current = el;
                    }}
                    {...rest}
                  />
                );
              })()}
          </form>
        </div>
      </section>
    );
  },
);

export default FormSection;
