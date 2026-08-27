import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MapContentComponent } from './content/mapcontent/map-content';
import { MapConfig } from './content/data/map-config.interface';
import { mapData as dust2Data } from './content/data/dust2-data';
import { mapData as mirageData } from './content/data/mirage-data';
import { mapData as infernoData } from './content/data/inferno-data';
import { mapData as nukeData } from './content/data/nuke-data';
import { mapData as ancientData } from './content/data/ancient-data';
import { mapData as anubisData } from './content/data/anubis-data';
import { mapData as overpassData } from './content/data/overpass-data';
import { mapData as vertigoData } from './content/data/vertigo-data';
import { mapData as cacheData } from './content/data/cache-data';
import { mapData as trainData } from './content/data/train-data';

@Component({
  imports: [CommonModule, MapContentComponent],
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class MapPage {
  mapName: string = '';
  mapKey: string = '';
  headerImage: string = '';
  mapData: MapConfig | null = null;

  readonly maps = [
    { name: 'Dust 2', key: 'dust-2', file: 'Dust2.jpg' },
    { name: 'Mirage', key: 'mirage', file: 'Mirage.jpg' },
    { name: 'Inferno', key: 'inferno', file: 'Inferno.jpg' },
    { name: 'Nuke', key: 'nuke', file: 'Nuke.jpg' },
    { name: 'Ancient', key: 'ancient', file: 'Ancient.jpg' },
    { name: 'Anubis', key: 'anubis', file: 'Anubis.jpg' },
    { name: 'Overpass', key: 'overpass', file: 'Overpass.jpg' },
    { name: 'Vertigo', key: 'vertigo', file: 'Vertigo.jpg' },
    { name: 'Cache', key: 'cache', file: 'Cache.jpg' },
    { name: 'Train', key: 'train', file: 'Train.jpg' },
  ];

  private readonly dataMap: Record<string, MapConfig> = {
    'dust-2': dust2Data,
    mirage: mirageData,
    inferno: infernoData,
    nuke: nukeData,
    ancient: ancientData,
    anubis: anubisData,
    overpass: overpassData,
    vertigo: vertigoData,
    cache: cacheData,
    train: trainData,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.mapKey = params.get('map') || 'dust-2';
      const map = this.maps.find(m => m.key === this.mapKey);
      this.mapName = map?.name || this.mapKey;
      this.headerImage = this.getHeaderImage(this.mapKey);
      this.mapData = this.dataMap[this.mapKey] || null;
    });
  }

  private getHeaderImage(key: string): string {
    const mapNames: Record<string, string> = {
      'dust-2': 'Dust2',
      mirage: 'Mirage',
      inferno: 'inferno',
      nuke: 'Nuke',
      ancient: 'Ancient',
      anubis: 'Anubis',
      overpass: 'Overpass',
      vertigo: 'Vertigo',
      cache: 'Cache',
      train: 'Train',
    };
    const name = mapNames[key] || key;
    const ext = name === 'Overpass' ? 'png' : 'jpg';
    return `/assets/map-headers/${name}.${ext}`;
  }

  navigateToMap(mapKey: string): void {
    this.router.navigate(['/map', mapKey]);
  }
}