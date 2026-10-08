/** Utilidades para trabajar con IDs de YouTube sin aceptar URLs arbitrarias. */

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'www.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
]);

/**
 * Extrae el ID (11 caracteres) de una URL de YouTube o de un ID ya pelado.
 * Devuelve `null` si no se puede reconocer.
 */
export function extractYoutubeId(input: string | null | undefined): string | null {
  const value = (input ?? '').trim();
  if (!value) return null;

  if (YOUTUBE_ID.test(value)) return value;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();

  if (host === 'youtu.be') {
    const id = url.pathname.split('/').filter(Boolean)[0];
    return id && YOUTUBE_ID.test(id) ? id : null;
  }

  if (!YOUTUBE_HOSTS.has(host)) return null;

  if (url.pathname === '/watch') {
    const id = url.searchParams.get('v');
    return id && YOUTUBE_ID.test(id) ? id : null;
  }

  const [section, id] = url.pathname.split('/').filter(Boolean);
  if (['embed', 'shorts', 'live', 'v'].includes(section ?? '') && id && YOUTUBE_ID.test(id)) {
    return id;
  }

  return null;
}

/**
 * Extrae el segundo de inicio de una URL de YouTube (`t` o `start`).
 * Acepta segundos (`t=90`) o el formato `1h2m3s`. Devuelve `null` si no hay.
 */
export function extractYoutubeStart(input: string | null | undefined): number | null {
  const value = (input ?? '').trim();
  if (!value) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  const raw = url.searchParams.get('t') ?? url.searchParams.get('start');
  if (!raw) return null;

  if (/^\d+$/.test(raw)) return Number(raw);

  const match = raw.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!match || (!match[1] && !match[2] && !match[3])) return null;

  return Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0);
}

/** Resuelve un ID a partir de un ID o una URL de YouTube. */
function resolveYoutubeId(value: string): string {
  return extractYoutubeId(value) ?? value;
}

/** URL de la miniatura de un vídeo. Acepta un ID o una URL completa. */
export function youtubeThumbnail(idOrUrl: string): string {
  return `https://i.ytimg.com/vi/${resolveYoutubeId(idOrUrl)}/hqdefault.jpg`;
}

/** URL del reproductor embebido (sin cookies de seguimiento). Acepta ID o URL. */
export function youtubeEmbedUrl(idOrUrl: string, startSeconds?: number | null): string {
  const start = startSeconds ?? extractYoutubeStart(idOrUrl);
  const base = `https://www.youtube-nocookie.com/embed/${resolveYoutubeId(idOrUrl)}?rel=0`;
  return start && start > 0 ? `${base}&start=${start}` : base;
}

/** URL pública para ver el vídeo en YouTube. Acepta un ID o una URL completa. */
export function youtubeWatchUrl(idOrUrl: string, startSeconds?: number | null): string {
  const start = startSeconds ?? extractYoutubeStart(idOrUrl);
  const base = `https://www.youtube.com/watch?v=${resolveYoutubeId(idOrUrl)}`;
  return start && start > 0 ? `${base}&t=${start}s` : base;
}
