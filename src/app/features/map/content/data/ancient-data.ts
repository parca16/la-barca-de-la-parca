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
      description: 'En Esquinas destinamos tres players a mid con smokes en red room y en donut, además de dos flashes que molestan a los CTs que tratan de pelear por el espacio. Los players de mid pueden apoyarse con alguna flash, la nade rebotada en la pared de heaven y el smoke para parar el más que probable molotov de los CTs. Una vez tomado mid, la responsabilidad del shootcalling pasa a ser de uno de los players de mid (preferiblemente Kevin). En las esquinas, el player de A main debe jugar muy pasivo, esperando un push y reaccionando a la play que se lleve a cabo por mid, mientras que el player de B main tiene más responsabilidad, al tener que combinar un juego pasivo con la atención al posible push de cueva, evitando así un flank incómodo para los players de mid. En esta situación, la ronda se bifurca hacia tres posibles variantes:',
      minimaps: ['/assets/plays/Ancient_T_Esquinas.webp'],
      timing: [
        { action: 'Smokes ventana B', seconds: 0 },
        { action: 'Flash entrada B', seconds: 3 },
        { action: '3 jugadores execute', seconds: 8 },
        { action: 'Plant B con cobertura', seconds: 12 },
      ],
      variants: [
        {
          label: 'Variante de donut',
          text: 'La ronda se mueve hacia A site. Los Ts pueden jugar con un smoke deep donut y coinflipear un push por dentro o fuera del donut al shift ante la imposibilidad del CT para defenderlo todo. También se puede jugar con el molotov para sacar al CT de detrás de donut o, simplemente, jugar al aim aprovechando la superioridad numérica. Si se callea la variante de donut, el player de la esquina de A tiene dos tareas: a) molotovear la caja de baksite y b) limpiar el spot de boost. Con esas dos posiciones limpias, los players de donut pueden entrar al site con las únicas preocupaciones de CT y triples.',
        },
        {
          label: 'Variante de cueva',
          text: 'Esta play generalmente tiene lugar en caso de que la esquina de B haya encontrado alguna kill en el push rampa o hayan habido calls de rotaciones prematuras hacia A. En este caso, los players de mid se centrarán en entrar por cueva, mientras que la esquina de A se centrará en proveer de utilidad con molotov a ninja o larga, flashes al site y/o smokes a, preferiblemente, corta. Nótese que el player de la esquina de A ya habrá gastado su smoke earlyround al usarlo en topmid, por lo que uno de los players de mid tendrá que habérselo dropeado al principio.',
        },
        {
          label: 'Variante de red room',
          text: 'La variante más high risk high reward de las tres variantes. El pusheo de redroom obliga a los players de mid a atravesar una zona plagada de offangles y a exponerse, en caso de llegar hasta sniper, a ángulos muy desventajosos para con los CTs (hueco de la caja de highway). En caso de ganar dichos duelos, conviene acelerar la ronda para evitar encontronazos incómodos con las rotaciones desde los sites, buscando crear una pinza con una de las esquinas.',
        },
      ],
      roles: [
        { player: 'Parca', role: 'Lurker', utility: 'Esquina de A (intercambiable con B). Al empezar la ronda, es imperativo el smoke donut y la flash mid. Requiere de juego con el timing en el posible push del CT y buenos preaims a los ángulos del donut de A main. Se debe tener presente el juego de sombras al acercarse al umbral de A site para no revelar información al equipo CT. Al limpiar boost, tener en cuenta que el player de boosteo siempre tendrá ventaja al poder prever el movimiento del T al ver su sombra, por lo que amagar con un AD rápido en lugar de tomar el duelo directamente puede ser recomendable.' },
        { player: 'Dida', role: 'Lurker', utility: 'Esquina de B (intercambiable con A). Al empezar la ronda, es imperativo el smoke top mid y la flash mid. Requiere de juego con el timing del posible push de rampa, y especial atención a cueva. En caso de callearse la variante de cueva, es de suma importancia conocer lineups de utilidades de apoyo (flash site que blindee larga y/o smoke corta) e impacto (nade de Francia y/o molotov ninja) para aumentar al máximo las posibilidades de entry, así como tener el awareness suficiente para pushear rampa al mismo timing que el push de cueva.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'Al no ser Fedello un entry puro como pueden ser Peter o Kevs, puede jugar de dos formas: entrando al contact junto con sus dos compañeros, o jugar desde el pilar previo a L setupeando con flashes la entry. Una vez en mid será de vital importancia jugar muy pegado a sus compañeros, buscando duelos y trades. Llegados a este punto, puede ser interesante buscar lineups desde mid para smokear zonas clave de alguno de los sites que funcionen como apoyo a la entry o como fake.' },
        { player: 'Kevs', role: 'ENTRY', utility: 'Entry principal en mid junto con Peter o Kike. Quien vaya primero debe llevar pinchada la nade para el push de los CTs, mientras que el segundo tendrá pinchado el smoke para apagar el más que probable smoke. Una vez en mid, Kevs será el encargado del shootcalling y el planteamiento de ronda. En caso de enfrentarse a un planteamiento pasivo por parte de los CTs, se recomienda resmokear red room para denegar información y elegir percutir entre donut o cueva.' },
        { player: 'Peter/Kike', role: 'ENTRY', utility: 'Entry principal en mid junto con Kevs. Quien vaya primero debe llevar pinchada la nade para el push de los CTs, mientras que el segundo tendrá pinchado el smoke para apagar el más que probable smoke. Una vez en mid, la intención es la de jugar muy juntos, buscar duelos en los que pueda imperar la superioridad numérica y tener en la pool de utilidades lineups para limpiar donut o las esquinas de cave, así como un smoke a redroom consistente que no popee de formas extrañas contra las escaleras de topmid. En caso de enfrentarse a un planteamiento pasivo por parte de los CTs, se recomienda resmokear red room para denegar información y elegir percutir entre donut o cueva.' },
      ],
    },
    {
      side: 'T',
      name: 'Execute A',
      description: 'En el execute A la lógica de la ronda se simplifica al máximo. Buscamos esperar a que se disipe el smoke de A main, ejercer una presencia ficticia en banana o en mid (en mid se recomienda el smoke de donut frente al de topmid para "obligar" al CT salir de donut y alejarlo del punto de contacto lo máximo posible), y ejecutar con smokes a CT y donut, flashes site y molotovs a backsite y/o triples. Los puntos más complejos de limpiar con consistencia son boost y templo. Al ser un site muy retakeable, se recomienda a) o chasear a cualquier player que se intente replegar para jugar un retake, o b) tratar de jugar contra donut, que constituye la zona más ventajosa para jugar un postplant. Se hace especialmente complicado lurkear en esta play, por lo que es recomendable que la única "nota discordante" de la ronda sea el encargado de lanzar utilidades, tanto por su lejanía con respecto a sus compañeros como por su facilidad para llegar a L y buscar un timing en el cual se pueda cortar la rotación por cueva. Tras la entry quedarán en el equipo, como mucho, un total de dos smokes. Éstos se gastarán, preferiblemente, en resmokear CT.',
      minimaps: ['/assets/plays/Ancient_T_ExecuteA.webp'],
      timing: [
        { action: 'Smoke Mid y Banana', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: '3 jugadores execute B Main', seconds: 10 },
        { action: 'Plant B', seconds: 20 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Encargado de lanzar los smokes de CT y donut. Importante asegurar que el smoke dropeado esté bien colocado para evitar delay entre los pops de los smokes. Tras su lanzamiento, su función pasará a ser la del lurker, tratando de cancelar rotaciones por cueva, denegando cualquier tipo de flank por A main y, de ser el caso, luchar por el control de donut tras pushear mid.' },
        { player: 'Dida', role: 'AWPER', utility: 'Encargada de smokear mid early round y lanzar alguna flash suelta a mid como amago. Encargada de lanzar el molotov a backsite, entrando así en tercera o cuarta posición al site, buscando trades y jugando agresiva hacia el site. Tras plante, buscar duelos en la zona de donut en caso de no haber conseguido kills durante la entry.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'Encargado de molotovear X-box earlyround (en caso de tener mal spawn esta tarea puede recaer en otro player). Tras ello, llegar a posición de A main y encargarse de flashear site. Recomendable usar doble flash al mismo spot. Tras ello, jugar desde triples o donut, y asegurarse de resmokear CT en caso de ser necesario' },
        { player: 'Kevs', role: 'IGL', utility: 'La entry será realizada tras el pop de la flash. Especial atención a boost y al peek de templo (recomendable jumpspotear si se ha detectado presencia de AWP o similares). Se recomienda realizar la entry cerca de la pared de donut para evitar spameos incómodos desde CT y para dificultar el peek cerrado al hipotético player de triples. En caso de que la ronda lo permita (como entrys se suele preferir el arma en mano), se puede contemplar la posibilidad de molotovear triples.' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'La entry será realizada tras el pop de la flash. Especial atención a boost y al peek de templo (recomendable jumpspotear si se ha detectado presencia de AWP o similares). Se recomienda realizar la entry cerca de la pared de donut para evitar spameos incómodos desde CT y para dificultar el peek cerrado al hipotético player de triples. En caso de que la ronda lo permita (como entrys se suele preferir el arma en mano), se puede contemplar la posibilidad de molotovear triples.' },
      ],
    },
    {
      side: 'T',
      name: 'Split B',
      description: 'La play con el setup más sencillo de aplicar. Consta de dos players cueva, dos rampa y uno medio. La naturaleza de la play es rápida, con un push full W por banana hasta tomar cheetah. En el momento en el que se produce la conquista en ese espacio, se setupeará el site con smokes a corta y larga, molotov a ninja y flashes al site. Es probable encontrarse con smokes en rampa, pero será responsabilidad de los players orientados a esa posición a romperlo con nades al timing que los jugadores de cheetah entran por el umbral de cueva. La jugada puede reforzarse con un molotov earlyround al umbral de cueva para anular el ángulo del AWP en esa zona. La únicas dos opciones en las que esta play se detiene son smokes lanzados a cueva y a rampa a la vez. En ese caso. Los jugadores de cueva permanecen en la posición aunque adoptando un enfoque más pasivo, mientras que los players de rampa rotan hacia mid o hacia B. El player de mid funcionará como lurker/support, pudiendo utilizar earlyround utilities de impacto (nade rebotada y/o molotov X-box) para a) generar algo de daño barato, y b) detener el push rápido de los CTs por banana. Esta denegación espacial puede verse reforzada por los players de banana lanzando flashes mid en carrera antes de la entrada a cueva. En postplant, en caso de duda, la zona que se resmokea es, salvo contadas excepciones, corta.',
      minimaps: ['/assets/plays/Ancient_T_SplitB.webp'],
      timing: [
        { action: 'Smoke Mid y Banana', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: '3 jugadores execute B Main', seconds: 10 },
        { action: 'Plant B', seconds: 20 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Encargado de lanzar el setup de smokes a corta y larga, seguidamente molear ninja, y flashear site de tal forma que sea imposible para los players de cave flashearse. Tras ello, deberá entrar al site para cerrar el split con especial cuidado al push del smoke de corta y al posible player apostado cerca del smoke de rampa.' },
        { player: 'Dida', role: 'AWPER', utility: 'Encargada de molotovear cueva en caso de callearse, demás de holdear el posible push de rampa. Se puede contemplar la posibilidad de boostearla para, tras lanzar el setup de smokes, poder ver al hipotético player de larga pasarse el smoke y conseguir una kill gratis. A su vez, será la encargada de nadear el smoke o, en caso de no haberlo, utilizar la nade de Francia para conseguir algo de daño barato. Pueden buscarse lineups para flashes de apoyo al site, aunque también pueden guardarse para plays agresivas hacia highway en el postplant.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'El lurker del equipo se encargará de generar presencia en en mid. Tras sus utilidades, debe tomar una decisión: o seguir jugando mid detrás del smoke y tratando de buscar un timing que le permita atrapar a los CTs por la espalda, o rotar inmediatamente tras haber lanzado sus utilities de impacto hacia T spawn, con el objetivo de llegar a dobles puertas y, desde allí, resmokear ya sea corta o larga, flashear el site y jugar desde el offangle de dobles puertas para cazar a cualquier CT que haya pusheado banana buscando un flank por rampa.' },
        { player: 'Kevs', role: 'IGL', utility: 'Encargado de realizar el primer contacto de la ronda. Es recomendable que uno de los entrys dropee su smoke en dobles puertas ante la poca utilidad que este recurso tiene en su función como entry fragger. El otro deberá llevarlo pinchado para apagar el molotov a banana (muy habitual en high elo). Recomendable comprar doble flash (mid y/o cueva). A pesar de que la play es rápida, los entrys son los que marcan el timing y tienen la capacidad para delatear el execute unos segundos si detectan la posibilidad de que existan players apostados en los offangles de cueva, quienes requieren de una limpieza algo más minuciosa.' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Encargado de realizar el primer contacto de la ronda. Es recomendable que uno de los entrys dropee su smoke en dobles puertas ante la poca utilidad que este recurso tiene en su función como entry fragger. El otro deberá llevarlo pinchado para apagar el molotov a banana (muy habitual en high elo). Recomendable comprar doble flash (mid y/o cueva). A pesar de que la play es rápida, los entrys son los que marcan el timing y tienen la capacidad para delatear el execute unos segundos si detectan la posibilidad de que existan players apostados en los offangles de cueva, quienes requieren de una limpieza algo más minuciosa.' },
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