"use client";

import { useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome";
import {
  LIGA1_2026_CUTOFF,
  LIGA1_2026_SCENARIOS,
  LIGA1_2026_TEAMS,
  type TeamId,
} from "@/data/pe/liga1-2026";

type ChartView = "acum" | "split";
type ScenarioKey = "real" | "cristal";

function EvolutionSvg({
  view,
  activeIds,
}: {
  view: ChartView;
  activeIds: TeamId[];
}) {
  if (view === "acum") {
    const x0 = 76;
    const x17 = 290;
    const x34 = 485;
    const yTop = 28;
    const yBot = 266;
    const yScale = (v: number) => yBot - (v / 78) * (yBot - yTop);
    const apOffsets: Record<TeamId, number> = {
      alianza: -10,
      u: -10,
      cristal: -10,
      huancayo: 15,
    };
    const acOffsets: Record<TeamId, number> = {
      alianza: 4,
      u: 4,
      cristal: -7,
      huancayo: 12,
    };

    return (
      <svg
        className="w-full h-auto block"
        viewBox="0 0 640 310"
        role="img"
        aria-label="Evolución acumulada Liga 1 2026"
      >
        {[0, 15, 30, 45, 60, 75].map((val) => {
          const y = yScale(val);
          return (
            <g key={val}>
              <line
                x1={x0}
                y1={y}
                x2={x34 + 12}
                y2={y}
                stroke="#1E293B"
                strokeDasharray="4 4"
              />
              <text
                x={x0 - 12}
                y={y + 4}
                fill="#64748B"
                fontSize="11"
                textAnchor="end"
              >
                {val}
              </text>
            </g>
          );
        })}

        {[
          { x: x0, label: "INICIO (F0)" },
          { x: x17, label: "FIN APERTURA (F17)" },
          { x: x34, label: "FIN CLAUSURA (F34)" },
        ].map((axis) => (
          <g key={axis.label}>
            <line
              x1={axis.x}
              y1={yTop - 6}
              x2={axis.x}
              y2={yBot + 6}
              stroke="#334155"
              strokeWidth="1.5"
            />
            <text
              x={axis.x}
              y="292"
              fill="#CBD5E1"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
            >
              {axis.label}
            </text>
          </g>
        ))}

        {LIGA1_2026_TEAMS.map((team) => {
          const isActive = activeIds.includes(team.id);
          const y0 = yScale(0);
          const y17 = yScale(team.aperturaPts);
          const y34 = yScale(team.acumuladoPts);
          return (
            <g key={team.id} opacity={isActive ? 1 : 0.22}>
              <path
                d={`M ${x0} ${y0} L ${x17} ${y17} L ${x34} ${y34}`}
                fill="none"
                stroke={team.color}
                strokeWidth={isActive ? 3.5 : 2}
                strokeDasharray={isActive ? undefined : "5 4"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={x0} cy={y0} r="3.5" fill={team.color} />
              <circle
                cx={x17}
                cy={y17}
                r={isActive ? 5.5 : 4}
                fill={team.color}
                stroke="#070B14"
                strokeWidth="2"
              />
              <circle
                cx={x34}
                cy={y34}
                r={isActive ? 6 : 4}
                fill={team.color}
                stroke="#070B14"
                strokeWidth="2"
              />
              <text
                x={x17}
                y={y17 + apOffsets[team.id]}
                fill={team.color}
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
              >
                {team.aperturaPts}
              </text>
              <text
                x={x34 + 12}
                y={y34 + acOffsets[team.id]}
                fill={team.color}
                fontSize="12"
                fontWeight="700"
                textAnchor="start"
              >
                {team.shortName}: {team.acumuladoPts} pts (+{team.clausuraPts}{" "}
                Cl.)
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  const xAp = 165;
  const xCl = 475;
  const yTop = 36;
  const yBot = 268;
  const yScale = (v: number) => yBot - ((v - 12) / (44 - 12)) * (yBot - yTop);
  const clOffsets: Record<TeamId, number> = {
    alianza: 16,
    u: -12,
    huancayo: -8,
    cristal: 4,
  };

  return (
    <svg
      className="w-full h-auto block"
      viewBox="0 0 640 310"
      role="img"
      aria-label="Puntos Apertura vs Clausura Liga 1 2026"
    >
      {[15, 20, 25, 30, 35, 40].map((val) => {
        const y = yScale(val);
        return (
          <g key={val}>
            <line
              x1="70"
              y1={y}
              x2="570"
              y2={y}
              stroke="#1E293B"
              strokeDasharray="4 4"
            />
            <text
              x="56"
              y={y + 4}
              fill="#64748B"
              fontSize="11"
              textAnchor="end"
            >
              {val}
            </text>
          </g>
        );
      })}

      <line
        x1={xAp}
        y1={yTop - 8}
        x2={xAp}
        y2={yBot + 8}
        stroke="#334155"
        strokeWidth="1.5"
      />
      <line
        x1={xCl}
        y1={yTop - 8}
        x2={xCl}
        y2={yBot + 8}
        stroke="#334155"
        strokeWidth="1.5"
      />
      <text
        x={xAp}
        y="294"
        fill="#CBD5E1"
        fontSize="12"
        fontWeight="700"
        textAnchor="middle"
      >
        TORNEO APERTURA
      </text>
      <text
        x={xCl}
        y="294"
        fill="#CBD5E1"
        fontSize="12"
        fontWeight="700"
        textAnchor="middle"
      >
        TORNEO CLAUSURA
      </text>

      {LIGA1_2026_TEAMS.map((team) => {
        const isActive = activeIds.includes(team.id);
        const y1 = yScale(team.aperturaPts);
        const y2 = yScale(team.clausuraPts);
        return (
          <g key={team.id} opacity={isActive ? 1 : 0.22}>
            <line
              x1={xAp}
              y1={y1}
              x2={xCl}
              y2={y2}
              stroke={team.color}
              strokeWidth={isActive ? 3.5 : 2}
              strokeDasharray={isActive ? undefined : "5 4"}
              strokeLinecap="round"
            />
            <circle
              cx={xAp}
              cy={y1}
              r={isActive ? 6 : 4}
              fill={team.color}
              stroke="#070B14"
              strokeWidth="2"
            />
            <circle
              cx={xCl}
              cy={y2}
              r={isActive ? 6 : 4}
              fill={team.color}
              stroke="#070B14"
              strokeWidth="2"
            />
            <text
              x={xAp - 12}
              y={y1 + 4}
              fill={team.color}
              fontSize="12"
              fontWeight="700"
              textAnchor="end"
            >
              {team.shortName} {team.aperturaPts}
            </text>
            <text
              x={xCl + 12}
              y={y2 + clOffsets[team.id]}
              fill={team.color}
              fontSize="12"
              fontWeight="700"
              textAnchor="start"
            >
              {team.clausuraPts} pts ({team.acumuladoPts} ac.)
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function PlayoffsDashboard() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>("real");
  const [chartView, setChartView] = useState<ChartView>("acum");
  const [obsMode, setObsMode] = useState(false);

  const scenario = LIGA1_2026_SCENARIOS[scenarioKey];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader obsMode={obsMode} onToggleObs={() => setObsMode((v) => !v)} />

      <main
        className={`flex-1 mx-auto w-full max-w-6xl px-5 ${
          obsMode ? "py-5" : "py-8"
        }`}
      >
        <div className="flex flex-wrap items-end justify-between gap-4 pb-6 mb-6 border-b border-[#1E293B]">
          <div>
            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-[#F59E0B] mb-1.5">
              PE · Liga 1 Perú 2026 · Corte oficial {LIGA1_2026_CUTOFF}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Evolución Anual, Playoffs y Probabilidades
            </h1>
            {!obsMode && (
              <p className="text-sm text-[#94A3B8] mt-1">
                Alianza Lima espera en la final; Universitario y Sport Huancayo
                definen la semifinal. Compara el escenario real con el
                hipotético de Sporting Cristal.
              </p>
            )}
          </div>

          <div
            role="tablist"
            aria-label="Escenario de playoffs"
            className="inline-flex p-1 rounded-xl bg-[#0E1525] border border-[#1E293B] gap-1"
          >
            {(["real", "cristal"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setScenarioKey(key)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  scenarioKey === key
                    ? "bg-[#F59E0B] text-[#070B14]"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                {LIGA1_2026_SCENARIOS[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-5 mb-5">
          <section className="rounded-2xl border border-[#1E293B] bg-[#0E1525]/95 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="text-sm font-bold tracking-tight">
                {chartView === "acum"
                  ? "Evolución Acumulada 2026 (F0 → F17 → F34)"
                  : "Puntos por Torneo: Apertura vs Clausura"}
              </h2>
              <div className="inline-flex p-1 rounded-lg bg-[#070B14] border border-[#1E293B] gap-1">
                <button
                  type="button"
                  onClick={() => setChartView("acum")}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold cursor-pointer ${
                    chartView === "acum"
                      ? "bg-[#E11D48] text-white"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  Acumulado
                </button>
                <button
                  type="button"
                  onClick={() => setChartView("split")}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold cursor-pointer ${
                    chartView === "split"
                      ? "bg-[#E11D48] text-white"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  Ap. vs Cl.
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3.5 mb-3 text-xs text-[#94A3B8]">
              {LIGA1_2026_TEAMS.map((t) => (
                <span key={t.id} className="inline-flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: t.color }}
                  />
                  {t.name} ({t.aperturaPts} → {t.acumuladoPts})
                </span>
              ))}
            </div>

            <EvolutionSvg view={chartView} activeIds={scenario.highlight} />
          </section>

          <section className="rounded-2xl border border-[#1E293B] bg-[#0E1525]/95 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <h2 className="text-sm font-bold tracking-tight">
                  Probabilidad de Campeón 2026
                </h2>
                <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/35 text-[#F59E0B]">
                  {scenario.badge}
                </span>
              </div>

              <div className="space-y-4">
                {scenario.probs.map((p) => (
                  <div key={p.id}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="inline-flex items-center gap-2 text-sm font-bold">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: p.color }}
                        />
                        {p.name}
                      </span>
                      <span
                        className="font-mono text-xl font-bold tabular-nums"
                        style={{ color: p.color }}
                      >
                        {p.pct}%
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-[#070B14] border border-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${p.pct}%`, backgroundColor: p.color }}
                      />
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-1">{p.meta}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1E293B]">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#F59E0B] font-semibold mb-2">
                Llave de Playoffs
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="rounded-xl bg-[#070B14] border border-[#1E293B] p-3 text-xs">
                  <div className="flex justify-between font-semibold py-1">
                    <span>{scenario.semi.teamA.name}</span>
                    <span className="font-mono text-[#F59E0B]">
                      {scenario.semi.teamA.pct}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold py-1 border-t border-white/5">
                    <span>{scenario.semi.teamB.name}</span>
                    <span className="font-mono text-[#94A3B8]">
                      {scenario.semi.teamB.pct}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#94A3B8] mt-1.5">
                    {scenario.semi.dates}
                  </div>
                </div>
                <div className="text-center font-mono font-bold text-[#F59E0B]">
                  →
                </div>
                <div className="rounded-xl bg-[#070B14] border border-[#1E293B] p-3 text-xs">
                  <div className="flex justify-between items-center font-semibold py-1">
                    <span>Alianza Lima</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B]">
                      Espera
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold py-1 border-t border-white/5 text-[#94A3B8]">
                    <span>Ganador Semi</span>
                  </div>
                  <div className="text-[11px] text-[#94A3B8] mt-1.5">
                    {scenario.finalDates}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {!obsMode && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-5">
            <section className="rounded-2xl border border-[#1E293B] bg-[#0E1525]/95 p-5 overflow-x-auto">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold">Tabla Comparativa 2026</h2>
                <span className="font-mono text-[11px] text-[#94A3B8]">
                  34 partidos jugados
                </span>
              </div>
              <table className="w-full text-left border-collapse text-xs sm:text-sm tabular-nums">
                <thead>
                  <tr className="border-b border-[#1E293B] text-[11px] font-mono uppercase text-[#94A3B8]">
                    <th className="py-2.5 pr-3">Club</th>
                    <th className="py-2.5 px-2">Apertura</th>
                    <th className="py-2.5 px-2">Clausura</th>
                    <th className="py-2.5 px-2">Delta</th>
                    <th className="py-2.5 px-2">Acumulado</th>
                    <th className="py-2.5 pl-2">Títulos</th>
                  </tr>
                </thead>
                <tbody>
                  {LIGA1_2026_TEAMS.map((t) => {
                    const delta = t.clausuraPts - t.aperturaPts;
                    return (
                      <tr
                        key={t.id}
                        className="border-b border-[#1E293B]/70 last:border-none"
                      >
                        <td className="py-2.5 pr-3 font-semibold whitespace-nowrap">
                          <span
                            className="inline-block w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: t.color }}
                          />
                          {t.name}
                        </td>
                        <td className="py-2.5 px-2 text-[#CBD5E1]">
                          {t.aperturaPos}.° ({t.aperturaPts} pts,{" "}
                          {t.aperturaDg >= 0
                            ? `+${t.aperturaDg}`
                            : t.aperturaDg}
                          )
                        </td>
                        <td className="py-2.5 px-2 text-[#CBD5E1]">
                          {t.clausuraPos}.° ({t.clausuraPts} pts,{" "}
                          {t.clausuraDg >= 0
                            ? `+${t.clausuraDg}`
                            : t.clausuraDg}
                          )
                        </td>
                        <td
                          className={`py-2.5 px-2 font-mono font-bold ${
                            delta >= 0 ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {delta >= 0 ? `+${delta}` : delta} pts
                        </td>
                        <td className="py-2.5 px-2 font-semibold">
                          {t.acumuladoPos}.° ({t.acumuladoPts} pts, +
                          {t.acumuladoDg})
                        </td>
                        <td className="py-2.5 pl-2 font-mono text-[#CBD5E1]">
                          {t.titles}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>

            <section className="rounded-2xl border border-[#1E293B] bg-[#0E1525]/95 p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold">Duelos Directos 2026</h2>
                <span className="font-mono text-[11px] text-[#94A3B8]">
                  {scenario.h2hBadge}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                {scenario.h2h.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl bg-[#070B14] border border-[#1E293B] p-3.5"
                  >
                    <div className="text-xs font-bold mb-1.5">{item.title}</div>
                    {item.lines.map((line) => (
                      <div
                        key={line}
                        className="text-xs font-mono text-[#94A3B8]"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {!obsMode && <SiteFooter />}
    </div>
  );
}
