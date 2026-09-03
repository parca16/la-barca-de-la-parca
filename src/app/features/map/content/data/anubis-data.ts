import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'anubis',
  title: 'Ideas Clave de Anubis',
  ideas: [
    {
      heading: 'Control de boat y water',
      text: 'Principal punto caliente del mapa. Es la zona en la que, generalmente, tanto CTs como Ts inverten más recursos en aras de ganar espacio e información. Por parte de los CTs se pueden plantear tomas agresivas desde el salto de window, pasando por el peek desde E-box hasta el push B main, apoyando este tipo de jugadas con un smoke escaleras; aunque es viable adoptar aproach más pasivos combinando fire power desde window y E-box, junto con HEs lanzadas desde heaven. Como Ts, interesa destinar entre 2 y 4 jugadores a esta zona, utilizando utilidades de support y de impacto tanto en window como en E-box. La idea de esta inversión es reducir espacios, hacer el mapa más pequeño, jugar con los que los CTs no saben y, desde esa incógnita, construir la ronda.',
    },
    {
      heading: 'Flexibilidad defensiva',
      text: 'Anubis es un mapa T sided. Tan T sided que es el mapa con mayor porcentaje de rondas ganadas por los terroristas con un 54,8% (según HLTV), lo que nos obliga a plantear una defensa mucho más dinámica que a lo que estamos acostumbrados. El 2-2-1 estático puede funcionar un par de rondas, pero debemos forzarnos a no caer en la autocomplacencia y buscar variar los puntos de contacto, ya sea con cambios de disposición (3-1-1 o 2-1-2), con la sneaky peaky play en B site, o con las agresivas de water y boat. Los únicos dos escenarios en los cuales nos interesaría mantener el 2-2-1 estático serían a) por superioridad mecánica, o b) por mediocridad del rival a la hora de plantear ataques.',
    },
    {
      heading: 'La falsa importancia de mid',
      text: 'Mid es una zona importante, pero no tanto como se le suele atribuir. Su valor reside principalmente en la posición de ventana, extremadamente ventajosa tanto para los duelos como para obtener información, y en el acceso directo a A site. Sin embargo, perder el control de mid no supone ni mucho menos un desastre para los CTs. Si se ven superados, el jugador —o jugadores— de mid pueden replegarse con relativa facilidad hacia A site. En caso de que los Ts decidan percutir en esa zona, tendrán que atravesar un cuello de botella especialmente difícil de superar si los CTs plantean algo de utilidad. Si, por el contrario, optan por continuar hacia templo, necesitarán entre 5 y 8 segundos para alcanzar la entrada a B main, un margen más que suficiente para que los CTs comiencen a plantear rotaciones por playa o boat. Desde el lado T, puede ser interesante aplicar utilidad de impacto sobre ventana para denegar información, infligir algo de daño y generar presión. No obstante, salvo en situaciones concretas —como los rushes o los flanks que aprovechen los timings—, rara vez resulta especialmente rentable jugar por esta zona del mapa. El split de A supone la excepción que confirma la regla.',
    },
    
  ],
  calloutsImage: '/assets/callouts/Anubis.webp',
  strategies: [
    {
      side: 'T',
      name: 'Execute A',
      description: 'La play más sólida en el mapa, al poder plantearla desde un inicio o virar hacia ella fácilmente partiendo de una ronda default. Consta de doble smoke a CT y heaven, doble molotov a headshot y a x-box, y doble flash al site, setupeada por dos players. La idea es tomar el site rápido, resmokear connector y jugar agresivo contra los players de heaven/headshot desde x-box o buscando un push al shift por el smoke de heaven. El site es relativamente fácil de defender en caso de mantener el control de connector en todo momento. Se hace especialmente importante la presencia de un player en alfombras que asegure que el equipo pueda centrarse en playa y connector.',
      minimaps: ['/assets/plays/Anubis_T_ExecuteA.webp'],
      timing: [
        { action: 'Smoke Mid y Banana', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: '3 jugadores execute B Main', seconds: 10 },
        { action: 'Plant B', seconds: 20 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Uno de los dos lanzadores de utilidad. Su trabajo consiste en smokear connectr, molotovear x-box y flashear el site. Tras ello, y dependiendo de la disposición de los players, entrará al site con los entrys o subirá a alfombras para cortar rotaciones. La decisión de la posición recaerá en si el execute se ha calleado desde el principio de la ronda, o si la play ha nacido a partir de una default.' },
        { player: 'Dida', role: 'AWPER', utility: 'Una de las dos lanzadoras de utilidad. Su trabajo consiste en smokear heaven, molotovear headshot y flashear el site. Tras ello, se dispondrá a pushear main junto con los entrys buscando trades o kills. En caso de no tener la bomba, y de cara a un postplant, conviene que su principal target sea el smoke de connector para evitar cualquier posible push.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'Funcionará como lurker y, en early round, será el encargado de molotovear ventana. A partir de ese instante, deberá jugar pasivo hasta la entry y, una vez producida, podrá jugar con gran libertad, ya sea a) buscando flanks por mid con el objetivo de sonidear al player de e-box o al que salta por window, así como cortar rotaciones una vez alcanzada la zona de dobles puertas, o b) jugar desde escaleras o alfombras para cumplir la función de cierre. En cualquiera de los dos casos, deberá comunicar sus intenciones claramente para que los players del site puedan jugar en consecuencia.' },
        { player: 'Kevs', role: 'IGL', utility: 'Rol de entry principal. Encargado de prevenir el push por window en caso de que el molotov no llegue lo suficientemente rápido. Deberá tener especial cuidado con el timing de la nade escaleras, que en caso de estar bien lanzada puede quitar 55 de hp con chaleco. Una vez lanzadas las utilidades al site, será el encargado de buscar la primera kill. Es posible apoyar la entry con el molotov de faraón, con el que se pierde poco timing en la entrada. Los puntos de mayor riesgo son backsite, xbox y fuente. '},
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Rol de entry principal. Encargado de prevenir el push por window en caso de que el molotov no llegue lo suficientemente rápido. Deberá tener especial cuidado con el timing de la nade escaleras, que en caso de estar bien lanzada puede quitar 55 de hp con chaleco. Una vez lanzadas las utilidades al site, será el encargado de buscar la primera kill. Es posible apoyar la entry con el molotov de faraón, con el que se pierde poco timing en la entrada. Los puntos de mayor riesgo son backsite, xbox y fuente.' },
      ],
    },
    {
      side: 'T',
      name: 'Execute B',
      description: 'Execute más arriesgado debido al abandono de la zona de boat y aguas. El setup es más complejo que en A, debido a que la utilidad se lanza entre 4 players. Uno de los dos supports lanzará smoke B site, molotov columna y flash site, mientras que el otro lanzará smoke templo y flash site. Los entrys pueden complementar este setup con molotov corner, molotov columna (close) o molotov ninja, a su elección, además de poder lanzar flashes complementarias. El postplant es complejo, por lo que conviene un plante que permita varios spots desde los cuales jugar. Si es posible, plantar para e-box y main, de tal forma que el lurker pueda incorporarse de forma sencilla a la defensa de la bomba. En cuanto a resmokes, lo vas conveniente es apostar por templo, asegurando de esta forma la presencia de players en backsite y obligando a los CTs a jugar por highway (mucho espacio entre la bomba y los CTs, y e-box (desde donde el lurker puede hacer mucho daño).',
      minimaps: ['/assets/plays/Anubis_T_ExecuteB.webp'],
      timing: [
        { action: 'Smoke Mid y Banana', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: '3 jugadores execute B Main', seconds: 10 },
        { action: 'Plant B', seconds: 20 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Encargado de lanzar el smoke B site, el molotov columna y la flash site. Tras ello, correrá al site buscando el segundo contacto y asegurar el plante en la medida de lo posible. ' },
        { player: 'Dida', role: 'AWPER', utility: 'Encargada de lanzar el smoke templo, y la flash site. Tras ello, correrá al site buscando el segundo contacto y asegurar el plante en la medida de lo posible.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'Como lurker, tendrá que orientar su juego en torno a aguas, ya sea por escaleras o por alfombras, pero con un ojo en mid para prevenir un push que pueda coger al equipo por la espalda. Tras el plante, y en caso de haber ganado una posición ventajosa, tratará de cortar las rotaciones por ventana o B main. Tras ello, buscará reagruparse con el resto del equipo por e-box, sabiendo que se encontrará con un plante favorable.' },
        { player: 'Kevs', role: 'IGL', utility: 'Encargado de lanzar utilidades de impacto (molotov ninja o corner) y de apoyo (flash site) que complementen el grueso del execute. Tras ello, será el primer entry, buscando abrir el site. Se deberá tener especial cuidado con backsite y, sobre todo, con e-box, siendo estas las dos posiciones más sólidas para los CTs en este tipo de execute.' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Encargado de lanzar utilidades de impacto (columna close) que complementen el grueso del execute. Tras ello, será el primer entry, buscando abrir el site. Se deberá tener especial cuidado con backsite y, sobre todo, con e-box, siendo estas las dos posiciones más sólidas para los CTs en este tipo de execute.' },
      ],
    },
    {
      side: 'T',
      name: 'Execute B Alter',
      description: 'Este execute es parecido al clásico aunque con diferencias importantes en su ejecución. Pasa a ser un execute de tres smokes, con un total de 3 entrys y un lurker. La falta de control earlyround sobre aguas se compensa con un player más entrando a site y un smoke más cubriendo posiciones clave. Es una jugada que no busca conseguir kills earlyround ya que el setup de smokes corta el site por la mitad, dificultando la existencia de duelos directos. Es, por tanto, una play que basa su fuerza en nuestra habilidad para jugar un postplant sólido. Los smokes los lanza un único player desde una posición cercana a spawn, mientras que los entrys solo deben preocuparse por molotovs y por flashes. En este caso, la intención principal es la de resmokear e-box para jugar juntos contra los players que lleguen desde templo y highway.',
      minimaps: ['/assets/plays/Anubis_T_ExecuteBAlter.webp'],
      timing: [
        { action: 'Smoke Mid y Banana', seconds: 0 },
        { action: 'Flash Mid Stairs', seconds: 5 },
        { action: '3 jugadores execute B Main', seconds: 10 },
        { action: 'Plant B', seconds: 20 },
      ],
      roles: [
        { player: 'Parca', role: 'RIFLER', utility: 'Encargado de lanzar el setup completo de smokes. Importante primero lanzar el smoke a e-box para reducir sustancialmente el delay en el pop con los otros dos smokes. Tras ello, correrá hacia main B buscando duelos sobre highway y/o templo.' },
        { player: 'Dida', role: 'AWPER', utility: 'Una de las tres entrys. Puede dar algo de soporte con las flashes al site que domina. Se puede contemplar la posibilidad de la doble flash. Conviene estar especialmente atenta a los smokes -dada la posibilidad de que los CTs busquen plays agresivas- y al player de columna.' },
        { player: 'Fedello', role: 'ENTRY', utility: 'El lurker tratará de cortar cualquier tipo de push mid earlyround. Una vez setupeado el execute y al no tener ningún tipo de utilidad de apoyo lanzada a e-box, se recomienda buscar flanks por mid antes que por aguas para buscar ya no solo la espalda rival, sino el sonideo hacia players que puedan dirigirse a e-box.' },
        { player: 'Kevs', role: 'IGL', utility: 'Uno de los tres entrys. Puede lanzar utilidad de apoyo (flash site)e impacto (molotov corner o ninja) al site. Conviene estar especialmente atento a los smokes -dada la posibilidad de que los CTs busquen plays agresivas- y al player de columna. Cobra especial importancia el one way smoke de corner hacia templo a sabiendas de que en este tipo de execute no existe el smoke palace, pudiendo lograr kills relativamente sencillas. ' },
        { player: 'Peter/Kike', role: 'SUPPORT', utility: 'Uno de los tres entrys. Puede lanzar utilidad de apoyo (flash site) e impacto (molotov columna close) al site. Conviene estar especialmente atento a los smokes -dada la posibilidad de que los CTs busquen plays agresivas- y al player de columna. Cobra especial importancia el one way smoke de corner hacia templo a sabiendas de que en este tipo de execute no existe el smoke palace, pudiendo lograr kills relativamente sencillas.' },
      ],
    },
    {
      side: 'CT',
      name: 'Plays en contrucción',
      description: '.',
      minimaps: ['/assets/plays/Anubis_CT_AgresivaBoat.webp'],
      timing: [
        { action: 'Posiciones iniciales', seconds: 0 },
        { action: 'Lurker monitorea Mid', seconds: 5 },
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