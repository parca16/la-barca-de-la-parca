# Setup del servidor de estadísticas

## Instalación

```bash
cd server
npm install
```

Copia la plantilla de variables de entorno y rellena tus valores:

```bash
cp .env.example .env
```

`.env` está ignorado por git; usa siempre `.env.example` como plantilla para no subir claves reales.

## Iniciar el servidor

```bash
npm start
# o en modo desarrollo con reload:
npm run dev
```

El servidor escuchará en `http://localhost:3000`

## Tests

La lógica de scraping vive en `csstats.js` (separada de la descarga HTTP) y está cubierta con fixtures en `test/fixtures/`:

```bash
cd server
npm test
```

## Funcionamiento

La web Angular se conecta automáticamente a `localhost:3000/api/players` cuando se ejecuta en `localhost`.

El servidor:
1. Rastrea csstats.gg para obtener perfil y stats
2. Consulta Steam API para datos de partidas competitivas
3. Combina ambas fuentes
4. Devuelve JSON a la web

Se actualiza cada 5 minutos automáticamente.

## Endpoints

- `GET /api/players` - Lista completa de jugadores con stats
- `GET /api/player/:alias` - Stats de un jugador específico
- `GET /api/health` - Estado del servidor

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

```env
STEAM_API_KEY=
PORT=3000
```

- `STEAM_API_KEY` - (Opcional) Tu API key de Steam para el perfil y las partidas competitivas.
- `PORT` - (Opcional) Puerto del servidor. Por defecto `3000`.

Si no tienes API key, el servidor funcionará con los datos de csstats.gg solo y **no** llamará a la API de Steam. En ese caso el endpoint `/api/health` indica `"steamApiKey": "not configured"`.

## Producción

En producción, el proxy se sirve desde el mismo dominio, así que no necesitas configurar nada.
La web detecta automáticamente si está en `localhost` o en producción.