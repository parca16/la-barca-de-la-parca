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