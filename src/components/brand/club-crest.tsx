import Image from "next/image";
import { TEAM_CREST, type TeamId } from "@/data/pe/liga1-2026";

export function ClubCrest({
  id,
  name,
  size = 20,
  className = "",
}: {
  id: TeamId;
  name?: string;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={TEAM_CREST[id]}
      alt={name ? `Escudo de ${name}` : ""}
      width={size}
      height={size}
      unoptimized
      className={`shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
