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

  readonly grenadeTypes: { key: GrenadeType; label: string; svg: string }[] = [
    {
      key: 'smoke',
      label: 'Smoke',
      svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="12" stroke="currentColor" stroke-width="2.5" fill="none"/>
        <path d="M32 20c-4-8-10-14-10-20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M42 20c4-8 10-14 10-20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M20 28c-8 2-16 4-22 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M44 28c8 2 16 4 22 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M22 36c-6 4-12 10-16 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M42 36c6 4 12 10 16 16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      </svg>`
    },
    {
      key: 'molotov',
      label: 'Molotov',
      svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 52l4-24h0l4 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M32 28c-6-8-12-14-10-22 2-6 10-8 10-8s8 2 10 8c2 8-4 14-10 22z" stroke="currentColor" stroke-width="2.5" fill="none"/>
        <path d="M24 40c-4 2-8 6-10 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M40 40c4 2 8 6 10 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M28 44c-2 4-4 8-4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M36 44c2 4 4 8 4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      </svg>`
    },
    {
      key: 'flash',
      label: 'Flash',
      svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="10" stroke="currentColor" stroke-width="2.5" fill="none"/>
        <line x1="32" y1="2" x2="32" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="32" y1="52" x2="32" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="2" y1="32" x2="12" y2="32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="52" y1="32" x2="62" y2="32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="11" y1="11" x2="18" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="46" y1="46" x2="53" y2="53" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="53" y1="11" x2="46" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="18" y1="46" x2="11" y2="53" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="32" cy="32" r="4" fill="currentColor"/>
      </svg>`
    },
    {
      key: 'he',
      label: 'HE',
      svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="14" stroke="currentColor" stroke-width="2.5" fill="none"/>
        <circle cx="32" cy="32" r="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
        <line x1="32" y1="2" x2="32" y2="10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="32" y1="54" x2="32" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="2" y1="32" x2="10" y2="32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="54" y1="32" x2="62" y2="32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="10" y1="10" x2="16" y2="16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="48" y1="48" x2="54" y2="54" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="54" y1="10" x2="48" y2="16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="16" y1="48" x2="10" y2="54" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`
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
    return `/assets/map-headers/${name}.jpg`;
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