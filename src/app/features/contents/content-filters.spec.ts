import { ClassVideo } from '../../data/models/content.interface';
import { collectMaps, collectTags, filterClasses, sortClassesByDateDesc } from './content-filters';

const CLASSES: ClassVideo[] = [
  {
    id: 'a',
    title: 'Utilidades de Mirage',
    description: '',
    youtubeId: 'aaaaaaaaaaa',
    date: '2026-09-20',
    map: 'mirage',
    tags: ['utilidades', 'mapas'],
  },
  {
    id: 'b',
    title: 'Comunicación',
    description: '',
    youtubeId: 'bbbbbbbbbbb',
    date: '2026-10-01',
    tags: ['comunicación'],
  },
  {
    id: 'c',
    title: 'Execute A',
    description: '',
    youtubeId: 'ccccccccccc',
    date: '2026-08-15',
    map: 'mirage',
    tags: ['utilidades'],
  },
  {
    id: 'd',
    title: 'Retakes Inferno',
    description: '',
    youtubeId: 'ddddddddddd',
    date: '2026-07-01',
    map: 'inferno',
  },
];

describe('content-filters', () => {
  it('ordena por fecha descendente sin mutar el original', () => {
    const original = [...CLASSES];
    const sorted = sortClassesByDateDesc(CLASSES);
    expect(sorted.map((item) => item.id)).toEqual(['b', 'a', 'c', 'd']);
    expect(CLASSES).toEqual(original);
  });

  it('sin filtros devuelve todo', () => {
    expect(filterClasses(CLASSES, { map: null, tag: null })).toHaveLength(4);
  });

  it('filtra por mapa', () => {
    const result = filterClasses(CLASSES, { map: 'mirage', tag: null });
    expect(result.map((item) => item.id)).toEqual(['a', 'c']);
  });

  it('filtra por etiqueta', () => {
    const result = filterClasses(CLASSES, { map: null, tag: 'utilidades' });
    expect(result.map((item) => item.id)).toEqual(['a', 'c']);
  });

  it('combina mapa y etiqueta', () => {
    const result = filterClasses(CLASSES, { map: 'mirage', tag: 'utilidades' });
    expect(result.map((item) => item.id)).toEqual(['a', 'c']);
    expect(filterClasses(CLASSES, { map: 'inferno', tag: 'utilidades' })).toHaveLength(0);
  });

  it('recoge mapas y etiquetas únicos y ordenados', () => {
    expect(collectMaps(CLASSES)).toEqual(['inferno', 'mirage']);
    expect(collectTags(CLASSES)).toEqual(['comunicación', 'mapas', 'utilidades']);
  });
});
