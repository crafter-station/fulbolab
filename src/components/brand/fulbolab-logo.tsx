import { useId } from "react";
import { WORDMARK } from "@/components/brand/wordmark-paths";

const PULSE = "6,44 18,34 25,40 32,32 58,18";

function SymbolBody({
  uid,
  ink,
  animated,
}: {
  uid: string;
  ink: string;
  animated: boolean;
}) {
  const draw = animated ? "fl-draw" : undefined;
  const pop = animated ? "fl-pop" : undefined;
  return (
    <>
      <defs>
        <mask
          id={`${uid}-cut`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="64"
          height="64"
        >
          <rect width="64" height="64" fill="#fff" />
          <polyline
            className={draw}
            pathLength={100}
            points={PULSE}
            stroke="#000"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </mask>
        <mask
          id={`${uid}-core`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="64"
          height="64"
        >
          <rect width="64" height="64" fill="#fff" />
          <circle className={pop} cx="32" cy="32" r="8.5" fill="#000" />
        </mask>
      </defs>
      <g mask={`url(#${uid}-core)`} fill="none" strokeWidth="5">
        <g mask={`url(#${uid}-cut)`} stroke={ink}>
          <line x1="32" y1="12" x2="32" y2="52" />
          <circle cx="32" cy="32" r="11" />
        </g>
        <rect x="6" y="12" width="52" height="40" rx="7" stroke={ink} />
        <polyline
          className={draw}
          pathLength={100}
          points={PULSE}
          stroke="#E11D48"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle className={pop} cx="32" cy="32" r="5" fill="#F59E0B" />
    </>
  );
}

function useSvgId() {
  return `fl${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
}

export function FulboLabSymbol({
  size = 32,
  ink = "currentColor",
  animated = false,
  className,
}: {
  size?: number;
  ink?: string;
  animated?: boolean;
  className?: string;
}) {
  const uid = useSvgId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <SymbolBody uid={uid} ink={ink} animated={animated} />
    </svg>
  );
}

export function FulboLabWordmark({
  height = 22,
  ink = "currentColor",
  className,
  label = "FulboLab",
}: {
  height?: number;
  ink?: string;
  className?: string;
  label?: string;
}) {
  const uid = useSvgId();
  const width = (height * WORDMARK.width) / WORDMARK.height;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={WORDMARK.viewBox}
      width={width}
      height={height}
      fill="none"
      className={className}
      role="img"
      aria-label={label}
    >
      <g transform={`scale(${WORDMARK.symbolScale})`}>
        <SymbolBody uid={uid} ink={ink} animated={false} />
      </g>
      <g transform={`translate(${WORDMARK.textX} ${WORDMARK.baseline})`}>
        <path d={WORDMARK.fulbo} fill={ink} />
        <path d={WORDMARK.lab} fill="#E11D48" />
      </g>
    </svg>
  );
}
