import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'dust-2',
  title: 'Ideas Clave de Dust 2',
  ideas: [
    {
      heading: 'Control de Mid',
      text: 'Mid es la zona más importante de Dust 2. Controlar el medio permite a los T rotar rápidamente entre sitios y a los CT mantener el mapa equilibrado. Los smokes y flashes de Mid definen el ritmo de la ronda.',
    },
    {
      heading: 'Site A',
      text: 'El sitio A cuenta con múltiples puntos de entrada: Apartments, Connector, Bananas y Long. La coordinación entre los defensores es esencial para cubrir todas las líneas y evitar executes rápidos.',
    },
    {
      heading: 'Site B',
      text: 'El site B es más compacto pero vulnerable a ejecuciones simultáneas. Los CTs suelen jugar un jugador anclado en B y otro rotando desde Mid o Apartments. El control de B Doors es clave para retrasar a los T.',
    },
    {
      heading: 'Conexiones y Rutas',
      text: 'Las conexiones entre los sitios ofrecen rutas alternativas a los T para sorprender a los defensores. Los CT deben mantener información en estas zonas para evitar flancos y rotaciones inesperadas.',
    },
  ],
  calloutsImage: '/assets/callouts/Dust2.png',
  strategies: [
    {
      side: 'T',
      name: 'Split A B Fake',
      description: 'Finta fuerte en B mientras un split de 2 jugadores entra por A Long. Busca dividir la atención de los CT y crear números ventajas en un sitio.',
      minimaps: ['/assets/minimaps/dust-2-play1.jpg'],
      timing: [
        { action: 'Fake bombsite B con utility', seconds: 0 },
        { action: 'Split 2 jugadores por A Bananas', seconds: 5 },
        { action: 'Entry por A Long con flash', seconds: 10 },
        { action: 'Rotación de Mid a A si se rompe', seconds: 15 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Entry A Long. Molotov.' },
        { player: 'n1tro', role: 'AWPER', utility: 'Overwatch Mid. Flash A.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Entry A Bananas.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama fake B. Muestra utility.' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Smoke B Doors. Flash Mid.' },
      ],
    },
    {
      side: 'CT',
      name: 'Default con control de Mid',
      description: 'Posiciones estándar buscando control de Mid con AWPer. Lurker en Tunnels como apoyo para rotaciones.',
      minimaps: [],
      timing: [
        { action: 'Posiciones iniciales', seconds: 0 },
        { action: 'AWP Mid con cobertura', seconds: 5 },
        { action: 'Rotación si B Doors se rompe', seconds: 10 },
        { action: 'Lurker Tunnels para robar kills', seconds: 20 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Rifler A con posición connector.' },
        { player: 'n1tro', role: 'AWPER', utility: 'AWP Mid. Flash A.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama posiciones. Muestra utility.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Defiende Tunnels. Smoke Mid.' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Monitor A. Hevos para utility drop.' },
      ],
    },
  ],
};