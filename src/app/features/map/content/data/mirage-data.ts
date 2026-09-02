import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'mirage',
  title: 'Ideas Clave de Mirage',
  ideas: [
    {
      heading: 'Importancia negociable de mid',
      text: '.',
    },
    {
      heading: 'A Site como centro neurálgico',
      text: 'E.',
    },
    {
      heading: 'Importancia del lurkeo',
      text: '.',
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
      description: '.',
      minimaps: ['/assets/plays/Mirage_T_ExecuteB.webp'],
      timing: [
        { action: 'Smoke apartments y connectors', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: 'Execute B desde Mid', seconds: 10 },
        { action: 'Plant en B con cobertura', seconds: 15 },
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
      minimaps: ['/assets/plays/Mirage_T_SplitA.webp'],
      timing: [
        { action: 'Smoke apartments y connectors', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: 'Execute B desde Mid', seconds: 10 },
        { action: 'Plant en B con cobertura', seconds: 15 },
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