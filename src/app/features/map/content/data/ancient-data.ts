import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'ancient',
  title: 'Ideas Clave de Ancient',
  ideas: [
    {
      heading: 'Mapa de Doble Sitio',
      text: 'Ancient tiene dos sitios bien diferenciados con rutas de entrada únicas. El sitio A se defiende desde apartments y catwalk, mientras que el B se accede por spotty y monsters.',
    },
    {
      heading: 'Spotty y Monkeys',
      text: 'La zona de Spotty y Monkeys es esencial para el control del mapa. Ganar espacio aquí permite a los T presionar el sitio B y obligar rotaciones de los CT.',
    },
    {
      heading: 'Mid y Control',
      text: 'El control de Mid en Ancient es crucial. Los smokes de mid definen la capacidad de los T para llegar a los sitios. Los CT usan smokes para retrasar y ganar tiempo.',
    },
    {
      heading: 'Defensa Compacta',
      text: 'Los sitios de Ancient permiten una defensa compacta con pocos jugadores. Un defensor bien posicionado puede contener ejecuciones con utility bien mostrado.',
    },
  ],
  calloutsImage: '/assets/callouts/Ancient.png',
  strategies: [
    {
      side: 'T',
      name: '3-2 Execute B',
      description: 'Ejecución a B con 3 fraggers principales y 2 supports. Los smokes para las ventanas y la utility coordinada son clave para abrir el site.',
      minimaps: ['/assets/minimaps/ancient-play1.webp'],
      timing: [
        { action: 'Smokes ventana B', seconds: 0 },
        { action: 'Flash entrada B', seconds: 3 },
        { action: '3 jugadores execute', seconds: 8 },
        { action: 'Plant B con cobertura', seconds: 12 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Molotov B site. Flash windows.' },
        { player: 'n1tro', role: 'AWPER', utility: 'Overwatch Monkeys. Flash Mid.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Entry B con flash.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama execute. Smoke ventana.' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Smoke ventana. Monitor Mid.' },
      ],
    },
    {
      side: 'CT',
      name: 'Defensa dual A/B',
      description: 'Defensa distribuida entre ambos sitios con un lurker en Mid. Los defensores rotan basándose en información de utility y sonido.',
      minimaps: [],
      timing: [
        { action: 'Posiciones iniciales', seconds: 0 },
        { action: 'Lurker monitora Mid', seconds: 5 },
        { action: 'Rotación si hay presión', seconds: 8 },
        { action: 'Controlo sites', seconds: 20 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Rifler A con cobertura.' },
        { player: 'n1tro', role: 'AWPER', utility: 'AWP connectors.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama posiciones. Muestra utility.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Defiende B. Retoma.' },
        { player: 'shad0w', role: 'LURKER', utility: 'Monitor Mid y Spotty.' },
      ],
    },
  ],
};