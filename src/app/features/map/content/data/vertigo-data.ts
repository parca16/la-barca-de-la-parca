import { MapConfig } from './map-config.interface';

export const mapData: MapConfig = {
  key: 'vertigo',
  title: 'Ideas Clave de Vertigo',
  ideas: [
    {
      heading: 'Mapa Vertical',
      text: 'Vertigo es el mapa más vertical del competitive con su helipuerto en lo alto. La defensa del sitio A se centra en controlar el heli y las conexiones al mismo.',
    },
    {
      heading: 'Helipuerto y Conexiones',
      text: 'El helipuerto es la zona más estratégica del mapa. Controlarlo permite a los T llegar al sitio A con ventaja. Los CTs deben usar utility para negar el espacio.',
    },
    {
      heading: 'Site A y Condo',
      text: 'El sitio A se defiende desde el helipuerto, condo y long. La coordinación entre defensores en estas zonas es esencial para cubrir todas las líneas de entrada.',
    },
    {
      heading: 'Site B Compacto',
      text: 'El sitio B es más compacto que A pero puede ser vulnerable a executes rápidos. Los CTs deben mantener un defensor anclado y otro rotando desde A.',
    },
  ],
  calloutsImage: '/assets/callouts/Vertigo.png',
  strategies: [
    {
      side: 'T',
      name: 'Execute Helipuerto',
      description: 'Ejecución fuerte por el helipuerto al sitio A. Requiere utility bien mostrado para asegurar el entry y plantar con cobertura.',
      minimaps: ['/assets/minimaps/vertigo-play1.jpg'],
      timing: [
        { action: 'Smoke Mid y condo', seconds: 0 },
        { action: 'Flash helipuerto', seconds: 5 },
        { action: '2 jugadores saltan al heli', seconds: 10 },
        { action: 'Entry A con cobertura', seconds: 15 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Entry heli. Molotov A.' },
        { player: 'n1tro', role: 'AWPER', utility: 'Overwatch Mid. Flash heli.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Saltar heli. Entry.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama execute. Smoke Mid.' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Smoke condo. Monitor B.' },
      ],
    },
    {
      side: 'CT',
      name: 'Defensa helipuerto',
      description: 'Defensa del helipuerto con rifler y AWPer. Los defensores rotan entre heli y sitio B basándose en información.',
      minimaps: [],
      timing: [
        { action: 'Rifler + AWPer heli', seconds: 0 },
        { action: 'Defensor B Main', seconds: 0 },
        { action: 'Rotación si hay presión', seconds: 5 },
        { action: 'Controlo B si no hay presión', seconds: 20 },
      ],
      roles: [
        { player: 'c4rlos', role: 'RIFLER', utility: 'Rifler heli con cobertura.' },
        { player: 'n1tro', role: 'AWPER', utility: 'AWP heli con cobertura.' },
        { player: 'b1nd', role: 'IGL', utility: 'Llama rotaciones. Muestra utility.' },
        { player: 'd00m', role: 'ENTRY', utility: 'Defiende B. Retoma.' },
        { player: 'shad0w', role: 'SUPPORT', utility: 'Monitor condo. Flash B.' },
      ],
    },
  ],
};