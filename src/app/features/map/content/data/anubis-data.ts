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
      description: '.',
      minimaps: ['/assets/plays/Anubis_T_ExecuteA.webp'],
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
      side: 'T',
      name: 'Execute B',
      description: '.',
      minimaps: ['/assets/plays/Anubis_T_ExecuteB.webp'],
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
      side: 'T',
      name: 'Execute B Alter',
      description: '.',
      minimaps: ['/assets/plays/Anubis_T_ExecuteBAlter.webp'],
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
      name: 'Agresiva Boat',
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