import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'inferno',
  title: 'Ideas Clave de Inferno',
  ideas: [
    {
      heading: 'Control de Banana',
      text: 'Banana es la zona más contestada del mapa. Los CT deben usar utility para retrasar el avance T y tomarla en caso de ser posible, mientras que los T buscan ganar control earlyround con el objetivo de obligar a anclar un mínimo de dos CTs en B site y poder jugar la ronda con presión general de mapa.',
    },
    {
      heading: 'Mid y Conexiones',
      text: 'Como Ts se busca generar reacciones en los CTs, forzar gasto de utilidades, spotear enemigos a través del sonido, aislar duelos y hacer executes. Como CT se pretende a) buscar un crossfire que impida aislar duelos utilizando smokes para retrasar al máximo el avance T; y b) ganar espacio tanto por medio como por apps para conseguir información del planteamiento de ronda de los Ts.',
    },
    {
      heading: 'Site A',
      text: 'El site más abierto del mapa, y el más complejo en su defensa. Requiere de players con mucha movilidad, una pool de utilities amplia y capacidad para colocarse de tal forma que se posibilite jugar juntos. Es posible, situacionalmente, buscar duelos tanto en medio como en apps a través de offangles y/o one way smokes.',
    },
    {
      heading: 'Site B',
      text: 'El B site es más compacto pero vulnerable a ejecuciones rápidas. Los CT suelen jugar, fundamentalmente, de dos formas. La forma más agresiva es tomando banana, anclando a un player en coche/tocones/muro, y liberando al segundo player para reforzar A site, haciendo el mapa muy pequeño para los CTs. La forma más pasiva es jugando con los timings, los sonidos y los smokes, asegurando un máximo de 43 segundos de control CT.',
    },
  ],
  calloutsImage: '/assets/callouts/inferno.png',
  strategies: [
    {
      side: 'T',
      name: 'Mid B Main Execute',
      description: 'Ejecución rápida a B Main desde mid. Los smokes para Banana y Mid Stairs son clave. Ideal cuando el CT se debilitó en Banana o tiene pocos recursos utility.',
      minimaps: ['/assets/minimaps/inferno-play1.jpg'],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Molotov B Main + flash de entrada' },
        { player: 'n1tro', role: 'AWPER', utility: 'Overwatch Mid + smoke Monkey Bar' },
        { player: 'd00m', role: 'ENTRY', utility: 'Entry Mid + hevo para B Main' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama execute + smoke B Stairs' },
        { player: 'shad0w', role: 'LURKER', utility: 'Monitor Banana para robar kills' },
      ],
    },
    {
      side: 'T',
      name: 'Split A Long + B Fake',
      description: 'Split de 2 jugadores por A Long mientras los otros 3 hacen un fake fuerte en B. El objetivo es crear confusión en la defensa y aprovechar números a favor en A.',
      minimaps: ['/assets/minimaps/inferno-split-a.jpg', '/assets/minimaps/inferno-b-fake.jpg'],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Entry A Long + molotov site' },
        { player: 'd00m', role: 'ENTRY', utility: 'Saltar A Long con flash' },
        { player: 'n1tro', role: 'AWPER', utility: 'Overwatch Mid para rotar' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama fake B + smoke A Apartments' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Smoke connectors + hevos A' },
      ],
    },
    {
      side: 'T',
      name: 'Rush B Full',
      description: 'Rush explosivo a B con los 5 jugadores simultáneamente. Se basa en saturar la defensa con velocidad y utility en cadena. Requiere sincronización perfecta.',
      minimaps: ['/assets/minimaps/inferno-rush-b.jpg'],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Molotov B site desde banana' },
        { player: 'd00m', role: 'ENTRY', utility: 'Entry principal con flash' },
        { player: 'n1tro', role: 'AWPER', utility: 'Overwatch desde Mid' },
        { player: 'b1nd', role: 'IGL', utility: 'Smoke B Doors + llama rush' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Flash B Windows + hevos site' },
      ],
    },
    {
      side: 'T',
      name: 'Slow A Execute',
      description: 'Ejecución lenta y controlada a A con utility escalonada. Busca asegurarse cada ángulo antes de entrar. Ideal contra CTs que juegan pasivo.',
      minimaps: ['/assets/minimaps/inferno-slow-a.jpg'],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Smoke apartments + molotov site' },
        { player: 'd00m', role: 'ENTRY', utility: 'Entry controlado con flash' },
        { player: 'n1tro', role: 'AWPER', utility: 'AWP Long + cover entry' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama timings + smoke B Main' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Flash Banana + hevos A' },
      ],
    },
    {
      side: 'CT',
      name: 'Aggro Banana + B Anchor',
      description: 'Defensa agresiva con presión en Banana para obligar a los T a gastar utility temprano. Un jugador anclado en B y otro rotando según información.',
      minimaps: ['/assets/minimaps/inferno-ct-banana.jpg'],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Aggro banana con rifle y smokes' },
        { player: 'd00m', role: 'ANCHOR', utility: 'Anclado en B con posiciones key' },
        { player: 'n1tro', role: 'AWPER', utility: 'AWP Mid con cobertura B' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama rotaciones + muestra utility' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Monitor A Long + flash B Main' },
      ],
    },
    {
      side: 'CT',
      name: 'Default B + Rotate A',
      description: 'Defensa default con 3 jugadores cubriendo B y Mid, y 2 rotando a A solo si se detecta presión. Ideal contra equipos que mezclan ejecuciones.',
      minimaps: [],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Rifler B Main con cobertura' },
        { player: 'n1tro', role: 'AWPER', utility: 'AWP Mid con crossfire' },
        { player: 'd00m', role: 'RIFLER', utility: 'Defiende A Long con rifle' },
        { player: 'b1nd', role: 'IGL', utility: 'IGL defensivo + llama posiciones' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Monitor banana + utility drop' },
      ],
    },
    {
      side: 'CT',
      name: 'Double A Hold',
      description: 'Defensa estática enfocada en A con 3 jugadores. Se usa cuando se detecta que el enemigo prioriza A site. B se juega con 2 jugadores.',
      minimaps: ['/assets/minimaps/inferno-double-a.jpg'],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'A Apartments con rifle' },
        { player: 'd00m', role: 'RIFLER', utility: 'A Long con cobertura' },
        { player: 'n1tro', role: 'AWPER', utility: 'AWP A connectors' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama from Mid + monitora B' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'B Main + utility drop A' },
      ],
    },
  ],
};