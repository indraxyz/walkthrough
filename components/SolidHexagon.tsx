"use client";

interface SolidHexagonProps {
  className?: string;
  size?: number;
}

const defaultSize = 64;

export default function SolidHexagon({
  className = "",
  size = defaultSize,
}: SolidHexagonProps) {
  const s = size;
  const half = s / 2;
  const points = [
    [half, 0],
    [s, s * 0.25],
    [s, s * 0.75],
    [half, s],
    [0, s * 0.75],
    [0, s * 0.25],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      className={`flex-shrink-0 ${className}`}
      aria-hidden
    >
      <polygon
        points={points}
        fill="var(--accent-purple)"
        className="opacity-90"
      />
    </svg>
  );
}
