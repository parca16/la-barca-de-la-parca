import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MapInfo } from '../../data/models/maps';

@Component({
  selector: 'app-map-pool-grid',
  imports: [],
  templateUrl: './map-pool-grid.html',
  styleUrl: './map-pool-grid.css',
})
export class MapPoolGrid {
  private router = inject(Router);

  /** Título de la sección, p. ej. 'Map Pool Activo'. */
  readonly title = input.required<string>();
  /** Mapas que se muestran como cards. */
  readonly maps = input.required<MapInfo[]>();
  /** Ruta base a la que navegar al pulsar una card; se le añade la key del mapa. */
  readonly baseRoute = input.required<string>();

  protected navigateToMap(key: string): void {
    this.router.navigate([this.baseRoute(), key]);
  }
}
