import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
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

const MAP_FOLDER_NAMES: Record<string, string> = {
  'dust-2': 'dust2',
  mirage: 'mirage',
  inferno: 'inferno',
  nuke: 'nuke',
  ancient: 'ancient',
  anubis: 'anubis',
  overpass: 'overpass',
  vertigo: 'vertigo',
  cache: 'cache',
  train: 'train',
};

const HEADER_IMAGE_NAMES: Record<string, string> = {
  'dust-2': 'Dust2',
  mirage: 'Mirage',
  inferno: 'Inferno',
  nuke: 'Nuke',
  ancient: 'Ancient',
  anubis: 'Anubis',
  overpass: 'Overpass',
  vertigo: 'Vertigo',
  cache: 'Cache',
  train: 'Train',
};

@Component({
  imports: [CommonModule],
  selector: 'app-utility-detail',
  templateUrl: './utility-detail.html',
  styleUrl: './utility-detail.css',
})
export class UtilityDetail implements OnInit, OnDestroy {
  mapName: string = '';
  mapKey: string = '';
  headerImage: string = '';
  selectedType: GrenadeType | null = null;
  utilities: UtilityView[] = [];
  selectedImage: string | null = null;
  private subscriptions = new Subscription();

  private readonly maps = [
    { name: 'Dust 2', key: 'dust-2' },
    { name: 'Mirage', key: 'mirage' },
    { name: 'Inferno', key: 'inferno' },
    { name: 'Nuke', key: 'nuke' },
    { name: 'Ancient', key: 'ancient' },
    { name: 'Anubis', key: 'anubis' },
    { name: 'Overpass', key: 'overpass' },
    { name: 'Vertigo', key: 'vertigo' },
    { name: 'Cache', key: 'cache' },
    { name: 'Train', key: 'train' },
  ];

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
        const map = this.maps.find(m => m.key === this.mapKey);
        this.mapName = map?.name || this.mapKey;
        this.headerImage = this.getHeaderImage(this.mapKey);
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

  ngOnInit(): void {}

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
      const folder = MAP_FOLDER_NAMES[this.mapKey] || this.mapKey;
      this.utilities = selected.map(utility => ({
        ...utility,
        imagePath: `/assets/utilidades/${folder}/${utility.filename}`,
      }));
    } else {
      this.utilities = [{ filename: 'placeholder', title: 'Utilidad en desarrollo', description: 'En desarrollo...', imagePath: '' }];
    }
  }

  private getHeaderImage(key: string): string {
    const name = HEADER_IMAGE_NAMES[key] || key;
    return `/assets/map-headers/${name}_header.webp`;
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