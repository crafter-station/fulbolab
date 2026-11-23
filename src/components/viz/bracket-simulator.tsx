"use client";

import { createParts } from "@ui-sdk/react/primitive";
import { ClubCrest } from "@/components/brand/club-crest";
import { ClubJersey } from "@/components/brand/club-jersey";
import { bracketPrimitive } from "@/components/viz/bracket-primitive";
import {
  LIGA1_2026_SCENARIOS,
  LIGA1_2026_TEAMS,
  TEAM_CODE,
  type TeamId,
} from "@/data/pe/liga1-2026";

const {
  Root: BracketRoot,
  Entrants: BracketEntrants,
  Entrant: BracketEntrant,
  Reset: BracketReset,
} = createParts(bracketPrimitive, {
  root: "div",
  entrants: "div",
  entrant: "button",
  reset: "button",
});

type ScenarioKey = keyof typeof LIGA1_2026_SCENARIOS;

function team(id: TeamId) {
  const found = LIGA1_2026_TEAMS.find((t) => t.id === id);
  if (!found) throw new Error(`Equipo desconocido: ${id}`);
  return found;
}

function model(scenarioKey: ScenarioKey) {
  const scenario = LIGA1_2026_SCENARIOS[scenarioKey];
  const semi = [scenario.semi.teamA, scenario.semi.teamB].map((s) => ({
    id: s.id,
    pass: Number.parseInt(s.pct, 10),
  }));
  const champ = Object.fromEntries(
    scenario.probs.map((p) => [p.id, p.pct]),
  ) as Partial<Record<TeamId, number>>;
  const finalFor = (id: TeamId) => {
    const entry = semi.find((s) => s.id === id);
    const win = entry ? Math.round(((champ[id] ?? 0) / entry.pass) * 100) : 0;
    return { alianza: 100 - win, rival: win };
  };
  return { scenario, semi, champ, finalFor };
}

function Bar({
  value,
  ghost,
  color,
}: {
  value: number;
  ghost?: number;
  color: string;
}) {
  return (
    <div className="relative mt-2 h-[3px] w-full bg-white/[0.06]">
      <div
        className="absolute inset-y-0 left-0"
        style={{
          width: `${value}%`,
          backgroundColor: color,
          transition: "width 320ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        }}
      />
      {ghost !== undefined && ghost !== value && (
        <span
          className="absolute -top-[3px] h-[9px] w-px bg-chalk/50"
          style={{ left: `${ghost}%` }}
        />
      )}
    </div>
  );
}

function Column({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="kicker mb-3 border-b border-line pb-2 text-[10px] text-dim">
        {label}
      </div>
      {children}
    </div>
  );
}

function Connector({
  mode,
  activeBranch,
  activeColor,
}: {
  mode: "to-second" | "to-mid";
  activeBranch?: "top" | "bottom" | null;
  activeColor?: string;
}) {
  const yOut = mode === "to-second" ? 96 : 64;
  const baseStroke = "var(--c-line-strong)";

  return (
    <div
      aria-hidden="true"
      className="mt-[36px] hidden h-[128px] w-[48px] items-start lg:flex"
    >
      <svg
        width="48"
        height="128"
        viewBox="0 0 48 128"
        fill="none"
        aria-hidden="true"
        className="overflow-visible"
      >
        <path
          d={`M 0 32 H 22 V ${yOut} H 46`}
          stroke={baseStroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={`M 0 96 H 22 V ${yOut} H 46`}
          stroke={baseStroke}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        {activeBranch === "top" && activeColor && (
          <path
            d={`M 0 32 H 22 V ${yOut} H 46`}
            stroke={activeColor}
            strokeWidth="1.5"
          />
        )}
        {activeBranch === "bottom" && activeColor && (
          <path
            d={`M 0 96 H 22 V ${yOut} H 46`}
            stroke={activeColor}
            strokeWidth="1.5"
          />
        )}
        <circle
          cx="46"
          cy={yOut}
          r="2"
          fill={
            activeBranch && activeColor ? activeColor : "rgba(255,255,255,0.28)"
          }
        />
      </svg>
    </div>
  );
}

export function BracketSimulator({
  scenarioKey,
}: {
  scenarioKey: ScenarioKey;
}) {
  const { scenario, semi, champ, finalFor } = model(scenarioKey);

  return (
    <BracketRoot
      key={scenarioKey}
      aria-label="Simulador de llave de playoffs"
      className="group/bracket"
    >
      {({ winner }) => {
        const pick = winner as TeamId | null;
        const loser = pick ? semi.find((s) => s.id !== pick)?.id : null;
        const final = pick ? finalFor(pick) : null;
        const candidates: TeamId[] = ["alianza", semi[0].id, semi[1].id];
        const now = (id: TeamId) => {
          if (!pick || !final) return champ[id] ?? 0;
          if (id === "alianza") return final.alianza;
          if (id === pick) return final.rival;
          return 0;
        };

        return (
          <>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)_48px_minmax(0,1fr)] lg:gap-0">
              <Column label="Semifinal · elige quién pasa">
                <BracketEntrants
                  aria-label="Ganador de la semifinal"
                  className="divide-y divide-line border-b border-line"
                >
                  {semi.map((s) => {
                    const t = team(s.id);
                    return (
                      <BracketEntrant
                        key={s.id}
                        value={s.id}
                        className="group grid h-[64px] w-full cursor-pointer grid-cols-[2px_1fr_auto] items-center gap-3 text-left outline-none transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.04] data-eliminated:opacity-40"
                      >
                        <span
                          className="h-8 w-0.5"
                          style={{ backgroundColor: t.color }}
                        />
                        <span className="min-w-0">
                          <span className="flex items-center gap-2">
                            <ClubCrest id={s.id} name={t.name} size={20} />
                            <span className="truncate text-[15px] font-medium tracking-tight group-data-eliminated:line-through">
                              {t.name}
                            </span>
                            <span className="kicker hidden rounded-sm bg-gol px-1 py-px text-[9px] text-ink group-data-selected:inline">
                              Pasa
                            </span>
                          </span>
                          <span className="mt-0.5 block font-mono text-[11px] text-dim">
                            {TEAM_CODE[s.id]} · {t.clausuraPos}.° Clausura
                          </span>
                        </span>
                        <span className="tnum font-mono text-[20px] font-medium">
                          {s.pass}
                          <span className="text-[11px] text-dim">%</span>
                        </span>
                      </BracketEntrant>
                    );
                  })}
                </BracketEntrants>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-dim">
                  {scenario.semi.dates}
                </p>
              </Column>

              <Connector
                mode="to-second"
                activeBranch={
                  pick === semi[0].id
                    ? "top"
                    : pick === semi[1].id
                      ? "bottom"
                      : null
                }
                activeColor={pick ? team(pick).color : undefined}
              />

              <Column label="Final · Alianza espera">
                <div className="divide-y divide-line border-b border-line">
                  <div className="grid h-[64px] grid-cols-[2px_1fr_auto] items-center gap-3">
                    <span
                      className="h-8 w-0.5"
                      style={{ backgroundColor: team("alianza").color }}
                    />
                    <span>
                      <span className="flex items-center gap-2 text-[15px] font-medium tracking-tight">
                        <ClubCrest id="alianza" name="Alianza Lima" size={20} />
                        Alianza Lima
                      </span>
                      <span className="mt-0.5 block font-mono text-[11px] text-dim">
                        ALI · 1.° Acumulado
                      </span>
                    </span>
                    <span className="tnum font-mono text-[20px] font-medium">
                      {final ? final.alianza : "—"}
                      {final && <span className="text-[11px] text-dim">%</span>}
                    </span>
                  </div>
                  <div className="grid h-[64px] grid-cols-[2px_1fr_auto] items-center gap-3">
                    <span
                      className="h-8 w-0.5"
                      style={{
                        backgroundColor: pick ? team(pick).color : "#3f3f46",
                      }}
                    />
                    <span>
                      <span
                        className={`flex items-center gap-2 text-[15px] font-medium tracking-tight ${pick ? "" : "text-dim"}`}
                      >
                        {pick ? (
                          <ClubCrest
                            id={pick}
                            name={team(pick).name}
                            size={20}
                          />
                        ) : (
                          <ClubJersey id={null} size={18} />
                        )}
                        {pick ? team(pick).name : "Ganador semifinal"}
                      </span>
                      <span className="mt-0.5 block font-mono text-[11px] text-dim">
                        {pick ? `${TEAM_CODE[pick]} · rival` : "Por definir"}
                      </span>
                    </span>
                    <span className="tnum font-mono text-[20px] font-medium">
                      {final ? final.rival : "—"}
                      {final && <span className="text-[11px] text-dim">%</span>}
                    </span>
                  </div>
                </div>
                <dl className="mt-3 space-y-1 font-mono text-[11px] text-dim">
                  {semi.map((s) => {
                    const odds = finalFor(s.id);
                    const on = pick === s.id;
                    return (
                      <div
                        key={s.id}
                        className={`flex justify-between gap-3 transition-colors ${on ? "text-chalk" : ""} ${pick && !on ? "opacity-40" : ""}`}
                      >
                        <dt>Si pasa {TEAM_CODE[s.id]}</dt>
                        <dd className="tnum">
                          ALI {odds.alianza} · {TEAM_CODE[s.id]} {odds.rival}
                        </dd>
                      </div>
                    );
                  })}
                  <div className="pt-1">{scenario.finalDates}</div>
                </dl>
              </Column>

              <Connector mode="to-mid" />

              <Column
                label={pick ? "Campeón · condicional" : "Campeón · modelo"}
              >
                <ul aria-live="polite" className="space-y-4 pt-1">
                  {candidates.map((id) => {
                    const t = team(id);
                    const value = now(id);
                    const base = champ[id] ?? 0;
                    const delta = value - base;
                    return (
                      <li
                        key={id}
                        className={`transition-opacity ${id === loser ? "opacity-35" : ""}`}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="truncate text-[14px] font-medium tracking-tight">
                            {t.name}
                          </span>
                          <span className="flex items-baseline gap-2">
                            {pick && delta !== 0 && (
                              <span
                                className={`tnum font-mono text-[11px] ${delta > 0 ? "text-gol" : "text-pulse"}`}
                              >
                                {delta > 0 ? "+" : "−"}
                                {Math.abs(delta)}
                              </span>
                            )}
                            <span className="tnum font-mono text-[22px] leading-none font-medium">
                              {value}
                              <span className="text-[11px] text-dim">%</span>
                            </span>
                          </span>
                        </div>
                        <Bar
                          value={value}
                          ghost={pick ? base : undefined}
                          color={t.color}
                        />
                      </li>
                    );
                  })}
                </ul>
              </Column>
            </div>

            <div className="mt-6 flex min-h-8 flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <span className="font-mono text-[11px] text-dim">
                {pick
                  ? "Probabilidad condicional = P(campeón) ÷ P(pasa semifinal). Línea blanca: modelo."
                  : "Haz clic o usa ← → para decidir la semifinal."}
              </span>
              <BracketReset className="kicker inline-flex h-7 cursor-pointer items-center gap-2 rounded-md border border-line-strong px-2.5 text-[10px] text-fog transition-colors hover:text-chalk">
                Restablecer modelo
                <span className="text-dim">Esc</span>
              </BracketReset>
            </div>
          </>
        );
      }}
    </BracketRoot>
  );
}
