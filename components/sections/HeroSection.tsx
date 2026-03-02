"use client";

import Button from "../ui/Button";

interface HeroSectionProps {
  onCtaClick: () => void;
  scrollToWalkthrough: () => void;
}

const snippets = [
  "WA businesses feel confident about future growth",
  "AI can't replace creativity",
  "Sales measure true success",
  "Human connection drives WA business",
  "The primary barrier to digital transformation is financial investment",
];

const ZIGZAG_TOP_PCT = [-20, 0, 20, 40, 60];

export default function HeroSection({
  onCtaClick,
  scrollToWalkthrough,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="h-full min-h-0 flex flex-col items-center"
      aria-labelledby="hero-heading"
    >
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center w-full max-w-[var(--content-max-width)] mx-auto text-center">
        <div className="relative w-full max-w-[min(100%,360px)] mx-auto h-[200px] sm:h-[240px] mb-8 flex items-center justify-center pointer-events-none">
          {snippets.map((text, i) => {
            const isLeft = i % 2 === 0;
            const topPct = ZIGZAG_TOP_PCT[i];
            return (
              <span
                key={i}
                className="absolute text-xs md:text-base text-[var(--foreground-muted)]  leading-tight max-w-[80%] whitespace-normal  sm:overflow-hidden "
                style={{
                  left: isLeft ? 0 : undefined,
                  right: isLeft ? undefined : 0,
                  top: `${topPct}%`,
                  transform: "translateY(-50%)",
                  textAlign: isLeft ? "left" : "right",
                }}
              >
                {text}
              </span>
            );
          })}
        </div>
        <h1
          id="hero-heading"
          className="text-2xl sm:text-3xl text-[var(--foreground)] leading-tight max-w-sm"
          style={{ fontFamily: "var(--font-graphik-medium)" }}
        >
          Compare your thoughts on{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #e4c0f0, #ae82bd, #abb3f5)",
            }}
          >
            technology
          </span>{" "}
          with current industry opinions.
        </h1>
      </div>
      <div className="flex w-full">
        <Button
          variant="primary"
          size="lg"
          onClick={onCtaClick}
          aria-label="Get a reality check"
          className="rounded-[var(--radius-xl)] w-full! mx-auto"
        >
          Get a reality check
        </Button>
      </div>
    </section>
  );
}
