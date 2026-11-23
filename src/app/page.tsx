import Link from "next/link";
import { ClubCrest } from "@/components/brand/club-crest";
import { ClubJersey } from "@/components/brand/club-jersey";
import {
  LIGA1_2026_CUTOFF,
  LIGA1_2026_SCENARIOS,
  LIGA1_2026_TEAMS,
  TEAM_CODE,
} from "@/data/pe/liga1-2026";

const TOOLS = [
  {
    code: "01",
    href: "/pe/playoffs",
    title: "Playoffs Liga 1 Perú 2026",
    desc: "Simulador de llave, trayectoria F0 → F17 → F34, triángulo de duelos y escenario Cristal.",
    status: "En vivo",
  },
  {
    code: "02",
    href: null,
    title: "Calculadora Liga 1 y Eliminatorias",
    desc: "Simula fecha a fecha con DG automática y descuentos FPF.",
    status: "Próximo",
  },
  {
    code: "03",
    href: null,
    title: "Versus cara a cara",
    desc: "Dos jugadores en un segundo, exportable a 16:9 para el debate.",
    status: "Próximo",
  },
  {
    code: "04",
    href: null,
    title: "Radar de historiales y altura",
    desc: "Rachas por estadio: Huancayo, Cusco, Cajamarca, Matute, Monumental.",
    status: "Próximo",
  },
] as const;

const LEAGUES = [
  { code: "PE", name: "Liga 1", live: true },
  { code: "AR", name: "Liga Profesional", live: false },
  { code: "CO", name: "Liga BetPlay", live: false },
  { code: "CL", name: "Primera División", live: false },
  { code: "MX", name: "Liga MX", live: false },
  { code: "SA", name: "Eliminatorias", live: false },
] as const;

function SectionHead({
  id,
  index,
  title,
  aside,
}: {
  id: string;
  index: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="flex scroll-mt-24 items-baseline justify-between gap-4 border-t border-line pt-5 pb-8"
    >
      <div className="flex items-baseline gap-4">
        <span className="tnum font-mono text-[11px] text-dim">{index}</span>
        <h2 className="text-[22px] font-semibold tracking-[-0.03em]">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}

function Liga1Index() {
  const scenario = LIGA1_2026_SCENARIOS.real;
  const color = (id: string) =>
    LIGA1_2026_TEAMS.find((t) => t.id === id)?.color ?? "#71717a";
  return (
    <Link
      href="/pe/playoffs"
      className="group block border-y border-line transition-colors hover:border-line-strong"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line py-3">
        <div className="kicker flex items-center gap-2 text-chalk">
          <span className="fl-live h-1.5 w-1.5 rounded-full bg-pulse" />
          Liga 1 Perú 2026
          <span className="hidden text-dim sm:inline">/ Playoffs</span>
        </div>
        <span className="font-mono text-[11px] text-dim">
          Corte {LIGA1_2026_CUTOFF}
        </span>
      </div>

      <div className="py-5">
        <div className="kicker mb-4 flex justify-between text-[10px] text-dim">
          <span>Probabilidad de campeón</span>
          <span className="text-gol">Escenario real</span>
        </div>
        <ol className="space-y-4">
          {scenario.probs.map((p, i) => (
            <li key={p.id}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight">
                  <span className="tnum w-4 font-mono text-[11px] text-dim">
                    {i + 1}
                  </span>
                  <ClubCrest id={p.id} name={p.name} size={20} />
                  {p.name}
                </span>
                <span className="tnum font-mono text-[26px] leading-none font-medium tracking-[-0.03em]">
                  {p.pct}
                  <span className="text-[12px] text-dim">%</span>
                </span>
              </div>
              <div className="mt-2 ml-7 h-[3px] bg-white/[0.06]">
                <div
                  className="h-full"
                  style={{ width: `${p.pct}%`, backgroundColor: color(p.id) }}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-2 border-t border-line">
        <div className="space-y-1.5 py-4 pr-4">
          <div className="kicker mb-2 text-[10px] text-dim">Semifinal</div>
          <div className="tnum flex items-center justify-between font-mono text-[12px]">
            <span className="inline-flex items-center gap-2">
              <ClubJersey id={scenario.semi.teamA.id} size={15} />
              <span>{TEAM_CODE[scenario.semi.teamA.id]}</span>
            </span>
            <span className="text-chalk">{scenario.semi.teamA.pct}</span>
          </div>
          <div className="tnum flex items-center justify-between font-mono text-[12px] text-fog">
            <span className="inline-flex items-center gap-2">
              <ClubJersey id={scenario.semi.teamB.id} size={15} />
              <span>{TEAM_CODE[scenario.semi.teamB.id]}</span>
            </span>
            <span>{scenario.semi.teamB.pct}</span>
          </div>
        </div>
        <div className="space-y-1.5 border-l border-line py-4 pl-4">
          <div className="kicker mb-2 text-[10px] text-dim">Final</div>
          <div className="flex items-center justify-between font-mono text-[12px]">
            <span className="inline-flex items-center gap-2">
              <ClubJersey id="alianza" size={15} />
              <span>ALI</span>
            </span>
            <span className="text-fog">espera</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[12px] text-fog">
            <ClubJersey id={null} size={15} />
            <span>vs ganador semi</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line py-3 font-mono text-[11px]">
        <span className="text-dim">fulbolab.com/pe/playoffs</span>
        <span className="text-chalk transition-transform group-hover:translate-x-0.5">
          Abrir →
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
      <section className="grid gap-14 pt-16 pb-20 sm:pt-24 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-20 lg:pt-28">
        <div className="min-w-0">
          <div className="kicker flex flex-wrap items-center gap-x-3 gap-y-1 text-fog">
            <span className="text-pulse">Laboratorio abierto</span>
            <span className="text-dim">/</span>
            <span>LatAm</span>
            <span className="text-dim">/</span>
            <span>Open source</span>
          </div>
          <h1 className="mt-6 text-[44px] leading-[0.95] font-semibold tracking-[-0.045em] text-balance sm:text-[68px] lg:text-[76px]">
            El laboratorio abierto del fútbol latinoamericano.
          </h1>
          <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-fog">
            Simuladores, calculadoras y widgets con datos oficiales, hechos para
            abrirse en el stream y compartirse en X. Arrancamos con Perú.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/pe/playoffs"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-chalk px-4 text-[14px] font-medium text-ink transition-opacity hover:opacity-85"
            >
              Abrir Playoffs 2026
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/#herramientas"
              className="inline-flex h-10 items-center rounded-md border border-line-strong px-4 text-[14px] text-chalk transition-colors hover:bg-raise"
            >
              Ver herramientas
            </Link>
          </div>
          <p className="mt-10 max-w-md border-l border-pulse pl-4 text-[13px] leading-relaxed text-fog">
            Pensado para transmisiones en vivo y debates de fútbol: Modo OBS en
            un click, sin anuncios ni marcas de agua.
          </p>
        </div>
        <div className="min-w-0">
          <Liga1Index />
        </div>
      </section>

      <section className="grid grid-cols-2 border-y border-line sm:grid-cols-4">
        {[
          { k: "Precio", v: "Gratis" },
          { k: "Anuncios", v: "Cero" },
          { k: "Licencia", v: "MIT" },
          { k: "Stream", v: "Modo OBS" },
        ].map((s, i) => (
          <div
            key={s.k}
            className={`py-6 ${i % 2 === 1 ? "border-l border-line pl-5" : "pr-5"} ${i >= 2 ? "border-t border-line sm:border-t-0" : ""} ${i === 2 ? "sm:border-l sm:pl-5" : ""}`}
          >
            <div className="kicker text-[10px] text-dim">{s.k}</div>
            <div className="mt-2 text-[22px] font-semibold tracking-[-0.03em]">
              {s.v}
            </div>
          </div>
        ))}
      </section>

      <section className="pt-24">
        <SectionHead
          id="herramientas"
          index="01"
          title="Herramientas"
          aside={
            <span className="kicker text-[10px] text-dim">
              1 en vivo · 3 en camino
            </span>
          }
        />
        <ul className="border-b border-line">
          {TOOLS.map((tool) => {
            const body = (
              <>
                <span className="tnum font-mono text-[12px] text-dim">
                  {tool.code}
                </span>
                <div className="min-w-0">
                  <div
                    className={`text-[17px] font-medium tracking-tight ${tool.href ? "text-chalk" : "text-fog"}`}
                  >
                    {tool.title}
                  </div>
                  <div className="mt-1 text-[14px] text-dim">{tool.desc}</div>
                </div>
                <span
                  className={`kicker justify-self-end text-[10px] ${tool.href ? "text-pulse" : "text-dim"}`}
                >
                  {tool.status}
                  {tool.href && <span className="ml-2 text-chalk">→</span>}
                </span>
              </>
            );
            const row =
              "grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t border-line py-6";
            return (
              <li key={tool.code}>
                {tool.href ? (
                  <Link
                    href={tool.href}
                    className={`${row} transition-colors hover:bg-white/[0.02]`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={row}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="pt-24">
        <SectionHead
          id="ligas"
          index="02"
          title="Ligas"
          aside={
            <a
              href="https://github.com/crafter-station/fulbolab"
              target="_blank"
              rel="noreferrer"
              className="kicker text-[10px] text-fog transition-colors hover:text-chalk"
            >
              Suma tu liga vía PR →
            </a>
          }
        />
        <div className="grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {LEAGUES.map((l) => (
            <div key={l.code} className="bg-ink px-4 py-5">
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-[13px] font-medium ${l.live ? "text-gol" : "text-dim"}`}
                >
                  {l.code}
                </span>
                {l.live ? (
                  <span className="fl-live h-1.5 w-1.5 rounded-full bg-pulse" />
                ) : (
                  <span className="font-mono text-[10px] text-dim">PR</span>
                )}
              </div>
              <div
                className={`mt-3 text-[14px] ${l.live ? "text-chalk" : "text-fog"}`}
              >
                {l.name}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
