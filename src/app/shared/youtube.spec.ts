import { extractYoutubeId, youtubeEmbedUrl, youtubeThumbnail } from './youtube';

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

describe('youtube helpers', () => {
  it('construye la miniatura y el embed', () => {
    expect(youtubeThumbnail(ID)).toBe(`https://i.ytimg.com/vi/${ID}/hqdefault.jpg`);
    expect(youtubeEmbedUrl(ID)).toContain(`youtube-nocookie.com/embed/${ID}`);
  });
});
