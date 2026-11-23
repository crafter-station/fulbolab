import type { Metadata } from "next";
import { PlayoffsDashboard } from "@/components/playoffs/playoffs-dashboard";

export const metadata: Metadata = {
  title: "Playoffs Liga 1 Perú 2026 · FulboLab",
  description:
    "Evolución acumulada 2026, llaves de semifinal y final, triángulo de duelos directos y probabilidades de campeón nacional (Alianza Lima, Universitario, Sport Huancayo y escenario Cristal).",
};

export default function PePlayoffsPage() {
  return <PlayoffsDashboard />;
}
