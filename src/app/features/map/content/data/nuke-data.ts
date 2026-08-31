import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'nuke',
  title: 'Ideas Clave de Nuke',
  ideas: [
    {
      heading: '',
      text: 'La concepción y playstyle que NTR tenía sobre Nuke se ha visto desfasada y superada a medida que el elo de los players ha ido subiendo, hasta llegar un punto en el que un re-estudio del mapa se ha vuelto del todo imprescindible.',
    },
    
  ],
  calloutsImage: '/assets/callouts/Nuke.webp',
  strategies: [
    {
      side: 'T',
      name: 'Elaboración de jugadas en pausa',
      description: '',
      minimaps: [],
      timing: [
        { action: 'Smoke CT y connectors', seconds: 0 },
        { action: 'Flash jump C', seconds: 3 },
        { action: '2 jugadores saltan a A', seconds: 8 },
        { action: 'Plant A con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: '-' },
        { player: 'Dida', role: 'AWPER', utility: '-' },
        { player: 'Fedello', role: 'ENTRY', utility: '-' },
        { player: 'Kevs', role: 'IGL', utility: '-' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: '-' },
      ],
    },
    {
      side: 'CT',
      name: 'Elaboración de jugadas en pausa',
      description: '',
      minimaps: [],
      timing: [
        { action: 'Up: rifler + AWPer', seconds: 0 },
        { action: 'Down: IGL + rifler', seconds: 0 },
        { action: 'Lurker monitorea mid', seconds: 0 },
        { action: 'Rotación si hay presión', seconds: 5 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: '-' },
        { player: 'Dida', role: 'AWPER', utility: '-' },
        { player: 'Fedello', role: 'ENTRY', utility: '-' },
        { player: 'Kevs', role: 'IGL', utility: '-' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: '-' },
      ],
    },
  ],
};