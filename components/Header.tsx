"use client";

import { ArrowLeft, RotateCw } from "lucide-react";
import Logo from "./Logo";
import Button from "./ui/Button";

interface HeaderProps {
  onBack?: () => void;
  onReset?: () => void;
  onNavigateSection?: (section: "hero" | "walkthrough" | "form") => void;
  currentSection?: "hero" | "walkthrough" | "form" | "result";
  showSectionNav?: boolean;
}

const navItems = [
  { id: "hero" as const, label: "Hero" },
  { id: "walkthrough" as const, label: "Walkthrough" },
  { id: "form" as const, label: "Form" },
] as const;

export default function Header({
  onBack,
  onReset,
  onNavigateSection,
  currentSection = "hero",
  showSectionNav = false,
}: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 grid h-[var(--header-height)] grid-cols-[1fr_auto_1fr] items-center bg-transparent px-[var(--section-padding-x)]"
      role="banner"
    >
      <div className="flex items-center gap-2 justify-start">
        {onBack && (
          <Button
            variant="icon"
            size="icon"
            onClick={onBack}
            aria-label="Go back"
            className="shrink-0 size-8!"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </Button>
        )}
      </div>

      <div className="flex justify-center">
        <Logo />
      </div>

      <nav className="flex items-center justify-end gap-2" aria-label="Main navigation">
        {/* <div className="hidden md:flex md:items-center md:gap-1">
          {showSectionNav &&
            onNavigateSection &&
            navItems.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => onNavigateSection(id)}
                aria-current={currentSection === id ? "page" : undefined}
                className="px-4 py-2 text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)] rounded-[var(--radius-md)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-purple)]"
              >
                {label}
              </button>
            ))}
        </div> */}
        <div className="flex items-center gap-2 md:gap-2">
          {/* {showSectionNav && onNavigateSection && (
            <div className="flex gap-1 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigateSection("hero")}
                aria-label="Go to hero section"
                aria-current={currentSection === "hero" ? "true" : undefined}
                className="text-xs px-2 w-auto"
              >
                Hero
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigateSection("walkthrough")}
                aria-label="Go to walkthrough"
                aria-current={currentSection === "walkthrough" ? "true" : undefined}
                className="text-xs px-2 w-auto"
              >
                Walk
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigateSection("form")}
                aria-label="Go to form"
                aria-current={currentSection === "form" ? "true" : undefined}
                className="text-xs px-2 w-auto"
              >
                Form
              </Button>
            </div>
          )} */}
          {onReset && (
            <Button
              variant="icon"
              size="icon"
              onClick={onReset}
              aria-label="Reset and start over"
              className="shrink-0 size-8!"
            >
              <RotateCw className="size-4" aria-hidden />
            </Button>
          )}
          {/* <div className="hidden md:block">
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                aria-label="Reset and start over"
                className="px-4 py-2 text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)] rounded-[var(--radius-md)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-purple)]"
              >
                Reset
              </button>
            )}
          </div> */}
        </div>
      </nav>
    </header>
  );
}
