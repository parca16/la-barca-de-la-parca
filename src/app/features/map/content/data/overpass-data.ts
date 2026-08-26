import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'overpass',
  title: 'Ideas Clave de Overpass',
  ideas: [
    {
      heading: 'Mapa Acuático',
      text: 'Overpass es conocido por su diseño acuático y sus múltiples niveles. Las zonas de canal y las plataformas flotantes crean ángulos únicos que premian el conocimiento del mapa.',
    },
    {
      heading: 'Site A y Palace',
      text: 'El sitio A cuenta con múltiples rutas de entrada incluyendo Palace y Mid. Los defensores pueden jugar de forma agresiva o pasiva según la situación.',
    },
    {
      heading: 'Site B y Church',
      text: 'El sitio B se accede por Church y B Main. Es un sitio que permite defendidas compactas y retomas con utility bien coordinado.',
    },
    {
      heading: 'Mid y Conexiones',
      text: 'El control de Mid es vital en Overpass. Los smokes y flashes definen la capacidad de los T para llegar a los sitios y los CT para mantener el mapa.',
    },
  ],
  calloutsImage: '/assets/callouts/Overpass.png',
  strategies: [
    {
      side: 'T',
      name: 'Mid Palace Execute A',
      description: 'Ejecución fuerte por Palace al sitio A. Busca sorprender a los defensores con un flanco y crear confusión en el site.',
      minimaps: ['/assets/minimaps/overpass-play1.jpg', '/assets/minimaps/overpass-play2.jpg'],
      timing: [
        { action: 'Smoke Mid y Palace', seconds: 0 },
        { action: 'Flash Palace stairs', seconds: 5 },
        { action: '2 jugadores por Palace', seconds: 10 },
        { action: 'Entry A con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Entry A Long. Molotov.' },
        { player: 'n1tro', role: 'AWPER', utility: 'Overwatch Mid. Flash Palace.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Saltar Palace. Entry.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama execute. Smoke Mid.' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Smoke Palace. Monitor B.' },
      ],
    },
    {
      side: 'CT',
      name: 'Defensa con lurker Mid',
      description: 'Defensa distribuida con lurker en Mid para monitorar movimientos. Los defensores rotan basándose en información de utility y sonido.',
      minimaps: [],
      timing: [
        { action: 'Posiciones iniciales', seconds: 0 },
        { action: 'Lurker monitorea Mid', seconds: 5 },
        { action: 'Rotación si hay presión', seconds: 8 },
        { action: 'Controlo sites', seconds: 20 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Rifler A con cobertura.' },
        { player: 'n1tro', role: 'AWPER', utility: 'AWP connectors.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama posiciones. Muestra utility.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Defiende B. Retoma.' },
        { player: 'shad0w', role: 'LURKER', utility: 'Monitor Mid y canal.' },
      ],
    },
  ],
};