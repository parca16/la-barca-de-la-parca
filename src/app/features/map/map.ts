import { Component, inject, OnDestroy, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { getHeaderImage, getMap } from '../../data/models/maps';
import { imageVariant } from '../../shared/image-utils';
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
  // Signals: la app es zoneless, así que los datos que llegan de forma
  // asíncrona (import() diferido) deben notificar a la detección de cambios.
  readonly mapName = signal('');
  readonly mapKey = signal('');
  readonly headerImage = signal('');
  readonly mapData = signal<MapConfig | null>(null);

  private readonly route = inject(ActivatedRoute);
  private subscriptions = new Subscription();
  private loadToken = 0;

  constructor() {
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        const key = params.get('map') || 'dust-2';
        this.mapKey.set(key);
        this.mapName.set(getMap(key)?.name || key);
        this.headerImage.set(getHeaderImage(key));
        void this.loadMapData(key);
      })
    );
  }

  private async loadMapData(mapKey: string): Promise<void> {
    const loader = mapDataLoaders[mapKey];
    const token = ++this.loadToken;
    const data = loader ? await loader() : null;
    // Si el parámetro de ruta cambió durante la carga, descartamos el resultado.
    if (token === this.loadToken) {
      this.mapData.set(data);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /** `srcset` del hero: variante 960w + original 1920w. */
  readonly headerSrcset = computed(() => {
    const image = this.headerImage();
    return image ? `${imageVariant(image, 960)} 960w, ${image} 1920w` : '';
  });
}
