# AGENTS.md

Sitio interno del equipo NTR de Counter-Strike 2: SPA **Angular 22** (standalone, zoneless, signals) en `src/`, más un servidor Express de estadísticas independiente en `server/`. Copys y comentarios en español.

## Comandos

- Instalar: `npm install`
- Dev: `npm start` → http://localhost:4200
- Build de producción: `npm run build` (config `production` por defecto)
- Tests en una pasada: `npx ng test --watch=false`
  - Filtrar por suite/test: `npx ng test --watch=false --filter Card`
  - `npm test` / `ng test` entran en **watch mode** en terminal interactiva; en entornos no-TTY no.
- Servidor de stats (proyecto npm aparte): `cd server; npm install; npm run dev` → http://localhost:3000
- **No hay** scripts de lint, format ni typecheck. Prettier está instalado pero sin config ni script (issue #37). No inventes `npm run lint`/`npm run format`.

## Toolchain / gotchas

- **Zoneless**: no hay Zone.js. Trabaja con signals y evita llamar funciones desde plantillas que se recalculen en cada change detection (usa `computed` o datos precalculados; ver issue #13).
- Componentes standalone y control de flujo nativo `@if` / `@for` / `@switch`. Sin NgModules.
- Presupuesto de estilos por componente: warning 4 kB, error 10 kB. Tras #21 todos quedan por debajo; mantén el límite (no lo subas para silenciar avisos). Los patrones reutilizables (`.text-link`, lightbox, `.segmented-*`, `.toggle-btn`, `.section-divider`, `.page-hero`) viven en `src/styles.css`.
- Tests con **Vitest** vía `@angular/build:unit-test` (jsdom). Los globals `describe/it/expect` están habilitados por `tsconfig.spec.json` (`vitest/globals`); los specs `*.spec.ts` viven junto al código.
- Componentes que usan `RouterLink` (`App`, `Header`) necesitan `provideRouter([])` en el `TestBed`, o el test falla con `NG0201: No provider found for ActivatedRoute`.
- Inputs de tipo signal: en tests usa `fixture.componentRef.setInput('player', obj)`.

## Arquitectura (lo no evidente)

- **Mapas**: `src/app/data/models/maps.ts` es la fuente única (`MapInfo`, `MAPS`, `MAPS_BY_KEY`, `getMap`, `getMapsByPool`, `getHeaderImage`). Añadir un mapa empieza aquí; lo consumen `map.ts`, `strategies.ts`, `utilities.ts` y `utility-detail.ts`.
- **Jugadores**: modelo en `src/app/data/models/player.interface.ts`, datos en `players.mock.ts`. `Card` lee `steamUrl`, `faceitUrl`, `abbrev` y `photoPosition` del modelo; no los recalcules en la plantilla.
- **Utilidades**: contenido en `src/app/features/utilities/data/<mapa>-utilities.ts` (tipo `MapUtilities`, exportado desde `utility-detail.ts`). El registro `mapUtilitiesLoaders` en `utility-detail.ts` mapea `mapKey` → cargador dinámico; las imágenes están en `public/assets/utilidades/<carpeta>/`. Añadir un mapa requiere catálogo + fichero de datos + assets.
- **Assets**: `public/assets/...` se sirven como `/assets/...`.
- **Rutas**: todas lazy en `app.routes.ts` (`loadComponent`). Los datos por mapa (`*-data.ts` y `*-utilities.ts`) se cargan con `import()` dinámico desde `map.ts` y `utility-detail.ts`, generando un chunk por mapa.
- **Servidor**: `server/` es un proyecto npm aparte (ESM) que el frontend **no consume todavía** (#34). Los Steam IDs están duplicados en `server/server.js` y `players.mock.ts`; mantenlos en sincronía (#14).
- `optimize-headers.js` (raíz) optimiza los assets con sharp: reescribe los heroes (`map-headers/`, `headers/`) y genera las variantes `-960`/`-640`/`-1280`/`-480` que usan los `srcset` (los originales de utilidades se conservan para el lightbox). Se lanza con `npm run optimize:images` (añade `--force` para regenerar todo).

## Flujo Git

- Una rama por issue `parca16/<slug>` desde `main`; PR contra `main`. Vercel despliega `main` automáticamente.
- En el cuerpo del PR usa `Closes #N` / `Resolves #N` en inglés: GitHub no auto-cierra issues con textos en español tipo "Resuelve #N".
