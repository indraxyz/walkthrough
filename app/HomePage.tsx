"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { flushSync } from "react-dom";
import { gsap } from "gsap";
import Image from "next/image";
import Header from "@/components/Header";
import SolidHexagon from "@/components/SolidHexagon";
import HeroSection from "@/components/sections/HeroSection";
import WalkthroughSection from "@/components/sections/WalkthroughSection";
import FormSection, {
  type FormSectionRef,
} from "@/components/sections/FormSection";
import { useIsMobile } from "@/hooks/useIsMobile";

function startViewTransitionIfSupported(update: () => void): void {
  if (typeof document !== "undefined" && "startViewTransition" in document) {
    (
      document as Document & { startViewTransition: (cb: () => void) => void }
    ).startViewTransition(update);
  } else {
    update();
  }
}

const GRADIENT_HEXAGON_SRC = "/gradient-hexagon.png";

const SECTION_ORDER = ["hero", "walkthrough", "form"] as const;
type SectionId = (typeof SECTION_ORDER)[number];

function getSectionIndex(id: SectionId): number {
  const i = SECTION_ORDER.indexOf(id);
  return i >= 0 ? i : 0;
}

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState<SectionId>("hero");
  const [formStepIndex, setFormStepIndex] = useState(0);
  const [formKey, setFormKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hexagonThanksSpin, setHexagonThanksSpin] = useState(false);
  const isMobile = useIsMobile();
  const hexagonRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const solidRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<FormSectionRef>(null);
  const hasAnimatedEntrance = useRef(false);

  const goToSection = useCallback(
    (id: string) => {
      const sectionId = id as SectionId;
      if (isMobile) {
        startViewTransitionIfSupported(() => {
          flushSync(() => setCurrentSection(sectionId));
        });
      } else {
        setCurrentSection(sectionId);
      }
    },
    [isMobile],
  );

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted || !isMobile) return;
    window.scrollTo(0, 0);
    document.body.classList.add("section-navigation-lock");
    return () => document.body.classList.remove("section-navigation-lock");
  }, [mounted, isMobile]);

  useEffect(() => {
    if (!mounted || !hexagonRef.current || !gradientRef.current) return;
    if (hasAnimatedEntrance.current) return;
    gsap.set(hexagonRef.current, { opacity: 0, scale: 0.88 });
    gsap.set(gradientRef.current, { opacity: 0 });
    gsap.to(hexagonRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: "power2.out",
      overwrite: true,
      onComplete: () => {
        hasAnimatedEntrance.current = true;
      },
    });
    gsap.to(gradientRef.current, {
      opacity: 1,
      duration: 0.7,
      ease: "power2.out",
      delay: 0.15,
    });
  }, [mounted]);

  useEffect(() => {
    if (!hexagonRef.current || !hasAnimatedEntrance.current) return;
    const scale =
      currentSection === "hero"
        ? 1
        : currentSection === "walkthrough"
          ? 0.6
          : 0.2;
    gsap.to(hexagonRef.current, {
      scale,
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      overwrite: true,
    });
  }, [currentSection]);

  useEffect(() => {
    if (!gradientRef.current || !solidRef.current) return;
    const duration = 0.6;
    const ease = "power2.inOut";
    if (currentSection === "form") {
      gsap.to(gradientRef.current, { opacity: 0, duration, ease });
      gsap.to(solidRef.current, { opacity: 1, duration, ease });
    } else {
      gsap.to(gradientRef.current, { opacity: 1, duration, ease });
      gsap.to(solidRef.current, { opacity: 0, duration, ease });
    }
  }, [currentSection]);

  useEffect(() => {
    const el = solidRef.current;
    if (!el) return;
    if (hexagonThanksSpin) {
      gsap.set(el, { rotation: 0 });
      const tween = gsap.to(el, {
        rotation: 360,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.5,
        ease: "sine.inOut",
      });
      return () => {
        tween.kill();
        gsap.set(el, { rotation: 0 });
      };
    }
    gsap.set(el, { rotation: 0 });
  }, [hexagonThanksSpin]);

  const handleBack = useCallback(() => {
    if (currentSection === "form") {
      if (hexagonThanksSpin) {
        formSectionRef.current?.resetThanks();
      } else if (formStepIndex > 0) {
        setFormStepIndex(formStepIndex - 1);
      } else {
        setFormStepIndex(0);
        goToSection("walkthrough");
      }
    } else {
      const idx = getSectionIndex(currentSection);
      if (idx > 0) goToSection(SECTION_ORDER[idx - 1]);
    }
  }, [currentSection, formStepIndex, hexagonThanksSpin, goToSection]);

  const handleReset = useCallback(() => {
    setFormStepIndex(0);
    setFormKey((k) => k + 1);
    goToSection("hero");
  }, [goToSection]);

  const handleFormSuccess = useCallback(() => {
    setFormStepIndex(0);
    setFormKey((k) => k + 1);
    goToSection("hero");
  }, [goToSection]);

  const handleGoToForm = useCallback(() => {
    if (isMobile) {
      startViewTransitionIfSupported(() => {
        flushSync(() => setCurrentSection("form"));
      });
    } else {
      setCurrentSection("form");
    }
  }, [isMobile]);

  const sectionIndex = getSectionIndex(currentSection);

  const hexagonTop =
    currentSection === "walkthrough"
      ? "-12rem"
      : currentSection === "form"
        ? "-16rem"
        : "-10rem";

  const hexagonLayer = (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div
        ref={hexagonRef}
        className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] origin-center transition-[top] duration-500 ease-in-out"
        style={{ top: hexagonTop }}
      >
        <div
          ref={gradientRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden
        >
          <Image
            src={GRADIENT_HEXAGON_SRC}
            alt=""
            fill
            className="object-contain drop-shadow-[0_0_60px_rgba(167,139,250,0.4)]"
            sizes="(max-width: 768px) 200px, 240px"
            unoptimized
            loading="eager"
            priority
          />
        </div>
        <div
          ref={solidRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0 }}
          aria-hidden
        >
          <SolidHexagon size={240} className="opacity-90" />
        </div>
      </div>
    </div>
  );

  if (!mounted) {
    return <div className="min-h-screen bg-(--background) text-foreground" />;
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-(--background) text-foreground">
        <Header
          onBack={currentSection !== "hero" ? handleBack : undefined}
          onReset={currentSection !== "hero" ? handleReset : undefined}
          onNavigateSection={(s) => goToSection(s)}
          currentSection={currentSection}
          showSectionNav
        />
        <div
          className="overflow-hidden relative"
          style={{ height: "calc(100dvh - var(--header-height))" }}
        >
          {hexagonLayer}
          <div className="section-view-transition relative z-10 h-full flex flex-col items-center justify-center overflow-hidden px-(--section-padding-x) py-(--section-padding-y)">
            {currentSection === "hero" && (
              <HeroSection onCtaClick={() => goToSection("walkthrough")} />
            )}
            {currentSection === "walkthrough" && (
              <WalkthroughSection onLastSlideContinue={handleGoToForm} />
            )}
            {currentSection === "form" && (
              <FormSection
                ref={formSectionRef}
                key={formKey}
                stepIndex={formStepIndex}
                onStepChange={setFormStepIndex}
                onSubmitSuccess={handleFormSuccess}
                onThanksChange={setHexagonThanksSpin}
                isActive
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--background) text-foreground">
      <Header
        onBack={currentSection !== "hero" ? handleBack : undefined}
        onReset={currentSection !== "hero" ? handleReset : undefined}
        onNavigateSection={(s) => goToSection(s)}
        currentSection={currentSection}
        showSectionNav
      />
      <div
        className="overflow-hidden relative"
        style={{ height: "calc(100dvh - var(--header-height))" }}
      >
        {hexagonLayer}
        <div
          className="relative z-10 h-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{
            height: "300%",
            transform: `translateY(-${sectionIndex * (100 / 3)}%)`,
          }}
        >
          <div
            className="min-h-0 h-[33.333%] flex flex-col items-center justify-center overflow-hidden px-(--section-padding-x) py-(--section-padding-y)"
            inert={currentSection !== "hero" ? true : undefined}
          >
            <HeroSection onCtaClick={() => goToSection("walkthrough")} />
          </div>
          <div
            className="min-h-0 h-[33.333%] flex flex-col items-center justify-center overflow-hidden px-(--section-padding-x) py-(--section-padding-y)"
            inert={currentSection !== "walkthrough" ? true : undefined}
          >
            <WalkthroughSection onLastSlideContinue={handleGoToForm} />
          </div>
          <div
            className="min-h-0 h-[33.333%] flex flex-col items-center justify-center overflow-hidden px-(--section-padding-x) py-(--section-padding-y)"
            inert={currentSection !== "form" ? true : undefined}
          >
            <FormSection
              ref={formSectionRef}
              key={formKey}
              stepIndex={formStepIndex}
              onStepChange={setFormStepIndex}
              onSubmitSuccess={handleFormSuccess}
              onThanksChange={setHexagonThanksSpin}
              isActive={currentSection === "form"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
