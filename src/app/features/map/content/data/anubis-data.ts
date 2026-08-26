import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'anubis',
  title: 'Ideas Clave de Anubis',
  ideas: [
    {
      heading: 'Mapa de Diseño Reciente',
      text: 'Anubis es un mapa relativamente nuevo en el competitive. Su diseño egipcio ofrece rutas únicas y ángulos interesantes que premian el conocimiento del mapa.',
    },
    {
      heading: 'Site A y Palace',
      text: 'El sitio A se conecta con Palace, una zona estratégica que permite flanqueos y rotaciones sorpresa. Controlar Palace da ventaja a los defensores.',
    },
    {
      heading: 'Site B y Monkey Bar',
      text: 'El sitio B se accede por Monkey Bar y B Main. Es un sitio compacto que requiere buena coordinación defensiva y utility bien mostrado para contener executes.',
    },
    {
      heading: 'Mid y Conexiones',
      text: 'El control de Mid y las conexiones hacia los sitios es vital. Los smokes y flashes definen la capacidad de los T para llegar a los sitios con ventaja.',
    },
  ],
  calloutsImage: '/assets/callouts/Anubis.png',
  strategies: [
    {
      side: 'T',
      name: 'Mid B Main Execute',
      description: 'Ejecución rápida a B Main desde Mid con smokes para Banana y Mid Stairs. Ideal cuando el CT se debilitó en Banana.',
      minimaps: ['/assets/minimaps/anubis-play1.jpg'],
      timing: [
        { action: 'Smoke Mid y Banana', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: '3 jugadores execute B Main', seconds: 10 },
        { action: 'Plant B', seconds: 20 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Molotov B Main. Flash entrada.' },
        { player: 'n1tro', role: 'AWPER', utility: 'Overwatch Mid. Smoke Monkey Bar.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Entry Mid. Hevo B Main.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama execute. Smoke B Stairs.' },
        { player: 'shad0w', role: 'LURKER', utility: 'Monitor Banana para robar.' },
      ],
    },
    {
      side: 'CT',
      name: 'Defensa con lurker',
      description: 'Defensa distribuida con un lurker en Mid para monitorar movimientos. Los defensores rotan basándose en información de utility.',
      minimaps: [],
      timing: [
        { action: 'Posiciones iniciales', seconds: 0 },
        { action: 'Lurker monitorea Mid', seconds: 5 },
        { action: 'Rotación si hay presión', seconds: 8 },
        { action: 'Controlo sites', seconds: 20 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Rifler A con posición.' },
        { player: 'n1tro', role: 'AWPER', utility: 'AWP connectors.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama posiciones. Muestra utility.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Defiende B. Retoma.' },
        { player: 'shad0w', role: 'LURKER', utility: 'Monitor Mid y Palace.' },
      ],
    },
  ],
};