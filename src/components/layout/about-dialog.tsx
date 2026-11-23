"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@ui-sdk/react/dialog";
import { FulboLabWordmark } from "@/components/brand/fulbolab-logo";

export function AboutDialog({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger className={className}>Sobre el proyecto</DialogTrigger>
      <DialogBackdrop />
      <DialogContent>
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <DialogTitle className="kicker text-fog">
            Sobre el proyecto
          </DialogTitle>
          <DialogClose className="kicker cursor-pointer rounded border border-line-strong px-1.5 py-0.5 text-[10px] text-fog transition-colors hover:text-chalk">
            Esc
          </DialogClose>
        </div>
        <div className="space-y-4 px-5 py-6">
          <FulboLabWordmark height={20} />
          <DialogDescription className="text-[14px] leading-relaxed text-chalk/90">
            FulboLab es un laboratorio abierto de herramientas para hinchas y
            streamers de fútbol en Latinoamérica: simuladores de playoffs,
            calculadoras, comparadores y Modo OBS. Sin anuncios.
          </DialogDescription>
          <p className="text-[14px] leading-relaxed text-fog">
            Hecho en Perú por{" "}
            <span className="text-chalk">Crafter Station</span> (
            <span className="font-mono text-chalk">@raillyhugo</span>). Código
            MIT para que cualquier comunidad sume su liga vía PR.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-line px-5 py-4 font-mono text-[12px]">
          <a
            href="https://github.com/crafter-station/fulbolab"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center rounded-md bg-chalk px-3 font-medium text-ink transition-opacity hover:opacity-85"
          >
            github.com/crafter-station/fulbolab
          </a>
          <a
            href="https://x.com/raillyhugo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center rounded-md border border-line-strong px-3 text-fog transition-colors hover:text-chalk"
          >
            x.com/raillyhugo
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
