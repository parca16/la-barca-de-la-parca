import {
  extractYoutubeId,
  extractYoutubeStart,
  youtubeEmbedUrl,
  youtubeThumbnail,
  youtubeWatchUrl,
} from './youtube';

const ID = 'dQw4w9WgXcQ';

describe('extractYoutubeId', () => {
  it('acepta un ID ya pelado', () => {
    expect(extractYoutubeId(ID)).toBe(ID);
  });

  it('extrae el ID de youtu.be', () => {
    expect(extractYoutubeId(`https://youtu.be/${ID}?t=10`)).toBe(ID);
  });

  it('extrae el ID de /watch?v=', () => {
    expect(extractYoutubeId(`https://www.youtube.com/watch?v=${ID}&list=abc`)).toBe(ID);
  });

  it('extrae el ID de /embed, /shorts y /live', () => {
    expect(extractYoutubeId(`https://www.youtube.com/embed/${ID}`)).toBe(ID);
    expect(extractYoutubeId(`https://youtube.com/shorts/${ID}`)).toBe(ID);
    expect(extractYoutubeId(`https://m.youtube.com/live/${ID}`)).toBe(ID);
  });

  it('reconoce youtube-nocookie.com', () => {
    expect(extractYoutubeId(`https://www.youtube-nocookie.com/embed/${ID}`)).toBe(ID);
  });

  it('devuelve null para entradas inválidas', () => {
    expect(extractYoutubeId('')).toBeNull();
    expect(extractYoutubeId(null)).toBeNull();
    expect(extractYoutubeId('https://vimeo.com/12345')).toBeNull();
    expect(extractYoutubeId('https://www.youtube.com/watch?v=corto')).toBeNull();
    expect(extractYoutubeId('no es una url')).toBeNull();
  });
});

describe('extractYoutubeStart', () => {
  it('lee el parámetro t en segundos', () => {
    expect(extractYoutubeStart(`https://youtu.be/${ID}?t=1162`)).toBe(1162);
    expect(extractYoutubeStart(`https://www.youtube.com/watch?v=${ID}&start=90`)).toBe(90);
  });

  it('lee el formato 1h2m3s', () => {
    expect(extractYoutubeStart(`https://youtu.be/${ID}?t=1h2m3s`)).toBe(3723);
    expect(extractYoutubeStart(`https://youtu.be/${ID}?t=2m30s`)).toBe(150);
  });

  it('devuelve null cuando no hay tiempo de inicio', () => {
    expect(extractYoutubeStart(ID)).toBeNull();
    expect(extractYoutubeStart(`https://youtu.be/${ID}`)).toBeNull();
    expect(extractYoutubeStart('')).toBeNull();
    expect(extractYoutubeStart(null)).toBeNull();
  });
});

describe('youtube helpers', () => {
  it('construye la miniatura y el embed desde un ID', () => {
    expect(youtubeThumbnail(ID)).toBe(`https://i.ytimg.com/vi/${ID}/hqdefault.jpg`);
    expect(youtubeEmbedUrl(ID)).toContain(`youtube-nocookie.com/embed/${ID}`);
    expect(youtubeWatchUrl(ID)).toBe(`https://www.youtube.com/watch?v=${ID}`);
  });

  it('acepta una URL completa y extrae el ID', () => {
    const url = `https://youtu.be/${ID}?list=abc`;
    expect(youtubeThumbnail(url)).toBe(`https://i.ytimg.com/vi/${ID}/hqdefault.jpg`);
    expect(youtubeEmbedUrl(url)).toContain(`youtube-nocookie.com/embed/${ID}`);
    expect(youtubeWatchUrl(url)).toBe(`https://www.youtube.com/watch?v=${ID}`);
  });

  it('incluye el tiempo de inicio en el embed y en el enlace', () => {
    const url = `https://youtu.be/${ID}?t=1162`;
    expect(youtubeEmbedUrl(url)).toBe(
      `https://www.youtube-nocookie.com/embed/${ID}?rel=0&start=1162`,
    );
    expect(youtubeWatchUrl(url)).toBe(`https://www.youtube.com/watch?v=${ID}&t=1162s`);
    expect(youtubeWatchUrl(ID, 1162)).toBe(`https://www.youtube.com/watch?v=${ID}&t=1162s`);
  });

  it('ignora el tiempo 0 y los valores ausentes', () => {
    expect(youtubeEmbedUrl(ID, 0)).not.toContain('start=');
    expect(youtubeWatchUrl(ID, 0)).toBe(`https://www.youtube.com/watch?v=${ID}`);
  });
});
