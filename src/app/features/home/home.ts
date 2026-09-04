import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ContributionCard {
  title: string;
  route: string;
  items: string[];
  description: string;
  footer?: string;
}

@Component({
  imports: [],
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  contributionCards: ContributionCard[] = [
    {
      title: 'Equipo',
      route: 'team',
      description: 'Aporta información y fotos de los jugadores para ampliar y actualizar el roster del equipo.',
      items: [
        'Foto de perfil (formato rectangular, buena calidad)',
        'Nombre real y alias',
        'Rol principal',
        'Edad y nacionalidad',
        'Descripción de posición en el juego',
        'Lista de virtudes y defectos',
        'Perfil psicológico',
        'Estadísticas (rating, K/D, % headshots, etc.)'
      ],
      footer: 'Si te sientes incómodo/a con alguno de los datos expuestos, comunícalo para sustituirlo o eliminarlo.'
    },
    {
      title: 'Estrategias',
      route: 'strategies',
      description: 'Comparte plays, estrategias y jugadas que hayáis desarrollado para los mapas competitivos.',
      items: [
        'Mapa donde se aplica la estrategia',
        'Tipo de play (default, execute, fake, eco, etc.)',
        'Descripción detallada de las jugadas',
        'Posiciones de cada jugador en el minimapa',
        'Variantes y adaptaciones',
        'Roles de cada jugador en la play',
        'Imágenes o capturas del minimapa con posiciones',
      
      ]
    },
    {
      title: 'Utilidades',
      route: 'utilities',
      description: 'Envía utilidades (smokes, molotovs, flashes, HE) para que el equipo pueda consultarlas durante las partidas.',
      items: [
        'Mapa al que pertenece la utilidad',
        'Tipo de utilidad (smoke, molotov, flash, HE)',
        'Título descriptivo de la utilidad',
        'Descripción de cómo se lanza y para qué sirve',
        'Imagen de la vista en primera persona del lanzamiento en formato webp y con la utilidad correspondiente en la mano',
        
      ]
    }
  ];

  constructor(private router: Router) {}

  navigateToMap(mapKey: string): void {
    this.router.navigate(['/map', mapKey]);
  }

  navigateTo(route: string): void {
    this.router.navigate(['/' + route]);
  }
}