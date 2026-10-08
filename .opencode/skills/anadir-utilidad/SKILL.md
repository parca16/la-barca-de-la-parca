---
name: Añadir una utilidad
description: Añade una utilidad de granada (smoke, molotov, flash o HE) a un mapa de la Barca. El caso típico es mandar SOLO una imagen (la captura de la línea): la skill la convierte a .webp, pregunta a qué mapa va, el título y la descripción, genera las variantes responsivas y registra el dato. Úsala cuando manden una imagen diciendo "añade esta utilidad", "nueva lineup", "smoke/molotov/flash/HE de <mapa>", o pidan ampliar las utilidades de un mapa.
---

# Añadir una utilidad

Guía para incorporar una utilidad de granada a un mapa del sitio: el asset, sus
variantes responsivas y el dato que la pinta en `/utilities/<mapa>`.

## Caso principal: solo te mandan una imagen

Cuando la invocación es únicamente una imagen (la captura de la línea de la
granada), NO esperes más datos. Haz esto en orden:

1. Localiza el archivo de la imagen.
2. Conviértelo a `.webp`.
3. Pregunta a qué mapa va, el título y la descripción.
4. Colócalo, genera variantes, registra el dato y verifica.

### 1. Localizar la imagen

Mira cómo llegó el adjunto y resuélvelo así:

- **URI `file://`** (arrastrada o adjuntada): conviértela a ruta local. En Windows,
  `file:///C:/Users/parca/.../foto.png` → `C:\Users\parca\...\foto.png`.
- **Solo un `name` sin ruta**: búscala por nombre en el workspace.
- **`data:` / base64** (pegada del portapapeles): normalmente no hay archivo en
  disco. Busca la imagen más reciente en las carpetas temporales de OpenCode:

  ```powershell
  Get-ChildItem "$env:LOCALAPPDATA\Temp\opencode", $env:TEMP -Recurse -File -Include *.png,*.jpg,*.jpeg,*.webp -ErrorAction SilentlyContinue |
    Sort-Object LastWriteTime -Descending | Select-Object -First 5 FullName, LastWriteTime
  ```

- Si no consigues una ruta, **pide al usuario** que arrastre la imagen al proyecto
  o te diga la ruta. Nunca inventes ni reutilices una imagen antigua sin
  confirmarlo.

Confirma con el usuario que la imagen que has localizado es la correcta (puedes
enseñarla o describirla) antes de seguir.

### 2. Convertir a `.webp`

Usa el script de la skill (resuelve la ruta contra su directorio base):

```sh
node "<base-de-la-skill>/scripts/to-webp.cjs" "<ruta-de-la-imagen>" "<salida>.webp"
```

Convierte a un archivo temporal en `%LOCALAPPDATA%\Temp\opencode`; el nombre y el
destino finales dependen del mapa, que aún no conoces. El script copia tal cual si
la entrada ya es `.webp` y reencoda a calidad alta en cualquier otro caso (este
archivo será el "original" que sirve el lightbox, por eso no se recomprime).

### 3. Preguntar los datos

Pregunta los tres datos antes de escribir nada. Puedes agruparlos en un solo
mensaje para no encadenar idas y vueltas:

- **Mapa**: ofrece las claves de `MAPS` (`src/app/data/models/maps.ts`). El usuario
  suele decir el nombre ("Mirage"), tú lo traduces a la `key`.
- **Título**: texto de la card, en español, p. ej. `Smoke Corta (I)`.
- **Descripción / instrucciones de lanzamiento**: p. ej.
  `Stuck en la esquina. Jumpthrow`.

### 4. Colocar el asset y nombrarlo

- Carpeta destino: `public/assets/utilidades/<utilitiesFolder>/`, donde
  `utilitiesFolder` sale de `MAPS` para la `key` elegida (a veces no coincide con la
  key: `dust-2` → `dust2`).
- Nombre del archivo: deriva un `snake_case` corto mirando los que ya hay en la
  carpeta. Prefijo por tipo: `smoke_`, `molo_`, `flash_`, `nade_`. Sin acentos ni
  espacios; sufijo numérico si el nombre ya existe (p. ej. `smoke_donut1.webp`).
- Mueve/copia el `.webp` temporal a esa carpeta.

Luego continúa con los pasos de más abajo (optimizar, dato, verificar).

## Fuentes únicas (no las dupliques)

| Qué                                       | Dónde                                                         |
| ----------------------------------------- | ------------------------------------------------------------- |
| Catálogo de mapas y `utilitiesFolder`     | `src/app/data/models/maps.ts`                                 |
| Tipo `MapUtilities` y cargadores por mapa | `src/app/features/utilities/utility-detail/utility-detail.ts` |
| Datos de utilidades de cada mapa          | `src/app/features/utilities/data/<carpeta>-utilities.ts`      |
| Imágenes                                  | `public/assets/utilidades/<carpeta>/`                         |
| Variantes responsivas (`-640`, `-1280`)   | `optimize-headers.cjs` (`npm run optimize:images`)            |

El componente resuelve la carpeta de assets con `getMap(mapKey)?.utilitiesFolder` y
arma la ruta `/assets/utilidades/<carpeta>/<filename>`.

## Generar las variantes responsivas

```sh
npm run optimize:images
```

Es incremental (solo procesa lo nuevo; `--force` regenera todo). Para utilidades
genera `<nombre>-640.webp` y `<nombre>-1280.webp` y **conserva el original intacto**
para el lightbox. Comprueba que las tres existencias están en la carpeta:

```
smoke_corta.webp  smoke_corta-640.webp  smoke_corta-1280.webp
```

## Añadir el dato

Edita `src/app/features/utilities/data/<carpeta>-utilities.ts` y mete la entrada en el
array del tipo correcto (`smoke`, `molotov`, `flash` o `he`):

```ts
{
  filename: 'smoke_corta.webp',
  title: 'Smoke Corta (I)',
  description: 'Stuck en la esquina. Jumpthrow',
}
```

Si el fichero del mapa no existe todavía, créalo con las cuatro claves (aunque estén
vacías) y registra el cargador:

```ts
// src/app/features/utilities/data/<carpeta>-utilities.ts
import { MapUtilities } from '../utility-detail/utility-detail';

export const <carpeta>Utilities: MapUtilities = {
  smoke: [],
  molotov: [],
  flash: [],
  he: [],
};
```

```ts
// utility-detail.ts → mapUtilitiesLoaders
'<key>': () => import('../data/<carpeta>-utilities').then((m) => m.<carpeta>Utilities),
```

En este repo ya existen los 10 mapas de `MAPS`, así que normalmente solo hay que
añadir la entrada. Si el mapa es nuevo, primero debe estar en `MAPS` y en
`mapUtilitiesLoaders`.

## Verificar

```sh
npm run lint
npx ng test --watch=false --filter UtilityDetail
npm run format:check
```

Y abre `/utilities/<key>`, selecciona el tipo de granada y confirma que la card se ve
con su imagen nítida (el `srcset` usa las variantes 640/1280 y el lightbox el original).

## Reglas que no debes romper

- `filename` es la clave de `@for (... track utility.filename)`: sé único dentro del mapa.
- El fichero de datos exporta las **cuatro** claves `smoke`, `molotov`, `flash`, `he`
  (vacías si aún no hay nada). Tipo `MapUtilities`, nunca un objeto parcial.
- No añadas la entrada si falta la imagen: la card rendería un `<img>` roto. Un array
  vacío, en cambio, muestra el estado "Utilidad en desarrollo".
- La imagen debe ser `.webp`: `optimize-headers.cjs` ignora cualquier otra extensión.
- No nombres un fichero original terminando en `-<3-4 dígitos>.webp` (p. ej.
  `smoke_1234.webp`): el optimizador lo confundiría con una variante y lo saltaría.
- No toques el original de la utilidad a mano: el script lo preserva a propósito
  (`maxWidth: null`) para que el lightbox no pierda calidad.
- Formato Prettier (comillas simples, coma final, 100 columnas). El CI lo exige.
- Tests y lint deben pasar antes del PR; rama `parca16/<slug>` y `Closes #N` en inglés.

## Checklist

- [ ] Imagen localizada y confirmada con el usuario.
- [ ] Convertida a `.webp` (script `scripts/to-webp.cjs`).
- [ ] Preguntados mapa, título y descripción.
- [ ] Copiada a `public/assets/utilidades/<carpeta>/` con nombre en `snake_case`.
- [ ] Ejecutado `npm run optimize:images`; existen `<nombre>-640.webp` y `<nombre>-1280.webp`.
- [ ] Entrada añadida al array del tipo correcto en `<carpeta>-utilities.ts`.
- [ ] `filename` único y con extensión exacta.
- [ ] Si el mapa es nuevo: cargador en `mapUtilitiesLoaders`.
- [ ] `npm run lint`, tests de `UtilityDetail` y `format:check` en verde.
