import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'train',
  title: 'Ideas Clave de Train',
  ideas: [
    {
      heading: 'Mapa de Dos Sitios',
      text: 'Train es un mapa con dos sitios bien diferenciados: A y B. Cada sitio tiene sus particularidades y requiere estrategias específicas tanto en ataque como en defensa.',
    },
    {
      heading: 'Site A y Tunnel',
      text: 'El sitio A se defiende desde apartments, connector y long. El tunnel es una zona clave que los T usan para llegar al sitio con ventaja. Controlarlo es esencial.',
    },
    {
      heading: 'Site B y Mid',
      text: 'El sitio B se accede desde Mid, b_main y b_appartments. Es un sitio que permite defendidas compactas con jugadores bien posicionados.',
    },
    {
      heading: 'Tunnel y Rutas Alternativas',
      text: 'El tunnel y las rutas alternativas son una amenaza constante en Train. Los CTs deben mantener información y utility para negar estas rutas.',
    },
  ],
  calloutsImage: '/assets/callouts/Train.png',
  strategies: [
    {
      side: 'T',
      name: 'Tunnel Execute A',
      description: 'Ejecución fuerte desde tunnel al sitio A. Requiere utility bien mostrado para asegurar el entry y plantar con cobertura.',
      minimaps: ['/assets/minimaps/train-play1.jpg'],
      timing: [
        { action: 'Smoke apartments y connector', seconds: 0 },
        { action: 'Flash tunnel', seconds: 5 },
        { action: '2 jugadores por tunnel', seconds: 10 },
        { action: 'Entry A con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Entry A Long. Molotov.' },
        { player: 'n1tro', role: 'AWPER', utility: 'Overwatch Mid. Flash tunnel.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Saltar tunnel. Entry.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama execute. Smoke mid.' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Smoke connector. Monitor B.' },
      ],
    },
    {
      side: 'CT',
      name: 'Defensa con lurker tunnel',
      description: 'Defensa distribuida con lurker en tunnel para monitorar movimientos. Los defensores rotan basándose en información de utility y sonido.',
      minimaps: [],
      timing: [
        { action: 'Posiciones A y B', seconds: 0 },
        { action: 'Lurker monitorea tunnel', seconds: 5 },
        { action: 'Rotación si hay presión', seconds: 8 },
        { action: 'Controlo sites', seconds: 20 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Rifler A con cobertura.' },
        { player: 'n1tro', role: 'AWPER', utility: 'AWP connector.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama posiciones. Muestra utility.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Defiende B. Retoma.' },
        { player: 'shad0w', role: 'LURKER', utility: 'Monitor tunnel y apartments.' },
      ],
    },
  ],
};