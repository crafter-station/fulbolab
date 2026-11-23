"use client";

import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@ui-sdk/react/tabs";
import { type ReactNode, useState } from "react";
import { ClubCrest } from "@/components/brand/club-crest";
import { useObs } from "@/components/layout/obs-context";
import { Hint } from "@/components/ui/hint";
import { Segmented } from "@/components/ui/segmented";
import { BracketSimulator } from "@/components/viz/bracket-simulator";
import { H2HTriangle } from "@/components/viz/h2h-triangle";
import { TrajectoryScrubber } from "@/components/viz/trajectory-scrubber";
import {
  LIGA1_2026_CUTOFF,
  LIGA1_2026_SCENARIOS,
  LIGA1_2026_TEAMS,
  TEAM_CODE,
  type TeamSeasonStats,
} from "@/data/pe/liga1-2026";

type ScenarioKey = keyof typeof LIGA1_2026_SCENARIOS;

function signed(n: number) {
  return n > 0 ? `+${n}` : n === 0 ? "0" : `−${Math.abs(n)}`;
}

function Section({
  index,
  title,
  dek,
  compact,
  children,
}: {
  index: string;
  title: string;
  dek?: string;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`grid gap-6 border-t border-line lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 ${compact ? "py-6" : "py-12 sm:py-16"}`}
    >
      <div className="lg:sticky lg:top-20 lg:self-start">
        <div className="tnum font-mono text-[11px] text-dim">{index}</div>
        <h2 className="mt-2 text-[22px] leading-tight font-semibold tracking-[-0.03em]">
          {title}
        </h2>
        {dek && !compact && (
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-fog">
            {dek}
          </p>
        )}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function HeadHint({ label, hint }: { label: string; hint: string }) {
  return (
    <Hint label={hint} side="top">
      <button
        type="button"
        className="kicker cursor-help text-[10px] text-dim underline decoration-dotted decoration-mute underline-offset-4"
      >
        {label}
      </button>
    </Hint>
  );
}

type Phase = "acum" | "ap" | "cl";

const PHASE: Record<
  Phase,
  {
    pos: (t: TeamSeasonStats) => number;
    pts: (t: TeamSeasonStats) => number;
    dg: (t: TeamSeasonStats) => number;
    extra: {
      label: string;
      hint: string;
      value: (t: TeamSeasonStats) => string;
    };
  }
> = {
  acum: {
    pos: (t) => t.acumuladoPos,
    pts: (t) => t.acumuladoPts,
    dg: (t) => t.acumuladoDg,
    extra: {
      label: "Ap / Cl",
      hint: "Puntos en Apertura y Clausura",
      value: (t) => `${t.aperturaPts} / ${t.clausuraPts}`,
    },
  },
  ap: {
    pos: (t) => t.aperturaPos,
    pts: (t) => t.aperturaPts,
    dg: (t) => t.aperturaDg,
    extra: {
      label: "Títulos",
      hint: "Títulos nacionales históricos",
      value: (t) => String(t.titles),
    },
  },
  cl: {
    pos: (t) => t.clausuraPos,
    pts: (t) => t.clausuraPts,
    dg: (t) => t.clausuraDg,
    extra: {
      label: "Δ",
      hint: "Puntos Clausura menos Apertura",
      value: (t) => signed(t.clausuraPts - t.aperturaPts),
    },
  },
};

function StandingsTable({ phase }: { phase: Phase }) {
  const cfg = PHASE[phase];
  const rows = [...LIGA1_2026_TEAMS].sort((a, b) => cfg.pos(a) - cfg.pos(b));
  return (
    <div className="overflow-x-auto">
      <table className="tnum w-full border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-b border-line">
            <th className="kicker w-12 py-3 text-[10px] font-medium text-dim">
              Pos
            </th>
            <th className="kicker py-3 text-[10px] font-medium text-dim">
              Club
            </th>
            <th className="kicker py-3 text-right text-[10px] font-medium text-dim">
              Pts
            </th>
            <th className="py-3 text-right font-medium">
              <HeadHint label="DG" hint="Diferencia de gol" />
            </th>
            <th className="hidden py-3 text-right font-medium sm:table-cell">
              <HeadHint label={cfg.extra.label} hint={cfg.extra.hint} />
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.id} className="border-b border-line last:border-none">
              <td className="py-3.5 font-mono text-fog">{cfg.pos(t)}.°</td>
              <td className="py-3.5">
                <span className="flex items-center gap-2.5">
                  <ClubCrest id={t.id} name={t.name} size={20} />
                  <span className="font-medium">{t.name}</span>
                  <span className="hidden font-mono text-[11px] text-dim sm:inline">
                    {TEAM_CODE[t.id]}
                  </span>
                </span>
              </td>
              <td className="py-3.5 text-right font-mono text-[15px] font-medium">
                {cfg.pts(t)}
              </td>
              <td
                className={`py-3.5 text-right font-mono ${cfg.dg(t) < 0 ? "text-pulse" : "text-fog"}`}
              >
                {signed(cfg.dg(t))}
              </td>
              <td className="hidden py-3.5 text-right font-mono text-fog sm:table-cell">
                {cfg.extra.value(t)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PlayoffsDashboard() {
  const { obsMode } = useObs();
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>("real");
  const scenario = LIGA1_2026_SCENARIOS[scenarioKey];

  return (
    <main className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
      <header
        className={`grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end ${obsMode ? "pt-6 pb-6" : "pt-12 pb-12 sm:pt-20"}`}
      >
        <div className="min-w-0">
          <div className="kicker flex flex-wrap items-center gap-x-3 gap-y-1 text-fog">
            <span className="fl-live h-1.5 w-1.5 rounded-full bg-pulse" />
            <span className="text-chalk">Liga 1 Perú 2026</span>
            <span className="text-dim">/</span>
            <span>Corte oficial {LIGA1_2026_CUTOFF}</span>
          </div>
          <h1
            className={`mt-5 font-semibold tracking-[-0.045em] ${obsMode ? "text-[40px] leading-none" : "text-[48px] leading-[0.92] sm:text-[80px]"}`}
          >
            Playoffs 2026
          </h1>
          {!obsMode && (
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-fog">
              Alianza Lima espera en la final. Universitario y Sport Huancayo
              definen la semifinal. Simula la llave, recorre la temporada y
              compara el escenario real con el hipotético de Sporting Cristal.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:items-end">
          <span className="kicker text-[10px] text-dim">Escenario</span>
          <Segmented
            label="Escenario de playoffs"
            value={scenarioKey}
            onChange={setScenarioKey}
            options={[
              { value: "real", label: "Real · Huancayo" },
              { value: "cristal", label: "Hipotético · Cristal" },
            ]}
          />
        </div>
      </header>

      <div className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
        {LIGA1_2026_TEAMS.map((t, i) => {
          const on = scenario.highlight.includes(t.id);
          return (
            <div
              key={t.id}
              className={`py-5 transition-opacity duration-300 ${i % 2 === 1 ? "border-l border-line pl-4 sm:pl-6" : "pr-4"} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""} ${on ? "" : "opacity-35"}`}
            >
              <div className="flex items-center gap-2">
                <ClubCrest id={t.id} name={t.name} size={18} />
                <span className="truncate text-[13px] font-medium">
                  {t.name}
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="tnum font-mono text-[32px] leading-none font-medium tracking-[-0.03em]">
                  {t.acumuladoPts}
                </span>
                <span className="font-mono text-[11px] text-dim">pts</span>
              </div>
              <div className="tnum mt-2 font-mono text-[11px] text-fog">
                {t.acumuladoPos}.° acum · {signed(t.acumuladoDg)} DG
              </div>
              <div className="mt-1 truncate text-[12px] text-dim">
                {t.statusTag}
              </div>
            </div>
          );
        })}
      </div>

      <Section
        index="01"
        title="Llave y campeón"
        dek="Decide la semifinal y mira cómo se recalculan la final y la probabilidad de campeón."
        compact={obsMode}
      >
        <BracketSimulator scenarioKey={scenarioKey} />
      </Section>

      <Section
        index="02"
        title="Trayectoria 2026"
        dek="Acumulado F0 → F17 → F34 y Apertura contra Clausura, con delta, DG y posición en cada punto."
        compact={obsMode}
      >
        <TrajectoryScrubber />
      </Section>

      {!obsMode && (
        <>
          <Section
            index="03"
            title="Triángulo de duelos"
            dek="Cada flecha apunta del dominador al dominado en los dos cruces del año. Selecciona un vértice o una arista."
          >
            <H2HTriangle scenarioKey={scenarioKey} />
          </Section>

          <Section
            index="04"
            title="Tabla comparativa"
            dek="34 fechas jugadas. Posiciones reales de la Liga 1 para los cuatro protagonistas."
          >
            <Tabs defaultValue="acum">
              <TabsList aria-label="Tabla por torneo">
                <TabsTab value="acum">Acumulado</TabsTab>
                <TabsTab value="ap">Apertura</TabsTab>
                <TabsTab value="cl">Clausura</TabsTab>
                <TabsIndicator />
              </TabsList>
              <TabsPanel value="acum">
                <StandingsTable phase="acum" />
              </TabsPanel>
              <TabsPanel value="ap">
                <StandingsTable phase="ap" />
              </TabsPanel>
              <TabsPanel value="cl">
                <StandingsTable phase="cl" />
              </TabsPanel>
            </Tabs>
          </Section>
        </>
      )}
    </main>
  );
}
