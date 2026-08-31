import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'dust-2',
  title: 'Ideas Clave de Dust 2',
  ideas: [
    {
      heading: 'Control de Mid',
      text: 'Como CTs, generalmente la zona de medio se pierde con reletiva facilidad tras los humos de dobles puertas o de X-box, que inhabilitan en gran parte al player de mid. Sin embargo, se puede jugar contra plays por mid con bastante facilidad a través de a) utilities de impacto (nades y molotovs) a los barriles de topmid para ralentizar o dañar a los TS, b) jugadas desde under que liberen al player de B y que presionen el cruce de los Ts a corta, y c) utilities de support (flashes y smokes) desde mid y A site que habiliten al player de corta para buscar duelos sencillos. El player de mid debe tener la suficiente inteligencia como para saber cuando abandonar dicha posición para apoyar a uno de los dos sites, siendo consciente de la facilidad para spotear a los Ts por medio desde largas distancias (window, puertas o larga), pudiendo tener tiempo para actuar en consecuencia. Como Ts, el control de mid es irrenunciable, ya sea para construir la ronda desde esa zona (split A, mid to B, rush corta...), como para insertar un player en la esquina de topmid cortando rotaciones desde la zona de corta/X-box/under.',
    },
    {
      heading: 'Control de larga',
      text: 'La zona de larga es el principal hotspot del mapa. En caso de tener spawn, los Ts están prácticamente obligados a luchar por ello, ya que el timing acompañado de las flashes hacen muy compicado para los CTs denegar dicho espacio.Desde la zona de larga es muy sencillo setupear executes e inhabilitar a los CTs que juegan desde sites con utilidades de support y de impacto. Los CTs, sin embargo, pueden ralentizar mucho el avance de los Ts por el pasillo de larga con smokes y flashes, permitiendo así darle la oportunidad a los players de mid o incluso de B site de ganar mucho espacio y constreñir la posición de los Ts. A pesar de ser un punto ventajoso, es arriesgado para los Ts hipotecar toda su ronda en larga sin invertir ningún recurso en otras zonas del mapa (ejemplos posibles serían el smoke a dobles puertas para denegar información, molotov a corta para evitar peeks, o la presencia de un lurker en under que pueda romper rotaciones rápidas del B player o del mid player',
    },
    {
      heading: 'Aim map',
      text: 'A pesar de toda la literatura existente alrededor del mapa, acaba resultando muy straight forward en su aplicación. Resulta muy complicado lograr buenos resultados únicamente con los executes o con defensas bien planteadas. Dust II es, posiblemente, el mapa más dependiente de la habilidad mecánica individual de los players del equipo de entre todo el map pool competitivo de CS2. Es muy difícil lograr victorias en un día en el que las manos no respondan.',
    },
    
  ],
  calloutsImage: '/assets/callouts/Dust2.webp',
  strategies: [
    {
      side: 'T',
      name: 'Execute B',
      description: '.',
      minimaps: ['/assets/plays/Dust2_T_executeB.webp'],
      timing: [
        { action: 'Fake bombsite B con utility', seconds: 0 },
        { action: 'Split 2 jugadores por A Bananas', seconds: 5 },
        { action: 'Entry por A Long con flash', seconds: 10 },
        { action: 'Rotación de Mid a A si se rompe', seconds: 15 },
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
      side: 'T',
      name: 'Mid to B',
      description: '.',
      minimaps: ['/assets/plays/Dust2_T_MidToB.webp'],
      timing: [
        { action: 'Fake bombsite B con utility', seconds: 0 },
        { action: 'Split 2 jugadores por A Bananas', seconds: 5 },
        { action: 'Entry por A Long con flash', seconds: 10 },
        { action: 'Rotación de Mid a A si se rompe', seconds: 15 },
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
      side: 'T',
      name: 'Split A',
      description: '.',
      minimaps: ['/assets/plays/Dust2_T_SplitA.webp'],
      timing: [
        { action: 'Fake bombsite B con utility', seconds: 0 },
        { action: 'Split 2 jugadores por A Bananas', seconds: 5 },
        { action: 'Entry por A Long con flash', seconds: 10 },
        { action: 'Rotación de Mid a A si se rompe', seconds: 15 },
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
      name: '',
      description: '.',
      minimaps: [],
      timing: [
        { action: 'Posiciones iniciales', seconds: 0 },
        { action: 'AWP Mid con cobertura', seconds: 5 },
        { action: 'Rotación si B Doors se rompe', seconds: 10 },
        { action: 'Lurker Tunnels para robar kills', seconds: 20 },
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