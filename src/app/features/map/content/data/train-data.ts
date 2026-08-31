import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'train',
  title: 'Ideas Clave de Train',
  ideas: [
    {
      heading: '',
      text: 'Por falta de afinidad con la lógica, el ritmo y el layout del mapa por parte del roster de NTR, Train está, temporalmente, fuera de la planificación de la temporada',
    },
    
  ],
  calloutsImage: '/assets/callouts/Train.webp',
  strategies: [
    {
      side: 'T',
      name: 'Elaboración de jugadas en pausa',
      description: '',
      minimaps: [],
      timing: [
        { action: 'Smoke apartments y connector', seconds: 0 },
        { action: 'Flash tunnel', seconds: 5 },
        { action: '2 jugadores por tunnel', seconds: 10 },
        { action: 'Entry A con cobertura', seconds: 15 },
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
        { action: 'Posiciones A y B', seconds: 0 },
        { action: 'Lurker monitorea tunnel', seconds: 5 },
        { action: 'Rotación si hay presión', seconds: 8 },
        { action: 'Controlo sites', seconds: 20 },
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