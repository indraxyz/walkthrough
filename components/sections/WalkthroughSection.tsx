"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Button from "../ui/Button";

const WORD_ANIMATION = {
  opacity: 0,
  duration: 2,
  ease: "sine.out" as const,
  stagger: 0.1,
};

function PaginationDots({
  activeIndex,
  total,
}: {
  activeIndex: number;
  total: number;
}) {
  return (
    <div
      className="flex justify-center gap-2 mt-4"
      role="tablist"
      aria-label="Walkthrough steps"
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          role="tab"
          aria-selected={i === activeIndex}
          className={`block size-2 rounded-full transition-colors ${
            i === activeIndex
              ? "bg-(--accent-purple) scale-125"
              : "bg-(--surface-elevated)"
          }`}
        />
      ))}
    </div>
  );
}

interface WalkthroughSectionProps {
  onLastSlideContinue: () => void;
}

const slides = [
  {
    id: "w1",
    text: "Professionals around the world shared how they feel about technology and I've listened. Now it's your turn.",
    cta: "Continue",
    isLast: false,
  },
  {
    id: "w2",
    text: "I'll ask you a handful of meaningful questions and compare your responses with people in your industry.",
    cta: "Continue",
    isLast: false,
  },
  {
    id: "w3",
    text: "You'll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!",
    cta: "Get started",
    isLast: true,
  },
  {
    id: "w4",
    text: "Now you're ready to get started. Let's go!",
    cta: "Get started",
    isLast: true,
  },
];

function SlideText({
  text,
  containerRef,
}: {
  text: string;
  containerRef: (el: HTMLParagraphElement | null) => void;
}) {
  const words = text.split(/\s+/);

  return (
    <p
      ref={containerRef}
      className="text-foreground text-lg sm:text-xl leading-relaxed max-w-[calc(var(--content-max-width)-54px)] mx-auto"
      aria-hidden={false}
    >
      {words.map((word, i) => (
        <span
          key={`${i}-${word}`}
          className="slide-word inline-block"
          aria-hidden="true"
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
}

export default function WalkthroughSection({
  onLastSlideContinue,
}: WalkthroughSectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const currentIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideTextRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | null = null;

    const runWhenReady = (): boolean => {
      const container = slideTextRefs.current[activeIndex];
      if (cancelled || !container) return false;
      const words = container.querySelectorAll<HTMLElement>(".slide-word");
      if (!words.length) return false;
      gsap.killTweensOf(words);
      gsap.from(words, WORD_ANIMATION);
      return true;
    };

    document.fonts.ready.then(() => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;
          if (runWhenReady()) return;
          timeoutId = window.setTimeout(() => {
            timeoutId = null;
            if (!cancelled) runWhenReady();
          }, 50);
        });
      });
    });

    return () => {
      cancelled = true;
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, [activeIndex]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    currentIndexRef.current = swiper.activeIndex;
    setActiveIndex(swiper.activeIndex);
  }, []);

  const handleContinue = useCallback(
    (isLast: boolean) => {
      if (isLast) {
        onLastSlideContinue();
      } else {
        swiperRef.current?.slideNext();
      }
    },
    [onLastSlideContinue],
  );

  const isLastSlide = activeIndex === slides.length - 1;
  const buttonLabel = isLastSlide ? "Get started" : "Continue";
  const buttonAriaLabel = isLastSlide
    ? "Get started and go to form"
    : "Continue to next slide";

  return (
    <section
      id="walkthrough"
      className="h-full min-h-0 flex flex-col items-center"
      aria-labelledby="walkthrough-heading"
    >
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center w-full max-w-(--content-max-width) mx-auto">
        <div className="w-24 h-24 shrink-0" aria-hidden />
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          modules={[]}
          className="w-full max-w-(--content-max-width) mx-auto flex flex-col items-center"
          spaceBetween={32}
          slidesPerView={1}
          allowTouchMove={true}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-col items-center text-center pt-20 sm:pt-28 pb-6">
                <h2 id="walkthrough-heading" className="sr-only">
                  Walkthrough step {index + 1}
                </h2>
                <SlideText
                  text={slide.text}
                  containerRef={(el) => {
                    slideTextRefs.current[index] = el;
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <PaginationDots activeIndex={activeIndex} total={slides.length} />
      <div className="w-full mx-auto flex justify-center pt-8">
        <Button
          variant={isLastSlide ? "primary" : "secondary"}
          size="lg"
          onClick={() => handleContinue(isLastSlide)}
          aria-label={buttonAriaLabel}
          className={
            isLastSlide
              ? "bg-(--button-primary-bg) text-(--button-primary-text) w-full max-w-[calc(var(--content-max-width)-54px)]"
              : "bg-(--button-secondary-bg) text-foreground w-full max-w-[calc(var(--content-max-width)-54px)] border-white/80"
          }
        >
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}
