# Setup del servidor de estadísticas

> **Proyecto independiente.** Este servidor expone una API de stats, pero la web Angular **todavía no lo consume** (issue #34): las fichas de jugador usan datos estáticos. Se puede probar por separado con `curl` o un cliente HTTP.

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

El servidor:
1. Rastrea csstats.gg para obtener perfil y stats
2. Consulta Steam API para datos de partidas competitivas
3. Combina ambas fuentes
4. Devuelve JSON por su API REST

Al no estar integrado aún en el frontend, no hay ninguna URL del cliente configurada para llamarlo. La lista de orígenes de CORS ya incluye la web en producción y el dev server de Angular por si se conecta en el futuro.

Se actualiza cada 5 minutos automáticamente. Un refresco en curso se reutiliza: llamar a `/api/refresh` mientras ya hay uno en marcha no lanza otro ciclo en paralelo. Los jugadores se descargan en paralelo con un límite de concurrencia (3 por defecto) y `timestamp` solo se actualiza cuando todos los datos están listos.

## Endpoints

API propia del servidor; el frontend todavía no la consume (issue #34).

- `GET /api/players` - Lista completa de jugadores con stats
- `GET /api/player/:alias` - Stats de un jugador específico
- `POST /api/refresh` - Fuerza un refresco de la caché. Requiere `Authorization: Bearer <REFRESH_TOKEN>`
- `GET /api/health` - Estado del servidor

`POST /api/refresh` nunca es público: sin `REFRESH_TOKEN` configurado responde `404` (el endpoint no existe), y con token responde `401` si la cabecera falta o no coincide. La comparación del token se hace en tiempo constante y hay un límite de peticiones (5 cada 15 minutos por defecto). La caché que sirve la API se actualiza sola cada 5 minutos; este endpoint solo fuerza el refresco a mano.

```bash
curl -X POST http://localhost:3000/api/refresh \
  -H "Authorization: Bearer $REFRESH_TOKEN"
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

```env
STEAM_API_KEY=
PORT=3000
CORS_ORIGINS=
REFRESH_TOKEN=
```

- `STEAM_API_KEY` - (Opcional) Tu API key de Steam para el perfil y las partidas competitivas.
- `PORT` - (Opcional) Puerto del servidor. Por defecto `3000`.
- `CORS_ORIGINS` - (Opcional) Lista de orígenes permitidos para CORS, separados por comas. Admite `*` como comodín. Por defecto solo se permiten `https://labarcadelaparca.vercel.app` y `http://localhost:4200`.
- `REFRESH_CONCURRENCY` - (Opcional) Número de jugadores que se descargan a la vez. Por defecto `3`.
- `REFRESH_TOKEN` - (Opcional) Secreto para `POST /api/refresh`. Si no se define, el endpoint queda deshabilitado.
- `REFRESH_RATE_MAX` - (Opcional) Máximo de peticiones a `POST /api/refresh` cada 15 minutos. Por defecto `5`.

Si no tienes API key, el servidor funcionará con los datos de csstats.gg solo y **no** llamará a la API de Steam. En ese caso el endpoint `/api/health` indica `"steamApiKey": "not configured"`.

### Ejemplo de `.env`

```bash
STEAM_API_KEY=tu_api_key
# Añade las previsualizaciones de Vercel a los orígenes permitidos:
CORS_ORIGINS=https://labarcadelaparca.vercel.app,https://*.vercel.app,http://localhost:4200
# Descargas simultáneas al refrescar la caché:
REFRESH_CONCURRENCY=3
# Secreto para forzar un refresco manual (POST /api/refresh):
REFRESH_TOKEN=un_secreto_largo_y_aleatorio
```

## Producción

Actualmente el servidor **no está desplegado ni integrado** con la web (issue #34). Para desplegarlo por separado, arranca `node server.js` con las variables de entorno configuradas y añade el dominio de la web a `CORS_ORIGINS`.
