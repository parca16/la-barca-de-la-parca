import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'ancient',
  title: 'Ideas Clave de Ancient',
  ideas: [
    {
      heading: 'Control de mid',
      text: 'Una parte fundamental de la forma de jugar Ancient es el control de mid. Los T buscan ganar espacio para obtener presión general de mapa, mientras que los CT buscan ganar todo el espacio posible con utility early round para liberar players y dirigir recursos hacia los sites. Por timing, el CT suele tener ventaja en la toma de mid, pero el bando T puede a) usar mucha utility para pushear los smokes y jugar al contact a los 10-15 segundos de ronda, o b) esperar al desvanecimiento de los smokes para hacer retake, ya sea desde heaven o desde la zona de L',
    },
    {
      heading: 'Control de banana y cueva',
      text: 'El B site es el más vulnerable a las entrys rápidas y a los executes, en especial por la existencia de banana. Si los CT no tienen ningún control sobre esta área, es muy sencillo que el equipo T acabe por tomar la zona de cueva, pudiendo setupear una entry con varios players a escasos metros de la zona de plante. Como CT, se busca a) molestar a los players de banana con utilidad en rampa y en banana, b) jugar agresivo desde cueva aprovechando un hipotético spawn favorable, y c) ganando medio y utilizando el peek ventajoso de X-box para conseguir kills sencillas.',
    },
    {
      heading: 'Donut y A site',
      text: 'Al ser A site la zona con menos acción, el player de CT de dicho site tiene la responsabilidad de flotar entre la defensa del site y el apoyo a medio desde donut para generar superioridades en el early contact de mid y en el peek de banana. En ambos casos con utilidades de support. En caso de rush, es muy recomendable tratar de generar algo de daño, pero jugar pensando en el retake, a sabiendas de que es un site muy retakeable (4 entradas distintas para los CTs y pocos spots seguros para los Ts). Como Ts, es importante lograr el control de esta zona en caso de haber ganado la lucha por mid, debido a la cercanía con la zona de plante y a la facilidad que se genera a la hora de setupear un execute (existe una gran diferencia entre entrar únicamente por A main con 5 players, que entrar tanto por main como por donut).',
    },
    {
      heading: 'Defensa de B site',
      text: 'Los dos players de B site deben jugar en coordinación constante, y posicionarse teniendo en cuenta el aproach que decida tomar el player de cueva (usualmente determinada por spawn). En caso de jugar agresivo cueva, el player de B site debe asegurarse de lanzar sus utilidades pronto y desde una posición que facilite el repliegue en caso de rush, para tener más posibilidades de ganar el postplant tras el hipotético rush T. En caso de jugar desde site, es importante jugar cerca del smoke de rampa para prevenir rushes, esquivar flashes dirigidas a posiciones deep, o buscar plays metiendose en el propio smoke. Es importante, en este segundo escenario, ser consciente de los timings de los jugadores que puedan estar pusheando cueva para que, al haber transcurrido determinados segundos en la ronda, recolocarse hacia una posición más replegada',
    },
    {
      heading:'Desnivel y geometría' ,
      text: 'Ancient tiene una particularidad, y es que su layout, a pesar de ser muy flat, se caracteriza por su gran cantidad de desniveles y peeks a distintas alturas (especialmente en la zona de banana y B site), lo que hace que haya que prestar especial atención a la práctica de preaims y ángulos que en otros mapas se darían por hecho. Además, su geometría -caracterizada por la extrema cantidad de vértices existentes en las edificaciones que componenen el mapa- dificulta en ocasiones la consistencia de las utilidades, sufriendo especialmente los smokes esta condición. Por ese motivo, hay que ser cauteloso y metódico a la hora de establecer lineups efectivos, asegurándosede que no dependan en absoluto de RNG o píxeles que puedan jugar una mala pasada.'
    },
    
  ],
  calloutsImage: '/assets/callouts/Ancient.webp',
  strategies: [
    {
      side: 'T',
      name: 'Esquinas',
      description: '.',
      minimaps: ['/assets/plays/Ancient_T_Esquinas.webp'],
      timing: [
        { action: 'Smokes ventana B', seconds: 0 },
        { action: 'Flash entrada B', seconds: 3 },
        { action: '3 jugadores execute', seconds: 8 },
        { action: 'Plant B con cobertura', seconds: 12 },
      ],
      variants: [
        {
          label: 'Variante 1',
          text: 'Texto de ejemplo para la variante 1 (rellenar con contenido real). Ejecución estándar con ambos smokes en la ventana de B y entrada por monsters.',
        },
        {
          label: 'Variante 2',
          text: 'Texto de ejemplo para la variante 2 (rellenar con contenido real). Variante con split por spotty y late push de one player por la zona de mid.',
        },
        {
          label: 'Variante 3',
          text: 'Texto de ejemplo para la variante 3 (rellenar con contenido real). Variante con finta previa en el sitio A y execute posterior a B cinco segundos después.',
        },
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
      name: 'Execute A',
      description: '.',
      minimaps: ['/assets/plays/Ancient_T_ExecuteA.webp'],
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
      side: 'T',
      name: 'Split B',
      description: '.',
      minimaps: ['/assets/plays/Ancient_T_SplitB.webp'],
      timing: [
        { action: 'Smoke Mid y Banana', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: '3 jugadores execute B Main', seconds: 10 },
        { action: 'Plant B', seconds: 20 },
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
        { action: 'Lurker monitora Mid', seconds: 5 },
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