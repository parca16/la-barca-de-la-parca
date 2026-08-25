# Setup del servidor de estadísticas

## Instalación

```bash
cd server
npm install
```

## Iniciar el servidor

```bash
npm start
# o en modo desarrollo con reload:
npm run dev
```

El servidor escuchará en `http://localhost:3000`

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

- `STEAM_API_KEY` - (Opcional) Tu API key de Steam para competitive matches

Si no tienes API key, el servidor funcionará con los datos de csstats.gg solo.

## Producción

En producción, el proxy se sirve desde el mismo dominio, así que no necesitas configurar nada.
La web detecta automáticamente si está en `localhost` o en producción.