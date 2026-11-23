"use client";

import { Switch, SwitchThumb } from "@ui-sdk/react/switch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { FulboLabWordmark } from "@/components/brand/fulbolab-logo";
import { useObs } from "@/components/layout/obs-context";
import { ThemeSwitch } from "@/components/layout/theme-context";
import { Hint } from "@/components/ui/hint";

const NAV = [
  { href: "/pe/playoffs", label: "Playoffs 2026", match: "/pe/playoffs" },
  { href: "/#herramientas", label: "Herramientas", match: null },
  { href: "/#ligas", label: "Ligas", match: null },
] as const;

function GithubMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function NavLinks({ pathname }: { pathname: string }) {
  return NAV.map((item) => {
    const active = item.match !== null && pathname.startsWith(item.match);
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`relative flex h-full items-center text-[13px] transition-colors ${
          active ? "text-chalk" : "text-fog hover:text-chalk"
        }`}
      >
        {item.label}
        {active && (
          <span className="absolute inset-x-0 -bottom-px h-px bg-chalk" />
        )}
      </Link>
    );
  });
}

export function SiteHeader() {
  const pathname = usePathname();
  const { obsMode, obsAvailable, setObsMode } = useObs();
  const obsId = useId();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-12 w-full max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
        <div className="flex h-full min-w-0 items-center gap-8">
          <Link
            href="/"
            aria-label="FulboLab, inicio"
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <FulboLabWordmark height={17} />
          </Link>
          {!obsMode && (
            <nav
              aria-label="Producto"
              className="hidden h-full items-center gap-6 md:flex"
            >
              <NavLinks pathname={pathname} />
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {obsAvailable && (
            <label
              htmlFor={obsId}
              className="flex cursor-pointer items-center gap-2.5 select-none"
            >
              <span
                className={`kicker transition-colors ${obsMode ? "text-chalk" : "text-fog"}`}
              >
                Modo OBS
              </span>
              <Switch
                id={obsId}
                checked={obsMode}
                onCheckedChange={(next) => setObsMode(next)}
              >
                <SwitchThumb />
              </Switch>
            </label>
          )}
          {!obsMode && (
            <div className="flex items-center gap-2.5">
              <ThemeSwitch />
              <Hint label="Código en GitHub">
                <a
                  href="https://github.com/crafter-station/fulbolab"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Código en GitHub"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-fog transition-colors hover:bg-raise hover:text-chalk"
                >
                  <GithubMark />
                </a>
              </Hint>
            </div>
          )}
        </div>
      </div>

      {!obsMode && (
        <nav
          aria-label="Producto móvil"
          className="flex h-10 items-center gap-6 overflow-x-auto border-t border-line px-5 md:hidden"
        >
          <NavLinks pathname={pathname} />
        </nav>
      )}
    </header>
  );
}
