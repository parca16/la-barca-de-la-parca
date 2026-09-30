import { Component, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getHeaderImage, getMap } from '../../../data/models/maps';
import { imageVariant } from '../../../shared/image-utils';
import { dust2Utilities } from '../data/dust2-utilities';
import { mirageUtilities } from '../data/mirage-utilities';
import { infernoUtilities } from '../data/inferno-utilities';
import { nukeUtilities } from '../data/nuke-utilities';
import { ancientUtilities } from '../data/ancient-utilities';
import { anubisUtilities } from '../data/anubis-utilities';
import { overpassUtilities } from '../data/overpass-utilities';
import { vertigoUtilities } from '../data/vertigo-utilities';
import { cacheUtilities } from '../data/cache-utilities';
import { trainUtilities } from '../data/train-utilities';

type GrenadeType = 'smoke' | 'molotov' | 'flash' | 'he';

export interface UtilityData {
  filename: string;
  title: string;
  description: string;
}

/** Utilidad con su ruta de imagen ya resuelta, lista para pintar. */
export interface UtilityView extends UtilityData {
  imagePath: string;
  /** `srcset` responsivo ya resuelto (variante 640w + original 1280w). */
  imageSrcset: string;
}

export interface MapUtilities {
  smoke: UtilityData[];
  molotov: UtilityData[];
  flash: UtilityData[];
  he: UtilityData[];
}

const mapUtilities: Record<string, MapUtilities> = {
  'dust-2': dust2Utilities,
  mirage: mirageUtilities,
  inferno: infernoUtilities,
  nuke: nukeUtilities,
  ancient: ancientUtilities,
  anubis: anubisUtilities,
  overpass: overpassUtilities,
  vertigo: vertigoUtilities,
  cache: cacheUtilities,
  train: trainUtilities,
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

  /** `srcset` del hero: variante 960w + original 1920w. */
  get headerSrcset(): string {
    if (!this.headerImage) return '';
    return `${imageVariant(this.headerImage, 960)} 960w, ${this.headerImage} 1920w`;
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
    this.loadUtilities();
  }

  private loadUtilities(): void {
    if (!this.selectedType) {
      this.utilities = [];
      return;
    }

    const data = mapUtilities[this.mapKey];
    const selected = data?.[this.selectedType];

    if (selected && selected.length > 0) {
      const folder = getMap(this.mapKey)?.utilitiesFolder || this.mapKey;
      this.utilities = selected.map(utility => {
        const imagePath = `/assets/utilidades/${folder}/${utility.filename}`;
        return {
          ...utility,
          imagePath,
          imageSrcset: `${imageVariant(imagePath, 640)} 640w, ${imagePath} 1280w`,
        };
      });
    } else {
      this.utilities = [{ filename: 'placeholder', title: 'Utilidad en desarrollo', description: 'En desarrollo...', imagePath: '', imageSrcset: '' }];
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