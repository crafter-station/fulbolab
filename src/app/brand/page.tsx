import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  AssetActions,
  ColorChip,
  CopyPromptButton,
} from "@/components/brand/brand-actions";
import { FulboLabSymbol } from "@/components/brand/fulbolab-logo";

export const metadata: Metadata = {
  title: "Brand · FulboLab",
  description:
    "Logos, símbolo, favicon, OG card, colores y tipografía de FulboLab. Descarga el kit completo en un ZIP.",
};

const SITE = "https://fulbolab.com";

const COLORS = [
  { hex: "#09090B", name: "Carbón", role: "Fondo principal" },
  { hex: "#111113", name: "Tribuna", role: "Superficies sutiles" },
  { hex: "#27272A", name: "Línea", role: "Reglas y bordes hairline" },
  { hex: "#E11D48", name: "Pulso", role: "Acento, datos y lab" },
  { hex: "#F59E0B", name: "Gol", role: "Punto central y destacados" },
  { hex: "#FAFAFA", name: "Tiza", role: "Texto y fondo claro" },
  { hex: "#A1A1AA", name: "Niebla", role: "Texto secundario" },
] as const;

type Theme = "dark" | "light";

interface Asset {
  title: string;
  file: string;
  svg: string;
  png: string;
  theme: Theme;
  preview: ReactNode;
}

const ASSETS: Asset[] = [
  {
    title: "Wordmark",
    file: "fulbolab-wordmark-dark.svg",
    svg: "/brand/fulbolab-wordmark-dark.svg",
    png: "/brand/fulbolab-wordmark-dark.png",
    theme: "dark",
    preview: (
      <Image
        src="/brand/fulbolab-wordmark-dark.svg"
        alt="Wordmark fulbolab sobre fondo oscuro"
        width={512}
        height={74}
        unoptimized
        className="h-auto w-[62%] max-w-[300px]"
      />
    ),
  },
  {
    title: "Wordmark",
    file: "fulbolab-wordmark-light.svg",
    svg: "/brand/fulbolab-wordmark-light.svg",
    png: "/brand/fulbolab-wordmark-light.png",
    theme: "light",
    preview: (
      <Image
        src="/brand/fulbolab-wordmark-light.svg"
        alt="Wordmark fulbolab sobre fondo claro"
        width={512}
        height={74}
        unoptimized
        className="h-auto w-[62%] max-w-[300px]"
      />
    ),
  },
  {
    title: "Símbolo",
    file: "fulbolab-symbol-dark.svg",
    svg: "/brand/fulbolab-symbol-dark.svg",
    png: "/brand/fulbolab-symbol-dark.png",
    theme: "dark",
    preview: (
      <Image
        src="/brand/fulbolab-symbol-dark.svg"
        alt="Símbolo FulboLab sobre fondo oscuro"
        width={104}
        height={104}
        unoptimized
        className="h-[88px] w-[88px] sm:h-[104px] sm:w-[104px]"
      />
    ),
  },
  {
    title: "Símbolo",
    file: "fulbolab-symbol-light.svg",
    svg: "/brand/fulbolab-symbol-light.svg",
    png: "/brand/fulbolab-symbol-light.png",
    theme: "light",
    preview: (
      <Image
        src="/brand/fulbolab-symbol-light.svg"
        alt="Símbolo FulboLab sobre fondo claro"
        width={104}
        height={104}
        unoptimized
        className="h-[88px] w-[88px] sm:h-[104px] sm:w-[104px]"
      />
    ),
  },
  {
    title: "Favicon 16 px",
    file: "favicon-16.svg",
    svg: "/brand/favicon-16.svg",
    png: "/brand/favicon-16.png",
    theme: "dark",
    preview: <FaviconPreview theme="dark" />,
  },
  {
    title: "OG card 1200×630",
    file: "og-image.svg",
    svg: "/brand/og-image.svg",
    png: "/brand/og-image.png",
    theme: "dark",
    preview: (
      <Image
        src="/brand/og-image.png"
        alt="OG card de FulboLab"
        width={1200}
        height={630}
        unoptimized
        className="h-auto w-[82%] border border-line-strong"
      />
    ),
  },
];

function FaviconPreview({ theme }: { theme: Theme }) {
  const caption = theme === "dark" ? "text-dim" : "text-[#71717A]";
  return (
    <div className="flex items-end gap-8">
      <figure className="flex flex-col items-center gap-2">
        <Image
          src="/brand/favicon-16.svg"
          alt="Favicon a 16 px"
          width={16}
          height={16}
          unoptimized
        />
        <figcaption className={`font-mono text-[10px] ${caption}`}>
          16 px
        </figcaption>
      </figure>
      <figure className="flex flex-col items-center gap-2">
        <Image
          src="/brand/favicon-16.png"
          alt="Favicon ampliado 4 veces"
          width={64}
          height={64}
          unoptimized
          style={{ imageRendering: "pixelated" }}
        />
        <figcaption className={`font-mono text-[10px] ${caption}`}>
          ×4
        </figcaption>
      </figure>
    </div>
  );
}

const PROMPT = `You are using the FulboLab brand. Follow it exactly.

Name: write "FulboLab" (one word, capital F and L). The logo wordmark is "fulbolab" in lowercase. Never "Fulbo Lab", "Fulbolab" or "FULBOLAB".

Files (${SITE}/brand):
- Wordmark: ${SITE}/brand/fulbolab-wordmark-dark.svg (on dark), ${SITE}/brand/fulbolab-wordmark-light.svg (on light)
- Symbol: ${SITE}/brand/fulbolab-symbol-dark.svg, ${SITE}/brand/fulbolab-symbol-light.svg
- Favicon: ${SITE}/brand/favicon-16.svg (use this at 16 px, never the shrunk symbol)
- OG card: ${SITE}/brand/og-image.png (1200x630)
- Everything: ${SITE}/brand/fulbolab-brand-kit.zip

Colors (neutral carbon and zinc, no blue tint):
${COLORS.map((c) => `- ${c.hex} ${c.name}: ${c.role}`).join("\n")}

Type: Geist (display and UI, 500/600, tight tracking) and Geist Mono (data, labels, tabular numbers). The wordmark is outlined vector art, never retype it.

Rules:
1. Prefer the carbon background (#09090B). On light backgrounds use the light files.
2. Use hairline rules (#27272A or rgba(255,255,255,0.08)), never glows or gradients. Crimson and gold are accents, use them sparingly.
3. Below 24 px use favicon-16.svg.
4. Do not recolor, stretch, add effects or split "lab" from the wordmark. Keep clear space equal to the height of the symbol's center ring.

Contact: @raillyhugo · github.com/crafter-station/fulbolab (Crafter Station).`;

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-t border-line pt-5">
      <span className="tnum font-mono text-[11px] text-dim">{index}</span>
      <h2 className="text-[22px] font-semibold tracking-[-0.03em]">{title}</h2>
    </div>
  );
}

function Tile({ asset }: { asset: Asset }) {
  const dark = asset.theme === "dark";
  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: dark ? "#09090B" : "#FAFAFA" }}
    >
      <div className="flex aspect-[16/9] items-center justify-center p-8">
        {asset.preview}
      </div>
      <div
        className={`flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 ${dark ? "border-line" : "border-[#E4E4E7]"}`}
      >
        <div className="min-w-0">
          <div
            className={`text-[13px] font-medium ${dark ? "text-chalk" : "text-ink"}`}
          >
            {asset.title}
          </div>
          <div
            className={`truncate font-mono text-[11px] ${dark ? "text-dim" : "text-[#71717A]"}`}
          >
            {asset.file}
          </div>
        </div>
        <AssetActions svg={asset.svg} png={asset.png} theme={asset.theme} />
      </div>
    </div>
  );
}

export default function BrandPage() {
  const tiles: Asset[] = [
    ...ASSETS.slice(0, 5),
    {
      ...ASSETS[4],
      theme: "light",
      preview: <FaviconPreview theme="light" />,
    },
    ASSETS[5],
    {
      ...ASSETS[5],
      theme: "light",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
      <section className="grid gap-12 pt-16 pb-20 sm:pt-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
        <div className="min-w-0">
          <div className="kicker text-fog">
            <span className="text-pulse">Brand</span>
            <span className="mx-2 text-dim">/</span>
            Kit de marca
          </div>
          <h1 className="mt-6 text-[48px] leading-[0.92] font-semibold tracking-[-0.045em] sm:text-[76px]">
            Marca FulboLab
          </h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-fog">
            Una cancha vista desde arriba, el pulso del partido que la cruza y
            un punto dorado: el momento en que todo cambia.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="/brand/fulbolab-brand-kit.zip"
              download
              className="inline-flex h-10 items-center gap-2 rounded-md bg-chalk px-4 text-[14px] font-medium text-ink transition-opacity hover:opacity-85"
            >
              Descargar todo (ZIP)
            </a>
            <CopyPromptButton prompt={PROMPT} />
          </div>
          <p className="mt-4 font-mono text-[11px] text-dim">
            14 archivos · SVG y PNG · wordmark, símbolo, favicon y OG card
          </p>
        </div>

        <div className="relative flex aspect-square w-full max-w-[440px] items-center justify-center justify-self-center border border-line lg:justify-self-end">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-line" />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-line" />
          <span className="kicker absolute top-4 left-4 text-[10px] text-dim">
            Símbolo
          </span>
          <span className="kicker absolute right-4 bottom-4 text-[10px] text-dim">
            Pulso · 4.8 s
          </span>
          <FulboLabSymbol
            size={220}
            animated
            className="relative h-auto w-[52%] max-w-[220px] bg-ink"
          />
        </div>
      </section>

      <section className="pb-20">
        <SectionTitle index="01" title="Nombre" />
        <p className="max-w-2xl text-[17px] leading-relaxed text-chalk/90">
          Se escribe <span className="font-semibold text-chalk">FulboLab</span>:
          una palabra, con F y L mayúsculas.
          <br />
          <span className="text-fog">
            En el logo es el wordmark{" "}
            <span className="font-mono text-pulse">fulbolab</span>, todo en
            minúsculas.
          </span>
        </p>
      </section>

      <section className="pb-20">
        <SectionTitle index="02" title="Logos" />
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          {tiles.map((asset) => (
            <Tile key={`${asset.file}-${asset.theme}`} asset={asset} />
          ))}
        </div>
      </section>

      <section className="pb-20">
        <SectionTitle index="03" title="Color" />
        <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4 lg:grid-cols-7">
          {COLORS.map((c) => (
            <ColorChip key={c.hex} hex={c.hex} name={c.name} role={c.role} />
          ))}
        </div>
        <p className="mt-4 text-[13px] text-fog">
          Carbón y zinc neutros, sin tinte azul. Click en un color para copiar
          su hex.
        </p>
      </section>

      <section className="pb-20">
        <SectionTitle index="04" title="Tipografía" />
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          <a
            href="https://vercel.com/font"
            target="_blank"
            rel="noreferrer"
            className="group bg-ink p-6 transition-colors hover:bg-surface"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[14px] font-medium">Geist</span>
              <span className="font-mono text-[11px] text-dim group-hover:text-chalk">
                vercel.com/font ↗
              </span>
            </div>
            <div className="mt-8 text-[64px] leading-none font-semibold tracking-[-0.05em]">
              Aa Gol
            </div>
            <p className="mt-5 text-[13px] text-fog">
              Titulares e interfaz. 500 y 600, tracking cerrado.
            </p>
          </a>
          <a
            href="https://vercel.com/font"
            target="_blank"
            rel="noreferrer"
            className="group bg-ink p-6 transition-colors hover:bg-surface"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[14px] font-medium">Geist Mono</span>
              <span className="font-mono text-[11px] text-dim group-hover:text-chalk">
                vercel.com/font ↗
              </span>
            </div>
            <div className="tnum mt-8 font-mono text-[44px] leading-none tracking-[-0.04em] sm:text-[52px]">
              60% <span className="text-pulse">lab</span>
            </div>
            <p className="mt-5 text-[13px] text-fog">
              Datos, marcadores, etiquetas y números tabulares.
            </p>
          </a>
        </div>
      </section>

      <section className="pb-20">
        <SectionTitle index="05" title="Uso" />
        <ol className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
          {[
            "Prioriza el fondo carbón #09090B. Sobre fondos claros usa las versiones light.",
            "Bajo 24 px usa favicon-16.svg, no el símbolo reducido.",
            "No recolorees, deformes ni separes lab del wordmark. Deja aire igual al anillo central.",
          ].map((rule, i) => (
            <li key={rule} className="bg-ink p-5">
              <span className="tnum font-mono text-[11px] text-pulse">
                0{i + 1}
              </span>
              <p className="mt-3 text-[14px] leading-relaxed text-chalk/90">
                {rule}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionTitle index="06" title="Contacto" />
        <p className="max-w-2xl text-[17px] leading-relaxed text-fog">
          ¿Prensa, streams o alianzas? Escribe a{" "}
          <a
            href="https://x.com/raillyhugo"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-chalk underline decoration-mute underline-offset-4 hover:decoration-pulse"
          >
            @raillyhugo
          </a>{" "}
          o abre un issue en{" "}
          <a
            href="https://github.com/crafter-station/fulbolab"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-chalk underline decoration-mute underline-offset-4 hover:decoration-pulse"
          >
            github.com/crafter-station/fulbolab
          </a>
          . Un proyecto de <span className="text-chalk">Crafter Station</span>.
        </p>
      </section>
    </main>
  );
}
