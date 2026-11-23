import { useId } from "react";
import type { TeamId } from "@/data/pe/liga1-2026";

const JERSEY_PATH =
  "M6.5 3.5L2 6.5L4.5 10.5L6.5 9V20.5H17.5V9L19.5 10.5L22 6.5L17.5 3.5H14.8C14.3 5 13.3 5.8 12 5.8C10.7 5.8 9.7 5 9.2 3.5H6.5Z";

export function ClubJersey({
  id,
  size = 16,
  className = "",
}: {
  id: TeamId | null;
  size?: number;
  className?: string;
}) {
  const uid = `j${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  if (id === null) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={`shrink-0 text-dim ${className}`}
      >
        <path
          d={JERSEY_PATH}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2.5 2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <clipPath id={uid}>
          <path d={JERSEY_PATH} />
        </clipPath>
      </defs>

      {id === "alianza" && (
        <g clipPath={`url(#${uid})`}>
          <rect width="24" height="24" fill="#FFFFFF" />
          <rect x="2" width="4" height="24" fill="#172B5C" />
          <rect x="8.5" width="3" height="24" fill="#172B5C" />
          <rect x="13.5" width="3" height="24" fill="#172B5C" />
          <rect x="18.5" width="4" height="24" fill="#172B5C" />
        </g>
      )}

      {id === "u" && (
        <g clipPath={`url(#${uid})`}>
          <rect width="24" height="24" fill="#F4E5C2" />
          <path
            d="M8.5 3.5C9.3 5.6 10.5 6.6 12 6.6C13.5 6.6 14.7 5.6 15.5 3.5"
            stroke="#7A1424"
            strokeWidth="2.2"
          />
          <rect x="2" y="18.5" width="20" height="2.5" fill="#7A1424" />
        </g>
      )}

      {id === "huancayo" && (
        <g clipPath={`url(#${uid})`}>
          <rect width="24" height="24" fill="#D61F2C" />
          <path
            d="M8.5 3.5C9.3 5.6 10.5 6.6 12 6.6C13.5 6.6 14.7 5.6 15.5 3.5"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </g>
      )}

      {id === "cristal" && (
        <g clipPath={`url(#${uid})`}>
          <rect width="24" height="24" fill="#38BDF8" />
          <path
            d="M8.5 3.5C9.3 5.6 10.5 6.6 12 6.6C13.5 6.6 14.7 5.6 15.5 3.5"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </g>
      )}

      <path
        d={JERSEY_PATH}
        stroke="var(--c-line-strong)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
