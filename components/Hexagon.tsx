"use client";

import Image from "next/image";
import SolidHexagon from "./SolidHexagon";

interface HexagonProps {
  variant?: "form" | "gradient";
  className?: string;
}

const GRADIENT_SRC = "/gradient-hexagon.png";

export default function Hexagon({
  variant = "form",
  className = "",
}: HexagonProps) {
  if (variant === "form") {
    return (
      <div className={`relative shrink-0 ${className}`} aria-hidden>
        <SolidHexagon size={64} />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full shrink-0 ${className}`} aria-hidden>
      <Image
        src={GRADIENT_SRC}
        alt=""
        fill
        className="object-contain drop-shadow-[0_0_60px_rgba(167,139,250,0.4)]"
        sizes="(max-width: 640px) 200px, 240px"
        unoptimized
      />
    </div>
  );
}
