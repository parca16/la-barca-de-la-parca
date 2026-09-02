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
      description: 'Una jugada poco común por el riesgo que supone entrar en el cuello de botella de B site, pero que puede sorprender en el momento correcto. Fundamental lograr control de under y jugar extremadamente agresivo contra el player de corta. Es de suma importancia echarlo de cat con molotovs, nades y balas. Tras ello y lanzando alguna flash a mid, comienza el shift hacia B. Es de vital importancia entrar con el smoke de los CTs ya disipado, ya que de estar todavía activo corremos el riesgo de ser limpiados por un solo spray del player de B site. Tras ello, smokearemos puertas y window, setupeando la entry con una cadena de flashes, tanto de los entrys como del support. A pesar de que pueda parecer buena idea tratar de molotovear spots clave, en este execute es especialmente importante el arma en mano ante las más que posibles plays agresivas de los CTs. Los CTs son conscientes de que B site es, probablemente, el site más complicado de retakear de todo Counter Strike 2. Incluso un 3v5 es más que jugable para los Ts en caso de haber ganado control del site. En caso de lograr la entry, los resmokes en fase de postplant deben ir en este orden de prioridades: 1) puertas, 2) under, 3) window, siendo esta última la zona más difícil de abordar por los CTs ante la infinidad de ángulos a los que se enfrenta (site, backsite, pool, cajas, window, coche, ninja...).',
      minimaps: ['/assets/plays/Dust2_T_executeB.webp'],
      timing: [
        { action: 'Fake bombsite B con utility', seconds: 0 },
        { action: 'Split 2 jugadores por A Bananas', seconds: 5 },
        { action: 'Entry por A Long con flash', seconds: 10 },
        { action: 'Rotación de Mid a A si se rompe', seconds: 15 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Encargado de lanzar el setup de smokes y de doble flashear al timing de la entry. En caso de execute exitoso, se quedará anclado en upper cortando cualquier rotación desde under por parte de los CTs, permitiendo así que desde el site solo deban preocuparse de las entradas de doors (potencialmente resmokeado) y window.' },
        { player: 'Dida', role: 'AWPER', utility: 'La tercera entry, debe prestar especial atención a los sonidos, a los calls y a las trazzers para realizar los trades de la manera más rápida posible. En caso de que los entrys no hayan spoteado a nadie durante el execute, deberá olerse la posibilidad de que haya un CT escondido en alguno de los offangles de la pared izquierda. Tras ello, deberá asegurarse de no morir (o, mejor dicho, no buscar plays arriesgadas), hasta haber resmokeado puertas o haber droopeado el smoke a alguien que pueda hacerlo por ella. A nivel de utilidad, puede aportarse la flash al offangle izquierdo como apoyo a las ya lanzadas por el support (epecial cuidado al lanzar esta flash ante la posibilidad de que, en una mala ejecución causada por un bodyblock, pueda flashear a todo el equipo aliado).' },
        { player: 'Fedello', role: 'ENTRY', utility: 'Encargado de smokear x-box, molotovear corta, detener el push de larga, fakear con flashes una posible play en larga y, a la vez, de controlar el push del player de corta apoyando a sus compañeros de under. Tras estas funciones y con el equipo ya instalado en site de B. Deberá decididr si mantenerse pasivo o si buscar un flank por corta o dobles puertas. Es la posición más compleja de jugar debido a la variabilidad en los timings de los CTs. Requiere de mucho awareness. Puede ser mínimamente apoyado por el support en caso de que, por timing, este último detecte que ningún CT va a rotar por under.' },
        { player: 'Kevs', role: 'IGL', utility: 'Uno de los entrys deberá masterizar la flash rebotada para apoyar las flashes del support y complementar la flash de offangle del tercer entry (solo uno de los entrys tira flash). Tras la entrada y el contact, se deben buscar crossfires o angulos ventajosos durante los 12/15 segundos de "calma" hasta la disipación del primer pack de smokes. Tras ello, podrán jugarse crossfires o plays algo más agresivas, ya sea buscando un peek rápido en ventana, o buscando el push al shitf del smoke de puertas, buscando el corner de la puerta. Se puede barajar la posibilidad de depositar los smokes bajo un player que juegue en coche o en cajas para que sea éste el encargado de chainear los smokes de puertas, dejando más libertad al resto de players de jugar la ronda sin la presión del gasto de utilidad.'},
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Uno de los entrys deberá masterizar la flash rebotada para apoyar las flashes del support y complementar la flash de offangle del tercer entry (solo uno de los entrys tira flash). Tras la entrada y el contact, se deben buscar crossfires o angulos ventajosos durante los 12/15 segundos de "calma" hasta la disipación del primer pack de smokes. Tras ello, podrán jugarse crossfires o plays algo más agresivas, ya sea buscando un peek rápido en ventana, o buscando el push al shitf del smoke de puertas, buscando el corner de la puerta. Se puede barajar la posibilidad de depositar los smokes bajo un player que juegue en coche o en cajas para que sea éste el encargado de chainear los smokes de puertas, dejando más libertad al resto de players de jugar la ronda sin la presión del gasto de utilidad.' }
      ],
    },
    {
      side: 'T',
      name: 'Mid to B',
      description: 'En esta play jugamos con un push under de tres jugadores, apoyado por smoke y molotov a corta para frenar cualquier tipo de avance CT. Una vez dominada esta zona, dos de esos players esperarán el setup de utilidades del support, mientras que el tercero regresará sobre sus pasos al shift para buscar la pinza sobre el CT de B site. El support lanzará un smoke CT seguido de una popflash mid para facilitar la entry, e inmediatamente después, atravesará double doors para centrarse casi exclusivamente en detener cualquier intento de smoke push por parte de los CTs. El player de la pinza deberá jugar inteligente, logrando atraer la atención del player de B site, pero manteniéndose vivo el máximo tiempo posible para que el CT tenga que tomar la decisión de aimear a upper o a ventana/puertas. Finalmente, el lurker se moverá en el momento en el que las utilidades de mid se disparen, y tratará de apoyar al support para que este pueda quedar liberado y correr hacia site. Resmokear CT y esconderse en x-box o en dobles puertas es una opción interesante una vez la bomba se encuentre en el site. ',
      minimaps: ['/assets/plays/Dust2_T_MidToB.webp'],
      timing: [
        { action: 'Fake bombsite B con utility', seconds: 0 },
        { action: 'Split 2 jugadores por A Bananas', seconds: 5 },
        { action: 'Entry por A Long con flash', seconds: 10 },
        { action: 'Rotación de Mid a A si se rompe', seconds: 15 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Tras la caída del smoke a mid, el objetivo es alcanzar la posición de x-box -previo paso por larga lanzando una flash de fake- apoyando a los players de under con nade o molotov a corta (en caso de tener el mejor spawn, es posible lanzar el molotov x-box). Al llegar los players a sus posiciones, lanzará el smoke CT y la popflash mid para entrar en dobles puertas. Su función desde ese momento en adelante será holdear el smoke de CT previniendo cualquier intento de push, y calleando posibles rupturas de smoke con nades. Esta posición se mantendrá hasta que el lurker le de el relevo (esta casuística puede no llegar a darse), momento en el que decidirán si jugarán un crossfire o si Parca trata de alcanzar B site.' },
        { player: 'Dida', role: 'AWPER', utility: 'Encargada de pushear under y lanzar utilidad de impacto a corta. Será una de las entrys por dobles puertas tras la popflash. En caso de lograr la kill y conquistar B site, tendrá que estar atenta al timing del smoke de CT para resmokearlo desde window. En caso de llevar AUG, es posible plantear plays agresivas desde ventana o desde el boost de ventana.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'Como lurker, será el encargado de lanzar el humo de x-box y el molotov corta para denegar visión y prevenir pushes. Tras ello, se colocará en los alrededores de topmid para prevenir el temido push del player de larga. Una vez las utilidades de mid esten en marcha, Fedello volverá a activarse buscando posiciones más proactivas, ya sea por corta o ya sea por dobles puertas apoyando al support. En caso de haber recibido un segundo smoke en T spawn, será el encargado de resmokear CT.' },
        { player: 'Kevs', role: 'IGL', utility: 'Principal entry de dobles puertas. Tras su utilidad de impacto a corta su función será la de abrir el mapa, ya sea con el duelo de under o con los duelos de mid. En caso de que el spawn lo permita, es recomendable que dropee su smoke al lurker para asegurar más tiempo de bloqueo en CT tras apretar el trigger. Más allá de eso, libertad para jugar de muchas formas distintas.' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Peter y Kike tienen perfiles bastante distintos como players, pero ambos, cada uno en su estilo, pueden ser eficaces como pinzas. Con Peter aseguraremos que la atención del CT esté puesta en él, mientras que con Kike no tendremos tanta presencia, pero sí más probabilidades de mantenerse vivo durante largos períodos de tiempo. Para cualquiera de los dos perfiles, es fundamental asegurar que el CT jamás pueda quedar apostado en cajas (posición más fuerte de todo el site). Cumplido ese trabajo, es muy importante la comunicación de los spots limpios para que los players de mid entren con más garantías. Especial cuidado con permitir al CT jugar un duelo desde cerca y darle la oportunidad de que, en caso de perderlo, pueda refugiarse en upper.' },
      ],
    },
    {
      side: 'T',
      name: 'Split A',
      description: 'Esta play está basada en la velocidad de ejecución. Consta de dos players que juagrán corta y tres que jugarán larga. Los players que acaben por ir corta serán los encargados de lanzar la utilidad early round, que estará compuesta por un smoke x-box, un molotov corta y dos flashes de palmera. Tras esta utilidad, correrán por corta jugando el dos contra uno contra el CT, que tendrá que decidir si tomar el duelo o si hgastar un smoke defensivo. En caso de recibir smoke defensivo, debe prepararse una nade para disipar el humo, lanzada un poco antes de la llegada al cross de CT por parte de los players de larga. Por su parte, los players de larga tendrán por tarea tomar el duelo de larga, flashear site y smokear el cross de CT (a ser posible, la variante deep de dicho smoke). Con el smoke deep la intención es plantar para larga y jugar el postplant desde la esquina de site, gandalf, backsite, coche o larga, tratando de resmokear, preferiblemente, corta. La lógica y la configuración de players dependerá en gran medida del número de supervivientes tras lograr el plante. Cuantos menos hayan sobrevivido, más recomendable será la migración hacia larga. Un detalle fundamental: la bomba ha de plantarse en la parte superior de la caja orientada a larga. En caso contrario, corremos el riesgo de que el CT pueda defusarla desde detrás de la propia caja, haciendo inútiles los esfuerzos de los players de larga por evitarlo.',
      minimaps: ['/assets/plays/Dust2_T_SplitA.webp'],
      timing: [
        { action: 'Fake bombsite B con utility', seconds: 0 },
        { action: 'Split 2 jugadores por A Bananas', seconds: 5 },
        { action: 'Entry por A Long con flash', seconds: 10 },
        { action: 'Rotación de Mid a A si se rompe', seconds: 15 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Todos los players deben saber jugar en ambas posiciones en esta play, y deben saber lanzar consistentemente el smoke x-box y el molotov corta, además de conocer el lineup del smoke deep cross. Esto se debe a que esta play es dependiente de un spawn favorable, y las posiciones de corta y larga se barajarán en función del RNG de dichos spawns.' },
        { player: 'Dida', role: 'AWPER', utility: 'Todos los players deben saber jugar en ambas posiciones en esta play, y deben saber lanzar consistentemente el smoke x-box y el molotov corta, además de conocer el lineup del smoke deep cross. Esto se debe a que esta play es dependiente de un spawn favorable, y las posiciones de corta y larga se barajarán en función del RNG de dichos spawns.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'Todos los players deben saber jugar en ambas posiciones en esta play, y deben saber lanzar consistentemente el smoke x-box y el molotov corta, además de conocer el lineup del smoke deep cross. Esto se debe a que esta play es dependiente de un spawn favorable, y las posiciones de corta y larga se barajarán en función del RNG de dichos spawns.' },
        { player: 'Kevs', role: 'IGL', utility: 'Todos los players deben saber jugar en ambas posiciones en esta play, y deben saber lanzar consistentemente el smoke x-box y el molotov corta, además de conocer el lineup del smoke deep cross. Esto se debe a que esta play es dependiente de un spawn favorable, y las posiciones de corta y larga se barajarán en función del RNG de dichos spawns.' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Todos los players deben saber jugar en ambas posiciones en esta play, y deben saber lanzar consistentemente el smoke x-box y el molotov corta, además de conocer el lineup del smoke deep cross. Esto se debe a que esta play es dependiente de un spawn favorable, y las posiciones de corta y larga se barajarán en función del RNG de dichos spawns.' },
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