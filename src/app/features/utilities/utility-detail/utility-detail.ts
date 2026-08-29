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
}

export interface MapUtilities {
  smoke: UtilityData[];
  molotov: UtilityData[];
  flash: UtilityData[];
  he: UtilityData[];
}

type GrenadeKey = 'smoke' | 'molo' | 'flash' | 'nade';

const grenadeMap: Record<GrenadeType, GrenadeKey> = {
  smoke: 'smoke',
  molotov: 'molo',
  flash: 'flash',
  he: 'nade',
};

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
  utilities: UtilityData[] = [];
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
      iconPath: '/assets/icons/smoke_ico.jpg'
    },
    {
      key: 'molotov',
      label: 'Molotov',
      iconPath: '/assets/icons/molotov_ico.jpg'
    },
    {
      key: 'flash',
      label: 'Flash',
      iconPath: '/assets/icons/flashbang_ico.jpg'
    },
    {
      key: 'he',
      label: 'HE',
      iconPath: '/assets/icons/nade_ico.jpg'
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

    if (data && data[this.selectedType] && data[this.selectedType].length > 0) {
      this.utilities = data[this.selectedType];
    } else {
      this.utilities = [{ filename: 'placeholder', title: 'Utilidad en desarrollo' }];
    }
  }

  getUtilityImagePath(utility: UtilityData): string {
    if (utility.filename === 'placeholder') return '';
    const mapNames: Record<string, string> = {
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
    const folder = mapNames[this.mapKey] || this.mapKey;
    return `/assets/utilidades/${folder}/${utility.filename}`;
  }

  private getHeaderImage(key: string): string {
    const mapNames: Record<string, string> = {
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
    const name = mapNames[key] || key;
    return `/assets/map-headers/${name}_header.webp`;
  }

  navigateBack(): void {
    this.router.navigate(['/utilities']);
  }

  selectImage(utility: UtilityData): void {
    if (utility.filename !== 'placeholder') {
      this.selectedImage = this.getUtilityImagePath(utility);
    }
  }

  closeLightbox(): void {
    this.selectedImage = null;
  }
}