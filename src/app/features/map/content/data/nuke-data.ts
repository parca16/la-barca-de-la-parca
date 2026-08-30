import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'nuke',
  title: 'Ideas Clave de Nuke',
  ideas: [
    {
      heading: 'Mapa Vertical',
      text: 'Nuke es el mapa más vertical del competitive. La defensa se divide en upsite y downsite, con múltiples ángulos y niveles. La comunicación entre los defensores es crítica para cubrir todas las líneas.',
    },
    {
      heading: 'Upsite y Downsite',
      text: 'El upsite tiene ángulos desde connectors, balcony y up apartments. El downsite se defiende desde CT, ramp y doors. Controlar las áreas intermedias como stairs y alley es fundamental.',
    },
    {
      heading: 'Ejecuciones Aéreas',
      text: 'Las ejecuciones por jump C y mid son tácticas efectivas contra Nuke. Requieren coordinación precisa y utility bien mostrado para ganar los duelos en el sitio.',
    },
    {
      heading: 'Retomas Difíciles',
      text: 'Las retomas en Nuke son de las más complejas del mapa. Requieren utility bien coordinado y jugadores con buen posicionamiento para ganar los duelos contra los planteados.',
    },
  ],
  calloutsImage: '/assets/callouts/Nuke.png',
  strategies: [
    {
      side: 'T',
      name: 'Execute Jump C A',
      description: 'Ejecución con salto por C hacia el sitio A. Requiere utility bien mostrado para asegurar el entry y plantar con cobertura.',
      minimaps: ['/assets/minimaps/nuke-play1.webp', '/assets/minimaps/nuke-play2.webp'],
      timing: [
        { action: 'Smoke CT y connectors', seconds: 0 },
        { action: 'Flash jump C', seconds: 3 },
        { action: '2 jugadores saltan a A', seconds: 8 },
        { action: 'Plant A con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Entry jump A. Molotov.' },
        { player: 'n1tro', role: 'AWPER', utility: 'Overwatch mid. Flash connectors.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Saltar A con entry.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama execute. Smoke CT.' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Smoke connectors. Monitor C.' },
      ],
    },
    {
      side: 'CT',
      name: 'Defensa up/down',
      description: 'Defensa dividida en upsite y downsite. El IGL llama posiciones y rotaciones. El lurker monitora mid y stairs para robar información.',
      minimaps: [],
      timing: [
        { action: 'Up: rifler + AWPer', seconds: 0 },
        { action: 'Down: IGL + rifler', seconds: 0 },
        { action: 'Lurker monitorea mid', seconds: 0 },
        { action: 'Rotación si hay presión', seconds: 5 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Upsite con rifle.' },
        { player: 'n1tro', role: 'AWPER', utility: 'AWP upsite.' },
        { player: 'b1nd', role: 'IGL', utility: 'Downsite CT. Llama rotaciones.' },
        { player: 'd00m', role: 'RIFLER', utility: 'Downsite. Llama posiciones.' },
        { player: 'shad0w', role: 'LURKER', utility: 'Monitor mid y stairs.' },
      ],
    },
  ],
};