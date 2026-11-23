"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function useCopied() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const copy = useCallback(async (getText: () => Promise<string> | string) => {
    const text = await getText();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }, []);
  return { copied, copy };
}

export function AssetActions({
  svg,
  png,
  theme,
}: {
  svg: string;
  png: string;
  theme: "dark" | "light";
}) {
  const { copied, copy } = useCopied();
  const base =
    theme === "dark"
      ? "border-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#52525B]"
      : "border-[#D4D4D8] text-[#52525B] hover:text-[#09090B] hover:border-[#A1A1AA]";
  const primary =
    theme === "dark"
      ? "bg-[#FAFAFA] text-[#09090B] hover:bg-white border-[#FAFAFA]"
      : "bg-[#09090B] text-[#FAFAFA] hover:bg-[#27272A] border-[#09090B]";
  const btn =
    "inline-flex h-7 items-center rounded-md border px-2.5 font-mono text-[11px] font-medium transition-colors cursor-pointer";
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <button
        type="button"
        onClick={() =>
          copy(async () => {
            const res = await fetch(svg);
            return res.text();
          })
        }
        className={`${btn} ${primary} min-w-[76px] justify-center`}
        aria-live="polite"
      >
        {copied ? "Copiado" : "Copy SVG"}
      </button>
      <a href={svg} download className={`${btn} ${base}`}>
        SVG
      </a>
      <a href={png} download className={`${btn} ${base}`}>
        PNG
      </a>
    </div>
  );
}

export function ColorChip({
  hex,
  name,
  role,
}: {
  hex: string;
  name: string;
  role: string;
}) {
  const { copied, copy } = useCopied();
  return (
    <button
      type="button"
      onClick={() => copy(() => hex)}
      className="group flex flex-col bg-ink text-left transition-colors hover:bg-surface cursor-pointer"
      aria-label={`Copiar ${hex}`}
    >
      <span
        className="block h-24 w-full border-b border-line"
        style={{ backgroundColor: hex }}
      />
      <span className="flex flex-col gap-0.5 px-3 py-3">
        <span className="text-[13px] font-medium">{name}</span>
        <span className="text-[12px] text-fog">{role}</span>
        <span
          className={`mt-1 font-mono text-[11px] ${copied ? "text-gol" : "text-dim group-hover:text-chalk"}`}
          aria-live="polite"
        >
          {copied ? "Copiado" : hex}
        </span>
      </span>
    </button>
  );
}

export function CopyPromptButton({ prompt }: { prompt: string }) {
  const { copied, copy } = useCopied();
  return (
    <button
      type="button"
      onClick={() => copy(() => prompt)}
      className="inline-flex h-10 items-center rounded-md border border-line-strong px-4 text-[14px] text-chalk transition-colors hover:bg-raise cursor-pointer"
      aria-live="polite"
    >
      {copied ? "Copiado" : "Copy prompt for agents"}
    </button>
  );
}
