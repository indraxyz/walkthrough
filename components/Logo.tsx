"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";

const LOGO_TEXT = "juicebox";
const JB_INDICES = [0, 5];

const CHAR_OFFSET_Y = 10;
const STAGGER = 0.028;
const DURATION = 0.2;
const LEAVE_DURATION = 0.32;
const LEAVE_STAGGER = 0.04;

const logoTextClasses =
  "text-3xl tracking-tight text-foreground leading-none";

const logoFontStyle: React.CSSProperties = {
  fontFamily: "var(--font-graphik-bold), system-ui, sans-serif",
};

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const getExitChars = useCallback(() => {
    if (!containerRef.current) return [];
    const chars =
      containerRef.current.querySelectorAll<HTMLElement>(".logo-char-exit");
    return Array.from(chars);
  }, []);

  const handleMouseEnter = useCallback(() => {
    tlRef.current?.kill();
    if (!containerRef.current) return;
    const exitChars = getExitChars();
    if (!exitChars.length) return;
    exitChars.forEach((el) => {
      el.dataset.naturalWidth = String(el.offsetWidth);
    });
    gsap.set(exitChars, { overflow: "hidden" });
    tlRef.current = gsap.timeline();
    tlRef.current.add(
      gsap.to(containerRef.current, {
        left: "50%",
        xPercent: -50,
        top: 0,
        duration: DURATION,
        ease: "power2.in",
      }),
      0,
    );
    tlRef.current.to(
      exitChars,
      {
        y: -CHAR_OFFSET_Y,
        opacity: 0,
        width: 0,
        duration: DURATION,
        stagger: STAGGER,
        ease: "power2.in",
      },
      0,
    );
  }, [getExitChars]);

  const handleMouseLeave = useCallback(() => {
    tlRef.current?.kill();
    if (!containerRef.current) return;
    const exitChars = getExitChars();
    if (!exitChars.length) return;
    tlRef.current = gsap.timeline({
      onComplete: () => {
        gsap.set(exitChars, { clearProps: "width,overflow" });
      },
    });
    tlRef.current.add(
      gsap.to(containerRef.current, {
        left: 0,
        xPercent: 0,
        top: 0,
        duration: LEAVE_DURATION,
        ease: "sine.out",
      }),
      0,
    );
    tlRef.current.to(
      exitChars,
      {
        y: 0,
        opacity: 1,
        width: (_, el) => Number((el as HTMLElement).dataset.naturalWidth) || 0,
        duration: LEAVE_DURATION,
        stagger: LEAVE_STAGGER,
        ease: "sine.out",
      },
      0,
    );
  }, [getExitChars]);

  return (
    <span
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block relative cursor-default ${className}`}
      aria-label="juicebox"
      role="img"
    >
      <span
        aria-hidden
        className={`invisible inline-block ${logoTextClasses}`}
        style={{ ...logoFontStyle, pointerEvents: "none" }}
      >
        {LOGO_TEXT}
      </span>
      <span
        ref={containerRef}
        className={`absolute left-0 top-0 inline-block w-max min-h-[1em] ${logoTextClasses}`}
        style={logoFontStyle}
      >
        {LOGO_TEXT.split("").map((char, i) => (
          <span
            key={i}
            className={`inline-block align-top leading-none ${JB_INDICES.includes(i) ? "logo-char" : "logo-char-exit"}`}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
