import { ClassVideo } from '../../data/models/content.interface';
import { sortClassesByDateDesc } from './contents-sort';

const CLASSES: ClassVideo[] = [
  { id: 'a', title: 'A', description: '', youtubeId: 'aaaaaaaaaaa', date: '2026-09-20' },
  { id: 'b', title: 'B', description: '', youtubeId: 'bbbbbbbbbbb', date: '2026-10-01' },
  { id: 'c', title: 'C', description: '', youtubeId: 'ccccccccccc', date: '2026-08-15' },
];

describe('sortClassesByDateDesc', () => {
  it('ordena por fecha descendente sin mutar el original', () => {
    const original = [...CLASSES];
    expect(sortClassesByDateDesc(CLASSES).map((item) => item.id)).toEqual(['b', 'a', 'c']);
    expect(CLASSES).toEqual(original);
  });
});
