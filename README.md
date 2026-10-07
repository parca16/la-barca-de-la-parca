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

### 🎬 Contenidos

Sección **privada** (solo para miembros autorizados) que centraliza las clases grabadas del equipo: análisis de mapas, utilidades, comunicación, demo reviews, etc. Cada clase tiene su vídeo de YouTube embebido, además de fecha, ponente, mapa y etiquetas. El listado permite filtrar por mapa y por temática.

El contenido se sirve desde `GET /api/content/classes`, que exige sesión, así que los vídeos no se pueden enumerar sin autenticarse. Para que el vídeo no sea público, se recomienda subirlo a YouTube como **oculto (unlisted)**: proteger la web no protege el vídeo si alguien tiene el enlace.

### 🔐 Autenticación

Solo la sección Contenidos requiere iniciar sesión. Se usa **Google OAuth 2.0 / OIDC** y una lista de emails autorizados. El resto de la web (Inicio, Equipo, Estrategias y Utilidades) sigue siendo pública.

### 📊 Servidor de estadísticas _(en desarrollo, sin integrar)_

Proyecto **independiente** dentro de `server/` (proyecto npm aparte) que recopila estadísticas reales de los jugadores desde **csstats.gg** y la **API de Steam**, las cachea y las expone vía API REST. **La web todavía no lo consume**: las fichas de jugador usan datos estáticos de `players.mock.ts` y la integración está pendiente (issue #34).

---

## Lenguajes y tecnologías

| Área                                 | Tecnología                                                                                                  |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Frontend                             | **TypeScript** + **Angular 22** (componentes standalone, signals y control de flujo `@if`/`@for`/`@switch`) |
| Estilos                              | **CSS** propio (sin frameworks) con diseño responsive                                                       |
| Plantillas                           | **HTML** (templates de componentes Angular)                                                                 |
| Estado / reactividad                 | **Signals** de Angular y control de flujo nativo; **RxJS** solo para eventos del router y del scroll        |
| Backend (API auxiliar independiente) | **Node.js** + **Express** (JavaScript ESM)                                                                  |
| Backend de la web (auth y contenido) | **Vercel Functions** (TypeScript) + **node:crypto** para la sesión                                          |
| Scraping y API                       | **axios** + **cheerio** (csstats.gg) y Steam Web API                                                        |
| Tratamiento de imágenes              | **sharp** (conversión y optimización a `.webp`)                                                             |
| Tests                                | **Vitest** (unitarios) + jsdom                                                                              |
| Tooling                              | Angular CLI, npm, ESLint + angular-eslint, Prettier, TypeScript 6                                           |
| Despliegue                           | **Vercel**                                                                                                  |

---

## Estructura del proyecto

```
la-barca-de-la-parca/
├── .github/workflows/       # CI: formato, lint, build y tests (con cobertura) del frontend; tests del servidor
├── api/                     # Vercel Functions: auth (Google OAuth) y contenido privado
│   ├── _lib/                # Utilidades del backend (sesión, allowlist, cookies…)
│   ├── _private/            # Datos privados: classes.ts (no se publica en el bundle)
│   ├── auth/                # login, callback, logout y me
│   └── content/             # endpoints protegidos (classes)
├── public/
│   └── assets/              # Imágenes .webp (maps, callouts, plays, utilidades…)
├── scripts/
│   └── dev-api.ts           # Servidor local que ejecuta las Functions en desarrollo
├── src/
│   ├── app/
│   │   ├── app.ts           # Componente raíz (shell con el header)
│   │   ├── app.config.ts    # Configuración de la app (zoneless, router, HTTP…)
│   │   ├── app.routes.ts    # Rutas lazy (una por sección) + guard de auth
│   │   ├── core/
│   │   │   ├── auth/        # AuthService, authGuard y utilidades de sesión
│   │   │   └── header/      # Header, navegación, menú móvil y sesión
│   │   ├── data/models/     # Modelos y datos: maps.ts, player.interface.ts, content.interface.ts…
│   │   ├── shared/          # Card, map-pool-grid, image-utils y youtube
│   │   └── features/
│   │       ├── home/        # Página de inicio
│   │       ├── team/        # Roster
│   │       ├── strategies/  # Selección de mapas (pool activo/inactivo)
│   │       ├── map/         # Detalle de mapa: content/data/<mapa>-data.ts, map-content y strategy-card
│   │       ├── utilities/   # Utilidades + utility-detail y data/<mapa>-utilities.ts
│   │       ├── contents/    # Contenidos (privado): listado, filtros y detalle con facade
│   │       └── login/       # Página de acceso con Google
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

# Variables de entorno locales de la API (no se commitea)
cp .env.example .env.local
# Rellena GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_ALLOWED_EMAILS y AUTH_SESSION_SECRET

# API local (ejecuta las Vercel Functions) -> http://localhost:3000
npm run dev:api

# Servidor de desarrollo -> http://localhost:4200 (hace proxy de /api a :3000)
npm start

# Build de producción -> dist/
npm run build

# Tests unitarios del frontend (Vitest). En terminal interactiva entra en watch mode.
npm test

# Tests de la API (backend de auth y contenido)
npm run test:api

# Comprobar tipos de la API
npm run typecheck:api

# Tests con informe de cobertura -> coverage/
npm run test:coverage

# Lint (ESLint + angular-eslint; incluye api/)
npm run lint

# Comprobar / aplicar formato (Prettier)
npm run format:check
npm run format
```

### Scripts disponibles

| Script                      | Descripción                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------- |
| `npm start`                 | Servidor de desarrollo en http://localhost:4200/ (proxy de `/api` a :3000)                                |
| `npm run dev:api`           | Ejecuta las Vercel Functions en http://localhost:3000/ (lee `.env.local`)                                 |
| `npm run build`             | Build de producción en `dist/` (config `production` por defecto)                                          |
| `npm test`                  | Tests unitarios del frontend con Vitest. En terminal interactiva entra en **watch mode**                  |
| `npm run test:api`          | Tests del backend (`api/`) con Vitest en entorno Node                                                     |
| `npm run typecheck:api`     | Comprueba los tipos de `api/` con TypeScript                                                              |
| `npx ng test --watch=false` | Tests del frontend en una sola pasada (lo que usa CI)                                                     |
| `npm run lint`              | ESLint + angular-eslint sobre `src/` y `api/`                                                             |
| `npm run format`            | Aplica Prettier a todo el repo                                                                            |
| `npm run optimize:images`   | Optimiza los assets con **sharp**: heroes y variantes responsivas. Añade `-- --force` para regenerar todo |

### Autenticación (Google OAuth)

La sección **Contenidos** se protege con Google OAuth 2.0 / OIDC. Para configurarlo:

1. En [Google Cloud Console](https://console.cloud.google.com/apis/credentials) crea un **OAuth client ID** de tipo _Web application_.
2. Añade los **Authorized redirect URIs**:
   - Local: `http://localhost:4200/api/auth/callback` (con `AUTH_BASE_URL=http://localhost:4200` y el proxy de `npm start`).
   - Producción: `https://labarcadelaparca.vercel.app/api/auth/callback`.
   - Previews: añade la URL fija de preview que uses, o apóyate en Vercel Deployment Protection.
3. Configura la pantalla de consentimiento (tipo _External_ o _Internal_ según el caso).
4. Define las variables de entorno en Vercel (Project → Settings → Environment Variables) o en `.env.local` para desarrollo:

| Variable               | Descripción                                                                      |
| ---------------------- | -------------------------------------------------------------------------------- |
| `GOOGLE_CLIENT_ID`     | Client ID del OAuth client.                                                      |
| `GOOGLE_CLIENT_SECRET` | Client secret del OAuth client.                                                  |
| `AUTH_ALLOWED_EMAILS`  | Emails autorizados separados por comas. Vacía = no entra nadie (fail closed).    |
| `AUTH_SESSION_SECRET`  | Secreto de 32+ bytes para firmar la cookie de sesión.                            |
| `AUTH_BASE_URL`        | URL base pública (local: `http://localhost:4200`; producción: la URL de Vercel). |
| `CONTENT_CLASSES_KEY`  | Clave hex de 32 bytes para descifrar las clases (`npm run encrypt:classes`).     |

La comparación de emails ignora mayúsculas y espacios. Para añadir o quitar un usuario basta con editar `AUTH_ALLOWED_EMAILS` y volver a desplegar.

### Añadir una clase

Las clases se guardan **cifradas** en el repo, para que el contenido no sea legible aunque el repositorio sea público. El flujo es:

1. Edita `api/_private/classes.private.json` (está **ignorado por Git**, así que no se sube). `youtubeId` admite la **URL completa** de YouTube o solo el ID de 11 caracteres.
2. Ejecuta `npm run encrypt:classes`: genera `api/_private/classes.enc.ts` (AES-256-GCM), que **sí** se commitea.
3. Haz commit de ese fichero generado.

La función descifra en memoria usando `CONTENT_CLASSES_KEY`. La clave debe ser **la misma** en Vercel y en tu `.env.local`; si falta o no coincide, la sección aparece vacía (y se registra el error en los logs). Sube los vídeos a YouTube como **ocultos (unlisted)**.

> Para regenerar la clave (rotación): genera una nueva, cámbiala en Vercel y en `.env.local`, y vuelve a ejecutar `npm run encrypt:classes`. El repo guarda el texto cifrado de cada versión, así que conviene hacerlo si alguna vez se filtra.

### CI

`.github/workflows/ci.yml` se ejecuta en cada push a `main` y en cada Pull Request. Valida formato, lint, build y tests del frontend; tipos y tests de la API; y tests del servidor.

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
