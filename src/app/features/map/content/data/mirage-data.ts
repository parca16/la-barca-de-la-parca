import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'mirage',
  title: 'Ideas Clave de Mirage',
  ideas: [
    {
      heading: 'Múltiples Líneas de Ataque',
      text: 'Mirage es conocido por su versatilidad. Los T tienen tres sitios potenciales y múltiples rutas de ejecución. La clave está en la coordinación y el uso inteligente de utility para abrir paths.',
    },
    {
      heading: 'Site A',
      text: 'El sitio A de Mirage es uno de los más complejos del mapa. Cuenta con conexiones, balcony, link y apartments. La defensa requiere players con buena información y capacidad para rotar rápidamente.',
    },
    {
      heading: 'Site B',
      text: 'El site B es el más accesible del mapa. Las ejecuciones rápidas son una amenaza constante. Los CTs deben mantener control de B Main y usar utility para retrasar a los T que buscan entrada.',
    },
    {
      heading: 'Mid y Conectores',
      text: 'El control de Mid y los conectores es vital. Permite a los CT rotar entre sitios y a los T generar presión simultánea. Los smokes de Mid definen gran parte de la dinámica de la ronda.',
    },
  ],
  calloutsImage: '/assets/callouts/Mirage.webp',
  strategies: [
    {
      side: 'T',
      name: 'Esquinas',
      description: '.',
      minimaps: ['/assets/plays/Mirage_T_Esquinas.webp'],
      timing: [
        { action: 'Smoke apartments y connectors', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: 'Execute B desde Mid', seconds: 10 },
        { action: 'Plant en B con cobertura', seconds: 15 },
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
      side: 'T',
      name: 'Execute A',
      description: '.',
      minimaps: ['/assets/plays/Mirage_T_ExecuteA.webp'],
      timing: [
        { action: 'Smoke apartments y connectors', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: 'Execute B desde Mid', seconds: 10 },
        { action: 'Plant en B con cobertura', seconds: 15 },
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
      side: 'T',
      name: 'Execute B',
      description: '.',
      minimaps: ['/assets/plays/Mirage_T_ExecuteB.webp'],
      timing: [
        { action: 'Smoke apartments y connectors', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: 'Execute B desde Mid', seconds: 10 },
        { action: 'Plant en B con cobertura', seconds: 15 },
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
      side: 'T',
      name: 'Split A',
      description: '.',
      minimaps: ['/assets/plays/Mirage_T_SplitA.webp'],
      timing: [
        { action: 'Smoke apartments y connectors', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: 'Execute B desde Mid', seconds: 10 },
        { action: 'Plant en B con cobertura', seconds: 15 },
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
      name: '',
      description: '.',
      minimaps: [],
      timing: [
        { action: 'Pregame en posiciones', seconds: 0 },
        { action: 'AWP Mid con cobertura', seconds: 5 },
        { action: 'Rotación rápida si hay presión', seconds: 8 },
        { action: 'Controlo B Main si no hay presión', seconds: 20 },
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