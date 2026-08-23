import { Strategy } from './strategy.interface';

export const strategies: Strategy[] = [
  {
    id: 'dust2-ct-default',
    map: 'Dust 2',
    side: 'CT',
    round: 'Default',
    name: 'Default CT con control de Mid',
    description:
      'Posiciones iniciales estándar buscando control de Mid con AWPer. Lurker en Tunnels como apoyo.',
    roles: [
      {
        player: 'c4rlos',
        role: 'RIFLER',
        utility: 'Molotov en Mid. Hevo para A.',
      },
      {
        player: 'n1tro',
        role: 'AWPER',
        utility: 'Flash de entrada a Mid. Hevofor A Site.',
      },
      {
        player: 'b1nd',
        role: 'SUPPORT',
        utility: 'Flash de Tunnels. Smoke B Doors.',
      },
      {
        player: 'd00m',
        role: 'ENTRY',
        utility: 'Smoke de Mid Box. Hevos para utility drop en Mid.',
      },
      {
        player: 'shad0w',
        role: 'SUPPORT',
        utility: 'Flash de Catwalk. Smoke Mid. Monitor B Main.',
      },
    ],
    timing: [
      { action: 'Pregame - Posiciones CT default', seconds: 0 },
      { action: 'AWP Mid, Rifler A long', seconds: 5 },
      { action: 'Mid smoke on site execute', seconds: 10 },
      { action: 'Retake B si se rompe B Doors', seconds: 20 },
      { action: 'Lurker Tunnels para robar kills', seconds: 30 },
    ],
  },
  {
    id: 'dust2-t-311',
    map: 'Dust 2',
    side: 'T',
    round: '3-1-1',
    name: '3-1-1 Execute a B',
    description:
      'Ejecución clásica a B con 3 players principales, 1 lurker en Mid, y 1 smokes para B Doors.',
    roles: [
      {
        player: 'c4rlos',
        role: 'RIFLER',
        utility: 'Molotov B. Flash de B Windows.',
      },
      {
        player: 'n1tro',
        role: 'AWPER',
        utility: 'Overwatch Mid. Flash para entrada.',
      },
      {
        player: 'd00m',
        role: 'ENTRY',
        utility: 'Entry B. Hevo para site control.',
      },
      {
        player: 'b1nd',
        role: 'SUPPORT',
        utility: 'Smoke B Doors. Hevos para re-entry.',
      },
      {
        player: 'shad0w',
        role: 'LURKER',
        utility: 'Monitor Mid. Smoke de B Main si se rompe.',
      },
    ],
    timing: [
      { action: 'Smokes B Doors', seconds: 0 },
      { action: 'Flash B Windows con molotov', seconds: 5 },
      { action: '3-1-1 execute', seconds: 10 },
      { action: 'd00m entry con n1tro cover', seconds: 15 },
      { action: 'Plant plant en B.', seconds: 20 },
    ],
  },
  {
    id: 'mirage-ct-fast-defend',
    map: 'Mirage',
    side: 'CT',
    round: 'Fast Defend',
    name: 'Defensa rápida A',
    description:
      'Defensa rápida cuando hay presión en el sitio A. Jugadores de Mid y B Main rotan hacia A.',
    roles: [
      {
        player: 'c4rlos',
        role: 'RIFLER',
        utility: 'Rifler con posición A link.',
      },
      {
        player: 'n1tro',
        role: 'AWPER',
        utility: 'Overwatch connectors y Balcony.',
      },
      {
        player: 'b1nd',
        role: 'IGL',
        utility: 'Llama posiciones. Muestra utility.',
      },
      {
        player: 'd00m',
        role: 'ENTRY',
        utility: 'Defiende Mid y rota a A.',
      },
      {
        player: 'shad0w',
        role: 'SUPPORT',
        utility: 'Defiende B Main y rota a A.',
      },
    ],
    timing: [
      { action: 'Pregame Mid y connectors', seconds: 0 },
      { action: 'Presión en A detectada', seconds: 5 },
      { action: 'Rotación rápida a A', seconds: 8 },
      { action: 'Flash de entrada + molotov', seconds: 12 },
      { action: 'Controlo B Main si no hay presión', seconds: 20 },
    ],
  },
  {
    id: 'inferno-t-b-main',
    map: 'Inferno',
    side: 'T',
    round: 'Mid B Main',
    name: 'Mid a B Main',
    description:
      'Ejecución rápida a B Main desde mid, con smokes para Banana y Mid Stairs. Ideal cuando el CT se debilitó en Banana.',
    roles: [
      {
        player: 'c4rlos',
        role: 'RIFLER',
        utility: 'Molotov B Main. Flash para entrada.',
      },
      {
        player: 'n1tro',
        role: 'AWPER',
        utility: 'Overwatch Mid. Smoke de Monkey Bar.',
      },
      {
        player: 'd00m',
        role: 'ENTRY',
        utility: 'Entry Mid. Hevo para B Main.',
      },
      {
        player: 'b1nd',
        role: 'IGL',
        utility: 'Llama execute. Smoke B Stairs.',
      },
      {
        player: 'shad0w',
        role: 'LURKER',
        utility: 'Monitor de Banana para robar.',
      },
    ],
    timing: [
      { action: 'Smoke Mid y Banana.', seconds: 0 },
      { action: 'Flash Mid Stairs.', seconds: 5 },
      { action: '3 jugadores execute B Main.', seconds: 10 },
      { action: 'Plant B.', seconds: 20 },
    ],
  },
  {
    id: 'nuke-ct-main-defend',
    map: 'Nuke',
    side: 'CT',
    round: 'Multi-Site',
    name: 'Defensa multi-sitio Nuke',
    description:
      'Estructura de defensa para Nuke con jugadores arriba y abajo. Rotación rápida coordinada.',
    roles: [
      {
        player: 'c4rlos',
        role: 'RIFLER',
        utility: 'Upsite CT con rifler.',
      },
      {
        player: 'n1tro',
        role: 'AWPER',
        utility: 'AWP desde Upsite.',
      },
      {
        player: 'b1nd',
        role: 'IGL',
        utility: 'Downsite CT. Llama rotaciones.',
      },
      {
        player: 'd00m',
        role: 'RIFLER',
        utility: 'Downsite CT. Llama posiciones.',
      },
      {
        player: 'shad0w',
        role: 'LURKER',
        utility: 'Monitor de Mid y Upstairs.',
      },
    ],
    timing: [
      { action: 'Up: c4rlos + n1tro', seconds: 0 },
      { action: 'Down: b1nd + d00m', seconds: 0 },
      { action: 'Lurker shad0w monitors mid.', seconds: 0 },
      { action: 'Pressure A detected → rotation', seconds: 5 },
      { action: 'Plant en A si no se rompe.', seconds: 20 },
    ],
  },
  {
    id: 'ancient-t-b-site',
    map: 'Ancient',
    side: 'T',
    round: '3-2 B Execute',
    name: '3-2 Execute a B',
    description:
      'Ejecución a un sitio B con 3 fraggers y 2 supports. Clave: smokes para las ventanas y utility coordinado.',
    roles: [
      {
        player: 'c4rlos',
        role: 'RIFLER',
        utility: 'Molotov/Hevo B site',
      },
      {
        player: 'n1tro',
        role: 'AWPER',
        utility: 'Overwatch Monkeys.',
      },
      {
        player: 'd00m',
        role: 'ENTRY',
        utility: 'Entry con flash de entrada.',
      },
      {
        player: 'b1nd',
        role: 'IGL',
        utility: 'Smoke para ventana. Muestra utility.',
      },
      {
        player: 'shad0w',
        role: 'SUPPORT',
        utility: 'Smoke para ventana. Muestra utility.',
      },
    ],
    timing: [
      { action: 'Pregame Mid/Spotty', seconds: 0 },
      { action: 'Smoke mid ventana.', seconds: 3 },
      { action: 'Flash entrada B.', seconds: 8 },
      { action: '3-jugadores execute.', seconds: 12 },
    ],
  },
];