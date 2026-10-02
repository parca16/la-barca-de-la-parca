# La Barca de la Parca

Sitio web del equipo **NTR** de Counter-Strike 2: una base de conocimiento donde el equipo guarda y consulta sus estrategias, utilidades y perfiles de jugadores.

🌐 **Web en producción:** https://labarcadelaparca.vercel.app/

---

## ¿Qué es?

**La Barca de la Parca** es la herramienta interna del equipo NTR. Nació para dejar de perder jugadas, utilidades e ideas en chats dispersos y tenerlas todas en un único sitio, bien organizadas y consultables antes o durante los partidos.

La idea de fondo es que sea un proyecto **vivo**: cualquier miembro del equipo puede aportar nuevas plays, utilidades o información de jugador, y la web crece con cada aportación.

El objetivo es doble:

- **Útil para el equipo:** consulta rápida de estrategias y utilidades por mapa.
- **Proyecto de aprendizaje:** poner en práctica desarrollo web moderno con Angular, diseño de interfaces y despliegue en producción.

---

## ¿Qué contiene?

La web se organiza en secciones accesibles desde el menú de navegación:

### 🏠 Inicio
Página de presentación del proyecto y guía de aportación. Explica a los miembros del equipo **qué datos y en qué formato** debe enviar su contenido para incorporarlo a cada sección.

### 👥 El roster
Perfil de cada jugador (titulares y suplentes) con:

- Foto, alias, nacionalidad y edad.
- Rol en el juego y descripción de su posición.
- Puntos fuertes (virtudes) y débiles (defectos).
- Perfil psicológico orientado al juego en equipo.
- Enlaces a Steam y FACEIT.

### 🗺️ Estrategias
Contenido organizado **por mapa**, con separación entre map pool activo e inactivo. Cada mapa incluye:

- Callouts e ideas generales del mapa.
- Plays filtrables por bando (**Terrorista** / **Antiterrorista**).
- Descripción de cada ejecución y sus **variantes**.
- **Minimapas** con las posiciones y el movimiento de cada jugador.
- Tabla de **roles por jugador** en cada ronda.

### 💥 Utilidades
Guía de lineups por mapa, filtrable por **tipo de granada** (smoke, molotov, flash, HE…). Cada utilidad se muestra con su imagen de lanzamiento en primera persona, título y explicación de uso, con visor ampliado (lightbox) al hacer clic.

Mapas cubiertos actualmente: Ancient, Anubis, Cache, Dust 2, Inferno, Mirage y Overpass.

### 📊 Servidor de estadísticas *(en desarrollo, sin integrar)*
Proyecto **independiente** dentro de `server/` (proyecto npm aparte) que recopila estadísticas reales de los jugadores desde **csstats.gg** y la **API de Steam**, las cachea y las expone vía API REST. **La web todavía no lo consume**: las fichas de jugador usan datos estáticos de `players.mock.ts` y la integración está pendiente (issue #34).

---

## Lenguajes y tecnologías

| Área | Tecnología |
| --- | --- |
| Frontend | **TypeScript** + **Angular 22** (componentes standalone, signals y control de flujo `@if`/`@for`/`@switch`) |
| Estilos | **CSS** propio (sin frameworks) con diseño responsive |
| Plantillas | **HTML** (templates de componentes Angular) |
| Estado / reactividad | **Signals** de Angular y control de flujo nativo; **RxJS** solo para eventos del router y del scroll |
| Backend (API auxiliar independiente) | **Node.js** + **Express** (JavaScript ESM) |
| Scraping y API | **axios** + **cheerio** (csstats.gg) y Steam Web API |
| Tratamiento de imágenes | **sharp** (conversión y optimización a `.webp`) |
| Tests | **Vitest** (unitarios) + jsdom |
| Tooling | Angular CLI, npm, Prettier, TypeScript 6 |
| Despliegue | **Vercel** |

---

## Estructura del proyecto

```
la-barca-de-la-parca/
├── .github/workflows/       # CI: build del frontend, tests del frontend y tests del servidor
├── public/
│   └── assets/              # Imágenes .webp (maps, callouts, plays, utilidades…)
├── src/
│   ├── app/
│   │   ├── app.ts           # Componente raíz (shell con el header)
│   │   ├── app.config.ts    # Configuración de la app (zoneless, router…)
│   │   ├── app.routes.ts    # Rutas lazy (una por sección)
│   │   ├── core/header/     # Header, navegación y menú móvil
│   │   ├── data/models/     # Modelos y datos: maps.ts, player.interface.ts, players.mock.ts
│   │   ├── shared/          # Card, map-pool-grid e image-utils
│   │   └── features/
│   │       ├── home/        # Página de inicio
│   │       ├── team/        # Roster
│   │       ├── strategies/  # Selección de mapas (pool activo/inactivo)
│   │       ├── map/         # Detalle de mapa: content/data/<mapa>-data.ts, map-content y strategy-card
│   │       └── utilities/   # Utilidades + utility-detail y data/<mapa>-utilities.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css           # Estilos globales y patrones reutilizables
├── server/                  # Servidor Express de estadísticas (proyecto npm aparte, sin integrar)
├── optimize-headers.js      # Optimización sharp: heroes, utilidades y variantes responsivas
├── angular.json
└── package.json
```

---

## Proceso de creación

### Motivación
El proyecto arrancó como **proyecto personal de aprendizaje**. La idea era doble: dar forma a una herramienta real y útil para el equipo NTR y, al mismo tiempo, aprender desarrollo web moderno construyendo algo propio en lugar de seguir tutoriales genéricos.

### Contenido e imágenes
Las estrategias, roles y descripciones se redactaron a partir del conocimiento del equipo. Los recursos gráficos (minimapas, callouts, imágenes de utilidades y cabeceras) se obtuvieron mediante **capturas ingame** y un posterior **trabajo de edición**, hasta reunir más de 300 imágenes en formato `.webp`.

### Flujo de trabajo
El desarrollo se llevó a cabo con **Git** sobre ramas de características (principalmente `REDO_MAPS`) que se integraban a `main` mediante **Pull Requests**. Cada iteración —roster, estrategias, utilidades, versión móvil, optimización— se fue añadiendo de forma incremental hasta completar la web actual.

### Herramientas
Para el código, el diseño de la interfaz y la resolución de dudas técnicas se contó con **asistencia de IA** como herramienta de apoyo al desarrollo. Las imágenes se optimizaron a `.webp` con un script propio basado en **sharp** para reducir el peso de la página.

### Despliegue
El sitio se publica de forma automática en **Vercel** a partir del repositorio de GitHub.

---

## Puesta en marcha

Requisitos: **Node.js** y **npm**.

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo -> http://localhost:4200/
npm start

# Build de producción -> dist/
npm run build

# Tests unitarios (Vitest). En terminal interactiva entra en watch mode.
npm test
```

### Scripts disponibles

| Script | Descripción |
| --- | --- |
| `npm start` | Servidor de desarrollo en http://localhost:4200/ |
| `npm run build` | Build de producción en `dist/` (config `production` por defecto) |
| `npm test` | Tests unitarios con Vitest. En terminal interactiva entra en **watch mode** |
| `npx ng test --watch=false` | Tests en una sola pasada (lo que usa CI) |
| `npm run optimize:images` | Optimiza los assets con **sharp**: heroes y variantes responsivas. Añade `-- --force` para regenerar todo |

No hay scripts de **lint**, **format** ni **typecheck**. Prettier está configurado (`.prettierrc`) pero sin script asociado.

### CI

`.github/workflows/ci.yml` se ejecuta en cada push a `main` y en cada Pull Request. Valida el **build** y los **tests** del frontend y, en paralelo, los **tests** del servidor.

### Servidor de estadísticas (opcional)

Proyecto npm aparte. **El frontend no lo consume** actualmente (issue #34).

```bash
cd server
npm install
npm start        # http://localhost:3000
# o en modo desarrollo con recarga automática:
npm run dev
```

El servidor consulta csstats.gg, combina los datos con la API de Steam, cachea el resultado y lo refresca cada 5 minutos. Para las partidas competitivas se puede configurar `STEAM_API_KEY`; sin ella funciona solo con los datos de csstats.gg. Consulta `server/README.md` para más detalle.

> **El frontend todavía no consume esta API** (#34): no hay ninguna llamada HTTP, `HttpClient` ni proxy configurado. Sus datos solo están disponibles consultando el servidor directamente.

---

## Contribuir

¿Formas parte del equipo y quieres aportar? Entra en la sección **Inicio** de la web: allí se indica el **formato y los datos exactos** que se necesitan para cada sección (Equipo, Estrategias y Utilidades). Cuanta más fidelidad al formato, más fácil es incorporar la aportación.

---

## Autor

Desarrollado por [parca16](https://github.com/parca16) para el equipo **NTR**.
