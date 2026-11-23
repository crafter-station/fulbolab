"use client";

import Link from "next/link";
import { useState } from "react";
import { FulboLabLogo } from "@/components/brand/fulbolab-logo";

export function SiteHeader({
  obsMode = false,
  onToggleObs,
}: {
  obsMode?: boolean;
  onToggleObs?: () => void;
}) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <header className="border-b border-[#1E293B] bg-[#070B14]/90 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <FulboLabLogo size={32} />
            </Link>
            {!obsMode && (
              <nav className="hidden sm:flex items-center gap-1 text-sm">
                <Link
                  href="/pe/playoffs"
                  className="px-3 py-1.5 rounded-lg text-[#F8FAFC] hover:bg-[#0E1525] font-medium transition-colors"
                >
                  PE · Playoffs 2026
                </Link>
                <a
                  href="/brand/logo-system.html"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0E1525] transition-colors"
                >
                  Brand Kit
                </a>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onToggleObs && (
              <button
                type="button"
                onClick={onToggleObs}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-colors cursor-pointer ${
                  obsMode
                    ? "bg-[#E11D48] border-[#E11D48] text-white"
                    : "bg-[#0E1525] border-[#1E293B] text-[#F8FAFC] hover:border-[#E11D48]"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    obsMode ? "bg-white" : "bg-[#E11D48]"
                  }`}
                />
                {obsMode ? "Salir Modo OBS" : "Modo OBS"}
              </button>
            )}
            {!obsMode && (
              <button
                type="button"
                onClick={() => setAboutOpen(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#1E293B] bg-[#0E1525] text-[#CBD5E1] hover:text-white hover:border-[#334155] transition-colors cursor-pointer"
              >
                Sobre el proyecto
              </button>
            )}
          </div>
        </div>
      </header>

      {aboutOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Cerrar modal"
            onClick={() => setAboutOpen(false)}
            className="fixed inset-0 bg-[#070B14]/80 backdrop-blur-sm cursor-default"
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-[#1E293B] bg-[#0E1525] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <FulboLabLogo size={26} bg="#0E1525" />
              <button
                type="button"
                onClick={() => setAboutOpen(false)}
                className="text-xs font-mono px-2.5 py-1 rounded-md border border-[#1E293B] text-[#94A3B8] hover:text-white cursor-pointer"
              >
                ESC
              </button>
            </div>
            <p className="text-sm text-[#CBD5E1] mb-3 leading-relaxed">
              FulboLab es un laboratorio abierto de herramientas gratuitas para
              hinchas y streamers de fútbol en Latinoamérica: calculadoras,
              simuladores de playoffs, comparadores VS y modo OBS sin anuncios.
            </p>
            <p className="text-sm text-[#F8FAFC] mb-5 leading-relaxed">
              Hecho en Perú por <strong>Crafter Station</strong> (
              <span className="font-mono text-[#F59E0B]">@raillyhugo</span>).
              Código abierto bajo licencia MIT para que cualquier comunidad de
              LatAm pueda sumar su liga vía PR.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <a
                href="https://github.com/crafter-station/fulbolab"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#E11D48]/15 border border-[#E11D48]/40 text-[#FDA4AF] hover:bg-[#E11D48]/25 transition-colors"
              >
                github.com/crafter-station/fulbolab
              </a>
              <a
                href="https://x.com/raillyhugo"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#070B14] border border-[#1E293B] text-[#CBD5E1] hover:text-white transition-colors"
              >
                x.com/raillyhugo
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function SiteFooter({ onOpenAbout }: { onOpenAbout?: () => void }) {
  return (
    <footer className="border-t border-[#1E293B] mt-14">
      <div className="mx-auto max-w-6xl px-5 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#94A3B8]">
        <div className="font-mono">
          <span className="text-[#F8FAFC] font-semibold">fulbolab.com</span> ·
          100% gratis, sin anuncios y Open Source (MIT)
        </div>
        <div className="flex items-center gap-3">
          <span>
            Hecho en Perú por{" "}
            <strong className="text-[#F8FAFC]">Crafter Station</strong>
          </span>
          {onOpenAbout && (
            <button
              type="button"
              onClick={onOpenAbout}
              className="underline underline-offset-4 text-[#F8FAFC] cursor-pointer"
            >
              Sobre el proyecto
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
