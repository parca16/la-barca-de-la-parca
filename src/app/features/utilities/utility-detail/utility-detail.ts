import { Component, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getHeaderImage, getMap } from '../../../data/models/maps';

type GrenadeType = 'smoke' | 'molotov' | 'flash' | 'he';

export interface UtilityData {
  filename: string;
  title: string;
  description: string;
}

/** Utilidad con su ruta de imagen ya resuelta, lista para pintar. */
export interface UtilityView extends UtilityData {
  imagePath: string;
}

export interface MapUtilities {
  smoke: UtilityData[];
  molotov: UtilityData[];
  flash: UtilityData[];
  he: UtilityData[];
}

/**
 * Cargadores diferidos de las utilidades de cada mapa. Con `import()` dinámico
 * y rutas literales, el bundler genera un chunk por mapa y solo se descarga el
 * del mapa visitado.
 */
const mapUtilitiesLoaders: Record<string, () => Promise<MapUtilities>> = {
  'dust-2': () => import('../data/dust2-utilities').then(m => m.dust2Utilities),
  mirage: () => import('../data/mirage-utilities').then(m => m.mirageUtilities),
  inferno: () => import('../data/inferno-utilities').then(m => m.infernoUtilities),
  nuke: () => import('../data/nuke-utilities').then(m => m.nukeUtilities),
  ancient: () => import('../data/ancient-utilities').then(m => m.ancientUtilities),
  anubis: () => import('../data/anubis-utilities').then(m => m.anubisUtilities),
  overpass: () => import('../data/overpass-utilities').then(m => m.overpassUtilities),
  vertigo: () => import('../data/vertigo-utilities').then(m => m.vertigoUtilities),
  cache: () => import('../data/cache-utilities').then(m => m.cacheUtilities),
  train: () => import('../data/train-utilities').then(m => m.trainUtilities),
};

@Component({
  selector: 'app-utility-detail',
  templateUrl: './utility-detail.html',
  styleUrl: './utility-detail.css',
})
export class UtilityDetail implements OnDestroy {
  mapName: string = '';
  mapKey: string = '';
  headerImage: string = '';
  selectedType: GrenadeType | null = null;
  utilities: UtilityView[] = [];
  selectedImage: string | null = null;
  private subscriptions = new Subscription();
  private loadToken = 0;

  readonly grenadeTypes: { key: GrenadeType; label: string; iconPath: string }[] = [
    {
      key: 'smoke',
      label: 'Smoke',
      iconPath: '/assets/icons/smoke_ico.webp'
    },
    {
      key: 'molotov',
      label: 'Molotov',
      iconPath: '/assets/icons/molotov_ico.webp'
    },
    {
      key: 'flash',
      label: 'Flash',
      iconPath: '/assets/icons/flashbang_ico.webp'
    },
    {
      key: 'he',
      label: 'HE',
      iconPath: '/assets/icons/nade_ico.webp'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        this.mapKey = params.get('map') || 'dust-2';
        const map = getMap(this.mapKey);
        this.mapName = map?.name || this.mapKey;
        this.headerImage = getHeaderImage(this.mapKey);
        this.selectedType = null;
        this.utilities = [];
      })
    );
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: Event): void {
    if (this.selectedImage && (event as KeyboardEvent).key === 'Escape') {
      this.closeLightbox();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  selectType(type: GrenadeType): void {
    this.selectedType = this.selectedType === type ? null : type;
    void this.loadUtilities();
  }

  private async loadUtilities(): Promise<void> {
    const type = this.selectedType;
    const token = ++this.loadToken;

    if (!type) {
      this.utilities = [];
      return;
    }

    const loader = mapUtilitiesLoaders[this.mapKey];
    const data = loader ? await loader() : undefined;

    // Si el usuario cambió de tipo o de mapa durante la carga, descartamos.
    if (token !== this.loadToken || this.selectedType !== type) {
      return;
    }

    const selected = data?.[type];

    if (selected && selected.length > 0) {
      const folder = getMap(this.mapKey)?.utilitiesFolder || this.mapKey;
      this.utilities = selected.map(utility => ({
        ...utility,
        imagePath: `/assets/utilidades/${folder}/${utility.filename}`,
      }));
    } else {
      this.utilities = [{ filename: 'placeholder', title: 'Utilidad en desarrollo', description: 'En desarrollo...', imagePath: '' }];
    }
  }

  navigateToStrategies(): void {
    this.router.navigate(['/map', this.mapKey]);
  }

  selectImage(utility: UtilityView): void {
    if (utility.imagePath) {
      this.selectedImage = utility.imagePath;
    }
  }

  closeLightbox(): void {
    this.selectedImage = null;
  }
}
