import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { getHeaderImage, getMap } from '../../data/models/maps';
import { MapContentComponent } from './content/mapcontent/map-content';
import { MapConfig } from './content/data/map-config.interface';

/**
 * Cargadores diferidos de los datos de cada mapa. Al usar `import()` dinámico
 * con rutas literales, el bundler genera un chunk por mapa y la página solo
 * descarga el del mapa visitado.
 */
const mapDataLoaders: Record<string, () => Promise<MapConfig>> = {
  'dust-2': () => import('./content/data/dust2-data').then(m => m.mapData),
  mirage: () => import('./content/data/mirage-data').then(m => m.mapData),
  inferno: () => import('./content/data/inferno-data').then(m => m.mapData),
  nuke: () => import('./content/data/nuke-data').then(m => m.mapData),
  ancient: () => import('./content/data/ancient-data').then(m => m.mapData),
  anubis: () => import('./content/data/anubis-data').then(m => m.mapData),
  overpass: () => import('./content/data/overpass-data').then(m => m.mapData),
  vertigo: () => import('./content/data/vertigo-data').then(m => m.mapData),
  cache: () => import('./content/data/cache-data').then(m => m.mapData),
  train: () => import('./content/data/train-data').then(m => m.mapData),
};

@Component({
  imports: [MapContentComponent],
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class MapPage implements OnDestroy {
  mapName: string = '';
  mapKey: string = '';
  headerImage: string = '';
  mapData: MapConfig | null = null;

  private subscriptions = new Subscription();
  private loadToken = 0;

  constructor(private route: ActivatedRoute) {
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        this.mapKey = params.get('map') || 'dust-2';
        const map = getMap(this.mapKey);
        this.mapName = map?.name || this.mapKey;
        this.headerImage = getHeaderImage(this.mapKey);
        void this.loadMapData(this.mapKey);
      })
    );
  }

  private async loadMapData(mapKey: string): Promise<void> {
    const loader = mapDataLoaders[mapKey];
    const token = ++this.loadToken;
    const data = loader ? await loader() : null;
    // Si el parámetro de ruta cambió durante la carga, descartamos el resultado.
    if (token === this.loadToken) {
      this.mapData = data;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
