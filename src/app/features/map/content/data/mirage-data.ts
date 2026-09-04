import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'mirage',
  title: 'Ideas Clave de Mirage',
  ideas: [
    {
      heading: 'Importancia negociable de mid',
      text: 'Mid es el corazón de Mirage. Como Ts, queremos tener control de mid, ya sea real o ficticio. Tanto en splits como en esquinas, nos interesa dominar esta zona con mucha utilidad early para construir la ronda. Da acceso a una gran variedad de plays, flanks y duelos ventajosos. Como CTs, nuestra primera intención es pelear por este espacio, pero en caso de que los Ts inviertan muchos recursos en su dominio (3 players), será de vital importancia detectarlo rápido y reaccionar con dos tipos de jugada: a) counter smokes para ralentizar el avance de los Ts, y b) jugadas agresivas en ambas esquinas, tanto en apps como en palace, asegurando así postplants mucho más placenteros y sencillos de jugar.',
    },
    {
      heading: 'A Site como centro neurálgico',
      text: 'El site más atacado con mucha diferencia con respecto a B. Al ser tan abierto, facilita en gran medida el trabajo de los Ts para abrirlo, pero dificulta mucho su cierre. Tras el plante, los Ts se ven prácticamente obligados a jugar al aim al haber gastando un gran porcentaje de sus recursos en la propia entry. Como CTs, queremos aprovechar esta condición y, en caso de detectar una entry fuerte, priorizar la consecución de una kill rápida y un repliegue, o el uso de utilidad para conseguir daño sobre los plantes más default. Puede valorarse la utilzación de nades para romper el smoke de jungla y atrapar a Ts fuera de posición, así como usar un smoke adelanteado para jugar desde la zona de firebox con garantías. Como Ts, por otra parte, buscamos no quedarnos estáticos en el site, y buscar una vía de escape, priorizando tickets una vez se disipe el smoke.',
    },
    {
      heading: 'Importancia del lurkeo',
      text: 'Junto con Anubis, Mirage es posiblemente el mapa en el que más importancia cobra la figura del lurker. Al ser un mapa con muchos espacios abiertos y con bastante verticalidad, el lurker tiene muchas opciones para sonidear y jugar con los timings de manera consistente. La masterización de dichos movimientos es uno de los factores que puede provocar un aumento significativo en el winrate de NTR en este mapa.'
    },
  
  ],
  calloutsImage: '/assets/callouts/Mirage.webp',
  strategies: [
    {
      side: 'T',
      name: 'Esquinas',
      description: 'Esta play tiene especial valor contra equipos nerviosos, que buscan la agresividad incluso cuando no toca. La clave jugar de una forma antitética a la lógica CT, es decir, jugar reactivos. Tras el smoke ventana earlyround. Los players de mid esperarán en posiciones de hold el movimiento de los CTs. Ya sea una ruptura del smoke de window, ya sea un AD para coger info por connector, o ya sea un peek agresivo por corta. Es importante resmokear window en caso de no haber movimiento para jugar con la falta de información del rival. Las esquinas, por otro lado, también juegan pasivas, sonideando y dando toda la información que puedan obtener del taconeo en los sites. Con una kill en corta o en connector, la ronda se vuelca sobre uno de los sites, mientras que si la kill es en window, la orientación de la ronda girará en torno a las ventajas que las esquinas puedan haber obtenido jugando con los timings y el más que posible movimiento de los CTs de los sites. Existen dos puntos ciegos en esta play: el push de rampa al shift y la imposibilidad de la esquina de B de cubrir el push de apps y el push de under a la vez, pero es un riesgo que podemos asumir dadas las virtudes de la play.',
      minimaps: ['/assets/plays/Mirage_T_Esquinas.webp'],
      timing: [
        { action: 'Smoke apartments y connectors', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: 'Execute B desde Mid', seconds: 10 },
        { action: 'Plant en B con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Encargado de lanzar el primer smoke de window y unirse lo más rápido que pueda a sus compañeros de mid. Es especialmente interesante el uso de AWP en este tipo de rondas, debido al impacto que puede generar en posiciones de hold. Será el encargado de shotcallear a partir del avance de la ronda y de monitorear la posición enemiga a partir de la información y los inputs que reciba.' },
        { player: 'Dida', role: 'AWPER', utility: 'La esquina de A. En earlyround es recomendable jugar pasiva, al hold del push de palace y sonideando cualquier cosa que pueda estar pasando por rampa. En caso de no escuchar taconeo pero escuchar una flash popear cerca de rampa, debe poner sobre aviso a sus compañeros para contemplar la posibilidad del push al shift y respetar dicho timing. En caso de escuchar push, la ronda gita automáticamente hacia A, al contar con un defensor menos que, además, está spoteado. En caso de tener localizado a algún CT por sonideo, es posible buscar la play agresiva. En caso de conseguir kill, es imperativo gastar smoke en jungla para facilitar la entry de los players de mid por connector.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'La esquina de B. Más compleja de jugar debido a la dificultad de lograr un lurkeo efectivo en B site. Puede, sin embargo, lograr spoteos sencillos en caso de escuchar a un CT jumpspotear en van. En dicho caso, sabemos que si conseguimos la kill en corta, el player restante de B no tiene capacidad de sorprender al estar totalmente trackeado. En caso de que la ronda se dirija a A site, es interesante buscar plays por under cortando rotaciones desde corta.' },
        { player: 'Kevs', role: 'IGL', utility: 'Uno de los players de mid. Al ser uno de los dos primeros contactos deberá lanzar el molotov connector para prevenir rushes y prestar mucha atención a una posible nade al smoke de mid por parte de los CTs. A partir de ahí, arma en mano, resmoke en ventana y jugar al aim.' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Uno de los players de mid. Al ser uno de los dos primeros contactos deberá lanzar el molotov connector para prevenir rushes y prestar mucha atención a una posible nade al smoke de mid por parte de los CTs. A partir de ahí, arma en mano, resmoke en ventana y jugar al aim.' },
      ],
    },
    {
      side: 'T',
      name: 'Execute A',
      description: 'Una de las plays más clásicas del equipo NTR. Un execute de 3 smokes en jungla, stairs y tickets, acompañado por molotov underpalace y flashes al site. A pesar de que es un entry muy sólido, el retake se hace relativamente sencillo para los CTs al unicamente contar los Ts con una unidad de smoke (gastamos un smoke earlyround en topmid para fingir control de mid). Dicha unidad será utilizada, preferiblemente, en jungla ante la ventaja de los Ts de conseguir un headshot sencillo contra el player de stairs si decide peekear. La intención de los Ts es múltiple en esta situación. Por un lado, queremos jugar un postplant pausado para que el lurker tenga tiempo de flankear y conseguir ventajas desde under y/o connector; por otro, queremos replegarnos a zonas de rampa o palace; finalmente, queremos utilizar popflashes para luchar por la zona de tickets. En caso de conseguir flashear esta zona con éxito al timing de la desaparición del smoke de tickets, podremos aumentar mucho nuestro ratio de éxito en el postplant de A.',
      minimaps: ['/assets/plays/Mirage_T_ExecuteA.webp'],
      timing: [
        { action: 'Smoke apartments y connectors', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: 'Execute B desde Mid', seconds: 10 },
        { action: 'Plant en B con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Encargado de shotcallear el timing del execute. Lanzará smoke de jungla y flash site. Tras ello, lanzará molotov a firebox y luchará por el control de site arma en mano. Al haber gastado su flash, será uno de los principales candidatos para recibir las popflashes a tickets una vez disipado el smoke.' },
        { player: 'Dida', role: 'AWPER', utility: 'Encargada de lanzar el smoke de stairs y la flash site. Tras ello, será una de las principales entrys por rampa, priorizando el arma en mano en todo momento y estando especialmente atenta a los más que probables pushes de los smokes de jungla y escaleras.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'El lurker de la ronda. Encargado de lanzar el smokle topmid. Puede decidir entre usar el smoke de topmid para pasar hasta carro o plantear una ronda más lenta metiéndose por under. En cualquiera de los dos casos, el corte de rotaciones por corta se vuelve algo absolutamente imprescindible en un postplant tan demandante como lo es el A site de Mirage. Además de buen timing, su posición exige también soltura de movimientos para, en caso de ser preciso, poder subir a jungla con facilidad.' },
        { player: 'Kevs', role: 'IGL', utility: 'Encargado de crear el segundo punto de contacto en la ronda y de lanzar molotov a underpalace. Además del firepower que se le presupone, el player debe estar especialmente atento a resmokear la zona de jungla, al ser el suyo el último smoke que queda por jugar en la ronda.Es otro de los candidatos a lanzar la popflash de tickets.' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Encargado de lanzar el smoke de tickets. Tras ello, será uno de las principales entrys por rampa, priorizando el arma en mano en todo momento y estando especialmente atento a los más que probables pushes de los smokes de jungla y escaleras. Serña uno de los encargados de popflashear tickets una vez plantada la bomba.' },
      ],
    },
    {
      side: 'T',
      name: 'Execute B',
      description: 'Una play de nicho ante las dificultades que supone ejecutarla con consistencia debido al cuello de botella de la zona de apps. Consta de un setup de tres smokes (window kitchen, kitchen y corta), molotov van y flashes al site. Es de vital importancia que los dos primeros entrys traten de saltar por el ventanuco para cortar el site lo más rápido posible. Esta jugada se calleará en caso de haber detectado un vuelco del setuo de los CTs sobre a site. Requiere de un smoke a topmid o a window para mantener un mínimo de control sobre mid. El postplant es más sencillo de jugar debido a la multiplicidad de spots y offangles repartidos por todo el site, aunque no por ello puede calificarsse como sencillo.',
      minimaps: ['/assets/plays/Mirage_T_ExecuteB.webp'],
      timing: [
        { action: 'Smoke apartments y connectors', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: 'Execute B desde Mid', seconds: 10 },
        { action: 'Plant en B con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Encargado de la entry al site y de dropear el smoke en la posición del support. Utilizará la popflash a farola para asegurar el blind tras el salto por ventanuco. Su principal focus ha de ser alcanzar backsite lo más rápido posible y cortar el site. ' },
        { player: 'Dida', role: 'AWPER', utility: 'Encargada del lanzamiento de los smokes de corta, window kitchen y kitchen, así como de flashear site una vez finalizado dicho lanzamiento. En fase de postplant, se quedará subida a apps buscando kills en corta y/o window kitchen.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'Lurker de la ronda. Será el encargado de smokear window o topmid y de jugar ya sea por under o por topmid. Su función es la de cortar rotaciones por corta (en caso de haber elegido topmid) o por kitchen (en caso de lograr un boosteo efectivo a jungle o un flank por connector).' },
        { player: 'Kevs', role: 'IGL', utility: 'Tercer entry, se encargará de tener el smoke pinchado en la mano y apagar el más que posible molotov apps. Tras ello, saltará junto con sus compañeros al site buscando un plante ya sea para corta o para apps.' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Encargado del entry. Se encargará de dropear smoke en la posición del support, así como lanzar molotov van una vez alcanzado B apps. Tras ello, saltará por el ventanuco (si es posible) buscando alcanzar backsite.' },
      ],
    },
    {
      side: 'T',
      name: 'Split A',
      description: 'En esta play buscamos atacar al site de A aislando al player de jungla y jugando contra el site desde rampa (o palace) y connector. Es una play rápida que requiere de buena coordinación de utilities, timings de entry correctos y awareness sobre posibles pushes de smokes. En mid caerán earlyround smoke window y smoke corta, sumado a una flash topmid dirigida al posible player que rushee mid. A estas utilities le acompañarán un molotov connector y una flash under en caso de que los players de mid hayan decidido splitearse en un 2-1 para acabar confluyendo en la entry a connector. Una parte importante de la play es saber que la capacidad de trade es fundamental para asegurar el éxito de su ejecución. Sin embargo, ante la multiplicidad de factores que afectan al devenir de la ronda, se plantean una serie de variantes:',
            variants: [
        {
          label: 'Variante default',
          text: 'No existe split en los players de mid. La ronda se desarrolla dentro de la normalidad de parámetros predefinidos. La entry por connector acompañada por el smoke jungla se combina con la entrada al shift de los players de rampa y se logra un plante hacia corta exitoso.',
        },
        {
          label: 'Variante lenta',
          text: 'En caso de haber detectado el lanzamiento recurrente de un smoke defensivo a connector por parte de los CTs, la ronda cambiará de ritmo y de naturaleza. Buscaremos, por un lado, splitearnos en mid con un player por under y, tras la caída del smoke defensivo a connector por parte de los CTs, trataremos de hacer un silent boost al lurker para jugar una ronda más pausada desde jungla. A ello se le sumará el spliteo de los players de rampa, dividiéndose entre rampa y palace para lograr más control de mapa en esos segundos de incertidumbre. Los CTs no podrán permitirse mantener la falta de información sobre mid durante muchos segundos, por lo que buscar holds sobre corta desde banco, o holds desde connector a escaleras/jungla puede ser recomendable una vez nuestro lurker haya alcanzado la posición de jungla. Existe la vulnerabilidad del push TV, pero es un riesgo con el que podemos vivir.',
        },
       
      ],
      minimaps: ['/assets/plays/Mirage_T_SplitA.webp'],
      timing: [
        { action: 'Smoke apartments y connectors', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: 'Execute B desde Mid', seconds: 10 },
        { action: 'Plant en B con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Encargado de setupear los smokes de window y corta, así como la flash site y, a posteriori, el smoke jungla. Requiere de velocidad de dedos a la hora de lanzar la utilidad para que los players de mid tengan el timing a su favor. Es de vital importancia jugar safe en la zona de rampa para evitar la pérdida de la bomba. Fundamental limpiar con consistencia la esquina de rampa. En caso de smoke, se recomienda o pasarlo al shift o romperlo con una nade.' },
        { player: 'Dida', role: 'AWPER', utility: 'Encargada de dropear smoke en la escalera del andamio. Puede optar por rampa o palace en función del playstyle de los CTs, pero es recomendable tener preferencia por rampa para no abandonar la bomba en caso de rush o push por parte de los CTs. Fundamental limpiar con consistencia la esquina de rampa. En caso de smoke, se recomienda o pasarlo al shift o romperlo con una nade.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'Uno de los players de mid. Puede ser el encargado, según spawn, de lanzar molotov connector. Puede splitearse hacia under previo call si la configuración CT así lo requiere. Una vez llegados al punto de contacto de connector, se vuelve fundamental jugar agresivos, juntos y con el arma en la mano. En caso de plantear una variante lenta, será el encargado del silent jump a jungla.' },
        { player: 'Kevs', role: 'IGL', utility: 'Uno de los players de mid. Puede ser el encargado, según spawn, de lanzar molotov connector. Una vez llegados al punto de contacto de connector, se vuelve fundamental jugar agresivos, juntos y con el arma en la mano. En caso de recibir un RNG favorable, puede ser el encargado de insta smokear window.' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Uno de los players de mid. Puede ser el encargado, según spawn, de lanzar molotov connector. Una vez llegados al punto de contacto de connector, se vuelve fundamental jugar agresivos, juntos y con el arma en la mano. En caso de recibir un RNG favorable, puede ser el encargado de insta smokear window.' },
      ],
    },
    {
      side: 'CT',
      name: 'Plays en contrucción',
      description: '.',
      minimaps: [],
      timing: [
        { action: 'Pregame en posiciones', seconds: 0 },
        { action: 'AWP Mid con cobertura', seconds: 5 },
        { action: 'Rotación rápida si hay presión', seconds: 8 },
        { action: 'Controlo B Main si no hay presión', seconds: 20 },
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