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

/** URL de la miniatura de un vídeo. */
export function youtubeThumbnail(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

/** URL del reproductor embebido (sin cookies de seguimiento). */
export function youtubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`;
}
