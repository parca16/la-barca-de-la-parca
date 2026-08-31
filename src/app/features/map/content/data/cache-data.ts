import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'cache',
  title: 'Ideas Clave de Cache',
  ideas: [
    {
      heading: 'Dimensiones',
      text: 'Cache es el mapa más pequeño del map pool activo y, probablemente, uno de los mapas competitivos más pequeños que se hayan creado para Counter-Strike 2. Esta característica condiciona de forma notable su gameplay y hace que haya ciertas ideas que conviene interiorizar desde el principio: a) Es un mapa extremadamente rápido, en el que las rondas pueden quedar prácticamente decididas entre los segundos 15 y 25. b) Es un mapa muy dinámico debido a la cercanía entre mid y ambos sites, lo que proporciona una gran capacidad de maniobra tanto a los CTs como a los Ts. c) Es un mapa favorable al lado T, aunque convertir esta ventaja en rondas puede resultar algo más complejo de lo que cabría esperar.',
    },
    {
      heading: 'Disposición defensiva',
      text: 'Cache es el único mapa en el que la disposicón estándar como CTs se basa en solo un player en cada site y tres jugadores en mid earlyround. Esta disposición es negociable y variable según las necesidades y características de cada game, pero la consecución del control de mid justifica la inversión de recursos ante la extrema velocidad en la rotación, ya sea por highway o por vent.',
    },
    {
      heading: 'Simplicidad y complejidad en paralelo',
      text: 'Las dimensiones de Cache hacen que, dependiendo del día, del rival o incluso de las propias sensaciones, pueda convertirse en un mapa puramente mecánico y sin demasiada complejidad estratégica, al estilo de Dust 2, o, por el contrario, en un mapa que obligue a jugar Counter Champagne. Un game en el que abunde la disputa por el control de mid puede derivar en un fuego cruzado constante, en el que acabará imponiéndose el equipo capaz de hacer valer más su superioridad mecánica, dada la dificultad que tienen los CTs para ralentizar las rondas de forma efectiva. Por otro lado, la cantidad de ángulos, timings, setups de execute, posibilidades de flank y pool de utilidades permiten plantear un juego mucho más pausado y reflexivo, en una línea más cercana a mapas como Inferno u Overpass.',
    },
    
  ],
  calloutsImage: '/assets/callouts/Cache.webp',
  strategies: [
    {
      side: 'T',
      name: 'Esquinas',
      description: '.',
      minimaps: ['/assets/plays/Cache_T_Esquinas.webp'],
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
      side: 'T',
      name: 'Esquinas con Boost',
      description: '.',
      minimaps: ['/assets/plays/Cache_T_EsquinasBoost.webp'],
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
      side: 'T',
      name: 'Execute A',
      description: '.',
      minimaps: ['/assets/plays/Cache_T_ExecuteA.webp'],
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
      side: 'T',
      name: 'Execute B',
      description: '.',
      minimaps: ['/assets/plays/Cache_T_ExecuteB.webp'],
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
      side: 'T',
      name: 'Rush B',
      description: '.',
      minimaps: ['/assets/plays/Cache_T_RushB.webp'],
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
      name: 'Boost mid',
      description: '',
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