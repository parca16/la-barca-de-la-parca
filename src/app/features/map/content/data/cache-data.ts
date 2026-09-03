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
      description: 'En esta play jugaremos una disposición similar a la de las esquinas de Mirage, con tres players mid, y dos en cada una de las esquinas del mapa. Para ambos setups utilizaremos una total de dos smokes (uno connector y otro mid) y dos flashes (también a mid) para entrar con garantías, sumado a utilidad de impacto que variará en su timing en función de la variante que escojamos. El objetivo de la play es ganar espacio en el punto más importante del mapa, buscar duelos a los players de connector, xbox o sandbox, y jugar en función de las kills conseguidas. Es preferible jugar hacia B por una cuestión de distancia, pero las opciones son mucho más bidireccionales que en Mirage, donde el peso se carga sustancialmente hacia uno de los dos sites. Para esta play tenemos dos variantes principales:',
      minimaps: ['/assets/plays/Cache_T_Esquinas.webp'],
      variants: [
        {
        label:'Variante de mid',
        text: 'La opción default. Buscamos una agresión de tres de nuestros players por garage, jugando agresivos y tratando de alcanzar con la mayor brevedad posible la posición de xbox para habilitar con flashes la entrada a highway o para jugar por vent. En caso de no encontrar peeks en highway, puede contemplarse la posibilidad de shiftear el smoke de connector buscando un flank (flank muy difícil al tener que atender tanto a coche, como a CT). En esta variante la esquina de A será la encargada de molotovear sandbox. El objetivo en esta variante es velocidad.',
        },
        {label: 'Variante de boost',
          text: 'En caso de que los CTs matcheen nuestra agresividad y los duelos directos no estén reportando beneficios, usaremos la variante de boost. En esta variante no renunciamos a mid, pero sí planteamos un ataque un poco más pasivo, manteniéndonos más tiempo en posiciones de hold sin renunciar a control de mapa. No necesitamos, en este caso, un player que llegue rápido hasta xbox, y no nos molesta el hecho de que el smoke de connector se acabe disipando, pues puede generar más peeks. El molotov sandbox, en esta variante, es lanzado por el player de boost.',
        }
      ],
            
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Uno de los tres entrys de mid. Será el encargado de lanzar el smoke connector y la flash garaje. Tras ello, tratará de llegar a vent buscando duelos contra el player de xbox y habilitando con flashes al player de xbox.' },
        { player: 'Dida', role: 'AWPER', utility: 'La esquina de B, tendrá que utilizar la flash de main para denegar el peek agresivo del CT y buscar la posición de tóxico. En caso de que el equipo CT lance smoke a main, es de suma importancia tratar de ganar damas y comunicar al equipo que es posible setupear una entry sencilla ante el excesivo repliegue del equipo enemigo.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'Esquina de A. Será el encargado de flashear mid y molotovear sandbox. Tras ello, entrar en el pasillo de A main y buscar avanzar al shift, tratando de spotear enemigos o buscar algún peek a triples. Importante tener en cuenta que existe un timing por bomberos pusheando azul que permitiría a los CTs obtener un flank muy fuerte.' },
        { player: 'Kevs', role: 'IGL', utility: 'Uno de los tres entrys de mid. Será el encargado de lanzar la flash garaje. Tras ello, tendrá que decir entre ir vent con Parca o jugar con Peter/Kike alrededor del volumétrico del smoke mid.' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Uno de los tres entrys de mid. Será el encargado de lanzar el smoke mid. Tendrá que utilizar los dos smokes para jugar contra los players que busquen el duelo en mid dando uso al volumétrico del smoke y buscando el timing del pop del molotov sandbox para buscar el duelo contra el hipotético CT que haya decidido jugar ahí. Usar una flash con clic derecho encima del smoke de mid puede aumentar las posibilidades de que los duelos producidos en esta fase de la ronda sean más fructíferos.' },
      ],
    },
    
    {
      side: 'T',
      name: 'Execute A',
      description: 'Para este execute dedicaremos 3 players a la entry, 1 a la función de support y un lurker. El setup constará de dos smokes a site y a backsite, tres molotovs a triples, NBK y coche, y dos flashes al site. Complementariamente lanzaremos un smoke a mid para faiclitar la labor del lurker. No hay ningún player que tenga que tirar más de dos utilidades en este setup. La idea es cortar el site por la mitad y pelear contra aquellos que se quedan defendiendo la zona del plante. En cuanto al plante, tenemos varias opciones. La más safe es el plante default, en la esquina de las cajas de site. Es seguro, pero ineficiente de cara a un postplant. Tenemos también el plante abierto a A main, que facilita la labor de defensa de la bomba a los players de coche y main. Por último, tenemos el plante triples, que facilita la labor de los players de main y del lurker, capaz de ver la bomba desde una posición muy alejada como puede ser xbox.Las posiciones fuertes del site son, sobre todo, triples y coche. ',
      minimaps: ['/assets/plays/Cache_T_ExecuteA.webp'],
      timing: [
        { action: 'Fake B con utility', seconds: 0 },
        { action: 'Split A por Bombs', seconds: 5 },
        { action: 'Entry A Long', seconds: 10 },
        { action: 'Plant A con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Encargado de lanzar el smoke backsite y la flash site. Tras ese setup, tratará de llegar lo más pronto posible la main para ayudar en la entry o jugar el postplant ya sea desde main o desde carro.' },
        { player: 'Dida', role: 'AWPER', utility: 'Encargada de lanzar el smoke de Nina y el molotov triples. Tras ello, se encargará de hacer la entry una vez explote el molotov de Fedello. Especial cuidado con heaven y con site.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'Encargado de lurkear. Mucha libertad en esta play. Puede decidir entre apoyar a Nina en mid, presionar B main o unirse al execute en caso de detectar que no está generando el impacto deseado vía flanks.' },
        { player: 'Kevs', role: 'IGL', utility: 'Encargado de lanzar el molotov NBK y hacer la entry por main con Nina. Es importante esperar al movimiento de Peter/Kike para descartar o confirmar presencia CT en heaven, facilitando en gran medida la entry tanto si hay spoteo como si no (preaims mucho más sencillos).' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Encargado de lanzar el molotov carro y de spotear al posible player de heaven. Tras la setup, la intención es jugar aggro contra el CT de site.' },
      ],
    },
    {
      side: 'T',
      name: 'Execute B',
      description: 'En este execute jugaremos con dos entrys, un support, un lurker y un player tardío. Esta disposición responde a dos motivos. El primero es que es muy fácil alcanzar la posición de B desde mid. El segundo es que no necesitamos tanto firepowear a sabiendas de que B site suele defenderse con un player. El execute será setupeado fundamentalmente por una persona, que se encargará de lanzar smoke CT, molotov headshot, molotov site y flash site. Los entrys pueden complementar estas utilidades con flashes al site y molotov a corner. En extremadamente importante ser conscientes de que, en caso de que los CTs decidan por cuenta propia lanzar smoke main, tomar damas para tener un execute todavía más sencillo. En caso de ser posible, plantaremos abiertos para poder jugar desde damas, desde main, desde CT e incluso desde heaven (aunque es poco probable alcanzar esa posición). En caso de conseguir el site, es sencillo defenderlo al contar todavía con dos smokes que serán lanzados, preferiblemente, a CT, obligando al equipo rival a jugar por heaven (con el riesgo que eso implica), por vent (encontrándose con Nina), o por main B (pudiendo Fedello cortar rotaciones con facilidad). Es importante que los entrys se muevan al pop de la flash, dado que en este setup no hay smoke heaven y dicha flash  blindea esa posición.',
      minimaps: ['/assets/plays/Cache_T_ExecuteB.webp'],
      timing: [
        { action: 'Fake B con utility', seconds: 0 },
        { action: 'Split A por Bombs', seconds: 5 },
        { action: 'Entry A Long', seconds: 10 },
        { action: 'Plant A con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Encargado de lanzar la práctica totalidad del setup, que constará de smoke CT, molotov headshot, molotov site y flash site. Tras ello, se unirá a los entrys buscando asegurar el plante. En caso de ser posible, buscar el plante abierto (se necesita tener heaven asegurado para ello).' },
        { player: 'Dida', role: 'AWPER', utility: 'Encargada de generar un mínimo de presión en mid y de hacer menos evidente la intención de ejecutar. Conseguir la posición de vent es el objetivo principal para poder rotar rápido una vez apretado el trigger. Debe lanzar la autoflash a mid. En caso de no ser capaz de alcanzar dicha posición, debe rotar hacia B tan rápido como pueda.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'Encargado de lanzar el smoke mid y de flashear mid para apoyar el avance del player de mid. Mucha libertad en la ronda, aunque es recomendable controlar A main al menos earlyround para prevenir timings poco beneficiosos.' },
        { player: 'Kevs', role: 'IGL', utility: 'Uno de los dos entrys principales, será encargado de molear corner. En la entry, el principal focus es el site, ya que a priori, heaven, CT y headshot están deshabilitados temporalmente. El hipotético player de heaven estará deshabilitado unos 3 segundos tras la flash, por lo que es recomendable lateralizar el movimiento buscando posiciones de underheaven.' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Uno de los dos entrys principales, será encargado de flashear site. En la entry, el principal focus es el site, ya que a priori, heaven, CT y headshot están deshabilitados temporalmente. El hipotético player de heaven estará deshabilitado unos 3 segundos tras la flash, por lo que es recomendable lateralizar el movimiento buscando posiciones de underheaven.' },
      ],
    },
    {
      side: 'T',
      name: 'Rush B',
      description: 'Para el rush B, es fundamental conocer la flash de B main y conseguir el control de damas a través de los players de mid. En una eco o una ronda con SMGs, corremos el riesgo de ser detenidos por el player de headshot en caso de que tenga buena habilidad mecánica, pero esa condición se neutraliza si somos capaces de entrar desde main y desde damas de manera coordinada. Por ese motivo, planteamos el rush con dos players mid que buscarán el vent lo antes posible gracias al cover que proporciona el smoke. El timing de entrada de vent y main es muy similar, por lo que no habrá que plantear delays sustanciales. En caso de smoke main, la idea de los players de main es a) pasárselo hacia corner para salir cubiertos de headshot y con buenas opciones contra el player de heaven, o b) salir por damas (opción más safe pero más arriesgada por el posible push del smoke al shift por parte de los CTs). En un escenario ideal en el que los players que no han gastado smoke siguen vivos en el postplant, pueden distribuirse los resmokes de tal forma que el site quede virtualmente cerrado con dos resmokes a CT (41 segundos) y un smoke a heaven (22 segundos).',
      minimaps: ['/assets/plays/Cache_T_RushB.webp'],
      timing: [
        { action: 'Fake B con utility', seconds: 0 },
        { action: 'Split A por Bombs', seconds: 5 },
        { action: 'Entry A Long', seconds: 10 },
        { action: 'Plant A con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Uno de los dos players de main. Encargado de lanzar el smoke mid y la flash B main.' },
        { player: 'Dida', role: 'AWPER', utility: 'Una de los dos players de main. Arma en mano hasta la consecución del site y alerta para resmokear CT.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'Lurker hacia A main. Importante el uso de doble flash para habilitar el push de mid. Al ser un rush muy evidente, es muy posible conseguir un flank sencillo corriendo hacia coche una vez haya oído la rotación. Como alternativa, puede ir mid con sus compañeros y quedarse en garaje a la espera de un push tanto por A main como por mid buscando la entrada de vent.' },
        { player: 'Kevs', role: 'IGL', utility: 'Uno de los dos players de mid. Encargado de flashear mid y jugar agresivo hacia vent buscando duelos rápidos en B site. Si resulta ser el segundo de los players ' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Uno de los dos players de mid. Encargado de flashear mid y jugar agresivo hacia vent buscando duelos rápidos en B site. Si resulta ser el segundo de los players ' },
      ],
    },
    {
      side: 'CT',
      name: 'Plays en contrucción',
      description: '',
      minimaps: [],
      timing: [
        { action: 'Posiciones A y B', seconds: 0 },
        { action: 'Lurker monitorea Mid', seconds: 5 },
        { action: 'Rotación si hay presión', seconds: 8 },
        { action: 'Controlo sites', seconds: 20 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: '' },
        { player: 'Dida', role: 'AWPER', utility: '.' },
        { player: 'Fedello', role: 'ENTRY', utility: '.' },
        { player: 'Kevs', role: 'IGL', utility: '.' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: '.' },
      ],
    },
  ],
};