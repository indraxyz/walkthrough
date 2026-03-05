"use client";

import type { WalkthroughFormData } from "@/lib/form-schema";
import Button from "../ui/Button";

interface ResultSectionProps {
  data: WalkthroughFormData;
  onReset: () => void;
}

export default function ResultSection({ data, onReset }: ResultSectionProps) {
  return (
    <section
      id="result"
      className="min-h-dvh flex flex-col items-center justify-center px-(--section-padding-x) py-(--section-padding-y)"
      aria-labelledby="result-heading"
    >
      <div className="w-full max-w-(--content-max-width) mx-auto flex flex-col items-center text-center">
        <h2
          id="result-heading"
          className="text-2xl font-bold text-foreground mb-8"
        >
          Your submission
        </h2>
        <dl className="w-full max-w-[280px] text-left space-y-4 rounded-lg border border-(--border) p-6 bg-(--surface)">
          <div>
            <dt className="text-sm text-(--foreground-subtle) mb-1">
              First name
            </dt>
            <dd className="text-foreground font-medium" id="result-firstName">
              {data.firstName}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-(--foreground-subtle) mb-1">
              Email address
            </dt>
            <dd
              className="text-foreground font-medium break-all"
              id="result-email"
            >
              {data.email}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-(--foreground-subtle) mb-1">Message</dt>
            <dd
              className="text-foreground font-medium whitespace-pre-wrap"
              id="result-message"
            >
              {data.message || "—"}
            </dd>
          </div>
        </dl>
        <Button
          variant="primary"
          size="lg"
          onClick={onReset}
          aria-label="Start over"
          className="mt-8"
        >
          Start over
        </Button>
      </div>
    </section>
  );
}
