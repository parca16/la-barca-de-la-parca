import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'cache',
  title: 'Ideas Clave de Cache',
  ideas: [
    {
      heading: 'Mapa de Doble Sitio Equilibrado',
      text: 'Cache es un mapa clásico con dos sitios equilibrados. Cada sitio tiene sus particularidades y requiere enfoques diferentes tanto en ataque como en defensa.',
    },
    {
      heading: 'Site A Bombs',
      text: 'El sitio A se accede principalmente por Bombs y Apartments. Los defensores juegan desde bombsite, apartments y connections. La coordinación entre estas zonas es esencial.',
    },
    {
      heading: 'Site B y Alley',
      text: 'El sitio B se accede por B Main y B Alley. Es un sitio más compacto que A pero vulnerable a ejecuciones simultáneas. Los CTs deben mantener control de Alley.',
    },
    {
      heading: 'Mid y Conexiones',
      text: 'El control de Mid y las conexiones entre sitios es vital. Los smokes definen la capacidad de los T para llegar a los sitios y los CT para rotar.',
    },
  ],
  calloutsImage: '/assets/callouts/Cache.png',
  strategies: [
    {
      side: 'T',
      name: 'Split A B Simultáneo',
      description: 'Split simultáneo a ambos sitios para dividir la defensa CT. Uno de los sitios es una finta mientras el otro juega el execute real.',
      minimaps: ['/assets/minimaps/cache-play1.jpg'],
      timing: [
        { action: 'Fake B con utility', seconds: 0 },
        { action: 'Split A por Bombs', seconds: 5 },
        { action: 'Entry A Long', seconds: 10 },
        { action: 'Plant A con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Entry A Long. Molotov.' },
        { player: 'n1tro', role: 'AWPER', utility: 'Overwatch Mid. Flash A.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Entry A Bombs.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama split. Muestra utility.' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Smoke B Main. Monitor A.' },
      ],
    },
    {
      side: 'CT',
      name: 'Defensa multi-sitio',
      description: 'Defensa distribuida con jugadores en ambos sitios. Un lurker monitorea Mid y conexiones para dar información.',
      minimaps: [],
      timing: [
        { action: 'Posiciones A y B', seconds: 0 },
        { action: 'Lurker monitorea Mid', seconds: 5 },
        { action: 'Rotación si hay presión', seconds: 8 },
        { action: 'Controlo sites', seconds: 20 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Rifler A con cobertura.' },
        { player: 'n1tro', role: 'AWPER', utility: 'AWP connections.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama posiciones. Muestra utility.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Defiende B. Retoma.' },
        { player: 'shad0w', role: 'LURKER', utility: 'Monitor Mid y Bombs.' },
      ],
    },
  ],
};