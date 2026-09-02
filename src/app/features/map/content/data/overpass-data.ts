import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'overpass',
  title: 'Ideas Clave de Overpass',
  ideas: [
    {
      heading: 'Mapa inactivo',
      text: 'NTR ha jugado con solidez este mapa en un pasado reciente, pero su exclusión de la pool competitiva actual provoca que la exposición de utilidades y jugadas quede, temporalmente, en suspensión.',
    },
    
  ],
  calloutsImage: '/assets/callouts/Overpass.webp',
  strategies: [
    {
      side: 'T',
      name: 'Elaboración de jugadas en pausa',
      description: '',
      minimaps: [],
      timing: [
        { action: 'Smoke Mid y Palace', seconds: 0 },
        { action: 'Flash Palace stairs', seconds: 5 },
        { action: '2 jugadores por Palace', seconds: 10 },
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
        { action: 'Posiciones iniciales', seconds: 0 },
        { action: 'Lurker monitorea Mid', seconds: 5 },
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