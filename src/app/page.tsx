import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome";

const MODULES = [
  {
    href: "/pe/playoffs",
    tag: "ACTIVO · PE",
    title: "Playoffs Liga 1 Perú 2026",
    desc: "Evolución acumulada F0→F34, llaves de semifinal y final, probabilidades de campeón y comparador Real vs Cristal con Modo OBS.",
    live: true,
  },
  {
    href: null,
    tag: "PRÓXIMAMENTE",
    title: "La Calculadora Liga 1 & Eliminatorias",
    desc: "Simula resultados fecha a fecha con cálculo automático de diferencia de goles y descuentos de puntos FPF.",
    live: false,
  },
  {
    href: null,
    tag: "PRÓXIMAMENTE",
    title: "Versus Cara a Cara (Club vs Selección)",
    desc: "Compara dos jugadores en 1 segundo y exporta una tarjeta 16:9 lista para debate en directo o Twitter fútbol.",
    live: false,
  },
  {
    href: null,
    tag: "PRÓXIMAMENTE",
    title: "Radar de Historiales & Altura",
    desc: "Buscador instantáneo de rachas por estadio (Huancayo, Cusco, Cajamarca, Matute, Monumental) y bajas.",
    live: false,
  },
];

const LATAM_LEAGUES = [
  { code: "PE", name: "Liga 1 Perú", active: true },
  { code: "AR", name: "Liga Profesional", active: false },
  { code: "CO", name: "Liga BetPlay", active: false },
  { code: "CL", name: "Primera División", active: false },
  { code: "MX", name: "Liga MX", active: false },
  { code: "CONMEBOL", name: "Eliminatorias", active: false },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 mx-auto w-full max-w-6xl px-5 py-12">
        <section className="mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full bg-[#E11D48]/15 border border-[#E11D48]/40 text-[#FDA4AF] mb-5">
            <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
            OPEN SOURCE · SIN ANUNCIOS · MODO OBS
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl leading-[1.08]">
            El laboratorio abierto del fútbol latinoamericano
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mt-4">
            Calculadoras, simuladores de playoffs, comparadores VS y widgets
            gratuitos diseñados para usarse en directo y compartirse en X.
            Arrancando con Perú y abierto a contribuciones de toda LatAm.
          </p>

          <div className="flex flex-wrap gap-3 mt-7">
            <Link
              href="/pe/playoffs"
              className="px-5 py-3 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold text-sm transition-colors"
            >
              Abrir Playoffs Liga 1 2026 →
            </Link>
            <a
              href="/brand/logo-system.html"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-[#0E1525] border border-[#1E293B] hover:border-[#334155] text-[#F8FAFC] font-semibold text-sm transition-colors"
            >
              Ver Logo System
            </a>
          </div>

          <div className="flex flex-wrap gap-2 mt-7">
            {LATAM_LEAGUES.map((league) => (
              <span
                key={league.code}
                className={`font-mono text-xs px-3 py-1 rounded-full border ${
                  league.active
                    ? "border-[#F59E0B]/50 bg-[#F59E0B]/10 text-[#F59E0B]"
                    : "border-[#1E293B] bg-[#0E1525] text-[#64748B]"
                }`}
              >
                {league.code} · {league.name}
                {!league.active && " (PR abierto)"}
              </span>
            ))}
          </div>
        </section>

        <section>
          <div className="font-mono text-xs uppercase tracking-widest text-[#94A3B8] mb-4">
            Herramientas del laboratorio
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MODULES.map((m) =>
              m.href ? (
                <Link
                  key={m.title}
                  href={m.href}
                  className="group rounded-2xl border border-[#1E293B] hover:border-[#E11D48] bg-[#0E1525]/95 p-6 transition-all"
                >
                  <div className="font-mono text-[11px] font-semibold text-[#F59E0B] mb-2">
                    {m.tag}
                  </div>
                  <h2 className="text-lg font-bold group-hover:text-[#FDA4AF] transition-colors">
                    {m.title}
                  </h2>
                  <p className="text-sm text-[#94A3B8] mt-1.5">{m.desc}</p>
                </Link>
              ) : (
                <div
                  key={m.title}
                  className="rounded-2xl border border-[#1E293B]/70 bg-[#0E1525]/50 p-6 opacity-75"
                >
                  <div className="font-mono text-[11px] font-semibold text-[#64748B] mb-2">
                    {m.tag}
                  </div>
                  <h2 className="text-lg font-bold text-[#CBD5E1]">
                    {m.title}
                  </h2>
                  <p className="text-sm text-[#64748B] mt-1.5">{m.desc}</p>
                </div>
              ),
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
