import Link from "next/link";
import { FulboLabWordmark } from "@/components/brand/fulbolab-logo";
import { AboutDialog } from "@/components/layout/about-dialog";

const linkClass = "text-fog transition-colors hover:text-chalk";

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-line">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 pt-12 pb-10 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <FulboLabWordmark height={17} />
          <p className="max-w-xs text-[13px] leading-relaxed text-fog">
            Herramientas abiertas para hinchas y streamers de LatAm. Gratis, sin
            anuncios, licencia MIT.
          </p>
        </div>
        <nav aria-label="Producto" className="space-y-3 text-[13px]">
          <div className="kicker text-dim">Producto</div>
          <ul className="space-y-2">
            <li>
              <Link href="/pe/playoffs" className={linkClass}>
                Playoffs 2026
              </Link>
            </li>
            <li>
              <Link href="/#herramientas" className={linkClass}>
                Herramientas
              </Link>
            </li>
            <li>
              <Link href="/#ligas" className={linkClass}>
                Ligas
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Recursos" className="space-y-3 text-[13px]">
          <div className="kicker text-dim">Recursos</div>
          <ul className="space-y-2">
            <li>
              <Link href="/brand" className={linkClass}>
                Brand
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/crafter-station/fulbolab"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                GitHub
              </a>
            </li>
            <li>
              <AboutDialog className={`${linkClass} cursor-pointer`} />
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-2 px-5 py-4 font-mono text-[11px] text-dim sm:px-8">
          <span>© 2026 FulboLab · MIT</span>
          <span>
            Hecho en Perú por <span className="text-fog">Crafter Station</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
