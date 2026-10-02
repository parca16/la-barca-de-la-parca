import { Component, ElementRef, OnDestroy, HostListener, effect, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getHeaderImage, getMap } from '../../../data/models/maps';
import { imageVariant } from '../../../shared/image-utils';

type GrenadeType = 'smoke' | 'molotov' | 'flash' | 'he';

export interface UtilityData {
  filename: string;
  title: string;
  description: string;
}

/** Utilidad con su ruta de imagen ya resuelta, lista para pintar. */
export interface UtilityView extends UtilityData {
  imagePath: string;
  /** `srcset` responsivo ya resuelto (variantes 640w/1280w + original 1920w). */
  imageSrcset: string;
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
  // Signal: las utilidades llegan de un import() diferido y la app es zoneless.
  readonly utilities = signal<UtilityView[]>([]);
  /** Utilidad cuya imagen está ampliada en el lightbox (null = cerrado). */
  selectedImage: UtilityView | null = null;
  private subscriptions = new Subscription();
  private loadToken = 0;
  /** Referencia al diálogo para gestionar el foco al abrir/cerrar. */
  private readonly lightboxDialog = viewChild<ElementRef<HTMLElement>>('lightboxDialog');
  /** Elemento que abrió el lightbox, para devolverle el foco al cerrar. */
  private lastFocusedElement: HTMLElement | null = null;

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
        this.utilities.set([]);
      })
    );

    // Al renderizarse el diálogo del lightbox, movemos el foco dentro.
    effect(() => {
      const dialog = this.lightboxDialog();
      if (dialog && this.selectedImage) {
        dialog.nativeElement.focus();
      }
    });
  }

  /** `srcset` del hero: variante 960w + original 1920w. */
  get headerSrcset(): string {
    if (!this.headerImage) return '';
    return `${imageVariant(this.headerImage, 960)} 960w, ${this.headerImage} 1920w`;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    if (!this.selectedImage) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeLightbox();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  /** Mantiene el foco dentro del diálogo mientras el lightbox está abierto. */
  private trapFocus(event: KeyboardEvent): void {
    const dialog = this.lightboxDialog()?.nativeElement;
    if (!dialog) return;

    const focusables = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );

    if (focusables.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
      if (active === first || active === dialog) {
        event.preventDefault();
        last.focus();
      }
    } else if (active === last) {
      event.preventDefault();
      first.focus();
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
      this.utilities.set([]);
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
      this.utilities.set(
        selected.map(utility => {
          const imagePath = `/assets/utilidades/${folder}/${utility.filename}`;
          return {
            ...utility,
            imagePath,
            imageSrcset: `${imageVariant(imagePath, 640)} 640w, ${imageVariant(imagePath, 1280)} 1280w, ${imagePath} 1920w`,
          };
        })
      );
    } else {
      this.utilities.set([{ filename: 'placeholder', title: 'Utilidad en desarrollo', description: 'En desarrollo...', imagePath: '', imageSrcset: '' }]);
    }
  }

  navigateToStrategies(): void {
    this.router.navigate(['/map', this.mapKey]);
  }

  selectImage(utility: UtilityView, event?: Event): void {
    if (!utility.imagePath) return;

    const trigger = event?.currentTarget as HTMLElement | null;
    this.lastFocusedElement = trigger ?? (document.activeElement as HTMLElement | null);
    this.selectedImage = utility;
  }

  closeLightbox(): void {
    this.selectedImage = null;

    const trigger = this.lastFocusedElement;
    this.lastFocusedElement = null;
    if (trigger && trigger.isConnected) {
      trigger.focus();
    }
  }
}
