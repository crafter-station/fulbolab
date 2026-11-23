export type TeamId = "alianza" | "u" | "huancayo" | "cristal";

export interface TeamSeasonStats {
  id: TeamId;
  name: string;
  shortName: string;
  color: string;
  aperturaPos: number;
  aperturaPts: number;
  aperturaDg: number;
  clausuraPos: number;
  clausuraPts: number;
  clausuraDg: number;
  acumuladoPos: number;
  acumuladoPts: number;
  acumuladoDg: number;
  titles: number;
  statusTag: string;
}

export interface ScenarioProbability {
  id: TeamId;
  name: string;
  pct: number;
  color: string;
  meta: string;
}

export interface H2HCard {
  title: string;
  lines: string[];
}

export interface PlayoffScenario {
  key: "real" | "cristal";
  label: string;
  badge: string;
  h2hBadge: string;
  highlight: TeamId[];
  probs: ScenarioProbability[];
  semi: {
    teamA: { name: string; pct: string };
    teamB: { name: string; pct: string };
    dates: string;
  };
  finalDates: string;
  h2h: H2HCard[];
}

export const LIGA1_2026_CUTOFF = "22 Nov 2026";

export const LIGA1_2026_TEAMS: TeamSeasonStats[] = [
  {
    id: "alianza",
    name: "Alianza Lima",
    shortName: "Alianza",
    color: "#3b82f6",
    aperturaPos: 1,
    aperturaPts: 40,
    aperturaDg: 22,
    clausuraPos: 3,
    clausuraPts: 32,
    clausuraDg: 13,
    acumuladoPos: 1,
    acumuladoPts: 72,
    acumuladoDg: 35,
    titles: 25,
    statusTag: "Espera en la Final",
  },
  {
    id: "u",
    name: "Universitario",
    shortName: "Universitario",
    color: "#f5d08a",
    aperturaPos: 4,
    aperturaPts: 29,
    aperturaDg: 9,
    clausuraPos: 4,
    clausuraPts: 32,
    clausuraDg: 8,
    acumuladoPos: 2,
    acumuladoPts: 61,
    acumuladoDg: 17,
    titles: 29,
    statusTag: "Tricampeón vigente",
  },
  {
    id: "huancayo",
    name: "Sport Huancayo",
    shortName: "Huancayo",
    color: "#ef4444",
    aperturaPos: 17,
    aperturaPts: 16,
    aperturaDg: -10,
    clausuraPos: 1,
    clausuraPts: 37,
    clausuraDg: 12,
    acumuladoPos: 6,
    acumuladoPts: 53,
    acumuladoDg: 2,
    titles: 0,
    statusTag: "Campeón Clausura",
  },
  {
    id: "cristal",
    name: "Sporting Cristal",
    shortName: "Cristal",
    color: "#38bdf8",
    aperturaPos: 12,
    aperturaPts: 19,
    aperturaDg: -2,
    clausuraPos: 2,
    clausuraPts: 35,
    clausuraDg: 20,
    acumuladoPos: 5,
    acumuladoPts: 54,
    acumuladoDg: 18,
    titles: 20,
    statusTag: "2.° Clausura (+20 DG)",
  },
];

export const LIGA1_2026_SCENARIOS: Record<"real" | "cristal", PlayoffScenario> =
  {
    real: {
      key: "real",
      label: "Escenario Real (Huancayo)",
      badge: "Escenario Real",
      h2hBadge: "Triángulo Real",
      highlight: ["alianza", "u", "huancayo"],
      probs: [
        {
          id: "alianza",
          name: "Alianza Lima",
          pct: 60,
          color: "#3b82f6",
          meta: "100% en Final | 72 pts (+35 DG) | Cierra en Matute | 25 títulos",
        },
        {
          id: "u",
          name: "Universitario",
          pct: 28,
          color: "#f5d08a",
          meta: "58% pase en Semi | Tricampeón vigente (29 títulos) | 2-0 en clásicos 2026",
        },
        {
          id: "huancayo",
          name: "Sport Huancayo",
          pct: 12,
          color: "#ef4444",
          meta: "42% pase en Semi | Campeón Clausura (37 pts) + altura | 0 títulos",
        },
      ],
      semi: {
        teamA: { name: "Universitario", pct: "58%" },
        teamB: { name: "Sport Huancayo", pct: "42%" },
        dates: "Ida: 29 Nov (Huancayo) | Vuelta: 4 Dic (Monumental)",
      },
      finalDates: "Ida: 8 Dic | Vuelta: 13 Dic (Matute)",
      h2h: [
        {
          title: "U vs Alianza",
          lines: [
            "Ap: UNI 1-0 ALI",
            "Cl: ALI 1-2 UNI",
            "Ventaja: Universitario (2-0)",
          ],
        },
        {
          title: "Alianza vs Huancayo",
          lines: [
            "Ap: SHU 1-2 ALI",
            "Cl: ALI 2-1 SHU",
            "Ventaja: Alianza (2-0)",
          ],
        },
        {
          title: "U vs Huancayo",
          lines: [
            "Ap: UNI 2-1 SHU",
            "Cl: SHU 4-1 UNI",
            "Global: Huancayo (5-3)",
          ],
        },
      ],
    },
    cristal: {
      key: "cristal",
      label: "Hipotético (Cristal)",
      badge: "Hipotético: Cristal",
      h2hBadge: "Triángulo con Cristal",
      highlight: ["alianza", "u", "cristal"],
      probs: [
        {
          id: "alianza",
          name: "Alianza Lima",
          pct: 53,
          color: "#3b82f6",
          meta: "-7% vs real | Cristal invicto ante Alianza en 2026 | Cierra en Matute",
        },
        {
          id: "u",
          name: "Universitario",
          pct: 26,
          color: "#f5d08a",
          meta: "53% pase en Semi | Llave en Lima más exigente ante Cristal",
        },
        {
          id: "cristal",
          name: "Sporting Cristal",
          pct: 21,
          color: "#38bdf8",
          meta: "47% pase en Semi | Mejor DG del Clausura (+20) | 20 títulos",
        },
      ],
      semi: {
        teamA: { name: "Universitario", pct: "53%" },
        teamB: { name: "Sporting Cristal", pct: "47%" },
        dates: "Ida: Gallardo/Nacional | Vuelta: Monumental",
      },
      finalDates: "Final Alianza vs Cristal sería 55% / 45%",
      h2h: [
        {
          title: "U vs Alianza",
          lines: [
            "Ap: UNI 1-0 ALI",
            "Cl: ALI 1-2 UNI",
            "Ventaja: Universitario (2-0)",
          ],
        },
        {
          title: "Alianza vs Cristal",
          lines: [
            "Ap: ALI 1-1 CRI",
            "Cl: CRI 3-2 ALI",
            "Invicto: Cristal (4 pts)",
          ],
        },
        {
          title: "U vs Cristal",
          lines: ["Ap: CRI 2-2 UNI", "Cl: UNI 1-1 CRI", "Empate total (3-3)"],
        },
      ],
    },
  };
