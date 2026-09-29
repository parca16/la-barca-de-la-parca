import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(private route: ActivatedRoute) {
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        this.mapKey = params.get('map') || 'dust-2';
        const map = this.maps.find(m => m.key === this.mapKey);
        this.mapName = map?.name || this.mapKey;
        this.headerImage = this.getHeaderImage(this.mapKey);
        this.mapData = this.dataMap[this.mapKey] || null;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
}
