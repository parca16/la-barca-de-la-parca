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
  calloutsImage: '/assets/callouts/Mirage.png',
  strategies: [
    {
      side: 'T',
      name: 'Mid Execute B',
      description: 'Ejecución fuerte desde Mid al sitio B con smokes para apartments y connectors. Busca crear confusión y aprovechar números a favor en el site.',
      minimaps: ['/assets/minimaps/mirage-play1.jpg'],
      timing: [
        { action: 'Smoke apartments y connectors', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: 'Execute B desde Mid', seconds: 10 },
        { action: 'Plant en B con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Molotov B site. Flash windows.' },
        { player: 'n1tro', role: 'AWPER', utility: 'Overwatch Mid. Flash connectors.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Entry B. Hevo site.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama execute. Smoke mid.' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Smoke apartments. Monitor B Main.' },
      ],
    },
    {
      side: 'CT',
      name: 'Defensa multi-sitio',
      description: 'Defensa distribuida con jugadores en A Long, Mid y B Main. Rotación coordinada basada en información de utility y sonido.',
      minimaps: [],
      timing: [
        { action: 'Pregame en posiciones', seconds: 0 },
        { action: 'AWP Mid con cobertura', seconds: 5 },
        { action: 'Rotación rápida si hay presión', seconds: 8 },
        { action: 'Controlo B Main si no hay presión', seconds: 20 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Rifler A link con cobertura.' },
        { player: 'n1tro', role: 'AWPER', utility: 'AWP Mid. Overwatch connectors.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama rotaciones. Muestra utility.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Defiende Mid. Retoma.' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'B Main. Flash connectors.' },
      ],
    },
  ],
};