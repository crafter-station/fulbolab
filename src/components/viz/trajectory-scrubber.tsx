"use client";

import { createParts } from "@ui-sdk/react/primitive";
import { useState } from "react";
import { ClubCrest } from "@/components/brand/club-crest";
import { Segmented } from "@/components/ui/segmented";
import { trajectoryPrimitive } from "@/components/viz/trajectory-primitive";
import {
  LIGA1_2026_TEAMS,
  TEAM_CODE,
  type TeamId,
  type TeamSeasonStats,
} from "@/data/pe/liga1-2026";

const {
  Root: TrajectoryRoot,
  Teams: TrajectoryTeams,
  Team: TrajectoryTeam,
  Checkpoints: TrajectoryCheckpoints,
  Checkpoint: TrajectoryCheckpoint,
} = createParts(trajectoryPrimitive, {
  root: "div",
  teams: "div",
  team: "button",
  checkpoints: "div",
  checkpoint: "button",
});

type Mode = "acum" | "split";

interface Checkpoint {
  key: string;
  short: string;
  label: string;
  x: number;
}

interface Reading {
  pts: number;
  dg: number;
  pos: number | null;
  delta: number | null;
}

const CHECKPOINTS: Record<Mode, Checkpoint[]> = {
  acum: [
    { key: "f0", short: "F0", label: "Inicio", x: 80 },
    { key: "f17", short: "F17", label: "Fin Apertura", x: 460 },
    { key: "f34", short: "F34", label: "Fin Clausura", x: 840 },
  ],
  split: [
    { key: "ap", short: "AP", label: "Apertura", x: 220 },
    { key: "cl", short: "CL", label: "Clausura", x: 760 },
  ],
};

const SCALE: Record<Mode, { min: number; max: number; ticks: number[] }> = {
  acum: { min: 0, max: 80, ticks: [0, 20, 40, 60, 80] },
  split: { min: 10, max: 45, ticks: [15, 25, 35, 45] },
};

const PLOT_TOP = 50;
const PLOT_BOTTOM = 820;

function read(team: TeamSeasonStats, key: string): Reading {
  switch (key) {
    case "f0":
      return { pts: 0, dg: 0, pos: null, delta: null };
    case "f17":
      return {
        pts: team.aperturaPts,
        dg: team.aperturaDg,
        pos: team.aperturaPos,
        delta: team.aperturaPts,
      };
    case "f34":
      return {
        pts: team.acumuladoPts,
        dg: team.acumuladoDg,
        pos: team.acumuladoPos,
        delta: team.clausuraPts,
      };
    case "ap":
      return {
        pts: team.aperturaPts,
        dg: team.aperturaDg,
        pos: team.aperturaPos,
        delta: null,
      };
    default:
      return {
        pts: team.clausuraPts,
        dg: team.clausuraDg,
        pos: team.clausuraPos,
        delta: team.clausuraPts - team.aperturaPts,
      };
  }
}

function signed(n: number) {
  return n > 0 ? `+${n}` : n === 0 ? "0" : `−${Math.abs(n)}`;
}

function yOf(mode: Mode, value: number) {
  const { min, max } = SCALE[mode];
  return PLOT_BOTTOM - ((value - min) / (max - min)) * (PLOT_BOTTOM - PLOT_TOP);
}

function spread(items: { id: TeamId; y: number }[], gap: number) {
  const sorted = [...items].sort((a, b) => a.y - b.y);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].y - sorted[i - 1].y < gap) {
      sorted[i] = { ...sorted[i], y: sorted[i - 1].y + gap };
    }
  }
  return Object.fromEntries(sorted.map((item) => [item.id, item.y])) as Record<
    TeamId,
    number
  >;
}

function regions(points: Checkpoint[]) {
  return points.map((point, i) => {
    const start = i === 0 ? 0 : (points[i - 1].x + point.x) / 2;
    const end =
      i === points.length - 1 ? 1000 : (point.x + points[i + 1].x) / 2;
    return { ...point, start, end };
  });
}

function Chart({
  mode,
  team,
  checkpoint,
}: {
  mode: Mode;
  team: TeamId;
  checkpoint: string;
}) {
  const points = CHECKPOINTS[mode];
  const last = points[points.length - 1];
  const active = points.find((p) => p.key === checkpoint) ?? last;
  const ordered = [
    ...LIGA1_2026_TEAMS.filter((t) => t.id !== team),
    ...LIGA1_2026_TEAMS.filter((t) => t.id === team),
  ];
  const endLabels = spread(
    LIGA1_2026_TEAMS.map((t) => ({
      id: t.id,
      y: yOf(mode, read(t, last.key).pts),
    })),
    48,
  );
  const selected = LIGA1_2026_TEAMS.find((t) => t.id === team);
  const selectedReading = selected ? read(selected, active.key) : null;

  return (
    <>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {SCALE[mode].ticks.map((tick) => (
          <line
            key={tick}
            x1="40"
            x2="1000"
            y1={yOf(mode, tick)}
            y2={yOf(mode, tick)}
            stroke="rgba(255,255,255,0.06)"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {points.map((p) => (
          <line
            key={p.key}
            x1={p.x}
            x2={p.x}
            y1={PLOT_TOP - 20}
            y2={PLOT_BOTTOM}
            stroke={
              p.key === active.key
                ? "rgba(250,250,250,0.55)"
                : "rgba(255,255,255,0.08)"
            }
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {ordered.map((t) => {
          const on = t.id === team;
          const d = points
            .map(
              (p, i) =>
                `${i === 0 ? "M" : "L"} ${p.x} ${yOf(mode, read(t, p.key).pts)}`,
            )
            .join(" ");
          return (
            <path
              key={t.id}
              d={d}
              fill="none"
              stroke={on ? t.color : "#3f3f46"}
              strokeWidth={on ? 2 : 1.25}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke 200ms ease" }}
            />
          );
        })}
      </svg>

      {SCALE[mode].ticks.map((tick) => (
        <span
          key={tick}
          className="tnum pointer-events-none absolute left-0 -translate-y-1/2 font-mono text-[10px] text-dim"
          style={{ top: `${yOf(mode, tick) / 10}%` }}
        >
          {tick}
        </span>
      ))}

      {ordered.map((t) =>
        points.map((p) => {
          const on = t.id === team;
          const isActive = p.key === active.key;
          return (
            <span
              key={`${t.id}-${p.key}`}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${p.x / 10}%`,
                top: `${yOf(mode, read(t, p.key).pts) / 10}%`,
                width: on ? (isActive ? 11 : 7) : 5,
                height: on ? (isActive ? 11 : 7) : 5,
                backgroundColor: on ? t.color : "#52525b",
                boxShadow: on ? "0 0 0 2px #09090b" : undefined,
                transition: "width 150ms ease, height 150ms ease",
              }}
            />
          );
        }),
      )}

      {selected && selectedReading && active.key !== last.key && (
        <span
          className="tnum pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-sm bg-chalk px-1.5 py-px font-mono text-[11px] font-semibold text-ink"
          style={{
            left: `${active.x / 10}%`,
            top: `calc(${yOf(mode, selectedReading.pts) / 10}% - 10px)`,
          }}
        >
          {selectedReading.pts}
        </span>
      )}

      {LIGA1_2026_TEAMS.map((t) => (
        <span
          key={t.id}
          className="tnum pointer-events-none absolute -translate-y-1/2 font-mono text-[10px] whitespace-nowrap sm:text-[11px]"
          style={{
            left: `calc(${last.x / 10}% + 12px)`,
            top: `${endLabels[t.id] / 10}%`,
            color: t.id === team ? t.color : "#71717a",
          }}
        >
          {TEAM_CODE[t.id]} {read(t, last.key).pts}
        </span>
      ))}
    </>
  );
}

function Readout({
  mode,
  team,
  checkpoint,
}: {
  mode: Mode;
  team: TeamId;
  checkpoint: string;
}) {
  const t = LIGA1_2026_TEAMS.find((x) => x.id === team) ?? LIGA1_2026_TEAMS[0];
  const point =
    CHECKPOINTS[mode].find((p) => p.key === checkpoint) ??
    CHECKPOINTS[mode][CHECKPOINTS[mode].length - 1];
  const r = read(t, point.key);
  const deltaLabel = mode === "acum" ? "Δ tramo" : "Δ vs Ap.";

  return (
    <div aria-live="polite" className="border-b border-line pb-5">
      <div className="kicker flex items-center gap-2 text-fog">
        <ClubCrest id={t.id} name={t.name} size={18} />
        <span className="text-chalk">{t.name}</span>
        <span className="text-dim">·</span>
        <span>
          {point.short} {point.label}
        </span>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="tnum font-mono text-[52px] leading-none font-medium tracking-[-0.04em]">
          {r.pts}
        </span>
        <span className="font-mono text-[12px] text-dim">pts</span>
      </div>
      <dl className="mt-5 grid grid-cols-3 border-t border-line">
        {[
          {
            k: deltaLabel,
            v: r.delta === null ? "—" : signed(r.delta),
            tone: r.delta !== null && r.delta < 0 ? "text-pulse" : "text-chalk",
          },
          {
            k: "DG",
            v: signed(r.dg),
            tone: r.dg < 0 ? "text-pulse" : "text-chalk",
          },
          {
            k: "Pos.",
            v: r.pos === null ? "—" : `${r.pos}.°`,
            tone: "text-chalk",
          },
        ].map((item, i) => (
          <div
            key={item.k}
            className={`pt-3 ${i > 0 ? "border-l border-line pl-3" : ""}`}
          >
            <dt className="kicker text-[10px] text-dim">{item.k}</dt>
            <dd
              className={`tnum mt-1 font-mono text-[18px] font-medium ${item.tone}`}
            >
              {item.v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function TrajectoryScrubber() {
  const [mode, setMode] = useState<Mode>("acum");
  const [team, setTeam] = useState<TeamId>("u");
  const points = CHECKPOINTS[mode];
  const zones = regions(points);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-md text-[13px] leading-relaxed text-fog">
          Recorre la temporada con el mouse o con{" "}
          <kbd className="font-mono text-chalk">←</kbd>{" "}
          <kbd className="font-mono text-chalk">→</kbd> sobre el eje; cambia de
          equipo con las flechas en la lista.
        </p>
        <Segmented
          label="Vista de la trayectoria"
          value={mode}
          onChange={setMode}
          options={[
            { value: "acum", label: "Acumulado" },
            { value: "split", label: "Ap. vs Cl." },
          ]}
        />
      </div>

      <TrajectoryRoot
        key={mode}
        aria-label="Trayectoria 2026"
        team={[team]}
        onTeamChange={(value) => {
          if (value[0]) setTeam(value[0] as TeamId);
        }}
        defaultCheckpoint={[points[points.length - 1].key]}
        className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]"
      >
        {(state) => (
          <>
            <div className="relative h-[280px] min-w-0 sm:h-[360px]">
              <Chart
                mode={mode}
                team={(state.team ?? team) as TeamId}
                checkpoint={state.checkpoint ?? points[points.length - 1].key}
              />
              <TrajectoryCheckpoints
                aria-label="Punto de la temporada"
                className="absolute inset-0"
              >
                {zones.map((zone) => (
                  <TrajectoryCheckpoint
                    key={zone.key}
                    value={zone.key}
                    aria-label={`${zone.short} ${zone.label}`}
                    className="group absolute top-0 bottom-0 cursor-crosshair outline-none focus-visible:bg-white/[0.03]"
                    style={{
                      left: `${zone.start / 10}%`,
                      width: `${(zone.end - zone.start) / 10}%`,
                    }}
                  >
                    <span
                      className="kicker absolute bottom-1 -translate-x-1/2 text-[10px] whitespace-nowrap text-dim transition-colors group-hover:text-fog group-focus-visible:text-chalk group-data-selected:text-chalk"
                      style={{
                        left: `${((zone.x - zone.start) / (zone.end - zone.start)) * 100}%`,
                      }}
                    >
                      {zone.short}
                      <span className="hidden sm:inline"> · {zone.label}</span>
                    </span>
                  </TrajectoryCheckpoint>
                ))}
              </TrajectoryCheckpoints>
            </div>

            <div className="min-w-0">
              <Readout
                mode={mode}
                team={(state.team ?? team) as TeamId}
                checkpoint={state.checkpoint ?? points[points.length - 1].key}
              />
              <TrajectoryTeams
                aria-label="Equipo"
                className="divide-y divide-line"
              >
                {LIGA1_2026_TEAMS.map((t) => {
                  const r = read(
                    t,
                    state.checkpoint ?? points[points.length - 1].key,
                  );
                  return (
                    <TrajectoryTeam
                      key={t.id}
                      value={t.id}
                      className="group grid w-full cursor-pointer grid-cols-[2px_1fr_auto_44px] items-center gap-3 py-2.5 text-left text-fog transition-colors outline-none hover:text-chalk focus-visible:bg-white/[0.03] data-selected:text-chalk"
                    >
                      <span
                        className="h-4 w-0.5 opacity-40 transition-opacity group-data-selected:opacity-100"
                        style={{ backgroundColor: t.color }}
                      />
                      <span className="truncate text-[13px]">{t.name}</span>
                      <span className="tnum font-mono text-[13px]">
                        {r.pts}
                      </span>
                      <span className="tnum text-right font-mono text-[11px] text-dim">
                        {r.delta === null ? "—" : signed(r.delta)}
                      </span>
                    </TrajectoryTeam>
                  );
                })}
              </TrajectoryTeams>
            </div>
          </>
        )}
      </TrajectoryRoot>
    </div>
  );
}
