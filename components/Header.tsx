"use client";

import { ArrowLeft, RefreshCcw } from "lucide-react";
import Logo from "./Logo";
import Button from "./ui/Button";

interface HeaderProps {
  onBack?: () => void;
  onReset?: () => void;
  onNavigateSection?: (section: "hero" | "walkthrough" | "form") => void;
  currentSection?: "hero" | "walkthrough" | "form" | "result";
  showSectionNav?: boolean;
}

export default function Header({ onBack, onReset }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 grid h-[var(--header-height)] grid-cols-[1fr_auto_1fr] items-center bg-transparent px-[var(--section-padding-x)] max-w-3xl mx-auto"
      role="banner"
    >
      <div className="flex items-center gap-2 justify-start">
        {onBack && (
          <Button
            variant="icon"
            size="icon"
            onClick={onBack}
            aria-label="Go back"
            className="shrink-0"
          >
            <ArrowLeft className="size-5" aria-hidden />
          </Button>
        )}
      </div>

      <div className="flex justify-center">
        <Logo />
      </div>

      <nav
        className="flex items-center justify-end gap-2"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-2 md:gap-2">
          {onReset && (
            <Button
              variant="icon"
              size="icon"
              onClick={onReset}
              aria-label="Reset and start over"
              className="shrink-0"
            >
              <RefreshCcw className="size-5" aria-hidden />
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
