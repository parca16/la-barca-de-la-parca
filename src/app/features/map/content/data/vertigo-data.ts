import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'vertigo',
  title: 'Ideas Clave de Vertigo',
  ideas: [
    {
      heading: 'Mapa inactivo',
      text: 'NTR ha jugado con cierta consistencia este mapa en el pasado, pero requiere de un re-estudio para poder formular recomendaciones, jugadas y tips con un mínimo de conocimiento de causa. Dicha revisión se llevará a cabo, potencialmente, con el regreso de Vertigo al map pool activo.',
    },
    
  ],
  calloutsImage: '/assets/callouts/Vertigo.webp',
  strategies: [
    {
      side: 'T',
      name: 'Elaboración de jugadas en pausa',
      description: '',
      minimaps: [],
      timing: [
        { action: 'Smoke Mid y condo', seconds: 0 },
        { action: 'Flash helipuerto', seconds: 5 },
        { action: '2 jugadores saltan al heli', seconds: 10 },
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
        { action: 'Rifler + AWPer heli', seconds: 0 },
        { action: 'Defensor B Main', seconds: 0 },
        { action: 'Rotación si hay presión', seconds: 5 },
        { action: 'Controlo B si no hay presión', seconds: 20 },
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