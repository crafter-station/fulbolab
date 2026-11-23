# FulboLab

El laboratorio abierto de herramientas gratuitas de fútbol para hinchas y streamers de Latinoamérica. Sin anuncios, sin login, con **Modo OBS** y código abierto.

- **Web**: [fulbolab.com](https://fulbolab.com)
- **Organización**: [Crafter Station](https://github.com/crafter-station)
- **Licencia**: MIT

## Módulos activos y roadmap

| Ruta | Módulo | Estado |
| --- | --- | --- |
| `/pe/playoffs` | Evolución Liga 1 Perú 2026, llaves de playoffs y probabilidades (Real vs Hipotético Cristal) + Modo OBS | Activo |
| `/pe/calculadora` | Calculadora interactiva de fechas, Acumulado y descuentos FPF | Próximamente |
| `/pe/vs` | Comparador cara a cara Club vs Selección exportable a PNG para X | Próximamente |
| `/pe/altura` | Radar de historiales por estadio y altura | Próximamente |
| `/pe/test` | Motor JSON-driven de tests virales de fútbol | Próximamente |

## Cómo contribuir tu liga (AR, CO, CL, MX, CONMEBOL)

FulboLab está diseñado para escalar a toda Latinoamérica mediante datasets tipados en `src/data/<pais>/`:

1. Haz fork del repo y crea `src/data/<codigo-pais>/<torneo>.ts` siguiendo la estructura de `src/data/pe/liga1-2026.ts`.
2. Agrega la ruta en `src/app/<codigo-pais>/`.
3. Ejecuta `bun run lint && bun run build` y abre tu PR.

## Desarrollo local

```bash
bun install
bun run dev
```

Verificación:

```bash
bun run lint
bun run build
```
