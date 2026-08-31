import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'inferno',
  title: 'Ideas Clave de Inferno',
  ideas: [
    {
      heading: 'Control de Banana',
      text: 'Banana es la zona más importante del mapa. Los CT deben usar utility para retrasar el avance de los Ts y tomarla en caso de ser posible, mientras que los Ts buscan ganar control earlyround con el objetivo de obligar a anclar un mínimo de dos CTs en B site y poder jugar la ronda con presión general de mapa.',
    },
    {
      heading: 'Mid y Conexiones',
      text: 'Como Ts se busca generar reacciones en los CTs, forzar gasto de utilidades, spotear enemigos a través del sonido, aislar duelos y setupear executes. Como CT se pretende jugar, fundamentalmente, de dos formas distintas a) buscar un crossfire que impida aislar duelos utilizando smokes para retrasar al máximo el avance T; o b) ganar espacio tanto por medio como por apps para conseguir información del planteamiento de ronda de los Ts.',
    },
    {
      heading: 'A Site',
      text: 'El site más abierto del mapa, y el más complejo en su defensa. Requiere de players con mucha movilidad, una pool de utilities amplia y capacidad para colocarse de tal forma que se posibilite jugar juntos. Es posible, situacionalmente, buscar duelos tanto en medio como en apps a través de offangles y/o one way smokes.',
    },
    {
      heading: 'B Site',
      text: 'El B site es más compacto pero vulnerable a ejecuciones rápidas. Los CT suelen jugar, fundamentalmente, de dos formas. La forma más agresiva es tomando banana, anclando a un player en coche/tocones/muro, y liberando al segundo player para reforzar A site, haciendo el mapa muy pequeño para los CTs. La forma más pasiva es jugando con los timings, los sonidos y los smokes, asegurando un máximo de 43 segundos de control CT.',
    },
  ],
  calloutsImage: '/assets/callouts/inferno.webp',
  strategies: [
    {
      side: 'T',
      name: 'Execute B',
      description: 'Execute clásico desde banana y un lurker jugando desde apps o second mid. En un escenario ideal, se realiza una vez los players de B han gastado sus dos smokes. Usualmente esto ocurre entre el 1:05 y el 0:45. Se precisan de smokes en coffins y en CT (preferiblemente smoke que tape boosteo), molotovs en triples y en segundas, y flashes en site y secundaria. Especial cuidado con a) el CT de fuente, b) con el CT de boost en primeras, y c) la popflash desde CT con push de smoke. En caso de caer molotov por parte del equipo CT para detener temporalmente el avance terro, JAMÁS apagarlo con un smoke',
      minimaps: ['/assets/plays/Inferno_T_ExecuteB.webp'],
      roles: [
        { player: 'Parca', role: 'Support', utility: '1º smoke coffins, 2º molotov triples, 3º molotov segundas. La función principal es la de setuppear el site de tal forma que los entrys tengan la capacidad para limpiar ángulos más facilmente. Si no existen dos molotovs, se sustituirá con flash a segundas. Importante la velocidad de dedos para asegurar que las utilidades caen en los timings correctos' },
        { player: 'Dida', role: 'Support', utility: '1º smoke CT, 2º flash CT, 3º drop molotov into Parca. Una vez lanza sus utilidades, debe ser rápida para llegar al segundo contacto tras los entrys. En caso de existir popflashes desde CT o molos para detener el avance, puede llegar a tradear' },
        { player: 'Fedello', role: 'Lurker', utility: 'Utilidad dirigida a hacer ruido y/o generar presión. Llegar a la zona de balcón de secundaria es el spot ideal, al poder sonidear al player de corta, al de apps en caso de push, y sin perder capacidad para cortar rotaciones por medio. En caso de que apps sea denegado, tanto second mid como under son posiciones fuertes para cortar rotaciones. En caso de jugar una ronda lenta, existe posibilidad de flank pusheando larga' },
        { player: 'Kevs', role: 'Entry fragger', utility: 'Flash al site o a CT, pero priorizando el arma en la mano. Buscar swings largos para permitir trades más sencillos por parte del segundo entry. Especial atención al sonido (en caso de haber CTs en segundas o triples se oirá el sonido del fuego) y a la posición de columna. En caso de caer molotov, jugar con paciencia y anclar el gap izquierdo del smoke de coffins para prevenir plays agresivas por parte de los CTs' },
        { player: 'Peter/Kike', role: 'Entry fragger', utility: 'Flash al site o a CT, pero priorizando el arma en la mano. Buscar swings largos para permitir trades más sencillos por parte del segundo entry. Especial atención al sonido (en caso de haber CTs en segundas o triples se oirá el sonido del fuego) y a la posición de columna. En caso de caer molotov, jugar con paciencia y anclar el gap izquierdo del smoke de coffins para prevenir plays agresivas por parte de los CTs' },
      ],
    },
    {
      side: 'T',
      name: 'Execute A',
      description: 'Este site se ejecuta en caso de haber logrado una kill en el mapa (distribución probable de los CTs 2-2) o en caso de ser incapaces de tomar banana por mérito de los CTs. Se precisa de smokes en larga y en moto, popflash a medio, molo en pit y flashes a site. Requiere de haber logrado control de apps y de jugar muy juntos en la entrada por corta debido a la gran cantidad de ángulos a limpiar. Especial importancia del player de apps, tanto por utilidad como por apertura del site. Las posiciones más problemáticas son backsite, minipit, balcón y camión. Importante que los entrys de corta no duden a la hora de atacar el site al llegar a la zona de azul. Se recomienda pegarse a la pared de la izquierda para tratar de spotear al CT de minipit o al CT de balcón y/o jugar con la flash de van del tercer entry para encarar el crossfire con un mínimo de garantías.',
      minimaps: ['/assets/plays/Inferno_T_ExecuteA.webp'],
      roles: [
        { player: 'Parca', role: 'Support + second entry', utility: '1º Smoke moto, 2º flash site. La función es incomodar lo máximo posible al player de minipit para facilitar la entrada de los entrys. La flash debe popear de tal forma que flashee site, deep minipit y que no obligue a los entrys a girarse. Tras ello, debe correr para buscar trades arma en mano.' },
        { player: 'Kike/Doda', role: 'Lurker', utility: '1º molotov coche, 2º nade sandbox, 3º popflash mid (lado izquierdo. Tras ello, la función será la de permanecer en under y anclar el smoke de larga para prevenir el pusheo del smoke del CT, de tal forma que los cuatro players solo tengan que preocuparse de luchar por el site desde el push de larga. Función secundaria, sonidear el posible push de banana por parte de los CTs, pudiendo esconderse en under y sacar kills gratis. En caso de no existir dicho push y de no escuchar ningún push banana, debe avanzar para poder utilizar su smoke ya sea en larga o en moto, y buscando jugar al postplant. Importante ser consciente del timer del smoke para saber cuando resmokear. Importante conocer lineup desde under para smokear larga.' },
        { player: 'Kevs', role: 'Entry fragger', utility: 'El segundo entry debe lanzar molotov a larga (cerca de mayonesa) para tratar de impedir en la medida de lo posible el spameo del smoke. Este molo se tirará a la vez que la popflash sea lanzada, para poder encarar corta con el timing del pop de la flash. Tras ello, push hacia corta hasta azul. El primer entry, tras en pick a corta, será el encargado de molear pit. Al llegar a azul, no exponerse al crossfire minipit-site hasta el pop de la flash del second entry. Con ese pop, jugar agresivo. Tener en consideración que es imposible que dicha flash flashee todos los spots a limpiar. Uno de los dos entrys puede atacar corta desde boiler (llegando desde balcón) para apoyar la toma de apps.' },
        { player: 'Peter', role: 'Entry fragger', utility: 'El segundo entry debe lanzar molotov a larga (cerca de mayonesa) para tratar de impedir en la medida de lo posible el spameo del smoke. Este molo se tirará a la vez que la popflash sea lanzada, para poder encarar corta con el timing del pop de la flash. Tras ello, push hacia corta hasta azul. El primer entry, tras en pick a corta, será el encargado de molear pit. Al llegar a azul, no exponerse al crossfire minipit-site hasta el pop de la flash del second entry. Con ese pop, jugar agresivo. Tener en consideración que es imposible que dicha flash flashee todos los spots a limpiar.' },
        { player: 'Fedello', role: 'Flank/Support', utility: '1º flash de antena. 2º utilidad indeterminada muy dependiente del desarrollo de la ronda. Rol complicado debido a la necesidad de tomar espacio buscando potenciales duelos 1v1. Alto riesgo alta recompensa, ya que si el duelo es ganado, el site se debilita mucho. Importante timear la flash para que popee medio segundo despúes del molotov pit con el objetivo de que, en caso de que hubiera en esa posición un CT, aseguremos al 100% el blind. Tras su flash, debe jugar agresivo buscando pick hacia site, seguido de Dosia, seguido de balcón. Importante ser consciente en todo momento de la posición de los entrys de corta para jugar en coordinación con ellos.' },
      ],
    },
    {
      side: 'T',
      name: 'Split B',
      description: '.',
      minimaps: ['/assets/plays/Inferno_T_SplitB.webp'],
      roles: [
        { player: 'Parca', role: 'Support + second entry', utility: '.' },
        { player: 'Kike/Doda', role: 'Lurker', utility: '.' },
        { player: 'Kevs', role: 'Entry fragger', utility: '.' },
        { player: 'Peter', role: 'Entry fragger', utility: '.' },
        { player: 'Fedello', role: 'Flank/Support', utility: '.' },
      ],
    },
    {
      side: 'CT',
      name: '',
      description: '.',
      minimaps: ['/assets/minimaps/inferno-ct-banana.webp'],
      roles: [
        { player: 'Parca', role: 'Support + second entry', utility: '.' },
        { player: 'Kike/Doda', role: 'Lurker', utility: '.' },
        { player: 'Kevs', role: 'Entry fragger', utility: '.' },
        { player: 'Peter', role: 'Entry fragger', utility: '.' },
        { player: 'Fedello', role: 'Flank/Support', utility: '.' },
      ],
    },
    {
      side: 'CT',
      name: '.',
      description: '.',
      minimaps: [],
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
      minimaps: ['/assets/minimaps/inferno-double-a.webp'],
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