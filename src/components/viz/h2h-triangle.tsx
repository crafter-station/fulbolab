"use client";

import { createParts } from "@ui-sdk/react/primitive";
import { ClubCrest } from "@/components/brand/club-crest";
import { ClubJersey } from "@/components/brand/club-jersey";
import { h2hPrimitive } from "@/components/viz/h2h-primitive";
import {
  type H2HMatch,
  LIGA1_2026_H2H,
  LIGA1_2026_SCENARIOS,
  LIGA1_2026_TEAMS,
  TEAM_CODE,
  type TeamId,
} from "@/data/pe/liga1-2026";

const {
  Root: TriangleRoot,
  Nodes: TriangleNodes,
  Node: TriangleNode,
} = createParts(h2hPrimitive, {
  root: "div",
  nodes: "div",
  node: "button",
});

type ScenarioKey = keyof typeof LIGA1_2026_SCENARIOS;

const W = 1000;
const H = 900;
const VERTICES = [
  { x: 500, y: 130 },
  { x: 850, y: 740 },
  { x: 150, y: 740 },
];
const RADIUS = 70;

interface Duel {
  key: string;
  a: TeamId;
  b: TeamId;
  matches: H2HMatch[];
  pts: Record<string, number>;
  goals: Record<string, number>;
  wins: Record<string, number>;
  dominant: TeamId | null;
}

function team(id: TeamId) {
  const found = LIGA1_2026_TEAMS.find((t) => t.id === id);
  if (!found) throw new Error(`Equipo desconocido: ${id}`);
  return found;
}

function duel(a: TeamId, b: TeamId): Duel {
  const matches = LIGA1_2026_H2H.filter(
    (m) => (m.home === a && m.away === b) || (m.home === b && m.away === a),
  ).sort((x, y) =>
    x.phase === "Apertura" ? -1 : y.phase === "Apertura" ? 1 : 0,
  );
  const pts: Record<string, number> = { [a]: 0, [b]: 0 };
  const goals: Record<string, number> = { [a]: 0, [b]: 0 };
  const wins: Record<string, number> = { [a]: 0, [b]: 0 };
  for (const m of matches) {
    goals[m.home] += m.homeGoals;
    goals[m.away] += m.awayGoals;
    if (m.homeGoals > m.awayGoals) {
      pts[m.home] += 3;
      wins[m.home] += 1;
    } else if (m.homeGoals < m.awayGoals) {
      pts[m.away] += 3;
      wins[m.away] += 1;
    } else {
      pts[m.home] += 1;
      pts[m.away] += 1;
    }
  }
  const gd = goals[a] - goals[b];
  const dominant =
    pts[a] !== pts[b]
      ? pts[a] > pts[b]
        ? a
        : b
      : gd !== 0
        ? gd > 0
          ? a
          : b
        : null;
  return { key: `edge:${a}-${b}`, a, b, matches, pts, goals, wins, dominant };
}

function build(scenarioKey: ScenarioKey) {
  const ids = LIGA1_2026_SCENARIOS[scenarioKey].highlight;
  const order: TeamId[] = [ids[0], ids[2], ids[1]];
  const duels = order.map((id, i) => duel(id, order[(i + 1) % 3]));
  const ring: { key: string; kind: "team" | "edge"; index: number }[] = [];
  order.forEach((id, i) => {
    ring.push({ key: `team:${id}`, kind: "team", index: i });
    ring.push({ key: duels[i].key, kind: "edge", index: i });
  });
  return { order, duels, ring };
}

function trim(
  from: { x: number; y: number },
  to: { x: number; y: number },
  by: number,
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: from.x + ux * by,
    y1: from.y + uy * by,
    x2: to.x - ux * by,
    y2: to.y - uy * by,
    ux,
    uy,
  };
}

function arrowHead(
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  const { ux, uy } = trim(from, to, 0);
  const t = 0.62;
  const cx = from.x + (to.x - from.x) * t;
  const cy = from.y + (to.y - from.y) * t;
  const size = 26;
  const px = -uy;
  const py = ux;
  return [
    `${cx + ux * size},${cy + uy * size}`,
    `${cx - ux * size * 0.4 + px * size * 0.7},${cy - uy * size * 0.4 + py * size * 0.7}`,
    `${cx - ux * size * 0.4 - px * size * 0.7},${cy - uy * size * 0.4 - py * size * 0.7}`,
  ].join(" ");
}

function verdict(d: Duel) {
  if (!d.dominant) {
    return `Empate total · ${d.goals[d.a]}–${d.goals[d.b]} global`;
  }
  const other = d.dominant === d.a ? d.b : d.a;
  return `Domina ${team(d.dominant).name} · ${d.pts[d.dominant]}–${d.pts[other]} pts`;
}

function MatchRows({ d }: { d: Duel }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {d.matches.map((m) => {
        const homeWin = m.homeGoals > m.awayGoals;
        const awayWin = m.awayGoals > m.homeGoals;
        return (
          <li
            key={m.phase}
            className="grid grid-cols-[64px_1fr_auto_1fr] items-center gap-3 py-3 font-mono text-[13px]"
          >
            <span className="kicker text-[10px] text-dim">{m.phase}</span>
            <span
              className={`inline-flex items-center justify-end gap-1.5 ${homeWin ? "text-chalk" : "text-fog"}`}
            >
              <span>{TEAM_CODE[m.home]}</span>
              <ClubJersey id={m.home} size={15} />
            </span>
            <span className="tnum text-[18px] font-medium text-chalk">
              {m.homeGoals}–{m.awayGoals}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 ${awayWin ? "text-chalk" : "text-fog"}`}
            >
              <ClubJersey id={m.away} size={15} />
              <span>{TEAM_CODE[m.away]}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function EdgeDetail({ d }: { d: Duel }) {
  const ta = team(d.a);
  const tb = team(d.b);
  return (
    <div>
      <div className="kicker text-[10px] text-dim">Duelo directo</div>
      <h3 className="mt-2 flex items-center gap-2 text-[20px] font-medium tracking-tight">
        <ClubCrest id={ta.id} name={ta.name} size={22} />
        {ta.name} <span className="text-dim">vs</span>{" "}
        <ClubCrest id={tb.id} name={tb.name} size={22} />
        {tb.name}
      </h3>
      <p
        className={`mt-1 font-mono text-[12px] ${d.dominant ? "text-gol" : "text-fog"}`}
      >
        {verdict(d)}
      </p>
      <div className="mt-5">
        <MatchRows d={d} />
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-3 font-mono text-[11px]">
        {[
          { k: "Global", v: `${d.goals[d.a]}–${d.goals[d.b]}` },
          { k: "Puntos", v: `${d.pts[d.a]}–${d.pts[d.b]}` },
          { k: "Victorias", v: `${d.wins[d.a]}–${d.wins[d.b]}` },
        ].map((item) => (
          <div key={item.k}>
            <dt className="kicker text-[10px] text-dim">{item.k}</dt>
            <dd className="tnum mt-1 text-[15px] text-chalk">{item.v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 font-mono text-[10px] text-dim">
        Orden: {TEAM_CODE[d.a]}–{TEAM_CODE[d.b]}
      </p>
    </div>
  );
}

function TeamDetail({ id, duels }: { id: TeamId; duels: Duel[] }) {
  const t = team(id);
  const mine = duels.filter((d) => d.a === id || d.b === id);
  const total = mine.reduce(
    (acc, d) => {
      const other = d.a === id ? d.b : d.a;
      acc.pts += d.pts[id];
      acc.gf += d.goals[id];
      acc.gc += d.goals[other];
      return acc;
    },
    { pts: 0, gf: 0, gc: 0 },
  );
  return (
    <div>
      <div className="kicker text-[10px] text-dim">Vértice</div>
      <h3 className="mt-2 flex items-center gap-2.5 text-[20px] font-medium tracking-tight">
        <ClubCrest id={t.id} name={t.name} size={22} />
        {t.name}
      </h3>
      <p className="tnum mt-1 font-mono text-[12px] text-fog">
        {total.pts} pts en el triángulo · {total.gf}–{total.gc} goles
      </p>
      <ul className="mt-5 space-y-5">
        {mine.map((d) => {
          const other = d.a === id ? d.b : d.a;
          const tone =
            d.dominant === id
              ? "text-gol"
              : d.dominant === null
                ? "text-fog"
                : "text-pulse";
          const label =
            d.dominant === id
              ? "Domina"
              : d.dominant === null
                ? "Empate"
                : "Dominado";
          return (
            <li key={d.key}>
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-[13px]">vs {team(other).name}</span>
                <span className={`kicker text-[10px] ${tone}`}>{label}</span>
              </div>
              <MatchRows d={d} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function H2HTriangle({ scenarioKey }: { scenarioKey: ScenarioKey }) {
  const { order, duels, ring } = build(scenarioKey);
  const cycle = duels.every(
    (d, i) => d.dominant !== null && d.dominant === order[i],
  )
    ? "clockwise"
    : duels.every(
          (d, i) => d.dominant !== null && d.dominant === order[(i + 1) % 3],
        )
      ? "counter"
      : null;
  const cycleLabel =
    cycle === "clockwise"
      ? [...order, order[0]].map((id) => TEAM_CODE[id]).join(" → ")
      : cycle === "counter"
        ? [order[0], order[2], order[1], order[0]]
            .map((id) => TEAM_CODE[id])
            .join(" → ")
        : null;

  return (
    <TriangleRoot
      key={scenarioKey}
      aria-label="Triángulo de duelos directos 2026"
      defaultSelected={[duels[2].key]}
      className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]"
    >
      {({ selected }) => {
        const selectedTeam = selected?.startsWith("team:")
          ? (selected.slice(5) as TeamId)
          : null;
        const selectedDuel = duels.find((d) => d.key === selected) ?? null;
        const lit = (d: Duel) =>
          selectedDuel
            ? d.key === selectedDuel.key
            : selectedTeam
              ? d.a === selectedTeam || d.b === selectedTeam
              : false;

        return (
          <>
            <div className="min-w-0">
              <div className="relative mx-auto aspect-[10/9] w-full max-w-[560px]">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox={`0 0 ${W} ${H}`}
                  aria-hidden="true"
                >
                  {duels.map((d, i) => {
                    const from = VERTICES[i];
                    const to = VERTICES[(i + 1) % 3];
                    const seg = trim(from, to, RADIUS);
                    const on = lit(d);
                    const winFrom = d.dominant === order[i] ? from : to;
                    const winTo = d.dominant === order[i] ? to : from;
                    return (
                      <g key={d.key} style={{ transition: "opacity 200ms" }}>
                        <line
                          x1={seg.x1}
                          y1={seg.y1}
                          x2={seg.x2}
                          y2={seg.y2}
                          stroke={on ? "var(--c-chalk)" : "var(--c-mute)"}
                          strokeWidth={on ? 2 : 1}
                          strokeDasharray={d.dominant ? undefined : "6 8"}
                          vectorEffect="non-scaling-stroke"
                        />
                        {d.dominant && (
                          <polygon
                            points={arrowHead(winFrom, winTo)}
                            fill={on ? "var(--c-gol)" : "var(--c-dim)"}
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                <TriangleNodes
                  aria-label="Equipos y duelos del triángulo"
                  className="absolute inset-0"
                >
                  {ring.map((node) => {
                    if (node.kind === "team") {
                      const id = order[node.index];
                      const t = team(id);
                      const v = VERTICES[node.index];
                      const dim =
                        (selectedTeam && selectedTeam !== id) ||
                        (selectedDuel &&
                          selectedDuel.a !== id &&
                          selectedDuel.b !== id);
                      return (
                        <TriangleNode
                          key={node.key}
                          value={node.key}
                          aria-label={t.name}
                          className={`group absolute flex h-13 w-13 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-surface outline-none transition-[border-color,box-shadow,opacity,transform] hover:scale-105 hover:border-fog data-selected:scale-105 data-selected:border-chalk data-selected:ring-2 data-selected:ring-chalk/25 sm:h-15 sm:w-15 ${dim ? "opacity-45" : ""}`}
                          style={{
                            left: `${(v.x / W) * 100}%`,
                            top: `${(v.y / H) * 100}%`,
                          }}
                        >
                          <ClubCrest
                            id={id}
                            name={t.name}
                            size={30}
                            className="h-7 w-7 sm:h-8 sm:w-8"
                          />
                          <span
                            className="absolute -top-0.5 right-0.5 h-2 w-2 rounded-full ring-2 ring-ink"
                            style={{ backgroundColor: t.color }}
                          />
                          <span
                            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 font-sans text-[12px] font-medium whitespace-nowrap text-fog group-data-selected:text-chalk ${node.index === 0 ? "-top-6" : "-bottom-6"}`}
                          >
                            {t.shortName}
                          </span>
                        </TriangleNode>
                      );
                    }
                    const d = duels[node.index];
                    const from = VERTICES[node.index];
                    const to = VERTICES[(node.index + 1) % 3];
                    const mx = (from.x + to.x) / 2;
                    const my = (from.y + to.y) / 2;
                    const lead = d.dominant ?? d.a;
                    const other = lead === d.a ? d.b : d.a;
                    return (
                      <TriangleNode
                        key={node.key}
                        value={node.key}
                        aria-label={`${team(d.a).name} contra ${team(d.b).name}`}
                        className={`tnum absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-sm border border-line-strong bg-ink px-1.5 py-0.5 font-mono text-[11px] whitespace-nowrap text-fog outline-none transition-colors hover:text-chalk data-selected:border-chalk data-selected:bg-chalk data-selected:text-ink ${lit(d) || !selected ? "" : "opacity-60"}`}
                        style={{
                          left: `${(mx / W) * 100}%`,
                          top: `${(my / H) * 100}%`,
                        }}
                      >
                        {d.dominant ? `${TEAM_CODE[lead]} ` : "= "}
                        {d.goals[lead]}–{d.goals[other]}
                      </TriangleNode>
                    );
                  })}
                </TriangleNodes>
              </div>
              <p className="mt-6 text-center font-mono text-[11px] text-dim">
                {cycleLabel ? (
                  <>
                    Ciclo cerrado:{" "}
                    <span className="text-chalk">{cycleLabel}</span>
                  </>
                ) : (
                  "Sin ciclo: hay un duelo empatado o un dominante doble."
                )}
              </p>
            </div>

            <div
              aria-live="polite"
              className="min-w-0 lg:border-l lg:border-line lg:pl-8"
            >
              {selectedDuel ? (
                <EdgeDetail d={selectedDuel} />
              ) : selectedTeam ? (
                <TeamDetail id={selectedTeam} duels={duels} />
              ) : null}
            </div>
          </>
        );
      }}
    </TriangleRoot>
  );
}
