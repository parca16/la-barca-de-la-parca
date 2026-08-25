import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class MapPage {
  mapName: string = '';
  mapKey: string = '';
  currentMapFile: string = '';

  readonly maps = [
    { name: 'Dust 2', key: 'dust-2', file: 'Dust 2.jpg' },
    { name: 'Mirage', key: 'mirage', file: 'Mirage.jpg' },
    { name: 'Inferno', key: 'inferno', file: 'Inferno.jpg' },
    { name: 'Nuke', key: 'nuke', file: 'Nuke.jpg' },
    { name: 'Ancient', key: 'ancient', file: 'Ancient.jpg' },
    { name: 'Anubis', key: 'anubis', file: 'Anubis.jpg' },
    { name: 'Overpass', key: 'overpass', file: 'Overpass.jpg' },
    { name: 'Train', key: 'train', file: 'Train.jpg' },
    { name: 'Vertigo', key: 'vertigo', file: 'Vertigo.jpg' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.mapKey = params.get('map') || 'dust-2';
      const map = this.maps.find(m => m.key === this.mapKey);
      this.mapName = map?.name || this.mapKey;
      this.currentMapFile = map?.file || '';
    });
  }

  navigateToMap(mapKey: string): void {
    this.router.navigate(['/map', mapKey]);
  }
}