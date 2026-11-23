import type { CSSProperties } from "react";

interface FulboLabLogoProps {
  size?: number;
  showWordmark?: boolean;
  bg?: string;
}

export function FulboLabSymbol({
  size = 36,
  bg = "#070B14",
}: {
  size?: number;
  bg?: string;
}) {
  const style = {
    color: "#F8FAFC",
    "--acc": "#E11D48",
    "--acc2": "#F59E0B",
    "--bg": bg,
  } as CSSProperties;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      style={style}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="5">
        <line x1="32" y1="12" x2="32" y2="52" />
        <circle cx="32" cy="32" r="11" />
      </g>
      <g>
        <polyline
          points="6,44 18,34 25,40 32,32 58,18"
          stroke="var(--bg,#070B14)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g stroke="currentColor" strokeWidth="5">
        <rect x="6" y="12" width="52" height="40" rx="7" />
      </g>
      <g>
        <polyline
          points="6,44 18,34 25,40 32,32 58,18"
          stroke="var(--acc,#E11D48)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g>
        <circle cx="32" cy="32" r="8.5" fill="var(--bg,#070B14)" />
        <circle cx="32" cy="32" r="5" fill="var(--acc2,#F59E0B)" />
      </g>
    </svg>
  );
}

export function FulboLabLogo({
  size = 34,
  showWordmark = true,
  bg = "#070B14",
}: FulboLabLogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <FulboLabSymbol size={size} bg={bg} />
      {showWordmark && (
        <span className="inline-flex items-baseline tracking-tight leading-none text-2xl">
          <span className="font-bold text-[#F8FAFC]">fulbo</span>
          <span className="font-mono font-semibold text-[#E11D48]">lab</span>
        </span>
      )}
    </span>
  );
}
